'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { reportLeadConversion } from '@/lib/conversions';
import { AUDIT_FINISH_PRODUCT, COMPANY } from '@/lib/constants';
import { INDUSTRIES, SEVERITY_ORDER, auditSummary, buildAuditReport, buildFixPrompt, type AuditResult, type Industry, type Severity } from '@/lib/siteAudit';
import Button from './Button';
import Turnstile, { TURNSTILE_SITE_KEY } from './Turnstile';

/**
 * The AI Website Audit tool (/ai-website-audit).
 *
 * 1. The visitor enters a URL; /api/site-audit returns the score and findings, shown free.
 * 2. The copy-paste fix prompt is unlocked with name + email, posted to /api/lead as source
 *    `ai-website-audit` (a GHL tag), with the audited URL and a summary of the findings, so
 *    sales sees what the visitor saw. On success: GA4 `generate_lead` (form_name ai_website_audit).
 * The gate is a UI gate: the findings are already in the browser. That is fine for a lead magnet.
 * Unlocking is remembered per browser, so a re-audit after fixes isn't gated again.
 * The form asks for name, email and mobile phone. The type of business is detected by the audit
 * (result.industry), and the finished report (buildAuditReport) goes with the lead to be saved in GHL.
 */

const SOURCE = 'ai-website-audit';
const FORM_NAME = 'ai_website_audit';
const UNLOCK_KEY = 'mb-ai-audit-unlocked';
const FALLBACK_ERROR = `Sorry, that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATTRIBUTION_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'];

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: 'bg-red-600 text-white',
  high: 'bg-orange-100 text-orange-900',
  medium: 'bg-amber-100 text-amber-900',
  low: 'bg-slate-100 text-slate-700',
};

function gradeColor(score: number) {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-red-600';
}

export default function SiteAuditTool() {
  const [url, setUrl] = useState('');
  const [running, setRunning] = useState(false);
  const [auditError, setAuditError] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [industry, setIndustry] = useState<Industry>('Law firm');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(UNLOCK_KEY) === '1') setUnlocked(true);
    } catch {}
    const preset = new URLSearchParams(window.location.search).get('url');
    if (preset) setUrl(preset.slice(0, 300));
  }, []);

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setAuditError('Enter your website address, like yourfirm.com.');
      return;
    }
    setRunning(true);
    setAuditError('');
    setResult(null);
    try {
      const r = await fetch('/api/site-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; result?: AuditResult; error?: string };
      if (!r.ok || !data.ok || !data.result) throw new Error(data.error || 'The audit could not run. Please try again.');
      setResult(data.result);
      if (data.result.industry) setIndustry(data.result.industry);
      track('site_audit_run', { score: data.result.score, platform: data.result.platform ?? 'unknown' });
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (err) {
      setAuditError(err instanceof Error && !(err instanceof TypeError) ? err.message : 'The audit could not run. Please try again.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div>
      <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor="audit-url" className="sr-only">Your website address</label>
        <input
          id="audit-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourfirm.com"
          className="flex-1 min-w-0 px-5 py-4 rounded-full border border-slate-300 bg-white text-slate-900 text-base focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          aria-invalid={auditError ? true : undefined}
          aria-describedby={auditError ? 'audit-url-error' : undefined}
        />
        <Button type="submit" variant="primary" size="lg" disabled={running}>
          {running ? 'Auditing…' : 'Audit my site'}
        </Button>
      </form>
      {running && <AuditProgress host={url} />}
      {auditError && <p id="audit-url-error" className="mt-3 text-sm font-medium text-red-400" role="alert">{auditError}</p>}

      {result && (
        <div ref={resultRef} className="scroll-mt-24 mt-10 bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <Report result={result} />
          <div className="mt-10 border-t border-slate-200 pt-8">
            {unlocked ? (
              <PromptPanel result={result} industry={industry} onIndustry={setIndustry} />
            ) : (
              <UnlockForm
                result={result}
                industry={industry}
                onUnlocked={() => {
                  setUnlocked(true);
                  try {
                    localStorage.setItem(UNLOCK_KEY, '1');
                  } catch {}
                }}
              />
            )}
          </div>
          {result.findings.length > 0 && <FinishForMe result={result} />}
        </div>
      )}
    </div>
  );
}

const STAGES = [
  { at: 0, label: 'Loading your homepage with JavaScript off' },
  { at: 3, label: 'Reading robots.txt, the sitemap and llms.txt' },
  { at: 6, label: 'Scanning your scripts for exposed secret keys' },
  { at: 10, label: 'Running Google\'s mobile speed test' },
  { at: 30, label: 'Scoring the five jobs your site has to do' },
];

/**
 * Progress while /api/site-audit runs. The audit is one request, so the stages follow the
 * order the server works in and are timed from typical runs; the bar eases toward 95% and
 * the report replaces it when the response lands. Each stage can be opened to see what it checks.
 */
function AuditProgress({ host }: { host: string }) {
  const [elapsed, setElapsed] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const started = Date.now();
    const t = setInterval(() => setElapsed((Date.now() - started) / 1000), 250);
    return () => clearInterval(t);
  }, []);
  const pct = Math.min(95, Math.round(95 * (1 - Math.exp(-elapsed / 13))));
  const current = STAGES.reduce((acc, s, i) => (elapsed >= s.at ? i : acc), 0);
  const DETAIL = [
    'Google can run JavaScript, later. Most AI assistants do not. This is the page they get.',
    'These files tell search engines and AI assistants what they may read and where your pages are.',
    'AI builders sometimes ship private API keys inside the public code. We look for them and show only a short preview.',
    'Google loads your page on a simulated phone. This is the slowest step.',
    'Found on Google, found by AI, speed, security, and turning visitors into calls.',
  ];
  const name = host.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '') || 'your site';
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5" role="status" aria-live="polite">
      <div className="flex items-baseline justify-between gap-4">
        <p className="min-w-0 truncate font-semibold text-white">Auditing {name}</p>
        <p className="shrink-0 text-sm tabular-nums text-slate-400">{pct}% · {Math.floor(elapsed)}s</p>
      </div>
      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Audit progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={STAGES[current].label}
      >
        <div className="h-full rounded-full bg-red-600 transition-[width] duration-300 ease-out motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mt-4 space-y-1">
        {STAGES.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'now' : 'next';
          return (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left text-sm hover:bg-white/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    state === 'done' ? 'bg-emerald-500 text-white' : state === 'now' ? 'bg-red-600 text-white motion-safe:animate-pulse' : 'border border-white/20 text-slate-500'
                  }`}
                >
                  {state === 'done' ? '✓' : i + 1}
                </span>
                <span className={state === 'next' ? 'text-slate-500' : state === 'now' ? 'font-semibold text-white' : 'text-slate-300'}>{s.label}</span>
              </button>
              {open === i && <p className="ml-9 mt-1 pb-1 text-sm text-slate-400">{DETAIL[i]}</p>}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-slate-500">Up to 40 seconds. Tap a step to see what it checks.</p>
    </div>
  );
}

