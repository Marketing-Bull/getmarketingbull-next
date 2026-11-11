/**
 * AI Website Audit: checks the HTML a site actually serves (what Google and AI crawlers see)
 * for the problems AI site builders leave behind, and writes a fix prompt the owner pastes back
 * into their builder (Lovable, Bolt, v0, Cursor, ChatGPT…).
 *
 * Pure functions only, no I/O: /api/site-audit fetches the page and calls auditSite();
 * the browser calls buildFixPrompt() once the visitor has unlocked the prompt.
 * Parsing is regex-based on purpose: these are presence checks, not a DOM, and a parser
 * dependency isn't worth it for them.
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface Finding {
  id: string;
  severity: Severity;
  /** The problem, in plain language. */
  title: string;
  /** What we saw on the site. */
  evidence: string;
  /** Why it costs a firm or practice clients. */
  why: string;
  /** The instruction for the owner's LLM. */
  fix: string;
}

export interface AuditInput {
  requestedUrl: string;
  finalUrl: string;
  html: string;
  /** Lower-cased response header names. */
  headers: Record<string, string>;
  /** null when /robots.txt is missing or not plain text. */
  robotsTxt: string | null;
  /** /sitemap.xml (or the Sitemap: in robots.txt) returned real XML. */
  sitemapFound: boolean;
  llmsTxtFound: boolean;
}

export interface AuditResult {
  url: string;
  finalUrl: string;
  auditedAt: string;
  platform: string | null;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  /** True when the served HTML is an empty client-side app shell. */
  clientRendered: boolean;
  findings: Finding[];
  /** Titles of the checks that passed. */
  passed: string[];
  /** Checks we could not run, and why. */
  skipped: string[];
}

export const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low'];
const PENALTY: Record<Severity, number> = { critical: 25, high: 10, medium: 5, low: 2 };

/** Builders whose output is a Vite + React single-page app unless the owner changed it. */
const VITE_SPA_BUILDERS = new Set(['Lovable', 'Bolt', 'Base44', 'Replit', 'Vite + React']);

const PLATFORMS: [string, RegExp][] = [
  ['Lovable', /lovable|gptengineer|gpteng\.co/i],
  ['Bolt', /bolt\.new|stackblitz/i],
  ['v0', /\bv0\.dev\b|\bv0\.app\b|content="v0/i],
  ['Base44', /base44/i],
  ['Replit', /replit/i],
  ['Wix', /wix\.com|wixstatic/i],
  ['Squarespace', /squarespace/i],
  ['Webflow', /webflow/i],
  ['Framer', /framer(usercontent)?\.com|data-framer/i],
  ['WordPress', /wp-content|wp-includes/i],
  ['Durable', /durable\.co/i],
  ['Hostinger', /zyrosite|hostinger/i],
  ['GoDaddy', /godaddy|img1\.wsimg\.com/i],
  ['Next.js', /\/_next\/|__NEXT_DATA__/],
  ['Vite + React', /<script[^>]+type="module"[^>]+src="\/assets\/index-[^"]+\.js"|\/src\/main\.(t|j)sx/i],
];

// ── tiny HTML helpers ────────────────────────────────────────────────────────

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Attributes of every tag named `tag`, as lower-cased-key records. */
function tags(html: string, tag: string): Record<string, string>[] {
  const out: Record<string, string>[] = [];
  const re = new RegExp(`<${tag}\\b([^>]*)>`, 'gi');
  for (const m of html.matchAll(re)) {
    const attrs: Record<string, string> = {};
    for (const a of m[1].matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
      attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? '');
    }
    out.push(attrs);
  }
  return out;
}

function meta(html: string, key: string): string | null {
  const m = tags(html, 'meta').find((t) => (t.name ?? t.property ?? '').toLowerCase() === key);
  return m ? (m.content ?? '') : null;
}

