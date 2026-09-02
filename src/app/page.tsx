import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import OfferCard from '@/components/OfferCard';
import Reveal from '@/components/Reveal';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTASection from '@/components/CTASection';
import { OFFERS, TESTIMONIALS, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: COMPANY.website },
};

const AGENCY_PROBLEMS = [
  {
    title: 'The price is a secret',
    body: 'You book a "discovery call." They ask your budget. The proposal arrives at exactly that number. Nobody knows what anything actually costs.',
    fix: 'Every product here has the price on the box. Same number for everyone.',
  },
  {
    title: 'You don\'t own anything',
    body: 'The website is on their platform. The ad account is under their login. Leave, and you start from zero. That\'s not a service model — it\'s a hostage model.',
    fix: 'Code in your GitHub. Hosting in your name. Ad accounts you control. Leave whenever you want and take everything.',
  },
  {
    title: 'The deliverable is a report',
    body: 'Thirty pages of impressions and "engagement." Zero pages on how many cases signed or how many patients showed up.',
    fix: 'Fixed scope means a fixed deliverable: a live site, a scored audit, published content. Things you can point at.',
  },
];

const WHO = [
  {
    icon: '⚖️',
    title: 'Personal injury & plaintiff firms',
    desc: 'The prospect calls three firms in ten minutes and signs with whoever picks up. We build for that reality: fast sites, intake that answers, content that shows up when they search.',
    href: '/services/law-firms',
    cta: 'How we work with law firms',
  },
  {
    icon: '🏥',
    title: 'Medical practices & specialty clinics',
    desc: 'Chiropractic, imaging, hyperbaric, dental, wellness — practices where an empty slot is lost revenue and a patient who can\'t book online books elsewhere.',
    href: '/services/medical',
    cta: 'How we work with practices',
  },
];

const STATS = [
  { n: '78 min', l: 'average firm response time to a new lead' },
  { n: '42%', l: 'of PI leads arrive after 5pm' },
  { n: '14 days', l: 'from kickoff to a live website' },
  { n: '3', l: 'products. That\'s the whole menu.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        <div className="container-md relative py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-7 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
              For law firms &amp; medical practices
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-7">
              Get found.<br />
              Get called.<br />
              <span className="text-red-500">Get signed.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed mb-4">
              Three fixed-price growth products. Published pricing. Fixed delivery dates. You own everything we build.
            </p>
            <p className="text-base text-slate-500 max-w-xl mb-10">
              No discovery-call theater. No retainer you can&apos;t explain to your partner. Pick a product, see the price, buy it.
            </p>
            <div className="flex flex-row flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/pricing">See the three products</Button>
              <Button variant="secondary" size="lg" href="/free-consultation">Book a 20-minute call</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-slate-950 border-t border-slate-800/60 text-white">
        <div className="container-md py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.l}>
              <p className="text-3xl md:text-4xl font-black tracking-tight">{s.n}</p>
              <p className="mt-1 text-sm text-slate-400 leading-snug">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-20 md:py-28 bg-slate-50" id="products">
        <div className="container-md">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">The menu</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Three products. That&apos;s it.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                One gets you found. One gets you called. One makes sure the call turns into a signed case or a booked patient. Buy one, or stack all three.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4">
            {OFFERS.map((o, i) => (
              <Reveal key={o.slug} delay={i * 100} className="flex">
                <div className="flex-1 flex">
                  <div className="flex-1"><OfferCard offer={o} featured={o.slug === 'ai-content-engine'} /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW THEY STACK ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-md">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How they fit</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">A case has three places to die.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 relative">
            {[
              { step: '01', label: 'Found', product: OFFERS[0], line: 'They search. Your site loads fast, looks credible, and shows the phone number above the fold — or they call the next result.' },
              { step: '02', label: 'Called', product: OFFERS[2], line: 'They ask Google or ChatGPT who\'s good. Your name is in the answer, with content that proves it — or someone else\'s is.' },
              { step: '03', label: 'Signed', product: OFFERS[1], line: 'They call. Someone answers in seconds, qualifies the case, and books the consult — or it goes to voicemail and they move on.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 120}>
                <div className={`relative h-full p-8 ${i < 2 ? 'md:border-r md:border-slate-200' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-10 w-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center">{s.step}</span>
                    <span className="text-2xl font-black tracking-tight text-slate-900">Get {s.label.toLowerCase()}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{s.line}</p>
                  <Link href={`/products/${s.product.slug}`} className="text-sm font-semibold text-red-600 hover:underline">
                    {s.product.name} → {s.product.priceLabel}{s.product.billing === 'monthly' ? '/mo' : ''}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NOT AN AGENCY ── */}
      <section className="py-20 md:py-28 bg-slate-950 text-white">
        <div className="container-md">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">Why this isn&apos;t an agency</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">You&apos;ve been pitched by agencies. You&apos;re numb to it.</h2>
              <p className="text-lg text-slate-400 leading-relaxed">Fair. Here&apos;s what&apos;s actually different, and it&apos;s structural, not a slogan.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENCY_PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">The agency way</p>
                  <h3 className="text-xl font-black tracking-tight mb-3">{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{p.body}</p>
                  <div className="border-t border-slate-800 pt-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">The Marketing Bull way</p>
                    <p className="text-slate-200 leading-relaxed">{p.fix}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-md">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Who this is for</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Two kinds of clients. On purpose.</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">We&apos;ve spent a decade in legal and medical marketing. We know the bar rules, the HIPAA lines, and what a slip-and-fall prospect does at 9pm on a Saturday. We don&apos;t do restaurants.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHO.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <Link href={w.href} className="group block h-full rounded-3xl border border-slate-200 p-8 hover:border-slate-900 hover:shadow-xl transition-all">
                  <span className="text-3xl">{w.icon}</span>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">{w.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{w.desc}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-red-600 group-hover:underline">{w.cta} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel testimonials={TESTIMONIALS} />

      {/* ── TEAM STRIP ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-md flex flex-col md:flex-row items-center gap-8 md:gap-14">
          <div className="flex -space-x-4">
            {[
              { src: '/alex.webp', alt: 'Alexander Babenchuk' },
              { src: '/oleg.webp', alt: 'Oleg' },
              { src: '/yossi.png', alt: 'Yossi' },
            ].map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} width={72} height={72} className="h-[72px] w-[72px] rounded-full border-4 border-white object-cover shadow-md" />
            ))}
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-xl font-black tracking-tight text-slate-900">A small senior team in West Palm Beach.</p>
            <p className="mt-1 text-slate-600">No account-manager layer. The people you meet are the people who do the work. <Link href="/about-us" className="font-semibold text-red-600 hover:underline">Meet the team →</Link></p>
          </div>
        </div>
      </section>

      <CTASection
        title="Pick a product. See the price. Decide."
        description="Or book 20 minutes and we'll tell you which one you actually need — including if the answer is none of them."
        primaryCTA={{ text: 'See pricing', href: '/pricing' }}
        secondaryCTA={{ text: 'Book a call', href: '/free-consultation' }}
      />
    </>
  );
}
