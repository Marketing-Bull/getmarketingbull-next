'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@/lib/analytics';
import { reportLeadConversion } from '@/lib/conversions';
import { COMPANY, SMS_CONSENT_LABEL } from '@/lib/constants';
import Button from './Button';
import Turnstile, { TURNSTILE_SITE_KEY } from './Turnstile';

/**
 * Lead form for the free AI Site Audit (/ai-site-audit).
 *
 * Posts to /api/lead with source `ai-site-audit`, so the lead lands in the same GHL / webhook /
 * email channels (tagged `ai-site-audit`). Once delivered, the route runs the audit in the
 * background and emails the fix document (src/lib/aiAudit.ts). Phone is optional. On success it
 * fires GA4 `generate_lead` (form_name ai_site_audit) and goes to the thanks page.
 */

const SOURCE = 'ai-site-audit';
const FORM_NAME = 'ai_site_audit';
const THANKS_PATH = '/ai-site-audit/thanks';
const FALLBACK_ERROR = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;

/** Must match AUDIT_VERTICALS in src/lib/aiAudit.ts. */
const VERTICAL_OPTIONS = ['Law firm', 'Medical practice', 'Other'];

/** Campaign parameters carried from the landing URL onto the lead, for attribution in the CRM. */
const ATTRIBUTION_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'];

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'website' | 'name' | 'firm' | 'email' | 'phone' | 'vertical';
type FieldErrors = Partial<Record<Field, string>>;

// Same rules as /api/lead, so a lead the browser accepts is one the API accepts.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS: Field[] = ['website', 'name', 'firm', 'email', 'phone', 'vertical'];
// Accepts "yourfirm.com" as well as a full https:// URL; the route normalizes the same way.
const SITE_RE = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(:\d+)?(\/\S*)?$/i;

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim();
  if (field === 'website' && !SITE_RE.test(v)) return 'Enter your website address, like yourfirm.com.';
  if (field === 'name' && v.length < 2) return 'Enter your full name.';
  if (field === 'firm' && v.length < 2) return 'Enter your business name.';
  if (field === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email address, like you@yourfirm.com.';
  if (field === 'phone' && v !== '' && v.replace(/\D/g, '').length < 7) return 'Enter a phone number with at least 7 digits, or leave it blank.';
  if (field === 'vertical' && !VERTICAL_OPTIONS.includes(v)) return 'Choose the type of business.';
  return undefined;
}

