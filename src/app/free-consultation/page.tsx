import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { COMPANY, OFFERS, getOffer } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book a 20-Minute Call',
  description:
    'A 20-minute call with Marketing Bull. We tell you which of our three products fits — or that none of them do. No pitch deck, no discovery-call theater.',
  alternates: { canonical: `${COMPANY.website}/free-consultation` },
};

const WHAT_TO_EXPECT = [
  { step: '01', title: 'Where the leak is', desc: 'Five minutes on where you\'re losing cases or patients today: search, the site, or the phone.' },
  { step: '02', title: 'Which product, if any', desc: 'We match it to one of three fixed-price products. If none fits, we say so and point you somewhere useful.' },
  { step: '03', title: 'A price you already know', desc: 'Nothing gets quoted on the call — the prices are published. You leave knowing exactly what it costs and when it\'s done.' },
];

export default async function FreeConsultationPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const offer = product ? getOffer(product) : undefined;

  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-20 md:py-24 max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            No pitch deck
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            {offer ? `Ask about ${offer.name}` : 'Twenty minutes. One answer.'}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {offer
              ? `${offer.priceLabel}${offer.billing === 'monthly' ? '/month' : ', one-time'} · ${offer.timeline}. Tell us about your firm and we'll confirm it's the right fit before you buy.`
              : 'We tell you which of our three products fits your firm — or that none of them do. Either way you leave with a straight answer.'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-md max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8">What happens on the call</h2>
              <div className="space-y-7 mb-12">
                {WHAT_TO_EXPECT.map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="text-3xl font-black text-slate-200 min-w-[44px]">{item.step}</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-7 mb-8">
                <h3 className="text-base font-bold text-slate-900 mb-3">Prefer to call?</h3>
                <a href={`tel:${COMPANY.phoneFormatted}`} className="text-red-600 font-black text-2xl tracking-tight hover:underline">{COMPANY.phone}</a>
                <p className="text-slate-500 text-sm mt-1">Mon–Fri, 9am–6pm ET</p>
                <a href={`mailto:${COMPANY.email}`} className="mt-4 block text-slate-600 hover:text-slate-900 text-sm">{COMPANY.email}</a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Already know what you want?</p>
                <ul className="space-y-2">
                  {OFFERS.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/products/${o.slug}`} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm hover:border-slate-900 transition">
                        <span className="font-semibold text-slate-900">{o.name}</span>
                        <span className="text-slate-500">{o.priceLabel}{o.billing === 'monthly' ? '/mo' : ''} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:sticky lg:top-24">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">Request the call</h2>
                <p className="text-slate-500 mb-7 text-sm">We reply within one business day with two times to pick from.</p>
                <ContactForm product={offer?.name} source={offer ? `consult:${offer.slug}` : 'consult'} submitLabel="Request my call" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
