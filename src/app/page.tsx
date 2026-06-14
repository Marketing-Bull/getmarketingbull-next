'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Animated counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e], observer) => {
        if (!e.isIntersecting) return;
        observer.disconnect();
        let cur = 0;
        const step = target / 40;
        const id = setInterval(() => {
          cur += step;
          if (cur >= target) { setCount(target); clearInterval(id); }
          else setCount(Math.floor(cur));
        }, 30);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Scroll reveal ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e], observer) => { if (e.isIntersecting) { setShow(true); observer.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Data ── */
const SERVICES = [
  {
    no: '01',
    title: 'Intake OS',
    tag: 'Capture',
    desc: 'Broken intake is the silent killer of PI firms. We engineer end-to-end systems that catch every lead, respond in seconds, and book consultations before your competitor picks up the phone.',
    points: ['Speed-to-lead automation', 'Missed-call text-back', 'Live consultation booking'],
  },
  {
    no: '02',
    title: 'AI Automation',
    tag: 'Scale',
    desc: 'Custom GHL voice agents, automated lead scoring, and CRM workflows that act as a digital workforce — so you scale revenue without scaling headcount.',
    points: ['Voice & SMS agents', 'Lead scoring & routing', 'CRM workflow build-out'],
  },
  {
    no: '03',
    title: 'Performance Marketing',
    tag: 'Convert',
    desc: 'Data-driven campaigns built for qualified case acquisition, not vanity clicks. Every dollar tracked from impression to signed retainer.',
    points: ['Paid search & social', 'Conversion tracking', 'Case-level attribution'],
  },
];

const TESTIMONIALS = [
  { name: 'Dr. Manoj Sadhnani', co: 'Queens Hyperbaric', quote: 'Working with Marketing Bull has been a game-changer for my practice — 30 new faces every month.' },
  { name: 'Todd D. Muhlstock, Esq.', co: 'WeSueThem.com', quote: 'I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results.' },
  { name: 'Laura Cole, Esq.', co: 'Attorney at Law', quote: 'Marketing Bull is excellent. Prompt service, rapid replies, and deeply professional throughout.' },
  { name: 'Angela McMullin', co: '3D Dental', quote: 'Alexander is the best. He goes above and beyond to make sure his clients are happy and getting results.' },
  { name: 'Isak Yuhan', co: '1-800-HURT-511', quote: 'They delivered results beyond our expectations — our intake pipeline has never been stronger.' },
  { name: 'Vinay Gaonkar', co: 'GreenBills', quote: 'Excellent results on leads and client conversions. Highly recommend Marketing Bull for any growing business.' },
];

const TEAM = [
  { name: 'Alexander M. Babenchuk', role: 'President & Managing Director', photo: '/mb-preview/alex.webp' },
  { name: 'Oleg M. Babenchuk', role: 'Chief Marketing Officer', photo: '/mb-preview/oleg.webp' },
  { name: 'Yossi Ben Barouch', role: 'Chief Technology Officer', photo: '/mb-preview/yossi.png' },
];

const MARQUEE = [
  '25% Intake Lift', '500+ Workflows Deployed', '30+ Growth Partners',
  'Speed-to-Lead in Seconds', 'Case-Level Attribution', 'No Lead Left Behind',
];

const NAV = [
  { l: 'Services', h: '#services' },
  { l: 'Approach', h: '#approach' },
  { l: 'Results', h: '#results' },
  { l: 'Team', h: '#team' },
];

export default function HomePage() {
  const [t, setT] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setT((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden">

      {/* ━━━ NAV ━━━ */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="h-[3px] bg-[var(--red)]" />
        <nav className={`transition-colors duration-300 ${scrolled ? 'bg-[var(--ink)]/95 backdrop-blur-md border-b border-[var(--ink-line)]' : 'bg-transparent'} text-[var(--paper)]`}>
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3 group">
              <img src="/mb-preview/logo.png" alt="Marketing Bull" width={38} height={38} className="transition-transform duration-300 group-hover:-rotate-6" />
              <span className="font-display font-extrabold text-[17px] tracking-tight leading-none">
                MARKETING<span className="text-[var(--red)]">BULL</span>
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-9">
              {NAV.map((n) => (
                <a key={n.l} href={n.h} className="kicker text-[11px] text-[var(--paper)]/70 hover:text-[var(--paper)] transition-colors">
                  {n.l}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+18334382855" className="hidden sm:block kicker text-[11px] text-[var(--paper)]/70 hover:text-[var(--paper)] transition-colors">
                1-833-GET-BULL
              </a>
              <a href="#contact" className="facet-tab bg-[var(--red)] hover:bg-[var(--red-bright)] text-white pl-5 pr-6 py-2.5 text-[12px] font-bold tracking-wide uppercase transition-colors">
                Free Consult
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section id="top" className="relative grain bg-[var(--ink)] text-[var(--paper)] min-h-screen flex items-center pt-[68px]">
        {/* Bull motif — oversized, faceted, off-grid */}
        <div className="pointer-events-none absolute right-[-6%] top-1/2 -translate-y-1/2 w-[55vw] max-w-[760px] opacity-[0.9] hidden md:block">
          <img src="/mb-preview/logo.png" alt="" aria-hidden className="floaty w-full drop-shadow-[0_30px_60px_rgba(225,29,42,0.25)]" />
        </div>
        <div className="pointer-events-none absolute -right-32 -top-32 w-[600px] h-[600px] bg-[var(--red)]/10 blur-[140px] rounded-full" />

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-20 w-full">
          <div className="max-w-[760px]">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-[var(--red)]" />
                <span className="kicker text-[11px] text-[var(--red-bright)]">Intake OS &amp; Growth Systems</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="headline text-[clamp(2.8rem,8vw,6.2rem)] mb-7">
                WE BUILD THE<br />
                SYSTEMS THAT<br />
                <span className="text-[var(--red)]">CLOSE CASES.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[var(--paper)]/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                Most firms don&apos;t have a lead problem — they have an intake problem. We engineer the operating systems that fix slow intake, missed calls, and broken tracking for law firms &amp; medical practices.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="facet-card bg-[var(--red)] hover:bg-[var(--red-bright)] text-white px-8 py-4 font-bold uppercase tracking-wide text-sm transition-colors text-center">
                  Schedule Free Consultation
                </a>
                <a href="tel:+18334382855" className="px-8 py-4 font-bold uppercase tracking-wide text-sm border border-[var(--paper)]/25 hover:border-[var(--red)] hover:text-[var(--red-bright)] transition-colors text-center">
                  Call 1-833-GET-BULL
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ RESULTS MARQUEE ━━━ */}
      <div className="marquee bg-[var(--red)] text-white py-4 overflow-hidden select-none">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="kicker text-[13px] mx-8 inline-flex items-center gap-8">
              {m}
              <span className="text-white/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ━━━ STATS ━━━ */}
      <section className="bg-[var(--paper)] py-24 lg:py-28">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16 border-b border-[var(--paper-line)] pb-8">
              <h2 className="headline text-[clamp(2rem,5vw,3.4rem)] max-w-xl">THE NUMBERS DON&apos;T LIE.</h2>
              <p className="text-[var(--muted)] max-w-xs text-sm leading-relaxed">Outcomes our partners measure in signed cases and booked patients — not impressions.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--paper-line)]">
            {[
              { no: '01', n: 25, s: '%', l: 'Intake Conversion Lift', d: 'Average increase in speed-to-lead' },
              { no: '02', n: 500, s: '+', l: 'Workflows Deployed', d: 'Automated business processes live' },
              { no: '03', n: 30, s: '+', l: 'Active Growth Partners', d: 'Trusting us with their pipeline' },
            ].map((st, i) => (
              <Reveal key={st.l} delay={i * 120} className="px-0 sm:px-10 first:sm:pl-0 last:sm:pr-0 py-8 sm:py-0">
                <span className="index-num text-[var(--paper-line)] text-3xl block mb-6">{st.no}</span>
                <div className="headline text-[clamp(3.2rem,7vw,5rem)] text-[var(--ink)] mb-2">
                  <Counter target={st.n} suffix={st.s} />
                </div>
                <div className="font-bold text-lg mb-1">{st.l}</div>
                <div className="text-[var(--muted)] text-sm">{st.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section id="services" className="bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-32 grain relative">
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-12 bg-[var(--red)]" />
              <span className="kicker text-[11px] text-[var(--red-bright)]">What We Build</span>
            </div>
            <h2 className="headline text-[clamp(2.2rem,6vw,4.4rem)] mb-16 max-w-3xl">
              SCALABLE OPERATING SYSTEMS, NOT JUST ADS.
            </h2>
          </Reveal>
          <div className="space-y-px bg-[var(--ink-line)]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="group bg-[var(--ink)] hover:bg-[var(--ink-soft)] transition-colors duration-300 px-2 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-3 flex items-center gap-5">
                    <span className="index-num text-[var(--ink-line)] group-hover:text-[var(--red)] transition-colors text-5xl">{s.no}</span>
                    <div>
                      <span className="kicker text-[10px] text-[var(--red-bright)]">{s.tag}</span>
                      <h3 className="font-display font-extrabold text-2xl mt-1">{s.title}</h3>
                    </div>
                  </div>
                  <p className="md:col-span-6 text-[var(--paper)]/65 leading-relaxed">{s.desc}</p>
                  <ul className="md:col-span-3 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-[var(--paper)]/80">
                        <span className="text-[var(--red)] mt-0.5">▸</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ APPROACH ━━━ */}
      <section id="approach" className="bg-[var(--paper-2)] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="kicker text-[11px] text-[var(--red-deep)] mb-5 block">The Marketing Bull Difference</span>
            <h2 className="headline text-[clamp(2rem,5vw,3.6rem)] mb-7">
              EVERY MISSED CALL IS A<br />CASE YOUR RIVAL SIGNS.
            </h2>
            <p className="text-[var(--ink)]/70 leading-relaxed mb-6">
              The average firm loses 30–40% of qualified leads to slow follow-up alone. We don&apos;t paper over that with more ad spend — we rebuild the machine underneath it so every inquiry is captured, qualified, and converted.
            </p>
            <a href="#contact" className="inline-flex items-center gap-3 font-bold uppercase tracking-wide text-sm text-[var(--red-deep)] hover:gap-5 transition-all">
              See how we&apos;d fix yours <span aria-hidden>→</span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid sm:grid-cols-2 gap-px bg-[var(--paper-line)]">
              {[
                { k: 'Audit', v: 'We map every leak in your intake funnel — call to retainer.' },
                { k: 'Engineer', v: 'Automations, agents and tracking built around your firm.' },
                { k: 'Convert', v: 'Speed-to-lead that books consults while leads are hot.' },
                { k: 'Scale', v: 'A system that grows revenue without growing chaos.' },
              ].map((c) => (
                <div key={c.k} className="bg-[var(--paper)] p-7">
                  <div className="kicker text-[10px] text-[var(--red-deep)] mb-3">{c.k}</div>
                  <p className="text-sm text-[var(--ink)]/75 leading-relaxed">{c.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section id="results" className="bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-32 relative grain">
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="h-px w-12 bg-[var(--red)]" />
              <span className="kicker text-[11px] text-[var(--red-bright)]">Real Firms, Real Growth</span>
            </div>
          </Reveal>
          <div className="relative">
            <span className="font-display font-black text-[var(--red)] text-[8rem] leading-none absolute -top-12 -left-2 opacity-90 select-none" aria-hidden>“</span>
            <blockquote className="relative">
              <p className="font-display font-semibold text-[clamp(1.5rem,4vw,2.6rem)] leading-[1.15] tracking-tight min-h-[180px]">
                {TESTIMONIALS[t].quote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--red)]" />
                <div>
                  <div className="font-bold">{TESTIMONIALS[t].name}</div>
                  <div className="text-[var(--paper)]/55 text-sm">{TESTIMONIALS[t].co}</div>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="flex gap-2 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setT(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1 transition-all duration-300 ${i === t ? 'w-10 bg-[var(--red)]' : 'w-5 bg-[var(--ink-line)] hover:bg-[var(--paper)]/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TEAM ━━━ */}
      <section id="team" className="bg-[var(--paper)] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16 border-b border-[var(--paper-line)] pb-8">
              <h2 className="headline text-[clamp(2rem,5vw,3.4rem)] max-w-xl">THE TEAM BEHIND THE RESULTS.</h2>
              <p className="text-[var(--muted)] max-w-xs text-sm leading-relaxed">Strategists, technologists, and operators obsessed with your pipeline.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 120}>
                <div className="group">
                  <div className="facet-card relative overflow-hidden bg-[var(--ink)] aspect-[4/5]">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--red)]" />
                  </div>
                  <div className="mt-5">
                    <div className="font-display font-extrabold text-lg">{m.name}</div>
                    <div className="kicker text-[10px] text-[var(--red-deep)] mt-1">{m.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section id="contact" className="relative bg-[var(--red)] text-white py-24 lg:py-32 grain overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -bottom-24 w-[460px] opacity-10">
          <img src="/mb-preview/logo.png" alt="" aria-hidden className="w-full invert" />
        </div>
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="kicker text-[11px] text-white/70 mb-6 block">Let&apos;s Talk Pipeline</span>
            <h2 className="headline text-[clamp(2.4rem,7vw,5.4rem)] max-w-4xl mb-8">
              READY TO STOP LEAVING MONEY ON THE TABLE?
            </h2>
            <p className="text-white/85 text-lg max-w-2xl mb-12 leading-relaxed">
              Every day without optimized intake is revenue walking out the door. Book a free consultation and we&apos;ll show you exactly where yours is leaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+18334382855" className="facet-card bg-[var(--ink)] hover:bg-black text-white px-9 py-4 font-bold uppercase tracking-wide text-sm transition-colors text-center">
                Call 1-833-GET-BULL
              </a>
              <a href="mailto:hello@getmarketingbull.com" className="px-9 py-4 font-bold uppercase tracking-wide text-sm border border-white/40 hover:bg-white hover:text-[var(--red)] transition-colors text-center">
                Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-[var(--ink)] text-[var(--paper)]/60">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src="/mb-preview/logo.png" alt="Marketing Bull" width={34} height={34} />
                <span className="font-display font-extrabold text-[var(--paper)] tracking-tight">
                  MARKETING<span className="text-[var(--red)]">BULL</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">Intake optimization &amp; growth systems for law firms and medical practices.</p>
            </div>
            <div>
              <h4 className="kicker text-[10px] text-[var(--paper)] mb-5">Contact</h4>
              <address className="not-italic text-sm space-y-1.5">
                <p>319 Clematis Street, Suite 300</p>
                <p>West Palm Beach, FL 33401</p>
                <p><a href="tel:+18334382855" className="text-[var(--red-bright)] hover:text-white transition-colors">1-833-GET-BULL</a></p>
                <p><a href="mailto:hello@getmarketingbull.com" className="text-[var(--red-bright)] hover:text-white transition-colors">hello@getmarketingbull.com</a></p>
              </address>
            </div>
            <div>
              <h4 className="kicker text-[10px] text-[var(--paper)] mb-5">Services</h4>
              <ul className="text-sm space-y-2.5">
                <li><a href="#services" className="hover:text-[var(--paper)] transition-colors">Intake OS</a></li>
                <li><a href="#services" className="hover:text-[var(--paper)] transition-colors">AI Automation</a></li>
                <li><a href="#services" className="hover:text-[var(--paper)] transition-colors">Performance Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="kicker text-[10px] text-[var(--paper)] mb-5">Company</h4>
              <ul className="text-sm space-y-2.5">
                <li><a href="#approach" className="hover:text-[var(--paper)] transition-colors">Our Approach</a></li>
                <li><a href="#results" className="hover:text-[var(--paper)] transition-colors">Results</a></li>
                <li><a href="#team" className="hover:text-[var(--paper)] transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-[var(--paper)] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--ink-line)] pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} Marketing Bull, LLC. All rights reserved.</p>
            <div className="flex gap-7">
              <a href="#" className="hover:text-[var(--paper)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--paper)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
