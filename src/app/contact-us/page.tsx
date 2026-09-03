import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Marketing Bull',
  description: 'Get in touch with Marketing Bull. Call 1-833-GET-BULL, email us, or fill out the form and we\'ll respond within one business hour.',
  alternates: { canonical: 'https://getmarketingbull.com/contact-us' },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-3xl text-center">
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-5xl font-bold mb-6">Let&apos;s Talk</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Whether you&apos;re ready to start or just exploring — we respond within one business hour.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-md max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: '📞', label: 'Phone', value: '1-833-GET-BULL', href: 'tel:+18334382855', sub: 'Mon–Fri, 9am–6pm EST' },
                    { icon: '✉️', label: 'Email', value: 'hello@getmarketingbull.com', href: 'mailto:hello@getmarketingbull.com', sub: 'We respond within 1 business hour' },
                    { icon: '📍', label: 'Office', value: '319 Clematis Street, Suite 300', href: null, sub: 'West Palm Beach, FL 33401' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition">{item.value}</a>
                        ) : (
                          <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                        )}
                        <p className="text-slate-500 text-sm mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Prefer a conversation?</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">Twenty minutes about your firm or practice. We'll tell you where we'd look first, and whether we're the right fit.</p>
                <Link href="/free-consultation" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-sm transition hover:-translate-y-0.5">
                  Start a conversation →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h2>
              <p className="text-slate-500 mb-8">We&apos;ll get back to you within one business hour.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-100">
        <iframe
          src="https://maps.google.com/maps?q=319+Clematis+Street+Suite+300+West+Palm+Beach+FL+33401&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Marketing Bull office location"
        />
      </section>
    </>
  );
}
