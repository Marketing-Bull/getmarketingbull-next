import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTASection from '@/components/CTASection';
import { CASE_STUDIES, getCaseStudy } from '@/lib/caseStudies';
import { COMPANY } from '@/lib/constants';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — Case Study`,
    description: cs.summary,
    alternates: { canonical: `${COMPANY.website}/case-studies/${cs.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug);

  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-20 md:py-28 max-w-4xl">
          <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-300">Home</Link> <span className="mx-1.5">/</span>
            <Link href="/case-studies" className="hover:text-slate-300">Case Studies</Link> <span className="mx-1.5">/</span>
            <span className="text-slate-300">{cs.client}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-5">{cs.industry} · {cs.location}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">{cs.client}</h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-snug">{cs.summary}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {cs.proof.map((p) => (
              <div key={p} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900 leading-snug">{p}</p>
              </div>
            ))}
          </div>

          {[
            { label: 'Constraint', body: cs.constraint },
            { label: 'What we did', body: cs.action },
            { label: 'Result', body: cs.result },
          ].map((s) => (
            <div key={s.label} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-slate-200">
              <p className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-red-600">{s.label}</p>
              <p className="md:col-span-9 text-lg text-slate-700 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-slate-200">
            <p className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">Scope</p>
            <ul className="md:col-span-9 flex flex-wrap gap-2">
              {cs.services.map((s) => (
                <li key={s} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">{s}</li>
              ))}
            </ul>
          </div>

          {cs.quote && (
            <blockquote className="mt-10 rounded-3xl bg-slate-950 text-white p-8 md:p-10">
              <p className="text-xl md:text-2xl font-medium leading-relaxed">&ldquo;{cs.quote.text}&rdquo;</p>
              <footer className="mt-5 text-sm text-slate-400">
                <span className="font-semibold text-white">{cs.quote.name}</span> · {cs.quote.title}
              </footer>
            </blockquote>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-100">
          <div className="container-md max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">More case studies</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/case-studies/${o.slug}`} className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-900 transition-colors">
                    <p className="text-xs uppercase tracking-widest text-slate-400">{o.industry}</p>
                    <p className="mt-1 text-lg font-black tracking-tight text-slate-900">{o.client}</p>
                    <p className="mt-2 text-sm text-slate-600">{o.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection
        title="Start with a conversation."
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'See how engagements are scoped', href: '/pricing' }}
      />
    </>
  );
}
