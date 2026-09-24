'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { COMPANY } from '@/lib/constants';
import Button from './Button';

const FALLBACK_ERROR = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;

interface ContactFormProps {
  /** Optional product name, pre-filled and sent with the lead. */
  product?: string;
  source?: string;
  submitLabel?: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'email' | 'phone';
type FieldErrors = Partial<Record<Field, string>>;

// Same rules as /api/lead, so a lead the browser accepts is one the API accepts.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS: Field[] = ['name', 'email', 'phone'];

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim();
  if (field === 'name' && v.length < 2) return 'Enter your full name.';
  if (field === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email address, like you@yourfirm.com.';
  if (field === 'phone' && v.replace(/\D/g, '').length < 7) return 'Enter a phone number with at least 7 digits.';
  return undefined;
}

export default function ContactForm({ product, source = 'website', submitLabel = 'Send Message' }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', message: '', smsConsent: false, hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // The form is replaced by the confirmation; move focus there so keyboard and
  // screen reader users aren't left on a node that no longer exists.
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
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
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, product, source }),
      });
      // A platform error page (e.g. a 504) isn't JSON — don't surface a parser message to the visitor.
      const data = (await r.json().catch(() => ({ ok: false }))) as { ok: boolean; dropped?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || FALLBACK_ERROR);
      // The form never navigates, so this event is the only conversion signal.
      if (!data.dropped) track('lead_submit', { product: product ?? '', source: source ?? '' });
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR);
    }
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-400 rounded-xl text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 aria-[invalid=true]:border-red-600 transition bg-white';
  const errorClass = 'mt-1.5 text-sm font-medium text-red-700';
  // aria-invalid / aria-describedby for one of the validated fields.
  const fieldA11y = (f: Field) => ({
    'aria-invalid': fieldErrors[f] ? true : undefined,
    'aria-describedby': fieldErrors[f] ? `cf-${f}-error` : undefined,
  });
  const fieldError = (f: Field) =>
    fieldErrors[f] ? <p id={`cf-${f}-error`} className={errorClass}>{fieldErrors[f]}</p> : null;
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

  if (status === 'sent') {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center focus:outline-none">
        <p className="text-2xl font-black text-slate-900 mb-2">Got it.</p>
        <p className="text-slate-600">
          We reply to every inquiry within one business day{product ? ` about ${product}` : ''}. If it&apos;s urgent, call{' '}
          <a href={`tel:${COMPANY.phoneE164}`} className="font-semibold text-red-600">1-833-GET-BULL</a>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {product && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
          Asking about: <span className="font-semibold text-slate-900">{product}</span>
        </div>
      )}
      <div>
        <label htmlFor="cf-name" className={labelClass}>Full Name *</label>
        <input id="cf-name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" {...fieldA11y('name')} />
        {fieldError('name')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email *</label>
          <input id="cf-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@yourfirm.com" {...fieldA11y('email')} />
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Direct Phone *</label>
          <input id="cf-phone" type="tel" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(561) 555-0100" {...fieldA11y('phone')} />
          {fieldError('phone')}
        </div>
      </div>
      <div>
        <label htmlFor="cf-website" className={labelClass}>Firm or Practice Website</label>
        <input id="cf-website" type="url" name="website" autoComplete="url" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://yourfirm.com" />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>What&apos;s going on?</label>
        <textarea id="cf-message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClass} placeholder="Where are you losing cases or patients today?" />
      </div>
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cf-hp">Leave blank</label>
        <input id="cf-hp" type="text" name="hp" tabIndex={-1} autoComplete="off" value={formData.hp} onChange={handleChange} />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" name="smsConsent" id="smsConsent" checked={formData.smsConsent} onChange={handleChange} className="mt-0.5 accent-red-600" />
        <label htmlFor="smsConsent" className="text-xs text-slate-500 leading-relaxed">
          I consent to receive SMS messages from Marketing Bull about my inquiry. Message &amp; data rates may apply. Reply STOP to opt out.
        </label>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
      )}
      <Button type="submit" variant="primary" size="md" className="w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </Button>
      <p className="text-xs text-slate-500 text-center">No newsletters, no automated sequences. A person replies.</p>
    </form>
  );
}
