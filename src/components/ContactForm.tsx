'use client';

import { useState } from 'react';
import Button from './Button';

interface ContactFormProps {
  /** Optional product name, pre-filled and sent with the lead. */
  product?: string;
  source?: string;
  submitLabel?: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm({ product, source = 'website', submitLabel = 'Send Message' }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', message: '', smsConsent: false, hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, product, source }),
      });
      const data = (await r.json()) as { ok: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition bg-white';
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-2xl font-black text-slate-900 mb-2">Got it.</p>
        <p className="text-slate-600">
          We reply to every inquiry within one business day{product ? ` about ${product}` : ''}. If it&apos;s urgent, call{' '}
          <a href="tel:18334382855" className="font-semibold text-red-600">1-833-GET-BULL</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {product && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
          Asking about: <span className="font-semibold text-slate-900">{product}</span>
        </div>
      )}
      <div>
        <label htmlFor="cf-name" className={labelClass}>Full Name *</label>
        <input id="cf-name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email *</label>
          <input id="cf-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@yourfirm.com" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Direct Phone *</label>
          <input id="cf-phone" type="tel" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(561) 555-0100" />
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
      <p className="text-xs text-slate-400 text-center">No newsletters, no automated sequences. A person replies.</p>
    </form>
  );
}
