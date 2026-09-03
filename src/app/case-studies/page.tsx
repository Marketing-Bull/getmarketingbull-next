import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { CASE_STUDIES } from '@/lib/caseStudies';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Selected engagements with law firms and medical practices — what the constraint was, what we built, and what happened.',
  alternates: { canonical: `${COMPANY.website}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md max-w-4xl relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Case studies</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">Selected engagements.</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            The constraint, what we built, and what happened — with the numbers the client reported, and nothing we can&apos;t stand behind.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-5xl space-y-6">
          {CASE_STUDIES.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl border border-slate-200 p-8 md:p-10 hover:border-slate-900 transition-colors">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.vertical} · {c.industry} · {c.location}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{c.client}</h2>
                <p className="mt-3 text-lg text-slate-600 leading-relaxed">{c.summary}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-slate-900 group-hover:text-red-600 transition">Read the case study →</span>
              </div>
              <ul className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                {c.proof.slice(0, 4).map((p) => (
                  <li key={p} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 leading-snug">{p}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="container-md max-w-3xl text-center">
          <p className="text-slate-500 text-sm">Results are specific to each engagement and are not a guarantee of future performance.</p>
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
