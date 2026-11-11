import { lookup } from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import { isIP, type LookupFunction } from 'node:net';
import { NextResponse } from 'next/server';
import { auditSite } from '@/lib/siteAudit';

/**
 * AI Website Audit endpoint (/ai-website-audit). Fetches a visitor-supplied URL server-side,
 * the way a crawler without JavaScript sees it, plus /robots.txt, /sitemap.xml and /llms.txt,
 * and returns the findings from lib/siteAudit.ts. Nothing is stored.
 *
 * Fetching arbitrary URLs from our server is an SSRF risk, so every hop (including redirects,
 * which are followed by hand) must be http(s) on the default port, and the socket connects only
 * to an address that `publicLookup` resolved and checked as public. The check runs inside the
 * connection's own DNS lookup, so there is no window for DNS rebinding between check and connect.
 * Responses are reduced to findings, never echoed back raw.
 *
 * The browser only talks to this site, so no CSP change is needed.
 */

export const maxDuration = 30;

const UA = 'Mozilla/5.0 (compatible; MarketingBullAudit/1.0; +https://getmarketingbull.com/ai-website-audit)';
const PAGE_TIMEOUT_MS = 12_000;
const SIDE_TIMEOUT_MS = 5_000;
const MAX_PAGE_BYTES = 3_000_000;
const MAX_SIDE_BYTES = 300_000;
const MAX_REDIRECTS = 5;

// Best-effort per-instance rate limit, as in /api/lead.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

class AuditError extends Error {}

function privateV4(ip: string): boolean {
  const [a, b] = ip.split('.').map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 168 || b === 0)) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function privateIp(ip: string): boolean {
  if (isIP(ip) === 4) return privateV4(ip);
  const v6 = ip.toLowerCase();
  const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return privateV4(mapped[1]);
  return v6 === '::' || v6 === '::1' || /^f[cd]/.test(v6) || /^fe[89ab]/.test(v6) || v6.startsWith('64:ff9b') || v6.startsWith('2001:db8');
}

/** Rejects addresses we can tell are not public before any DNS lookup or connection. */
function assertAllowedUrl(url: URL): void {
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new AuditError('Only http and https addresses can be audited.');
  if (url.port && url.port !== '80' && url.port !== '443') throw new AuditError('Only websites on the standard ports can be audited.');
  if (url.username || url.password) throw new AuditError('Remove the username and password from the address.');
  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  if (isIP(hostname) ? privateIp(hostname) : !hostname.includes('.') || /(^|\.)(local|internal|localhost|lan|home|corp)$/i.test(hostname)) {
    throw new AuditError('That address is not a public website.');
  }
}

const NOT_PUBLIC = 'NOT_PUBLIC';

/**
 * The socket's DNS lookup: resolves the host and refuses to connect unless every answer is a
 * public address, then connects to the address it checked. IP literals bypass lookup in Node,
 * so assertAllowedUrl covers those.
 */
const publicLookup: LookupFunction = (hostname, options, callback) => {
  lookup(hostname, { ...options, all: true, verbatim: true }, (err, addrs) => {
    if (err) return callback(err, '', 4);
    const list = addrs as { address: string; family: number }[];
    if (!list.length || list.some((a) => privateIp(a.address))) {
      const e = Object.assign(new Error('address is not public'), { code: NOT_PUBLIC });
      return callback(e, '', 4);
    }
    if (options.all) return (callback as unknown as (e: null, a: typeof list) => void)(null, list);
    callback(null, list[0].address, list[0].family);
  });
};

interface Fetched {
  status: number;
  headers: Record<string, string>;
  body: string;
  url: URL;
}

/** One GET with no redirect handling; the body is read only when `max` > 0 and the status is 2xx. */
function getOnce(url: URL, max: number, deadline: number): Promise<Fetched> {
  return new Promise((resolve, reject) => {
    const timeout = deadline - Date.now();
    if (timeout <= 0) return reject(Object.assign(new Error('timeout'), { name: 'TimeoutError' }));
    const mod = url.protocol === 'https:' ? https : http;
    const req = mod.request(
      url,
      {
        method: 'GET',
        lookup: publicLookup,
        timeout,
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.5', 'Accept-Encoding': 'identity' },
      },
      (res) => {
        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) if (v !== undefined) headers[k.toLowerCase()] = Array.isArray(v) ? v.join(', ') : v;
        const status = res.statusCode ?? 0;
        if (max <= 0 || status < 200 || status >= 300) {
          res.destroy();
          return resolve({ status, headers, body: '', url });
        }
        const chunks: Buffer[] = [];
        let size = 0;
        res.on('data', (c: Buffer) => {
          chunks.push(c);
          size += c.length;
          if (size >= max) res.destroy();
        });
        const done = () => resolve({ status, headers, body: Buffer.concat(chunks).subarray(0, max).toString('utf8'), url });
        res.on('end', done);
        res.on('close', done);
        res.on('error', reject);
      },
    );
    req.on('timeout', () => req.destroy(Object.assign(new Error('timeout'), { name: 'TimeoutError' })));
    req.on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === NOT_PUBLIC) reject(new AuditError('That address is not a public website.'));
      else if (e.code === 'ENOTFOUND' || e.code === 'EAI_AGAIN') reject(new AuditError(`We couldn't find ${url.hostname}. Check the spelling of the address.`));
      else reject(e);
    });
    req.end();
  });
}