export default function AuditForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ website: '', name: '', firm: '', email: '', phone: '', vertical: '', smsConsent: false, hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const attributionRef = useRef('');

  // Read campaign parameters once, on the landing page itself.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kept = new URLSearchParams();
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) kept.set(key, value.slice(0, 100));
    }
    attributionRef.current = kept.toString();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value };
      // The SMS box only exists while a phone number is entered; clearing the number clears consent.
      if (name === 'phone' && value.trim() === '') next.smsConsent = false;
      return next;
    });
    // Once a field has been flagged, clear the message as soon as it's fixed.
    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateField(name as Field, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    for (const f of FIELDS) {
      const msg = validateField(f, formData[f]);
      if (msg) errs[f] = msg;
    }
    setFieldErrors(errs);
    const firstInvalid = FIELDS.find((f) => errs[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
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
      const hasPhone = formData.phone.trim() !== '';
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          smsConsent: hasPhone && formData.smsConsent,
          source: SOURCE,
          attribution: attributionRef.current,
          turnstileToken,
        }),
      });
      // A platform error page (e.g. a 504) isn't JSON — don't surface a parser message to the visitor.
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; dropped?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || FALLBACK_ERROR);
      // Fired here, on a confirmed submit, and not on the thanks page, so a reload or a
      // shared thanks URL never counts as a lead. The honeypot's `dropped` is not a lead.
      if (!data.dropped) {
        track('generate_lead', { form_name: FORM_NAME, source: SOURCE, vertical: formData.vertical });
        reportLeadConversion({ formName: FORM_NAME });
      }
      setStatus('sent');
      // Client-side navigation: the page is not unloaded, so the events above still send.
      router.push(THANKS_PATH);
    } catch (err) {
      setTurnstileReset((n) => n + 1); // the token was spent on this attempt
      setStatus('error');
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR);
    }
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-400 rounded-xl text-sm text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 aria-[invalid=true]:border-red-600 transition bg-white';
  const errorClass = 'mt-1.5 text-sm font-medium text-red-700';
  const fieldA11y = (f: Field) => ({
    'aria-invalid': fieldErrors[f] ? true : undefined,
    'aria-describedby': fieldErrors[f] ? `af-${f}-error` : undefined,
  });
  const fieldError = (f: Field) =>
    fieldErrors[f] ? <p id={`af-${f}-error`} className={errorClass}>{fieldErrors[f]}</p> : null;
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="af-website" className={labelClass}>Your website *</label>
        <input id="af-website" type="text" inputMode="url" name="website" required autoComplete="url" value={formData.website} onChange={handleChange} className={inputClass} placeholder="yourfirm.com" {...fieldA11y('website')} />
        {fieldError('website')}
      </div>
      <div>
        <label htmlFor="af-name" className={labelClass}>Full name *</label>
        <input id="af-name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" {...fieldA11y('name')} />
        {fieldError('name')}
      </div>
      <div>
        <label htmlFor="af-firm" className={labelClass}>Business name *</label>
        <input id="af-firm" type="text" name="firm" required autoComplete="organization" value={formData.firm} onChange={handleChange} className={inputClass} placeholder="Your firm or practice" {...fieldA11y('firm')} />
        {fieldError('firm')}
      </div>
      <div>
        <label htmlFor="af-email" className={labelClass}>Work email *</label>
        <input id="af-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@yourfirm.com" {...fieldA11y('email')} />
        {fieldError('email')}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af-phone" className={labelClass}>Phone <span className="font-normal text-slate-500">(optional)</span></label>
          <input id="af-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(561) 555-0100" {...fieldA11y('phone')} />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor="af-vertical" className={labelClass}>Type of business *</label>
          <select id="af-vertical" name="vertical" required value={formData.vertical} onChange={handleChange} className={inputClass} {...fieldA11y('vertical')}>
            <option value="" disabled>Choose one</option>
            {VERTICAL_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {fieldError('vertical')}
        </div>
      </div>
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="af-hp">Leave blank</label>
        <input id="af-hp" type="text" name="hp" tabIndex={-1} autoComplete="off" value={formData.hp} onChange={handleChange} />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        Your audit and fix document arrive by email in about 5 minutes, plus up to three short follow-up emails from Alex. Unsubscribe anytime.
      </p>
      {/* SMS opt-in: optional, never pre-checked, and the label must match SMS_CONSENT_LABEL exactly (A2P/TCR). */}
      <div className="flex items-start gap-3">
        <input type="checkbox" name="smsConsent" id="af-smsConsent" checked={formData.smsConsent} onChange={handleChange} className="mt-0.5 accent-red-600" />
        <label htmlFor="af-smsConsent" className="text-xs text-slate-600 leading-relaxed">
          {SMS_CONSENT_LABEL}
        </label>
      </div>
      <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />
      {status === 'error' && (
        <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
      )}
      <Button type="submit" variant="primary" size="md" className="w-full" disabled={status === 'sending' || status === 'sent'}>
        {status === 'sending' || status === 'sent' ? 'Sending…' : 'Audit my site'}
      </Button>
      <p className="text-xs text-slate-500 text-center">Free. We read your public pages only. No login, no newsletter.</p>
      <p className="text-xs text-slate-600 text-center leading-relaxed">
        SMS consent is optional and not a condition of purchase. {COMPANY.legalName} ·{' '}
        <Link href="/privacy-policy" className="underline hover:text-slate-900">Privacy Policy</Link> ·{' '}
        <Link href="/terms-of-service" className="underline hover:text-slate-900">Terms of Service</Link>
      </p>
    </form>
  );
}
