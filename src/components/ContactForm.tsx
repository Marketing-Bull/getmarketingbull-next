'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', smsConsent: false });
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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="(555) 123-4567" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us about your business..." />
      </div>
      <div className="flex items-start">
        <input type="checkbox" name="smsConsent" id="smsConsent" checked={formData.smsConsent} onChange={handleChange} className="mt-1 mr-3" />
        <label htmlFor="smsConsent" className="text-sm text-gray-600">I consent to receive SMS messages from Marketing Bull about my inquiry</label>
      </div>
      <Button type="submit" variant="primary" size="md" className="w-full">Send Message</Button>
      {submitted && <p className="text-success font-semibold text-center">Thank you! We'll be in touch soon.</p>}
    </form>
  );
}
