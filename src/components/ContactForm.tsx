'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', message: '', smsConsent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to GHL webhook
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = 'w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition';
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label className={labelClass}>Direct Phone *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(555) 123-4567" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Company Website</label>
        <input type="url" name="website" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://yourfirm.com" />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClass} placeholder="Tell us about your business..." />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" name="smsConsent" id="smsConsent" checked={formData.smsConsent} onChange={handleChange} className="mt-0.5 accent-red-600" />
        <label htmlFor="smsConsent" className="text-xs text-slate-500 leading-relaxed">I consent to receive SMS messages from Marketing Bull about my inquiry. Message &amp; data rates may apply.</label>
      </div>
      <Button type="submit" variant="primary" size="md" className="w-full">
        {submitted ? '✓ Sent — we\'ll be in touch!' : 'Send Message'}
      </Button>
    </form>
  );
}
