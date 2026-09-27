'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@/lib/analytics';
import { reportLeadConversion } from '@/lib/conversions';
import { COMPANY } from '@/lib/constants';
import Button from './Button';

/**
 * Lead form for the PI Intake Scorecard (/pi-intake-scorecard).
 *
 * Posts to the same /api/lead endpoint as ContactForm, so leads land in the same
 * GHL / webhook / email channels, with source `pi-intake-scorecard` (which the route
 * also adds as a GHL tag). Phone is optional here; the route allows that for this
 * source only. On success it fires GA4 `generate_lead` and goes to the thanks page.
 */

const SOURCE = 'pi-intake-scorecard';
const FORM_NAME = 'pi_intake_scorecard';
const THANKS_PATH = '/pi-intake-scorecard/thanks';
const FALLBACK_ERROR = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;

/** Must match ATTORNEY_OPTIONS in /api/lead. */
const ATTORNEY_OPTIONS = ['1', '2 to 5', '6 to 15', '16+'];

/** Campaign parameters carried from the landing URL onto the lead, for attribution in the CRM. */
const ATTRIBUTION_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'];

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'firm' | 'email' | 'phone' | 'attorneys';
type FieldErrors = Partial<Record<Field, string>>;

// Same rules as /api/lead, so a lead the browser accepts is one the API accepts.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS: Field[] = ['name', 'firm', 'email', 'phone', 'attorneys'];

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim();
  if (field === 'name' && v.length < 2) return 'Enter your full name.';
  if (field === 'firm' && v.length < 2) return 'Enter your firm name.';
  if (field === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email address, like you@yourfirm.com.';
  if (field === 'phone' && v !== '' && v.replace(/\D/g, '').length < 7) return 'Enter a phone number with at least 7 digits, or leave it blank.';
  if (field === 'attorneys' && !ATTORNEY_OPTIONS.includes(v)) return 'Choose the number of attorneys.';
  return undefined;
}

export default function ScorecardForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', firm: '', email: '', phone: '', attorneys: '', smsConsent: false, hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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
        }),
      });
      // A platform error page (e.g. a 504) isn't JSON — don't surface a parser message to the visitor.
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; dropped?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || FALLBACK_ERROR);
      // Fired here, on a confirmed submit, and not on the thanks page, so a reload or a
      // shared thanks URL never counts as a lead. The honeypot's `dropped` is not a lead.
      if (!data.dropped) {
        track('generate_lead', { form_name: FORM_NAME, source: SOURCE, attorneys: formData.attorneys });
        reportLeadConversion({ formName: FORM_NAME });
      }
      setStatus('sent');
      // Client-side navigation: the page is not unloaded, so the events above still send.
      router.push(THANKS_PATH);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR);
    }
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-400 rounded-xl text-sm text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 aria-[invalid=true]:border-red-600 transition bg-white';
  const errorClass = 'mt-1.5 text-sm font-medium text-red-700';
  const fieldA11y = (f: Field) => ({
    'aria-invalid': fieldErrors[f] ? true : undefined,
    'aria-describedby': fieldErrors[f] ? `sf-${f}-error` : undefined,
  });
  const fieldError = (f: Field) =>
    fieldErrors[f] ? <p id={`sf-${f}-error`} className={errorClass}>{fieldErrors[f]}</p> : null;
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';
  const hasPhone = formData.phone.trim() !== '';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="sf-name" className={labelClass}>Full name *</label>
        <input id="sf-name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" {...fieldA11y('name')} />
        {fieldError('name')}
      </div>
      <div>
        <label htmlFor="sf-firm" className={labelClass}>Firm name *</label>
        <input id="sf-firm" type="text" name="firm" required autoComplete="organization" value={formData.firm} onChange={handleChange} className={inputClass} placeholder="Your firm" {...fieldA11y('firm')} />
        {fieldError('firm')}
      </div>
      <div>
        <label htmlFor="sf-email" className={labelClass}>Work email *</label>
        <input id="sf-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@yourfirm.com" {...fieldA11y('email')} />
        {fieldError('email')}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sf-phone" className={labelClass}>Phone <span className="font-normal text-slate-500">(optional)</span></label>
          <input id="sf-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(561) 555-0100" {...fieldA11y('phone')} />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor="sf-attorneys" className={labelClass}>Number of attorneys *</label>
          <select id="sf-attorneys" name="attorneys" required value={formData.attorneys} onChange={handleChange} className={inputClass} {...fieldA11y('attorneys')}>
            <option value="" disabled>Choose one</option>
            {ATTORNEY_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {fieldError('attorneys')}
        </div>
      </div>
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="sf-hp">Leave blank</label>
        <input id="sf-hp" type="text" name="hp" tabIndex={-1} autoComplete="off" value={formData.hp} onChange={handleChange} />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        We&apos;ll email you the scorecard and up to three short follow-ups from Alex. Unsubscribe anytime.
      </p>
      {hasPhone && (
        <div className="flex items-start gap-3">
          <input type="checkbox" name="smsConsent" id="sf-smsConsent" checked={formData.smsConsent} onChange={handleChange} className="mt-0.5 accent-red-600" />
          <label htmlFor="sf-smsConsent" className="text-xs text-slate-500 leading-relaxed">
            I consent to receive SMS messages from Marketing Bull about my inquiry. Message &amp; data rates may apply. Reply STOP to opt out.
          </label>
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
      )}
      <Button type="submit" variant="primary" size="md" className="w-full" disabled={status === 'sending' || status === 'sent'}>
        {status === 'sending' || status === 'sent' ? 'Sending…' : 'Send me the scorecard'}
      </Button>
      <p className="text-xs text-slate-500 text-center">A PDF, in your inbox in a minute. No newsletter.</p>
    </form>
  );
}
