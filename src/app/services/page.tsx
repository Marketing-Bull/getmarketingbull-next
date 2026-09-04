import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import OfferCard from '@/components/OfferCard';
import CTASection from '@/components/CTASection';
import { OFFERS, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How We Help',
  description: 'Three fixed-scope engagements for law firms and medical practices — a website in 14 days, an AI content and search engine, and an intake gap audit — delivered by a senior consultancy in West Palm Beach.',
  alternates: { canonical: `${COMPANY.website}/services` },
};

const VERTICALS = [
  { title: 'Law firms', desc: 'Personal injury and plaintiff firms. Search, site, and the first phone call — inside Florida Bar advertising rules.', href: '/services/law-firms' },
  { title: 'Medical practices', desc: 'Chiropractic, imaging, hyperbaric, dental, orthopedic, wellness. Being found, being chosen, being booked — inside HIPAA boundaries.', href: '/services/medical' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-24 md:py-32 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">How we help</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">Diagnose first. Then build one thing, well.</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">
            Every engagement starts with the same question — where, specifically, is this firm losing cases or patients? — and ends in one of three fixed-scope builds. No open-ended retainers.
          </p>
          <div className="flex flex-row flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/free-consultation">Start a conversation</Button>
            <Button variant="secondary" size="lg" href="/engagements">See the engagements</Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-50">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">The engagements</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Three, by design.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4">
            {OFFERS.map((o) => <OfferCard key={o.slug} offer={o} compact />)}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Who we serve</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Two kinds of clients.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERTICALS.map((v) => (
              <Link key={v.href} href={v.href} className="group rounded-2xl border border-slate-200 p-8 md:p-10 hover:border-slate-900 transition-colors">
                <h3 className="text-2xl font-black tracking-tight text-slate-900">{v.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{v.desc}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-slate-900 group-hover:text-red-600 transition">How we work with {v.title.toLowerCase()} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-md max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">What we don&apos;t do</p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Standalone ad management, social media management, branding-only projects, or anything for a business outside law and medicine. If that is what you need, say so on the call and we will point you to someone good.
          </p>
        </div>
      </section>

      <CTASection
        title="Start with a conversation."
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first — and whether we're the right people to look."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:18334382855' }}
      />
    </>
  );
}