function Report({ result }: { result: AuditResult }) {
  const counts = SEVERITY_ORDER.map((s) => [s, result.findings.filter((f) => f.severity === s).length] as const);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="shrink-0 text-center sm:text-left">
          <p className={`text-6xl font-black tracking-tight ${gradeColor(result.score)}`}>{result.score}</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">out of 100 · grade {result.grade}</p>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-500 break-all">{result.finalUrl}</p>
          <h2 className="text-2xl font-black tracking-tight mt-1">
            {result.findings.length === 0 ? 'No problems found.' : `${result.findings.length} thing${result.findings.length === 1 ? '' : 's'} to fix`}
          </h2>
          <p className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
            {result.platform && <span className="rounded-full bg-slate-900 text-white px-3 py-1">Built with {result.platform}</span>}
            {counts.filter(([, n]) => n).map(([s, n]) => (
              <span key={s} className={`rounded-full px-3 py-1 ${SEVERITY_STYLE[s]}`}>{n} {s}</span>
            ))}
          </p>
        </div>
      </div>

      <Scorecard categories={result.categories} />
      <CrawlerView result={result} />
      <SearchListing result={result} />

      {result.findings.length > 0 && (
        <ol className="mt-8 space-y-3">
          {result.findings.map((f) => (
            <li key={f.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start gap-3">
                <span className={`shrink-0 mt-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${SEVERITY_STYLE[f.severity]}`}>{f.severity}</span>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900">{f.title}</p>
                  <p className="mt-1 text-sm text-slate-600 break-words">{f.evidence}</p>
                  <p className="mt-1 text-sm text-slate-500">{f.why}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {result.skipped.length > 0 && <p className="mt-4 text-sm text-slate-500">{result.skipped.join(' ')}</p>}

      {result.passed.length > 0 && (
        <details className="mt-6 text-sm">
          <summary className="cursor-pointer font-semibold text-slate-700">{result.passed.length} checks passed</summary>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-600">
            {result.passed.map((p) => <li key={p}>✓ {p}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}

function barColor(score: number) {
  if (score >= 75) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-600';
}

/** One bar per job the site has to do, so the owner sees where it fails before reading the list. */
function Scorecard({ categories }: { categories: AuditResult['categories'] }) {
  return (
    <section className="mt-8" aria-labelledby="audit-scorecard">
      <h3 id="audit-scorecard" className="text-sm font-bold uppercase tracking-widest text-slate-500">Score by job</h3>
      <ul className="mt-3 space-y-3">
        {categories.map((c) => (
          <li key={c.name} className="grid grid-cols-[1fr_auto] sm:grid-cols-[11rem_1fr_6rem] items-center gap-x-3 gap-y-1.5 text-sm">
            <span className="font-semibold text-slate-800">{c.name}</span>
            <span className="order-last col-span-2 sm:order-none sm:col-span-1 h-2.5 rounded-full bg-slate-100 overflow-hidden" aria-hidden="true">
              {c.score !== null && <span className={`block h-full rounded-full ${barColor(c.score)}`} style={{ width: `${Math.max(c.score, 3)}%` }} />}
            </span>
            <span className={`text-right font-bold tabular-nums ${c.score === null ? 'text-slate-400' : gradeColor(c.score)}`}>
              {c.score === null ? 'Not checked' : `${c.score}/100`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The page as a phone shows it beside the text a crawler receives before any JavaScript runs. */
function CrawlerView({ result }: { result: AuditResult }) {
  const { preview, clientRendered } = result;
  const empty = preview.crawlerWords < 120;
  return (
    <section className="mt-10" aria-labelledby="audit-crawler-view">
      <h3 id="audit-crawler-view" className="text-xl font-black tracking-tight">What you see, and what Google sees</h3>
      <div className={`mt-4 grid gap-4 ${preview.screenshot ? 'sm:grid-cols-[minmax(0,14rem)_1fr]' : ''}`}>
        {preview.screenshot && (
          <figure>
            <figcaption className="text-xs font-bold uppercase tracking-widest text-slate-500">A visitor on a phone</figcaption>
            {/* A data: URI from PageSpeed; next/image adds nothing for it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.screenshot} alt={`Screenshot of ${preview.host} on a phone`} className="mt-2 w-full max-w-56 rounded-2xl border border-slate-200 shadow-sm" />
          </figure>
        )}
        <figure className="min-w-0">
          <figcaption className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Google, ChatGPT and other crawlers. {preview.crawlerWords} word{preview.crawlerWords === 1 ? '' : 's'}.
          </figcaption>
          <div className={`mt-2 rounded-2xl border p-4 font-mono text-xs leading-relaxed break-words ${empty ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
            {preview.crawlerText || <span className="italic">Nothing. The page they receive has no text.</span>}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {empty && clientRendered
              ? 'Your page is assembled in the browser by JavaScript. A crawler that does not run it receives only the text in the red box.'
              : empty
                ? 'This is all the text on the page. Google has little to rank and an AI assistant has little to quote.'
                : 'Crawlers receive your text without running JavaScript. This is the start of it.'}
          </p>
        </figure>
      </div>
    </section>
  );
}

/** The listing as Google would build it from the page's own title and description tags. */
function SearchListing({ result }: { result: AuditResult }) {
  const { preview, findings } = result;
  const has = (id: string) => findings.some((f) => f.id === id);
  const notes = [
    has('title') && (preview.title ? 'The title is the builder\'s default, so the listing says nothing about your firm.' : 'The page has no title, so Google writes one for you.'),
    has('title-length') && 'The title is too short or too long to say what you do and where.',
    has('description') && 'There is no description, so Google fills this space with text it picks from the page.',
    has('description-length') && 'The description is too short or too long, so Google may replace it.',
  ].filter(Boolean) as string[];
  const cut = (t: string, n: number) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
  return (
    <section className="mt-10" aria-labelledby="audit-listing">
      <h3 id="audit-listing" className="text-xl font-black tracking-tight">Your Google listing</h3>
      <div className="mt-4 max-w-xl rounded-2xl border border-slate-200 p-5">
        <p className="text-sm text-slate-700">{preview.host}</p>
        <p className="mt-1 text-xl leading-snug text-[#1a0dab] break-words">{preview.title ? cut(preview.title, 60) : preview.host}</p>
        <p className={`mt-1 text-sm leading-relaxed break-words ${preview.description ? 'text-slate-600' : 'italic text-slate-400'}`}>
          {preview.description ? cut(preview.description, 158) : 'No description set.'}
        </p>
      </div>
      {notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      )}
      <p className="mt-2 text-xs text-slate-500">Built from your title and description tags. Google sometimes rewrites them.</p>
    </section>
  );
}

function IndustrySelect({ id, value, onChange }: { id: string; value: Industry; onChange: (v: Industry) => void }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => {
        onChange(e.target.value as Industry);
      }}
      className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm text-slate-900 bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
    >
      {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
    </select>
  );
}

function UnlockForm({ result, industry, onUnlocked }: { result: AuditResult; industry: Industry; onUnlocked: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', hp: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (form.name.trim().length < 2) errs.name = 'Enter your full name.';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter your mobile number with area code.';
    setErrors(errs);
    const first = errs.name ? 'name' : errs.email ? 'email' : errs.phone ? 'phone' : '';
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus('error');
      setError(`Please complete the verification check above the button. If it doesn't appear, call ${COMPANY.phone}.`);
      return;
    }
    setStatus('sending');
    setError('');
    const params = new URLSearchParams(window.location.search);
    const attribution = new URLSearchParams();
    for (const k of ATTRIBUTION_PARAMS) {
      const v = params.get(k);
      if (v) attribution.set(k, v.slice(0, 100));
    }
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: result.finalUrl,
          message: `Industry (detected): ${industry}\n\n${auditSummary(result)}`,
          report: buildAuditReport(result),
          source: SOURCE,
          attribution: attribution.toString(),
          hp: form.hp,
          turnstileToken,
        }),
      });
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; dropped?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || FALLBACK_ERROR);
      if (!data.dropped) {
        track('generate_lead', { form_name: FORM_NAME, source: SOURCE, industry, score: result.score });
        reportLeadConversion({ formName: FORM_NAME });
      }
      onUnlocked();
    } catch (err) {
      setTurnstileReset((n) => n + 1);
      setStatus('error');
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR);
    }
  };

  const input = 'w-full px-4 py-3 border border-slate-400 rounded-xl text-sm text-slate-900 bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 aria-[invalid=true]:border-red-600';
  const label = 'block text-sm font-semibold text-slate-700 mb-1.5';

  return (
    <div>
      <h3 className="text-2xl font-black tracking-tight">Get the fix prompt for your AI builder</h3>
      <p className="mt-2 text-slate-600 max-w-2xl">
        One prompt with every fix above, in priority order, written for the tool that built your site. Paste it into Lovable, Bolt, v0, Cursor, Claude or ChatGPT and it knows exactly what to change, and what not to touch.
      </p>
      <form ref={formRef} onSubmit={submit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
        <div>
          <label htmlFor="aa-name" className={label}>Full name *</label>
          <input id="aa-name" name="name" autoComplete="name" value={form.name} onChange={set} className={input} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'aa-name-error' : undefined} />
          {errors.name && <p id="aa-name-error" className="mt-1.5 text-sm font-medium text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="aa-email" className={label}>Work email *</label>
          <input id="aa-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set} className={input} placeholder="you@yourfirm.com" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'aa-email-error' : undefined} />
          {errors.email && <p id="aa-email-error" className="mt-1.5 text-sm font-medium text-red-700">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]">
          <label htmlFor="aa-phone" className={label}>Mobile phone *</label>
          <input id="aa-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set} className={input} placeholder="(561) 555-0142" aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? 'aa-phone-error' : undefined} />
          {errors.phone && <p id="aa-phone-error" className="mt-1.5 text-sm font-medium text-red-700">{errors.phone}</p>}
        </div>
        {/* Honeypot — hidden from humans, filled by bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="aa-hp">Leave blank</label>
          <input id="aa-hp" type="text" name="hp" tabIndex={-1} autoComplete="off" value={form.hp} onChange={set} />
        </div>
        <div className="sm:col-span-2 space-y-4">
          <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />
          {status === 'error' && <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>}
          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" disabled={status === 'sending'}>
            {status === 'sending' ? 'Unlocking…' : 'Show me the fix prompt'}
          </Button>
          <p className="text-xs text-slate-500 leading-relaxed">
            The prompt appears right here. We may call or email you about your results.{' '}
            <Link href="/privacy-policy" className="underline hover:text-slate-900">Privacy Policy</Link> ·{' '}
            <Link href="/terms-of-service" className="underline hover:text-slate-900">Terms of Service</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

const FINISH_PRODUCT = AUDIT_FINISH_PRODUCT;
const FINISH_STEPS = [
  { title: 'Finish', body: 'We fix everything in this report in your builder or your code, and replace the placeholder text with your real details.' },
  { title: 'Secure', body: 'We remove exposed keys and tell you which ones to rotate, lock down open data and forms, and add the security headers.' },
  { title: 'Publish', body: 'We put it live on your domain with SSL, redirects, a sitemap, Search Console and analytics. You own the code and the accounts.' },
];

/**
 * The done-for-you offer under the report: we finish, secure and publish the site the visitor's
 * AI started. Posts to /api/lead with the audit summary, so the request arrives with the findings.
 * No fee is shown (pricing is quoted per firm).
 */
function FinishForMe({ result }: { result: AuditResult }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', hp: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (form.name.trim().length < 2) errs.name = 'Enter your full name.';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address.';
    setErrors(errs);
    if (errs.name || errs.email) {
      formRef.current?.querySelector<HTMLElement>(`[name="${errs.name ? 'name' : 'email'}"]`)?.focus();
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus('error');
      setError(`Please complete the verification check above the button. If it doesn't appear, call ${COMPANY.phone}.`);
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: result.finalUrl,
          product: FINISH_PRODUCT,
          message: `Asked us to finish, secure and publish this site.\n\n${auditSummary(result)}`,
          report: buildAuditReport(result),
          source: SOURCE,
          hp: form.hp,
          turnstileToken,
        }),
      });
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; dropped?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || FALLBACK_ERROR);
      if (!data.dropped) {
        track('lead_submit', { product: FINISH_PRODUCT, source: SOURCE });
        reportLeadConversion({ formName: 'ai_website_audit_finish' });
      }
      setStatus('sent');
    } catch (err) {
      setTurnstileReset((n) => n + 1);
      setStatus('error');
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR);
    }
  };

  const input = 'w-full px-4 py-3 border border-slate-600 rounded-xl text-sm text-white bg-slate-900 placeholder:text-slate-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 aria-[invalid=true]:border-red-500';
  const label = 'block text-sm font-semibold text-slate-200 mb-1.5';

  return (
    <section id="finish-it" className="scroll-mt-24 mt-10 rounded-2xl bg-slate-950 text-white p-6 sm:p-8" aria-labelledby="audit-finish">
      <p className="text-xs font-bold uppercase tracking-widest text-red-400">Done for you</p>
      <h3 id="audit-finish" className="mt-2 text-2xl font-black tracking-tight">We can make {result.findings.length === 1 ? 'this fix' : `these ${result.findings.length} fixes`} for you.</h3>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Send us the site your AI started. We finish it, secure it and publish it on your domain. The scope and the fee are agreed in writing before we start.
      </p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {FINISH_STEPS.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs font-black text-red-400" aria-hidden="true">0{i + 1}</p>
            <p className="mt-1 font-bold">{s.title}</p>
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ol>

      {status === 'sent' ? (
        <p className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 font-semibold text-emerald-200" role="status">
          Got it. We have your report and will reply by email with a scope for {result.finalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}.
        </p>
      ) : !open ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setOpen(true);
              track('site_audit_finish_open', { score: result.score });
            }}
          >
            Have us finish my site
          </Button>
          <a href={`tel:${COMPANY.phoneE164}`} className="text-sm font-semibold text-slate-300 hover:text-white">or call {COMPANY.phone}</a>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4" noValidate>
          <div>
            <label htmlFor="af-name" className={label}>Full name *</label>
            <input id="af-name" name="name" autoComplete="name" value={form.name} onChange={set} className={input} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'af-name-error' : undefined} />
            {errors.name && <p id="af-name-error" className="mt-1.5 text-sm font-medium text-red-400">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="af-email" className={label}>Work email *</label>
            <input id="af-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set} className={input} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'af-email-error' : undefined} />
            {errors.email && <p id="af-email-error" className="mt-1.5 text-sm font-medium text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="af-phone" className={label}>Phone <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="af-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} className={input} />
          </div>
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="af-hp">Leave blank</label>
            <input id="af-hp" type="text" name="hp" tabIndex={-1} autoComplete="off" value={form.hp} onChange={set} />
          </div>
          <div className="sm:col-span-3 space-y-4">
            <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />
            {status === 'error' && <p className="text-sm text-red-400 font-medium" role="alert">{error}</p>}
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send my site and this report'}
            </Button>
            <p className="text-xs text-slate-400 leading-relaxed">
              We send your report with the request and reply by email.{' '}
              <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link> ·{' '}
              <Link href="/terms-of-service" className="underline hover:text-white">Terms of Service</Link>
            </p>
          </div>
        </form>
      )}
    </section>
  );
}

function PromptPanel({ result, industry, onIndustry }: { result: AuditResult; industry: Industry; onIndustry: (v: Industry) => void }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildFixPrompt(result, industry);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      track('site_audit_prompt_copy', { score: result.score });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const download = (text = prompt, suffix = 'fix-prompt') => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    let name = 'site';
    try {
      name = new URL(result.finalUrl).hostname.replace(/^www\./, '');
    } catch {}
    a.download = `${name}-${suffix}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  if (result.findings.length === 0) {
    return <p className="text-slate-600">Nothing for your AI builder to fix. Run the audit again after your next big change.</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tight">Your fix prompt</h3>
          <p className="mt-1 text-slate-600">Paste it into the chat of the tool that built your site. Answer its questions with your real details.</p>
        </div>
        <div className="sm:w-56">
          <label htmlFor="aa-industry-2" className="block text-xs font-semibold text-slate-500 mb-1">Rules applied (detected from your site)</label>
          <IndustrySelect id="aa-industry-2" value={industry} onChange={onIndustry} />
        </div>
      </div>
      <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-950 text-slate-100 text-[13px] leading-relaxed p-5">{prompt}</pre>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="primary" size="md" onClick={copy}>{copied ? 'Copied ✓' : 'Copy prompt'}</Button>
        <button type="button" onClick={() => download()} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-900 transition">
          Download prompt
        </button>
        <button
          type="button"
          onClick={() => {
            download(buildAuditReport(result), 'website-audit');
            track('site_audit_report_download', { score: result.score });
          }}
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-900 transition"
        >
          Download full audit
        </button>
      </div>
    </div>
  );
}