/** GET with redirects followed by hand, so every hop is checked again. */
async function safeGet(start: URL, timeoutMs: number, max: number): Promise<Fetched> {
  const deadline = Date.now() + timeoutMs;
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    assertAllowedUrl(url);
    const r = await getOnce(url, max, deadline);
    const loc = r.headers.location;
    if (r.status >= 300 && r.status < 400 && loc) {
      url = new URL(loc, url);
      continue;
    }
    return r;
  }
  throw new AuditError('The site redirects too many times.');
}

/** A side file (robots.txt, sitemap, llms.txt): text that isn't the SPA's index.html fallback. */
async function sideFile(url: URL): Promise<string | null> {
  try {
    const r = await safeGet(url, SIDE_TIMEOUT_MS, MAX_SIDE_BYTES);
    if (r.status < 200 || r.status >= 300) return null;
    return /<html|<!doctype html/i.test(r.body.slice(0, 2000)) ? null : r.body;
  } catch {
    return null;
  }
}

function normalize(raw: string): URL | null {
  const s = raw.trim();
  if (!s || s.length > 500) return null;
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(s) ? s : `https://${s}`);
    u.hash = '';
    return u;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  // Same-origin only, as in /api/lead.
  const origin = req.headers.get('origin');
  if (origin) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (!originHost || ![req.headers.get('host'), req.headers.get('x-forwarded-host')].includes(originHost)) {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 403 });
    }
  }

  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'You have run a lot of audits in a short time. Please try again in a few minutes.' }, { status: 429 });
  }

  let raw = '';
  try {
    const body = (await req.json()) as { url?: unknown };
    raw = typeof body?.url === 'string' ? body.url : '';
  } catch {}
  const start = normalize(raw);
  if (!start) return NextResponse.json({ ok: false, error: 'Enter your website address, like yourfirm.com.' }, { status: 422 });

  try {
    let page: Fetched;
    try {
      page = await safeGet(start, PAGE_TIMEOUT_MS, MAX_PAGE_BYTES);
    } catch (e) {
      // A bare domain typed without a scheme may only answer on http.
      if (e instanceof AuditError || !/^https:/.test(start.href) || /^https?:\/\//i.test(raw.trim())) throw e;
      page = await safeGet(new URL(start.href.replace(/^https:/, 'http:')), PAGE_TIMEOUT_MS, MAX_PAGE_BYTES);
    }
    const { url, headers } = page;
    if (page.status < 200 || page.status >= 300) {
      throw new AuditError(`The site answered with an error (HTTP ${page.status}). If it blocks automated visitors, we can't audit it from here.`);
    }
    const type = headers['content-type'] ?? '';
    if (type && !/html/i.test(type)) throw new AuditError('That address is not a web page.');
    const html = page.body;

    const root = new URL('/', url);
    const [robotsTxt, sitemap, llms] = await Promise.all([
      sideFile(new URL('/robots.txt', root)),
      sideFile(new URL('/sitemap.xml', root)),
      sideFile(new URL('/llms.txt', root)),
    ]);
    const sitemapFound =
      (sitemap !== null && /<(urlset|sitemapindex)\b/i.test(sitemap)) || (robotsTxt !== null && /^\s*sitemap\s*:\s*https?:\/\//im.test(robotsTxt));

    const result = auditSite({
      requestedUrl: start.href,
      finalUrl: url.href,
      html,
      headers,
      robotsTxt,
      sitemapFound,
      llmsTxtFound: llms !== null && llms.trim().length > 20,
    });
    console.log('[site-audit]', url.host, result.score, result.platform ?? '-', result.findings.map((f) => f.id).join(','));
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    if (e instanceof AuditError) return NextResponse.json({ ok: false, error: e.message }, { status: 422 });
    const timeout = e instanceof Error && (e.name === 'TimeoutError' || e.name === 'AbortError');
    console.warn('[site-audit] fetch failed', start.host, e);
    return NextResponse.json(
      { ok: false, error: timeout ? 'The site took too long to answer. Try again, or check that it loads in your browser.' : `We couldn't load ${start.host}. Check the address and that the site is live.` },
      { status: 422 },
    );
  }
}
