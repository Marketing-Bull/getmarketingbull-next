import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import { COMPANY, getOffer } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Intake Optimization',
  description: 'Where most firms lose the cases they already paid for: the first phone call. How we measure it, what we fix, and why the audit comes first.',
  alternates: { canonical: `${COMPANY.website}/services/intake-optimization` },
};

const FAILURES = [
  { title: 'Speed to lead', body: 'The lead-to-case window closes in minutes. A prospect who submits a form at 2 pm has called three firms by 2:10. Most firms call back at end of day.' },
  { title: 'After-hours coverage', body: 'Accidents happen at night and on weekends. The firm that answers at 8 pm signs the case the other firm\'s ad generated.' },
  { title: 'Qualification and follow-up', body: 'One call, one voicemail, and the lead is abandoned — after the firm already paid for it. Persistence is a process, not a personality trait.' },
  { title: 'Attribution', body: 'Firms know cost per click. Very few know cost per signed case. Without the second number, the marketing budget is a guess.' },
];

export default function IntakeOptimizationPage() {
  const audit = getOffer('intake-gap-audit')!;
  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-24 md:py-32 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Intake optimization</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">The case is lost between the call and the calendar.</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">
            Most firms do not have a lead problem. They have a leak at the front desk, and nobody inside the firm can see it. We measure it, put a dollar figure on it, and fix what the numbers say to fix.
          </p>
          <div className="flex flex-row flex-wrap gap-3">
            <Button variant="primary" size="lg" href={`/products/${audit.slug}`}>The Intake Gap Audit — {audit.priceLabel}</Button>
            <Button variant="secondary" size="lg" href="/free-consultation">Start a conversation</Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Four ways intake fails</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Usually more than one at once.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {FAILURES.map((f, i) => (
              <div key={f.title} className="bg-white p-8 md:p-10">
                <span className="text-xs font-black text-red-600">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{f.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Why the audit comes first</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">We don&apos;t prescribe until we&apos;ve measured.</h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-lg text-slate-700 leading-relaxed">
            <p>Every intake engagement starts with the same thing: we call your firm as a prospect would — once during business hours, once after — and score what happens on a timestamped scorecard. We submit a web form and time the response. We review the CRM if you give us read-only access.</p>
            <p>The output is a report that says, in dollars, what the leak is costing you, and a prioritized fix list. Sometimes the fix is a phone-routing change and a script. Sometimes it is after-hours coverage. Sometimes it is a CRM the firm already pays for and does not use. We build what the numbers call for, and the audit fee is credited toward it.</p>
            <p>
              <Link href={`/products/${audit.slug}`} className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-red-600">Everything in the Intake Gap Audit →</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Further reading</p>
          <ul className="space-y-3">
            <li><Link href="/blog/ultimate-guide-to-personal-injury-intake" className="text-lg font-semibold text-slate-900 hover:text-red-600">The Ultimate Guide to Personal Injury Intake →</Link></li>
            <li><Link href="/blog/speed-is-key-when-converting-legal-leads-to-clients" className="text-lg font-semibold text-slate-900 hover:text-red-600">Speed Is the Whole Game: Lead Response Time and Case Acquisition →</Link></li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Find out what the leak is costing you."
        description="Two mystery-shop calls, a full audit, and an ROI report in 7–10 business days."
        primaryCTA={{ text: `Book the audit — ${audit.priceLabel}`, href: `/products/${audit.slug}` }}
        secondaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
      />
    </>
  );
}
