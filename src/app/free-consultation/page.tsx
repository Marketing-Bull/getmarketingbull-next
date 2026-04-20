import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Free Growth Audit | Marketing Bull',
  description: 'Schedule your free 30-minute growth audit with Marketing Bull. We review your intake process, marketing stack, and attribution — no pitch, no pressure.',
  alternates: { canonical: 'https://getmarketingbull.com/free-consultation' },
};

const WHAT_TO_EXPECT = [
  { step: '01', title: 'Intake Audit', desc: "We walk through your current intake flow — calls, forms, follow-up, CRM usage — and identify exactly where leads are leaking." },
  { step: '02', title: 'Marketing Review', desc: "We review your current ad spend, SEO position, and conversion rates to find the fastest path to more signed clients." },
  { step: '03', title: 'Clear Action Plan', desc: "You leave with a prioritized list of what to fix and what to build — whether you work with us or not." },
];

export default function FreeConsultationPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-4xl text-center">
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-4">No Pitch. No Pressure.</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">Get Your Free Growth Audit</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            30 minutes. We dig into your intake, marketing, and attribution — and show you exactly where you&apos;re leaving money on the table.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-md max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">What We Cover in 30 Minutes</h2>
              <div className="space-y-8 mb-12">
                {WHAT_TO_EXPECT.map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="text-4xl font-bold text-blue-200 min-w-[48px]">{item.step}</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Prefer to call?</h3>
                <a href="tel:+18334382855" className="flex items-center gap-3 text-blue-600 font-semibold text-lg hover:text-blue-500 transition">
                  <span className="text-2xl">📞</span>
                  1-833-GET-BULL
                </a>
                <p className="text-slate-500 text-sm mt-2">Mon–Fri, 9am–6pm EST</p>
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <a href="mailto:hello@getmarketingbull.com" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition">
                    <span className="text-xl">✉️</span>
                    hello@getmarketingbull.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Audit</h2>
                <p className="text-slate-500 mb-8">We respond within 1 business hour.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container-md max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🔒', title: 'No Contracts Required', desc: "We don't lock you in. If we're not performing, you shouldn't stay." },
              { icon: '📊', title: 'Full Transparency', desc: 'You own all the data, all the accounts, all the assets. Always.' },
              { icon: '⚡', title: 'Results in 30 Days', desc: 'Most clients see measurable intake improvements within the first month.' },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
