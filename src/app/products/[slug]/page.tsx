import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CheckoutButton from '@/components/CheckoutButton';
import ContactForm from '@/components/ContactForm';
import { OFFERS, COMPANY, getOffer } from '@/lib/constants';
import { offerSchema, faqSchema } from '@/lib/schema';

export function generateStaticParams() {
  return OFFERS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return {
    title: `${offer.name} — ${offer.priceLabel}${offer.billing === 'monthly' ? '/mo' : ''}`,
    description: offer.short,
    alternates: { canonical: `${COMPANY.website}/products/${offer.slug}` },
  };
}

const ACCENT: Record<string, { text: string; bg: string; border: string; soft: string }> = {
  red: { text: 'text-red-600', bg: 'bg-red-600', border: 'border-red-200', soft: 'bg-red-50' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-600', border: 'border-blue-200', soft: 'bg-blue-50' },
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-600', border: 'border-emerald-200', soft: 'bg-emerald-50' },
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();
  const a = ACCENT[offer.accent] ?? ACCENT.red;
  const others = OFFERS.filter((o) => o.slug !== offer.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema(offer)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(offer.faqs)) }} />

      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-slate-300">Home</Link> <span className="mx-1.5">/</span>
                <Link href="/pricing" className="hover:text-slate-300">Products</Link> <span className="mx-1.5">/</span>
                <span className="text-slate-300">{offer.name}</span>
              </nav>
              <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
                Step: {offer.step}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">{offer.name}</h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-snug max-w-2xl">{offer.headline}</p>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-black tracking-tight">{offer.priceLabel}</span>
                  <span className="text-slate-400 font-medium">{offer.billing === 'monthly' ? '/month' : 'one-time'}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{offer.terms}</p>
                <p className="mt-1 text-sm text-slate-400">Delivery: <span className="text-slate-200">{offer.timeline}</span></p>
                <CheckoutButton offer={offer} size="md" className="mt-6 w-full" />
                <a href="#ask" className="mt-3 block text-center text-sm text-slate-400 hover:text-white">or ask a question first</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className={`text-xs font-bold uppercase tracking-widest ${a.text} mb-3`}>The problem</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Why this exists</h2>
            <p className="mt-4 text-sm text-slate-500"><span className="font-semibold text-slate-700">Best for:</span> {offer.bestFor}</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg text-slate-700 leading-relaxed">{offer.problem}</p>
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className={`text-xs font-bold uppercase tracking-widest ${a.text} mb-3`}>What&apos;s included</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8">Everything in the box</h2>
              <ul className="space-y-3.5">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4 text-slate-800">
                    <span className={`shrink-0 mt-0.5 h-5 w-5 rounded-full ${a.bg} text-white text-xs font-bold flex items-center justify-center`}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">What&apos;s not</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8">So there are no surprises</h2>
              <ul className="space-y-3.5">
                {offer.notIncluded.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl border border-dashed border-slate-300 px-5 py-4 text-slate-600">
                    <span className="shrink-0 text-slate-400 font-bold">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-md">
          <p className={`text-xs font-bold uppercase tracking-widest ${a.text} mb-3`}>How it works</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-10">What happens after you buy</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {offer.process.map((step, i) => (
              <li key={step.title} className={`rounded-2xl border ${a.border} ${a.soft} p-6`}>
                <span className={`text-xs font-black ${a.text}`}>0{i + 1}</span>
                <h3 className="mt-2 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container-md max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 text-center">Questions</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {offer.faqs.map((f) => (
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

      {/* Buy / Ask */}
      <section id="ask" className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ready?</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {offer.priceLabel}{offer.billing === 'monthly' ? ' per month' : ', one time'}. {offer.timeline}. You know exactly what you get.
            </p>
            <CheckoutButton offer={offer} size="lg" />
            <div className="mt-12 border-t border-slate-800 pt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Pairs with</p>
              <ul className="space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/products/${o.slug}`} className="group flex items-center justify-between rounded-xl border border-slate-800 px-5 py-4 hover:border-slate-600 transition">
                      <span>
                        <span className="block text-xs text-slate-500 uppercase tracking-widest">{o.step}</span>
                        <span className="font-semibold group-hover:text-white">{o.name}</span>
                      </span>
                      <span className="text-slate-400 text-sm">{o.priceLabel}{o.billing === 'monthly' ? '/mo' : ''} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 text-slate-900">
            <h3 className="text-xl font-black tracking-tight mb-1">Ask a question first</h3>
            <p className="text-sm text-slate-500 mb-6">A human replies within one business day.</p>
            <ContactForm product={offer.name} source={`product:${offer.slug}`} submitLabel="Send my question" />
          </div>
        </div>
      </section>
    </>
  );
}