function innerTexts(html: string, tag: string): string[] {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}\\s*>`, 'gi'))].map((m) => decode(m[1].replace(/<[^>]*>/g, ' ').replace(/[<>]/g, ' ')));
}

/** The text a visitor (or crawler without JavaScript) can read in the body. */
function bodyText(html: string): string {
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  // Only used to count and search words, never rendered as HTML. Stray < and > left by
  // malformed markup are removed too, so nothing tag-like survives.
  return decode(
    body
      .replace(/<(script|style|noscript|svg|template|iframe)\b[\s\S]*?<\/\1\b[^>]*>/gi, ' ')
      .replace(/<!--[\s\S]*?--!?>/g, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/[<>]/g, ' '),
  );
}

function wordCount(s: string): number {
  return s ? s.split(' ').filter((w) => /[a-z0-9]/i.test(w)).length : 0;
}

function clip(s: string, n = 90): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function host(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/** Groups of robots.txt rules that apply to `agent` (exact match, or * when none match). */
function robotsDisallowsRoot(robots: string, agent: string): boolean {
  const groups: { agents: string[]; rules: string[] }[] = [];
  let current: { agents: string[]; rules: string[] } | null = null;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (key === 'user-agent') {
      if (!current || current.rules.length) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(m[2].toLowerCase());
    } else if (current && (key === 'disallow' || key === 'allow')) {
      current.rules.push(`${key}:${m[2].trim()}`);
    }
  }
  const a = agent.toLowerCase();
  const group = groups.find((g) => g.agents.includes(a)) ?? groups.find((g) => g.agents.includes('*'));
  if (!group) return false;
  return group.rules.includes('disallow:/') && !group.rules.includes('allow:/');
}

// ── the audit ────────────────────────────────────────────────────────────────

const GENERIC_TITLES = /^(vite \+ react( \+ ts)?|react app|lovable( app)?|bolt|v0 app|create next app|my (app|website|site)|home|untitled|new project|index|document|welcome)$/i;
const GENERIC_DESCRIPTIONS = /lovable generated project|generated by (create next app|v0|bolt)|web site created using create-react-app|^a (react|vite) app/i;
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

export function auditSite(input: AuditInput): AuditResult {
  const { html, finalUrl } = input;
  const findings: Finding[] = [];
  const passed: string[] = [];
  const skipped: string[] = [];
  const add = (f: Finding) => findings.push(f);

  const platform = PLATFORMS.find(([, re]) => re.test(html))?.[0] ?? null;
  const viteSpa = platform !== null && VITE_SPA_BUILDERS.has(platform);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  const text = bodyText(html);
  const words = wordCount(text);
  const emptyShell = /<div[^>]+id=["'](root|app|__next)["'][^>]*>\s*<\/div>/i.test(html);
  const clientRendered = words < 120 && (emptyShell || /<script[^>]+type=["']module["']/i.test(html) || viteSpa);

  // 1. Rendering — the root cause behind most AI-builder SEO problems.
  if (clientRendered) {
    add({
      id: 'client-rendered',
      severity: 'critical',
      title: 'Search engines and AI assistants see a blank page',
      evidence: `The HTML your server sends contains ${words} word${words === 1 ? '' : 's'} of text${emptyShell ? ' and an empty app container' : ''}. Everything else is drawn by JavaScript after the page loads.`,
      why: 'Google renders JavaScript late and not always; ChatGPT, Claude, Perplexity and most link previews do not run it at all. To them your site has no services, no location and no phone number, so it cannot rank or be recommended.',
      fix: viteSpa
        ? 'This is a client-side rendered Vite + React app, so every route serves an empty <div id="root">. Make every public route serve its full content as static HTML: add build-time prerendering (for example vite-react-ssg, or a prerender step using vite-plugin-prerender or react-snap) for every route in the router, including each page\'s <title>, meta description, canonical, Open Graph tags and JSON-LD (use react-helmet-async or the SSG tool\'s head API). If prerendering cannot be done cleanly, migrate the site to a framework that renders on the server (Next.js App Router or Astro) while keeping the same components, design and URLs. Done means: `curl -s <page url>` returns the page\'s headings, body copy, links and phone number in the HTML for every route.'
        : platform === 'Next.js'
          ? 'The page content is rendered only in the browser. Move page content into Server Components (remove page-level "use client"; fetch data on the server instead of in useEffect), keep interactivity in small client components, and set per-page metadata with the Metadata API. Done means: `curl -s <page url>` returns the page\'s headings, body copy, links and phone number in the HTML.'
          : 'The page content is rendered only in the browser. Make every public page serve its full content (headings, body copy, links, contact details) and its head tags in the initial HTML, using server-side rendering or static prerendering. Done means: `curl -s <page url>` shows that content.',
    });
    skipped.push('Headings, image alt text, click-to-call, placeholder text and links were not checked: they are not in the HTML yet. Run the audit again after fixing rendering.');
  } else {
    passed.push('Page content is in the HTML crawlers receive');
  }

  // 2. HTTPS
  if (!finalUrl.startsWith('https://')) {
    add({
      id: 'https',
      severity: 'critical',
      title: 'The site is not served over HTTPS',
      evidence: `The page loaded at ${finalUrl}.`,
      why: 'Browsers mark the site "Not secure", forms look unsafe to fill in, and Google ranks HTTPS pages ahead.',
      fix: 'Serve the site only over HTTPS and redirect every http:// URL to its https:// equivalent with a 301. Update any hard-coded http:// links, images and canonical URLs to https://.',
    });
  } else passed.push('Served over HTTPS');

  // 3. Indexing blocks
  const robotsMeta = `${meta(html, 'robots') ?? ''} ${meta(html, 'googlebot') ?? ''} ${input.headers['x-robots-tag'] ?? ''}`.toLowerCase();
  if (robotsMeta.includes('noindex')) {
    add({
      id: 'noindex',
      severity: 'critical',
      title: 'The page tells Google not to index it',
      evidence: 'A "noindex" robots directive is set (meta robots tag or X-Robots-Tag header).',
      why: 'A noindex page is dropped from Google entirely. Builders often set it on previews and it survives into production.',
      fix: 'Remove the noindex directive from production pages (the <meta name="robots"> tag and any X-Robots-Tag response header). Keep noindex only on genuine staging/preview deployments and thank-you pages.',
    });
  } else passed.push('No noindex directive');

  if (input.robotsTxt !== null && robotsDisallowsRoot(input.robotsTxt, 'Googlebot')) {
    add({
      id: 'robots-block',
      severity: 'critical',
      title: 'robots.txt blocks search engines from the whole site',
      evidence: 'robots.txt contains "Disallow: /" for all crawlers or for Googlebot.',
      why: 'Search engines will not crawl any page, so nothing new gets indexed.',
      fix: 'Rewrite /robots.txt so search engines may crawl the public site: `User-agent: *` / `Allow: /`, disallowing only private paths (admin, API, thank-you pages), and add a `Sitemap:` line with the absolute sitemap URL.',
    });
  } else if (input.robotsTxt !== null) {
    const blocked = AI_CRAWLERS.filter((a) => robotsDisallowsRoot(input.robotsTxt!, a));
    if (blocked.length) {
      add({
        id: 'ai-crawlers-blocked',
        severity: 'medium',
        title: 'AI assistants are blocked from reading the site',
        evidence: `robots.txt disallows ${blocked.join(', ')}.`,
        why: 'When someone asks ChatGPT, Claude or Perplexity for a lawyer or doctor nearby, these crawlers decide which sites they can cite.',
        fix: `In /robots.txt, allow ${blocked.join(', ')} to crawl the public pages (remove their "Disallow: /" rules), unless the owner has decided to opt out of AI search on purpose — ask before changing it.`,
      });
    } else passed.push('Search engines and AI crawlers may crawl the site');
  }

  // 4. Title
  const title = innerTexts(head, 'title')[0] ?? '';
  if (!title || GENERIC_TITLES.test(title)) {
    add({
      id: 'title',
      severity: 'high',
      title: title ? 'The page title is the builder\'s placeholder' : 'The page has no title',
      evidence: title ? `<title> is "${clip(title)}".` : 'There is no <title> tag.',
      why: 'The title is the blue link in Google and the tab name. A placeholder title gives Google nothing to rank you for.',
      fix: 'Give every page a unique <title> of 50–60 characters in the form "Primary service in City | Business name", e.g. "Personal Injury Lawyer in Miami | Smith Law". Ask me for the business name, main service and city if you don\'t know them.',
    });
  } else if (title.length < 20 || title.length > 65) {
    add({
      id: 'title-length',
      severity: 'low',
      title: title.length < 20 ? 'The page title is too short to rank' : 'The page title gets cut off in Google',
      evidence: `<title> is ${title.length} characters: "${clip(title)}".`,
      why: 'Google shows about 60 characters. Short titles miss the service and city searchers type; long ones are truncated.',
      fix: `Rewrite the homepage <title> ("${clip(title, 70)}") to 50–60 characters, leading with the main service and city, then the business name.`,
    });
  } else passed.push('Page title is set');

  // 5. Meta description
  const description = meta(html, 'description');
  if (!description || GENERIC_DESCRIPTIONS.test(description)) {
    add({
      id: 'description',
      severity: 'high',
      title: description ? 'The meta description is the builder\'s placeholder' : 'The page has no meta description',
      evidence: description ? `Meta description is "${clip(description)}".` : 'There is no <meta name="description">.',
      why: 'This is the text under your link in Google and in shared links. Without one, Google picks a random snippet.',
      fix: 'Write a unique meta description of 140–160 characters for every page: what the business does, for whom, where, and a reason to call (e.g. free consultation, same-week appointments). No guarantees of results.',
    });
  } else if (description.length < 70 || description.length > 170) {
    add({
      id: 'description-length',
      severity: 'low',
      title: 'The meta description is the wrong length',
      evidence: `Meta description is ${description.length} characters.`,
      why: 'Google shows roughly 150–160 characters; much shorter wastes the space, longer is cut off.',
      fix: 'Rewrite the homepage meta description to 140–160 characters.',
    });
  } else passed.push('Meta description is set');

  // 6. Canonical
  const canonical = tags(head, 'link').find((l) => (l.rel ?? '').toLowerCase() === 'canonical')?.href ?? '';
  if (!canonical) {
    add({
      id: 'canonical',
      severity: 'medium',
      title: 'No canonical URL',
      evidence: 'There is no <link rel="canonical">.',
      why: 'The same page is reachable at several addresses (www and not, trailing slash, the builder\'s preview domain). A canonical tells Google which one to rank.',
      fix: `Add a self-referencing <link rel="canonical"> with the absolute production URL to every page (this page: ${finalUrl.split('?')[0]}).`,
    });
  } else if (host(canonical) && host(canonical) !== host(finalUrl)) {
    add({
      id: 'canonical-host',
      severity: 'high',
      title: 'The canonical URL points to a different domain',
      evidence: `Canonical is ${clip(canonical)} but the site is ${host(finalUrl)}.`,
      why: 'Google treats the other domain (often the builder\'s preview link) as the real site and can drop yours from results.',
      fix: `Change every canonical URL, og:url and sitemap entry to use the production domain ${host(finalUrl)} instead of ${host(canonical)}.`,
    });
  } else passed.push('Canonical URL is set');

  // 7. Social previews
  const ogImage = meta(html, 'og:image');
  const ogMissing = ['og:title', 'og:description', 'og:image'].filter((k) => !meta(html, k));
  if (ogMissing.length) {
    add({
      id: 'open-graph',
      severity: 'medium',
      title: 'Links to the site share without a proper preview',
      evidence: `Missing ${ogMissing.join(', ')}.`,
      why: 'When a referral texts or posts your link, the preview card is the first impression.',
      fix: 'Add og:title, og:description, og:url, og:type and og:image (a 1200×630 image with the business name and logo), plus twitter:card="summary_large_image", to every page.',
    });
  } else if (ogImage && /lovable|gptengineer|bolt\.new|v0\.dev|vercel\.app\/og|placeholder/i.test(ogImage)) {
    add({
      id: 'og-image-default',
      severity: 'medium',
      title: 'Shared links show the builder\'s image, not yours',
      evidence: `og:image is ${clip(ogImage)}.`,
      why: 'Every shared link advertises the tool that built the site instead of the business.',
      fix: 'Replace og:image and twitter:image with a 1200×630 image of the business (name, logo, one line on what it does) hosted on the site\'s own domain, using an absolute URL.',
    });
  } else passed.push('Open Graph preview tags are set');

  // 8. Mobile + language basics
  if (!meta(html, 'viewport')) {
    add({
      id: 'viewport',
      severity: 'high',
      title: 'The site is not set up for phones',
      evidence: 'There is no <meta name="viewport">.',
      why: 'Most people looking for a lawyer or doctor search on a phone. Without a viewport tag the page renders as a shrunken desktop page.',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the <head> of every page.',
    });
  } else passed.push('Mobile viewport is set');

  const lang = html.match(/<html\b[^>]*\blang=["']?([a-zA-Z-]+)/i)?.[1];
  if (!lang) {
    add({
      id: 'lang',
      severity: 'low',
      title: 'The page language is not declared',
      evidence: 'The <html> tag has no lang attribute.',
      why: 'Screen readers and search engines use it to pick the language. Bilingual practices need it on every page.',
      fix: 'Add lang="en" to the <html> tag (lang="es" on Spanish pages, with hreflang links between the language versions if they exist).',
    });
  } else passed.push('Page language is declared');

  const icons = tags(head, 'link').filter((l) => /icon/i.test(l.rel ?? ''));
  if (!icons.length || icons.some((i) => /vite\.svg|lovable|placeholder\.svg/i.test(i.href ?? ''))) {
    add({
      id: 'favicon',
      severity: 'low',
      title: icons.length ? 'The browser tab shows the builder\'s icon' : 'No favicon',
      evidence: icons.length ? `Favicon is ${clip(icons[0].href ?? '')}.` : 'No <link rel="icon"> was found.',
      why: 'The tab icon and Google\'s mobile result icon should be your logo, not a blank or the builder\'s.',
      fix: 'Add a favicon made from the business logo: /favicon.ico (32×32), an SVG or 512×512 PNG icon, and a 180×180 apple-touch-icon, linked from the <head>. Remove the builder\'s default icon.',
    });
  } else passed.push('Favicon is set');

  // 9. Builder leftovers
  const leftovers = [
    /gptengineer\.js|cdn\.gpteng\.co/i.test(html) && 'the Lovable editor script (gptengineer.js)',
    /lovable-badge|edit with lovable/i.test(html) && 'the "Edit with Lovable" badge',
    /made with bolt|bolt\.new\/badge/i.test(html) && 'the "Made with Bolt" badge',
    /built with v0|made with v0/i.test(html) && 'a "Built with v0" credit',
    /made with base44/i.test(html) && 'the Base44 badge',
    /data-lov-id|data-component-path/i.test(html) && 'editor data attributes (data-lov-id / data-component-path)',
  ].filter(Boolean) as string[];
  if (leftovers.length) {
    add({
      id: 'builder-leftovers',
      severity: 'medium',
      title: 'The builder\'s badge or editor code is still on the live site',
      evidence: `Found ${leftovers.join('; ')}.`,
      why: 'It tells every visitor the site was made with a free AI tool, and editor scripts add weight to every page load.',
      fix: `Remove ${leftovers.join(', ')} from the production build. Keep any dev-only tagging plugin limited to development mode.`,
    });
  } else passed.push('No builder badges or editor scripts');

  // 10. Content checks — only meaningful when the content is in the HTML.
  if (!clientRendered) {
    const h1s = innerTexts(html, 'h1').filter(Boolean);
    if (h1s.length === 0) {
      add({
        id: 'h1',
        severity: 'high',
        title: 'The page has no main heading (H1)',
        evidence: 'No <h1> was found.',
        why: 'The H1 tells search engines and screen readers what the page is about.',
        fix: 'Give every page exactly one <h1> that names the main service and location (e.g. "Miami Personal Injury Lawyers"). Style it however the design needs; it only has to be the H1 element.',
      });
    } else if (h1s.length > 1) {
      add({
        id: 'h1-multiple',
        severity: 'low',
        title: 'The page has more than one main heading',
        evidence: `${h1s.length} <h1> tags: ${h1s.slice(0, 3).map((h) => `"${clip(h, 40)}"`).join(', ')}.`,
        why: 'Several H1s blur what the page is about. AI builders often make every section title an H1.',
        fix: 'Keep one <h1> per page and change the other section titles to <h2>/<h3> without changing how they look.',
      });
    } else passed.push('One main heading (H1)');

    const imgs = tags(html, 'img');
    const noAlt = imgs.filter((i) => !('alt' in i));
    if (noAlt.length) {
      add({
        id: 'img-alt',
        severity: 'medium',
        title: 'Images are missing alt text',
        evidence: `${noAlt.length} of ${imgs.length} images have no alt attribute.`,
        why: 'Screen-reader users hear nothing (an ADA risk for law and medical sites), and image search can\'t index them.',
        fix: 'Add a short, accurate alt attribute to every meaningful <img> (who or what it shows), and alt="" to purely decorative images. Don\'t describe stock people as the firm\'s attorneys or the practice\'s doctors.',
      });
    } else if (imgs.length) passed.push('Images have alt text');

    if (!/href=["']tel:/i.test(html)) {
      add({
        id: 'click-to-call',
        severity: 'high',
        title: 'Visitors on phones can\'t tap to call',
        evidence: 'No tel: link was found on the page.',
        why: 'For a law firm or medical practice the phone call is the conversion. If the number isn\'t tappable, mobile visitors leave.',
        fix: 'Put the business phone number in the header and footer of every page as a tap-to-call link (<a href="tel:+1XXXXXXXXXX">), and on mobile add a sticky "Call now" button. Ask me for the number; do not invent one.',
      });
    } else passed.push('Tap-to-call phone link');

    const placeholders = [
      /lorem ipsum/i.test(text) && 'lorem ipsum',
      /\(555\)\s?\d{3}|\b555[-.\s]\d{4}\b/.test(text) && 'a 555 phone number',
      /\b(john|jane) (doe|smith)\b/i.test(text) && 'a "John/Jane Doe" name',
      /\[(your|insert|company|business)[^\]]*\]/i.test(text) && 'a [bracketed] placeholder',
      /\b(your company( name)?|company name|business name here)\b/i.test(text) && '"Your Company"-style placeholder text',
      /\b123 main st/i.test(text) && 'a "123 Main St" address',
      /[\w.-]+@example\.(com|org)/i.test(text) && 'an @example.com email',
      /\bacme\b/i.test(text) && '"Acme"',
    ].filter(Boolean) as string[];
    if (placeholders.length) {
      add({
        id: 'placeholders',
        severity: 'high',
        title: 'Placeholder text is live on the site',
        evidence: `Found ${placeholders.join(', ')}.`,
        why: 'Nothing loses a prospective client\'s trust faster than template filler on a law firm or medical site.',
        fix: `Find and replace every placeholder (${placeholders.join(', ')}) with the real business details. Ask me for anything you don't know — never make up names, addresses, phone numbers, reviews or results.`,
      });
    } else passed.push('No placeholder text');

    if (/href=["'](\/)?#\//i.test(html)) {
      add({
        id: 'hash-routing',
        severity: 'high',
        title: 'Pages use #/ addresses Google can\'t index separately',
        evidence: 'Links like /#/about were found.',
        why: 'Everything after # is ignored by search engines, so every page collapses into the homepage.',
        fix: 'Switch the router from hash routing to path-based routing (BrowserRouter / createBrowserRouter), add a host rewrite so deep links serve the app, and 301-redirect the old #/ links where possible.',
      });
    }
  }

  // 11. Structured data
  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join(' ');
  const businessType = /"@type"\s*:\s*(\[[^\]]*)?"(LegalService|Attorney|LawFirm|MedicalBusiness|MedicalClinic|Physician|Dentist|MedicalOrganization|LocalBusiness|ProfessionalService|Organization)"/i.test(jsonLd);
  if (!jsonLd) {
    add({
      id: 'schema',
      severity: 'medium',
      title: 'No structured data for search engines',
      evidence: 'No JSON-LD (schema.org) markup was found.',
      why: 'Structured data tells Google and AI assistants your business type, address, phone, hours and service area — the facts they quote back to searchers.',
      fix: 'Add JSON-LD to the homepage for the business: type LegalService (law firm) or MedicalClinic/Physician/Dentist (medical), with name, url, logo, telephone, address, geo, openingHoursSpecification, areaServed and sameAs (Google Business Profile, social profiles). Ask me for any details you don\'t have. Only mark up what is visible on the page.',
    });
  } else if (!businessType) {
    add({
      id: 'schema-type',
      severity: 'low',
      title: 'Structured data doesn\'t describe the business',
      evidence: 'JSON-LD is present but has no LocalBusiness, LegalService or medical business type.',
      why: 'Search engines can\'t tie the site to your Google Business Profile, address and phone.',
      fix: 'Add a LegalService or MedicalClinic/Physician JSON-LD block with name, url, logo, telephone, address, openingHoursSpecification, areaServed and sameAs.',
    });
  } else passed.push('Business structured data');

  // 12. Sitemap + llms.txt
  if (!input.sitemapFound) {
    add({
      id: 'sitemap',
      severity: 'medium',
      title: 'No XML sitemap',
      evidence: '/sitemap.xml was not found (and robots.txt lists none).',
      why: 'A sitemap is how Google discovers every page, especially on a new domain with few links.',
      fix: 'Generate /sitemap.xml at build time listing every public page with its absolute production URL, reference it from robots.txt ("Sitemap: https://…/sitemap.xml"), and make sure unknown paths like /sitemap.xml are not answered by the app\'s index.html.',
    });
  } else passed.push('XML sitemap');

  if (!input.llmsTxtFound) {
    add({
      id: 'llms-txt',
      severity: 'low',
      title: 'No llms.txt for AI assistants',
      evidence: '/llms.txt was not found.',
      why: 'An emerging convention: a short plain-text summary AI tools can read to describe the business accurately.',
      fix: 'Add /llms.txt: a Markdown file with the business name, a one-paragraph description, services, locations, phone and links to the key pages. Facts only, matching the site.',
    });
  } else passed.push('llms.txt');

  // 13. Analytics
  if (!/googletagmanager\.com|google-analytics\.com|gtag\(|plausible\.io|usefathom|clarity\.ms|posthog|umami|_vercel\/insights|segment\.com|static\.hotjar/i.test(html)) {
    add({
      id: 'analytics',
      severity: 'medium',
      title: 'No analytics found',
      evidence: 'No Google Analytics, Tag Manager or other analytics tag is in the HTML.',
      why: 'Without it you can\'t tell which marketing brings calls and form leads, so you can\'t tell what to spend on.',
      fix: 'Install Google Analytics 4 (gtag.js in the <head> of every page, measurement ID from me), and send a "generate_lead" event when a contact form submits successfully and a "phone_click" event when a tel: link is tapped. If the site has a Content-Security-Policy, add Google\'s domains to it.',
    });
  } else passed.push('Analytics installed');

  // 14. Mixed content
  if (finalUrl.startsWith('https://') && /<(img|script|link|iframe)\b[^>]+(src|href)=["']http:\/\//i.test(html)) {
    add({
      id: 'mixed-content',
      severity: 'medium',
      title: 'Some files load over insecure http://',
      evidence: 'Images, scripts or stylesheets are referenced with http:// URLs.',
      why: 'Browsers block or warn about insecure files on a secure page, which can break images and forms.',
      fix: 'Change every http:// asset URL (images, scripts, stylesheets, iframes) to https:// or a relative path.',
    });
  }

  findings.sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity));
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + PENALTY[f.severity], 0));
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';

  return {
    url: input.requestedUrl,
    finalUrl,
    auditedAt: new Date().toISOString(),
    platform,
    score,
    grade,
    clientRendered,
    findings,
    passed,
    skipped,
  };
}

