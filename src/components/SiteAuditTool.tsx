'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { reportLeadConversion } from '@/lib/conversions';
import { COMPANY } from '@/lib/constants';
import { INDUSTRIES, SEVERITY_ORDER, auditSummary, buildFixPrompt, type AuditResult, type Industry, type Severity } from '@/lib/siteAudit';
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
 */

const SOURCE = 'ai-website-audit';
const FORM_NAME = 'ai_website_audit';
const UNLOCK_KEY = 'mb-ai-audit-unlocked';
const FALLBACK_ERROR = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;
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
      const saved = localStorage.getItem(`${UNLOCK_KEY}:industry`);
      if (saved && (INDUSTRIES as readonly string[]).includes(saved)) setIndustry(saved as Industry);
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
      {running && <p className="mt-3 text-sm text-slate-400" role="status">Loading your site the way Google and AI crawlers see it. This takes up to 20 seconds.</p>}
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
                onIndustry={setIndustry}
                onUnlocked={() => {
                  setUnlocked(true);
                  try {
                    localStorage.setItem(UNLOCK_KEY, '1');
                  } catch {}
                }}
              />
            )}
          </div>
        </div>
      )}
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

function IndustrySelect({ id, value, onChange }: { id: string; value: Industry; onChange: (v: Industry) => void }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => {
        const v = e.target.value as Industry;
        onChange(v);
        try {
          localStorage.setItem(`${UNLOCK_KEY}:industry`, v);
        } catch {}
      }}
      className="w-full px-4 py-3 border border-slate-400 rounded-xl text-sm text-slate-900 bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
    >
      {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
    </select>
  );
}

function UnlockForm({ result, industry, onIndustry, onUnlocked }: { result: AuditResult; industry: Industry; onIndustry: (v: Industry) => void; onUnlocked: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', firm: '', hp: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
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
          firm: form.firm,
          website: result.finalUrl,
          message: `Industry: ${industry}\n\n${auditSummary(result)}`,
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
        <div>
          <label htmlFor="aa-firm" className={label}>Firm or practice <span className="font-normal text-slate-500">(optional)</span></label>
          <input id="aa-firm" name="firm" autoComplete="organization" value={form.firm} onChange={set} className={input} />
        </div>
        <div>
          <label htmlFor="aa-industry" className={label}>Type of business</label>
          <IndustrySelect id="aa-industry" value={industry} onChange={onIndustry} />
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
            The prompt appears right here. We may follow up by email about your results; unsubscribe anytime.{' '}
            <Link href="/privacy-policy" className="underline hover:text-slate-900">Privacy Policy</Link> ·{' '}
            <Link href="/terms-of-service" className="underline hover:text-slate-900">Terms of Service</Link>
          </p>
        </div>
      </form>
    </div>
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

  const download = () => {
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    let name = 'site';
    try {
      name = new URL(result.finalUrl).hostname.replace(/^www\./, '');
    } catch {}
    a.download = `${name}-fix-prompt.md`;
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
          <label htmlFor="aa-industry-2" className="block text-xs font-semibold text-slate-500 mb-1">Type of business</label>
          <IndustrySelect id="aa-industry-2" value={industry} onChange={onIndustry} />
        </div>
      </div>
      <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-950 text-slate-100 text-[13px] leading-relaxed p-5">{prompt}</pre>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="primary" size="md" onClick={copy}>{copied ? 'Copied ✓' : 'Copy prompt'}</Button>
        <button type="button" onClick={download} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-900 transition">
          Download .md
        </button>
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Rather have it done for you?{' '}
        <Link href="/products/website-in-14-days" className="font-semibold text-red-600 hover:underline">We build law firm and medical sites in 14 days</Link>, or{' '}
        <Link href="/free-consultation" className="font-semibold text-red-600 hover:underline">book a free consultation</Link>.
      </p>
    </div>
  );
}
