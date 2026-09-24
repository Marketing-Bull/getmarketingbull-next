import { NextResponse } from 'next/server';
import { COMPANY, OFFERS } from '@/lib/constants';

/**
 * Lead intake endpoint.
 *
 * Delivery — set whichever env vars you have on Vercel; all configured channels run in parallel:
 *   LEAD_GHL_API_KEY    → POSTs the lead to GoHighLevel as a Contact in the MB sub-account
 *                          (LEAD_GHL_LOCATION_ID, default TpaL2rALzbFCdbM1sxmH) with tag
 *                          `mb-site-lead` and 4 custom fields.
 *   LEAD_WEBHOOK_URL   → POSTs the JSON payload (legacy: Zapier, Make, n8n…)
 *   RESEND_API_KEY     → emails the lead to LEAD_NOTIFY_EMAIL (default hello@getmarketingbull.com)
 *
 * The visitor is told "sent" only when at least one channel returned 2xx. If every channel fails,
 * the route returns 502 so the form shows the phone number instead of firing a false conversion.
 * With no channel configured, production returns 503; other environments log the lead and succeed.
 */

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  message?: unknown;
  smsConsent?: unknown;
  product?: unknown;
  source?: unknown;
  hp?: unknown; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_RE = /^[a-z0-9:-]{1,100}$/;
const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 100, email: 254, phone: 30, website: 300, message: 5000 } as const;
const UPSTREAM_TIMEOUT_MS = 8000;

// Best-effort per-instance rate limit. Instances are reused under Fluid compute, so this
// stops a single client hammering the form; a Vercel WAF rule is the durable backstop.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

const FAIL_MESSAGE = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  // Reject cross-site posts. Browsers always send Origin on a fetch POST; its host must match ours.
  const origin = req.headers.get('origin');
  if (origin) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {}
    const hosts = [req.headers.get('host'), req.headers.get('x-forwarded-host')];
    if (!originHost || !hosts.includes(originHost)) {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 403 });
    }
  }

  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 413 });
  }

  let body: LeadPayload;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't. `dropped` tells the form not to count a conversion.
  if (body.hp) return NextResponse.json({ ok: true, dropped: true });

  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: `Too many submissions. Please call ${COMPANY.phone} instead.` }, { status: 429 });
  }

  const name = str(body.name, LIMITS.name).replace(/\s+/g, ' ');
  const email = str(body.email, LIMITS.email);
  const phone = str(body.phone, LIMITS.phone);
  if (name.length < 2 || !EMAIL_RE.test(email) || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Please provide a name, a valid email, and a phone number.' }, { status: 422 });
  }

  const product = str(body.product, 200);
  const source = str(body.source, 100);
  const lead = {
    name,
    email,
    phone,
    website: str(body.website, LIMITS.website),
    message: str(body.message, LIMITS.message),
    smsConsent: body.smsConsent === true,
    product: OFFERS.some((o) => o.name === product) ? product : '',
    source: SOURCE_RE.test(source) ? source : 'website',
    submittedAt: new Date().toISOString(),
    page: (req.headers.get('referer') ?? '').slice(0, 500),
  };

  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ').trim();

  const ghlKey = process.env.LEAD_GHL_API_KEY;
  const ghlLocationId = process.env.LEAD_GHL_LOCATION_ID || 'TpaL2rALzbFCdbM1sxmH';
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || COMPANY.email;
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'leads@getmarketingbull.com';

  // `accept` lets a channel treat a specific non-2xx as delivered.
  const channels: { name: string; send: () => Promise<Response>; accept?: (status: number, body: string) => boolean }[] = [];

  if (ghlKey) {
    channels.push({
      name: 'ghl',
      send: () =>
        fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ghlKey}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
          body: JSON.stringify({
            locationId: ghlLocationId,
            firstName,
            lastName,
            name,
            email,
            phone,
            website: lead.website || undefined,
            source: 'Marketing Bull Site',
            tags: ['mb-site-lead'],
            customFields: [
              { id: 'n3Ur3Tm4gLb7BfhPFJt5', value: lead.source },
              { id: 'ssDT5kiOUvt30YA6vX15', value: lead.message },
              { id: 'nOLB2wsnl4T71In4ybss', value: lead.website },
              { id: 'PqYofPTdo3wZf6li9v9I', value: lead.smsConsent ? 'yes' : 'no' },
            ],
          }),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        }),
      // A repeat visitor already exists as a contact, so GHL answers 400 "does not allow duplicated
      // contacts". The person is in the CRM; the new message is only in the log below.
      accept: (status, body) => status === 400 && body.includes('duplicated contacts'),
    });
  }

  if (webhook) {
    channels.push({
      name: 'webhook',
      send: () =>
        fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        }),
    });
  }

  if (resendKey) {
    const html = `
        <h2>New lead from getmarketingbull.com</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
          <tr><td><b>Name</b></td><td>${esc(lead.name)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(lead.email)}</td></tr>
          <tr><td><b>Phone</b></td><td>${esc(lead.phone)}</td></tr>
          <tr><td><b>Website</b></td><td>${esc(lead.website)}</td></tr>
          <tr><td><b>Product</b></td><td>${esc(lead.product)}</td></tr>
          <tr><td><b>SMS consent</b></td><td>${lead.smsConsent ? 'yes' : 'no'}</td></tr>
          <tr><td><b>Page</b></td><td>${esc(lead.page)}</td></tr>
          <tr><td valign="top"><b>Message</b></td><td>${esc(lead.message).replace(/\n/g, '<br>')}</td></tr>
        </table>`;
    channels.push({
      name: 'email',
      send: () =>
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: `Marketing Bull Leads <${fromEmail}>`,
            to: [notifyEmail],
            reply_to: lead.email,
            subject: `New lead: ${lead.name}${lead.product ? ` — ${lead.product}` : ''}`,
            html,
          }),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        }),
    });
  }

  if (channels.length === 0) {
    console.error('[lead] no delivery configured', JSON.stringify(lead));
    if (process.env.VERCEL_ENV === 'production') {
      return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.all(
    channels.map(async ({ name: channel, send, accept }) => {
      try {
        const r = await send();
        if (r.ok) return { channel, ok: true, detail: String(r.status) };
        const text = await r.text().catch(() => '');
        if (accept?.(r.status, text)) {
          console.warn(`[lead] ${channel} accepted ${r.status}`, text.slice(0, 1000), JSON.stringify(lead));
          return { channel, ok: true, detail: `${r.status}-accepted` };
        }
        console.error(`[lead] ${channel} non-2xx`, r.status, text.slice(0, 1000));
        return { channel, ok: false, detail: String(r.status) };
      } catch (e) {
        console.error(`[lead] ${channel} failed`, e);
        return { channel, ok: false, detail: 'error' };
      }
    }),
  );

  const summary = results.map((r) => `${r.channel}:${r.detail}`).join(' ');
  if (!results.some((r) => r.ok)) {
    // Every channel failed: keep the full lead in the log so it can be recovered by hand.
    console.error('[lead] ALL CHANNELS FAILED', summary, JSON.stringify(lead));
    return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 502 });
  }

  console.log('[lead] delivery results:', summary);
  return NextResponse.json({ ok: true });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}