// ── the prompt ───────────────────────────────────────────────────────────────

export const INDUSTRIES = ['Law firm', 'Medical practice', 'Other'] as const;
export type Industry = (typeof INDUSTRIES)[number];

const INDUSTRY_RULES: Record<Industry, string[]> = {
  'Law firm': [
    'This is a law firm website, so attorney advertising rules apply. Do not add or keep guarantees or predictions of results, the words "best", "#1", "top" or "expert" unless the owner confirms they can substantiate them, past results or testimonials without the disclaimer the state bar requires, or stock photos presented as the firm\'s own lawyers.',
    'Use schema.org type LegalService (and Attorney for lawyer bio pages).',
  ],
  'Medical practice': [
    'This is a medical practice website. Do not collect symptoms, diagnoses or other health information in website forms or send it by plain email; keep contact forms to name, phone, email and a preferred time. Do not promise outcomes or add unverifiable claims.',
    'Use schema.org type MedicalClinic, Physician or Dentist as appropriate.',
  ],
  Other: [],
};

export function buildFixPrompt(result: AuditResult, industry: Industry = 'Other'): string {
  const lines: string[] = [];
  const builder = result.platform ? ` It was built with ${result.platform}.` : '';
  lines.push(
    `You are working on the website at ${result.finalUrl}.${builder} An automated audit of the live site (Marketing Bull AI Website Audit, ${result.auditedAt.slice(0, 10)}) scored it ${result.score}/100 and found the ${result.findings.length} problem${result.findings.length === 1 ? '' : 's'} below. Fix them in the order listed.`,
    '',
    'Ground rules:',
    '- Do not change the visual design, layout or wording of the site except where an item below says to.',
    '- Keep every existing page and URL working.',
    '- If an item needs information only the owner has (phone number, address, hours, business name, logo, measurement IDs), stop and ask me for it. Never invent names, phone numbers, addresses, reviews, case results, credentials or awards.',
    ...INDUSTRY_RULES[industry].map((r) => `- ${r}`),
    '- When you are done, list each item number with what you changed and how I can check it.',
    '',
  );
  result.findings.forEach((f, i) => {
    lines.push(
      `## ${i + 1}. [${f.severity.toUpperCase()}] ${f.title}`,
      `What the audit found: ${f.evidence}`,
      `Why it matters: ${f.why}`,
      `Fix: ${f.fix}`,
      '',
    );
  });
  if (result.skipped.length) lines.push(`Note: ${result.skipped.join(' ')}`, '');
  lines.push('When everything above is done, I will re-run the audit at https://getmarketingbull.com/ai-website-audit to confirm.');
  return lines.join('\n');
}

/** One-paragraph summary for the lead record, so sales sees what the visitor saw. */
export function auditSummary(result: AuditResult): string {
  const counts = SEVERITY_ORDER.map((s) => [s, result.findings.filter((f) => f.severity === s).length] as const)
    .filter(([, n]) => n)
    .map(([s, n]) => `${n} ${s}`)
    .join(', ');
  return [
    `AI Website Audit of ${result.finalUrl}: ${result.score}/100 (${result.grade})${result.platform ? `, built with ${result.platform}` : ''}.`,
    counts ? `Issues: ${counts}.` : 'No issues found.',
    ...result.findings.map((f) => `- [${f.severity}] ${f.title}`),
  ].join('\n');
}
