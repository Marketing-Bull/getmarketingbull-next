import Link from 'next/link';
import Button from './Button';
import CTASection from './CTASection';
import TestimonialCarousel from './TestimonialCarousel';
import { OFFERS, TESTIMONIALS, type OfferSlug } from '@/lib/constants';
import { CASE_STUDIES } from '@/lib/caseStudies';
import { faqSchema } from '@/lib/schema';

export interface VerticalPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  problemTitle: string;
  problem: string[];
  lenses: { label: string; question: string; body: string; offer: OfferSlug }[];
  weKnow: string[];
  faqs: { q: string; a: string }[];
  caseStudySlugs: string[];
  testimonialNames: string[];
}

export default function VerticalPage(p: VerticalPageProps) {
  const cases = CASE_STUDIES.filter((c) => p.caseStudySlugs.includes(c.slug));
  const testimonials = TESTIMONIALS.filter((t) => p.testimonialNames.includes(t.name));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(p.faqs)) }} />

      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-24 md:py-32 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">{p.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">{p.title}</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">{p.subtitle}</p>
          <div className="flex flex-row flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/free-consultation">Start a conversation</Button>
            <Button variant="secondary" size="lg" href="/pricing">See the engagements</Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">The problem</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{p.problemTitle}</h2>
          </div>
          <div className="lg:col-span-8 space-y-5">
            {p.problem.map((para) => <p key={para.slice(0, 40)} className="text-lg text-slate-700 leading-relaxed">{para}</p>)}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-950 text-white">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">Where we look</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">Three questions, three engagements.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {p.lenses.map((l) => {
              const offer = OFFERS.find((o) => o.slug === l.offer)!;
              return (
                <div key={l.label} className="h-full flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Get {l.label.toLowerCase()}</span>
                  <h3 className="mt-3 text-xl font-black tracking-tight leading-snug">{l.question}</h3>
                  <p className="mt-4 text-slate-400 leading-relaxed flex-1">{l.body}</p>
                  <Link href={`/products/${offer.slug}`} className="mt-6 text-sm font-semibold text-white hover:text-red-400 transition">{offer.name} →</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What we know cold</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Depth over breadth.</h2>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.weKnow.map((k) => (
              <li key={k} className="rounded-xl border border-slate-200 px-5 py-4 text-slate-800 leading-relaxed">{k}</li>
            ))}
          </ul>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
          <div className="container-md">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Selected work</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Case studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-8 hover:border-slate-900 transition-colors">
                  <p className="text-xs uppercase tracking-widest text-slate-400">{c.industry} · {c.location}</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{c.client}</p>
                  <p className="mt-3 text-slate-600 leading-relaxed">{c.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-slate-900 group-hover:text-red-600 transition">Read the case study →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && <TestimonialCarousel testimonials={testimonials} />}

      <section className="py-20 bg-white">
        <div className="container-md max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 text-center">Questions</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {p.faqs.map((f) => (
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
        title="Start with a conversation."
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first — and whether we're the right people to look."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:18334382855' }}
      />
    </>
  );
}
