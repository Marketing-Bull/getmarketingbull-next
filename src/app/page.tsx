import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTASection from '@/components/CTASection';
import { OFFERS, TESTIMONIALS, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: COMPANY.website },
};

const CLIENTS = ['1-800-HURT-511', 'WeSueThem.com', 'Queens Hyperbaric', 'Metropolitan Orthopedics', 'Linder Diaz Law', '3D Dental', 'GreenBills'];

const PRINCIPLES = [
  {
    n: '01',
    title: 'Diagnose before prescribing',
    body: 'Most firms don\'t have a marketing problem. They have a specific leak — in search, on the site, or at the phone — and the wrong fix is expensive. We find the leak first, with data, and tell you plainly if it isn\'t something we should be hired to fix.',
  },
  {
    n: '02',
    title: 'Build what we recommend',
    body: 'A strategy that lives in a slide deck is a strategy that dies there. Every engagement ends in something running: a site that\'s live, content that\'s published, an intake process that answers. We stay accountable for the number it was meant to move.',
  },
  {
    n: '03',
    title: 'You own everything',
    body: 'Your code, your domain, your accounts, your data. We build inside infrastructure you control, so the relationship continues because it\'s working — never because leaving would mean starting over.',
  },
];

const LENSES = [
  {
    label: 'Found',
    question: 'When someone searches, are you there — and credible?',
    body: 'Site speed, structure, and first impression decide whether a prospect calls you or the next result. We engineer the site as the front door it is.',
    offer: OFFERS[0],
  },
  {
    label: 'Called',
    question: 'When they ask Google or an AI who\'s good, is your name in the answer?',
    body: 'Search has split: rankings still matter, and so does being cited by ChatGPT, Perplexity, and Google\'s AI answers. We build the authority that earns both.',
    offer: OFFERS[2],
  },
  {
    label: 'Signed',
    question: 'When they call, what actually happens?',
    body: 'Speed-to-lead, after-hours coverage, qualification, follow-up. This is where most firms lose the cases they already paid to generate — and where the fix has the fastest return.',
    offer: OFFERS[1],
  },
];

const WHO = [
  {
    title: 'Personal injury & plaintiff firms',
    desc: 'A prospect calls three firms in ten minutes and signs with the one that answers. We build for that reality — fast sites, visible authority, and intake that responds — inside Florida Bar advertising rules.',
    href: '/services/law-firms',
    cta: 'Law firms',
  },
  {
    title: 'Medical practices & specialty clinics',
    desc: 'Chiropractic, imaging, hyperbaric, dental, wellness. Practices where an empty slot is lost revenue, a patient who can\'t book online books elsewhere, and reviews decide the call.',
    href: '/services/medical',
    cta: 'Medical practices',
  },
];

const OUTCOMES = [
  { n: '0 → 20', l: 'personal injury cases per month in twelve months, from a standing start', src: '1-800-HURT-511' },
  { n: '30 days', l: 'to bring missed intake calls to zero after the call center and CRM went live', src: '1-800-HURT-511' },
  { n: '30+', l: 'new patients per month for a specialty clinic that had an empty schedule', src: 'Queens Hyperbaric' },
];

