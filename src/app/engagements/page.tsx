import type { Metadata } from 'next';
import Link from 'next/link';
import OfferCard from '@/components/OfferCard';
import CTASection from '@/components/CTASection';
import { OFFERS, COMPANY } from '@/lib/constants';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Engagements',
  description:
    'Three fixed-scope engagements for law firms and medical practices: Website in 14 Days, the Intake Gap Audit, and the AI Content & Search Engine. Defined deliverable, defined date, fee agreed before anything begins.',
  alternates: { canonical: `${COMPANY.website}/engagements` },
};

const FAQS = [
  { q: 'What does an engagement cost?', a: 'It depends on the size of the firm and the shape of the work, so we quote it rather than publish a list. What does not vary is how the number behaves: we define the deliverable and the date, put the fee in writing before anything begins, and it does not move mid-engagement. If something falls outside the agreed scope, we quote that in writing too, before we do it.' },
  { q: 'When do I find out the number?', a: 'On the first call, or immediately after it. We are not going to run you through three discovery sessions before naming a figure — if what you need is clear, you will have the fee and the scope in writing within a business day.' },
  { q: 'Can I buy more than one?', a: 'Yes, and they\'re built to stack: the website gets you found, the content engine gets you called, the audit makes sure those calls get signed. Start with the audit if you\'re not sure where the leak is — it\'s credited toward anything else within 60 days.' },
  { q: 'Do you require a long contract?', a: 'The website and audit are one-time engagements. The content engine has a 3-month minimum because anything shorter can\'t show you a real trend, then it\'s month-to-month with 30 days notice.' },
  { q: 'What if I\'m outside Florida?', a: 'Everything is delivered remotely and we work with firms nationwide. Florida firms get the benefit of our Florida Bar advertising-rule familiarity; elsewhere, you\'ll want your own compliance review on marketing copy.' },
  { q: 'Who actually does the work?', a: 'A small senior team. There is no account-manager layer; the people you meet on the first call are the people who build your engagement, and you will know their names on day one.' },
];

export default function EngagementsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-20 md:py-24 text-center">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            Engagements
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5 max-w-3xl mx-auto">
            Fixed scope. Fixed date. No open-ended retainers.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Three ways we work, each with a defined deliverable and a delivery date. The fee is scoped to your firm and agreed in writing before anything begins — and it does not move once it has.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4">
            {OFFERS.map((o) => (
              <OfferCard key={o.slug} offer={o} featured={o.slug === 'ai-content-engine'} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Not sure where to start? <Link href="/free-consultation" className="font-semibold text-red-600 hover:underline">Start with a conversation</Link> — we&apos;ll tell you which engagement fits, what it costs, and which you don&apos;t need.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-10">Questions people ask first</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900 list-none">
                  {f.q}
                  <span className="shrink-0 text-slate-400 transition group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want the number for your firm?"
        description="Call 1-833-GET-BULL or book twenty minutes. We'll scope it on the call and tell you which engagement fits — or that none of them do."
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:18334382855' }}
      />
    </>
  );
}
