import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { CASE_STUDIES } from '@/lib/caseStudies';
import { COMPANY } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';
import { PORTFOLIO } from '@/lib/portfolio';

export const metadata: Metadata = pageMeta({
  path: '/case-studies',
  title: 'Case Studies',
  description: 'Selected engagements with law firms and medical practices, and every website we built in 2026: what the constraint was, what we built, and what happened.',
});

export default function CaseStudiesPage() {
  const engagements = CASE_STUDIES.filter((c) => c.kind === 'Engagement');
  const builds = CASE_STUDIES.filter((c) => c.kind === 'Website build');

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
          <p className="mt-6 text-sm text-slate-500">
            {engagements.length} full engagements, then <a href="#website-builds" className="font-semibold text-slate-300 hover:text-white transition">{builds.length} websites built in 2026 ↓</a>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-5xl space-y-6">
          {engagements.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl border border-slate-200 p-8 md:p-10 hover:border-slate-900 transition-colors">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.vertical} · {c.industry} · {c.location}</p>
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

      <section id="website-builds" className="py-16 md:py-20 bg-slate-50 border-t border-slate-100 scroll-mt-24">
        <div className="container-md max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Website builds</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 max-w-3xl">Every site we built in 2026.</h2>
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            Each one is live. The write-up covers the job the site had to do, what we built, and what shipped. Traffic and rankings belong to each client and are not published here.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {builds.map((c) => {
              const site = PORTFOLIO.find((p) => p.caseStudy === c.slug);
              return (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-slate-900 transition-colors">
                  {site && (
                    <div className="aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
                      <img
                        src={site.image}
                        alt={`${c.client} homepage`}
                        width={1200}
                        height={750}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.vertical} · {c.location}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{c.client}</h3>
                    <p className="mt-3 text-slate-600 leading-relaxed">{c.summary}</p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-slate-900 group-hover:text-red-600 transition">Read the case study →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container-md max-w-3xl text-center">
          <p className="text-slate-500 text-sm">Results are specific to each engagement and are not a guarantee of future performance.</p>
        </div>
      </section>

      <CTASection
        title="Start with a conversation."
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first — and whether we're the right people to look."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: `tel:${COMPANY.phoneE164}` }}
      />
    </>
  );
}