const ENGAGEMENT = [
  { step: 'Conversation', desc: 'Twenty minutes. Where you are, what\'s been tried, what a good year looks like. We\'ll say whether we\'re the right fit.' },
  { step: 'Diagnosis', desc: 'A scored audit of where cases or patients are being lost, with a dollar figure on it. You get the findings whether or not you continue.' },
  { step: 'Build', desc: 'A fixed-scope engagement with a defined deliverable and delivery date. No open-ended retainers, no scope drift.' },
  { step: 'Compound', desc: 'Ongoing work — content, visibility, optimization — reported monthly against the numbers that matter: calls, consults, signed cases, booked patients.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="container-md relative py-28 md:py-40">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-8">
              Growth consultancy · Law firms &amp; medical practices
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[1.02] mb-8">
              Growth, engineered for the firms that can&apos;t afford to guess.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
              Marketing Bull is a senior consultancy in West Palm Beach. We find where a firm is losing cases or patients, build the system that fixes it, and stay accountable for the number it was meant to move.
            </p>
            <div className="flex flex-row flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/free-consultation">Start a conversation</Button>
              <Button variant="secondary" size="lg" href="#approach">How we work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT STRIP ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-md py-8 flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 shrink-0">Trusted by</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-semibold text-slate-500">
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section id="approach" className="py-20 md:py-28 bg-white">
        <div className="container-md">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
              <div className="lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How we work</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Consulting that ends in something running.</h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-lg text-slate-600 leading-relaxed">
                  We&apos;ve spent a decade inside legal and medical marketing — the bar rules, the HIPAA lines, what a slip-and-fall prospect does at nine on a Saturday night. Three principles govern every engagement.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <div className="h-full bg-white p-8 md:p-10">
                  <span className="text-xs font-black text-red-600">{p.n}</span>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{p.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LENSES ── */}
      <section className="py-20 md:py-28 bg-slate-950 text-white">
        <div className="container-md">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">Where we look</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">A case is lost in one of three places.</h2>
              <p className="text-lg text-slate-400 leading-relaxed">Every diagnosis starts with the same three questions. The answers tell us what to build — and, just as often, what not to.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LENSES.map((l, i) => (
              <Reveal key={l.label} delay={i * 100}>
                <div className="h-full flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Get {l.label.toLowerCase()}</span>
                  <h3 className="mt-3 text-xl font-black tracking-tight leading-snug">{l.question}</h3>
                  <p className="mt-4 text-slate-400 leading-relaxed flex-1">{l.body}</p>
                  <Link href={`/products/${l.offer.slug}`} className="mt-6 text-sm font-semibold text-white hover:text-red-400 transition">
                    {l.offer.name} →
                  </Link>
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
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Who we serve</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Two kinds of clients, by design.</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">Depth over breadth. We work only where we know the economics, the regulations, and the patient or client behavior cold.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHO.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <Link href={w.href} className="group block h-full rounded-2xl border border-slate-200 p-8 md:p-10 hover:border-slate-900 transition-colors">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">{w.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{w.desc}</p>
                  <span className="mt-6 inline-block text-sm font-semibold text-slate-900 group-hover:text-red-600 transition">{w.cta} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="container-md">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Selected outcomes</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-12">Measured in cases and patients, not impressions.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.l} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-8">
                  <p className="text-5xl font-black tracking-tight text-slate-900">{o.n}</p>
                  <p className="mt-3 text-slate-700 leading-relaxed">{o.l}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-400">{o.src}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <Link href="/case-studies" className="font-semibold text-slate-900 hover:text-red-600 transition">Read the case studies →</Link>
          </p>
        </div>
      </section>

      <TestimonialCarousel testimonials={TESTIMONIALS} />

      {/* ── ENGAGEMENT ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-md">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
              <div className="lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">An engagement</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">How it begins.</h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Every engagement is fixed in scope, with a defined deliverable and date. We publish what our work costs — <Link href="/pricing" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-red-600">it&apos;s here</Link> — so the first conversation can be about your firm, not about budget.
                </p>
              </div>
            </div>
          </Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ENGAGEMENT.map((e, i) => (
              <Reveal key={e.step} delay={i * 100}>
                <li className="h-full border-t-2 border-slate-900 pt-6">
                  <span className="text-xs font-black text-red-600">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-black tracking-tight text-slate-900">{e.step}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{e.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TEAM STRIP ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="container-md flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex -space-x-4">
            {[
              { src: '/alex.webp', alt: 'Alexander Babenchuk' },
              { src: '/oleg.webp', alt: 'Oleg Babenchuk' },
            ].map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} width={72} height={72} className="h-[72px] w-[72px] rounded-full border-4 border-slate-50 object-cover shadow-md" />
            ))}
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-xl font-black tracking-tight text-slate-900">A small senior team in West Palm Beach.</p>
            <p className="mt-1 text-slate-600">No account-manager layer. The people you meet are the people who do the work. <Link href="/about-us" className="font-semibold text-slate-900 hover:text-red-600 transition">Meet the team →</Link></p>
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a conversation."
        description="Twenty minutes about your firm. We'll tell you where we'd look first — and whether we're the right people to look."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:18334382855' }}
      />
    </>
  );
}
