import type { Metadata } from 'next';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Case Studies | Marketing Bull',
  description: 'Real results from Marketing Bull clients — law firms, medical practices, and home service businesses that grew with our systems.',
  alternates: { canonical: 'https://getmarketingbull.com/case-studies' },
};

const CASES = [
  {
    client: 'South Florida PI Firm',
    industry: 'Personal Injury Law',
    tag: 'Law Firm',
    challenge: 'A 4-attorney PI firm was spending $15K/month on PPC but closing fewer than 20% of leads. Intake was handled by a single paralegal with no CRM, no follow-up system, and no after-hours coverage.',
    solution: 'We deployed a full Intake OS: AI receptionist, GHL CRM pipeline, automated multi-channel follow-up sequences, and a dedicated intake dashboard. PPC campaigns were restructured around high-intent keywords with custom landing pages.',
    results: [
      { metric: '85%', label: 'intake conversion rate (up from 30%)' },
      { metric: '<90s', label: 'average speed-to-lead' },
      { metric: '+42%', label: 'signed cases in 90 days' },
      { metric: '35%', label: 'reduction in cost per signed case' },
    ],
  },
  {
    client: 'Queens Hyperbaric',
    industry: 'Medical Practice',
    tag: 'Medical',
    challenge: 'A hyperbaric oxygen therapy clinic was struggling to fill appointment slots despite strong word-of-mouth. No online booking, a 4.1-star review profile, and zero patient recall system.',
    solution: 'We built a complete patient acquisition stack: local SEO domination for hyperbaric + NYC search terms, Google Ads campaigns, online booking integration, automated post-visit review requests, and a lapsed-patient recall sequence.',
    results: [
      { metric: '30+', label: 'new patients per month' },
      { metric: '4.8★', label: 'Google review rating (from 4.1)' },
      { metric: '60%', label: 'reduction in no-shows' },
      { metric: '#1', label: 'local Google Maps ranking for target terms' },
    ],
  },
  {
    client: 'South Florida Roofing Company',
    industry: 'Home Services',
    tag: 'Home Services',
    challenge: 'A roofing contractor was losing significant inbound leads to slow response times, especially after hours. No review generation system and a 3.9-star Google profile was costing them click-throughs.',
    solution: 'We implemented missed-call text-back, after-hours AI response, Google Local Services Ads setup and management, and an automated review generation system triggered after each completed job.',
    results: [
      { metric: '60%', label: 'increase in booked jobs from inbound' },
      { metric: '<60s', label: 'average missed-call response time' },
      { metric: '4.7★', label: 'Google rating (from 3.9)' },
      { metric: '2x', label: 'LSA impressions within 60 days' },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container-md max-w-4xl text-center relative">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            Client Results
          </p>
          <h1 className="text-5xl font-black tracking-tight mb-6">Real Systems. Real Numbers.</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We don&apos;t sell marketing. We build systems. Here&apos;s what those systems actually produce.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-md max-w-5xl space-y-16">
          {CASES.map((c, i) => (
            <div key={c.client} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">{c.tag}</span>
                  <span className="text-xs text-slate-400">{c.industry}</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">{c.client}</h2>
                <div className="space-y-5 mt-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">The Challenge</p>
                    <p className="text-slate-600 leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">What We Built</p>
                    <p className="text-slate-600 leading-relaxed">{c.solution}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {c.results.map((r) => (
                  <div key={r.label} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <div className="text-3xl font-black text-red-600 mb-1 tracking-tight">{r.metric}</div>
                    <div className="text-slate-600 text-xs font-semibold leading-snug">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="container-md max-w-3xl text-center">
          <p className="text-slate-500 text-sm">Client names and identifying details may be anonymized. Results are specific to each engagement and not a guarantee of future performance.</p>
        </div>
      </section>

      <CTASection
        title="Want Results Like These?"
        description="Book a free 30-minute audit. We'll show you exactly where your funnel is leaking and how to fix it."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
