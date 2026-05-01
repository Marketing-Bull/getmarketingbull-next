'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Scroll-triggered counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval>;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const step = target / 50;
      id = setInterval(() => {
        cur += step;
        if (cur >= target) { setCount(target); clearInterval(id); }
        else setCount(Math.floor(cur));
      }, 25);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); clearInterval(id); };
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Scroll reveal ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setShow(true), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Data ─── */
const FAILURE_MODES = [
  {
    number: '01',
    title: 'Speed to Lead',
    stat: '78 minutes',
    statLabel: 'average firm response time',
    body: 'The lead-to-case window for PI closes in under 5 minutes. A prospect who submits a form at 2pm has called three firms by 2:10. Most law firms call back at end of day — or the next morning.',
  },
  {
    number: '02',
    title: 'After-Hours Coverage',
    stat: '42%',
    statLabel: 'of PI leads come in after 5pm',
    body: 'Slip-and-falls happen at night. Car accidents happen on weekends. Your competitors who answer at 8pm are signing cases you generated. No one is staffed to catch them.',
  },
  {
    number: '03',
    title: 'Follow-Up Persistence',
    stat: '1.3×',
    statLabel: 'average contact attempts before giving up',
    body: 'Research shows 80% of sales require 5+ follow-up attempts. Most PI intake staff make one call, leave one voicemail, and move on. That lead paid for itself in ad spend — and then was abandoned.',
  },
  {
    number: '04',
    title: 'Attribution Blindness',
    stat: '0',
    statLabel: 'firms tracking click-to-signed-case',
    body: 'You know your cost per click. You probably don\'t know your cost per retained case. Without full-funnel tracking from ad to signed retainer, you\'re optimizing for the wrong thing — and can\'t prove ROI to yourself.',
  },
];

const WHAT_WE_BUILD = [
  {
    icon: '⚡',
    title: 'Instant Response System',
    desc: 'Every web form, chat, and inbound call triggers an automated SMS + email within 90 seconds. No exceptions. No leads sitting in an inbox overnight.',
  },
  {
    icon: '🎙️',
    title: 'AI Voice Agent',
    desc: 'A 24/7 AI phone agent handles after-hours calls — qualifies the case, gathers contact info, and books a consultation in your calendar. Your competition goes to voicemail. You don\'t.',
  },
  {
    icon: '🔁',
    title: '14-Day Nurture Sequence',
    desc: 'Prospects who don\'t convert immediately get a structured 14-day follow-up sequence across SMS, email, and voicemail drops — tuned specifically for PI case language.',
  },
  {
    icon: '📋',
    title: 'Intake Scripts & Training',
    desc: 'We rewrite your intake scripts based on what actually converts. Your staff learns how to qualify cases, handle objections, and book consults — not just take messages.',
  },
  {
    icon: '📊',
    title: 'Full-Funnel Attribution',
    desc: 'We track every lead from ad click or organic search through to retained case inside GHL. You see cost per signed case — not just cost per click — every single month.',
  },
  {
    icon: '🛠️',
    title: 'Done-For-You GHL Setup',
    desc: 'We build everything inside GoHighLevel: your CRM pipeline, intake forms, automations, and reporting dashboard. You own the account and the data. Always.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Intake Audit',
    duration: 'Week 1',
    desc: 'We record and review your current intake process end-to-end. Mystery calls, form tests, CRM review. You get a written report of every place a case could slip through — before we build anything.',
  },
  {
    step: '02',
    title: 'System Build',
    duration: 'Weeks 2–3',
    desc: 'We build your full intake OS in GHL: instant-response automations, AI voice agent, 14-day nurture sequences, intake forms, CRM pipeline, and attribution tracking. Nothing is left unbuilt.',
  },
  {
    step: '03',
    title: 'Launch & Optimize',
    duration: 'Week 4 + ongoing',
    desc: 'We go live, monitor the first 30 days closely, and tune everything based on real data. Monthly reporting shows you speed-to-lead, conversion rates, and cost per retained case.',
  },
];

const TESTIMONIALS = [
  {
    quote: "We were spending $40k/month on Google Ads and had no idea how many cases we were actually signing from it. Within 60 days they had full attribution built and we cut our wasted spend by 30%.",
    name: 'Isak Yuhan',
    firm: '1-800-HURT-511',
    result: '30% reduction in wasted ad spend',
  },
  {
    quote: "I have personally referred this team to colleagues because I knew I could trust the results. Our intake pipeline went from chaos to a system that runs itself.",
    name: 'Todd D. Muhlstock, Esq.',
    firm: 'WeSueThem.com',
    result: 'Intake pipeline fully systematized',
  },
  {
    quote: "Excellent, prompt, very professional. They fixed our after-hours problem in the first week — we were losing cases every weekend and didn't even know it.",
    name: 'Laura Cole, Esq.',
    firm: 'Attorney at Law',
    result: 'After-hours coverage solved in week 1',
  },
];

const FAQS = [
  {
    q: 'Do we need to already be using GoHighLevel?',
    a: 'No. We set up your GHL account from scratch as part of the engagement. You own the account and all the data — we just build it and hand you the keys.',
  },
  {
    q: 'How long until we see results?',
    a: 'The instant-response system goes live in week two. Most clients see measurable improvement in speed-to-lead within the first 30 days. Full attribution takes 60–90 days to build a meaningful data set.',
  },
  {
    q: 'We already have intake staff. Does this replace them?',
    a: 'No — it makes them better. The AI agent handles after-hours and the first 90-second response. Your staff focuses on warm conversations with pre-qualified prospects who are already expecting your call.',
  },
  {
    q: 'What size firm is this built for?',
    a: 'PI firms doing between $1M–$20M in annual revenue get the most out of this. You need to be spending on lead generation already — this system maximizes what you\'re already paying for.',
  },
  {
    q: 'Is this a software subscription or a service?',
    a: 'It\'s a service. We build, configure, and optimize everything for you. GHL has its own monthly fee ($97–$297/mo) which you pay directly. Our fee covers the buildout, strategy, and ongoing optimization.',
  },
];

export default function PIIntakeGrowth() {
  const [currentTest, setCurrentTest] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCurrentTest((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-lg tracking-tight">PI Intake <span className="text-red-500">Growth</span></span>
            <span className="text-slate-500 text-[10px] tracking-widest uppercase">by Marketing Bull</span>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-400 hover:text-white text-sm transition">How It Works</a>
            <a href="#results" className="text-slate-400 hover:text-white text-sm transition">Results</a>
            <a href="#faq" className="text-slate-400 hover:text-white text-sm transition">FAQ</a>
            <a href="tel:+18334382855" className="text-slate-400 hover:text-white text-sm transition">1-833-GET-BULL</a>
            <a
              href="#contact"
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-lg shadow-red-600/20"
            >
              Book Free Audit
            </a>
          </div>
          {/* Mobile */}
          <button className="md:hidden text-slate-400 hover:text-white transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 flex flex-col gap-4">
            <a href="#how-it-works" className="text-slate-400 text-sm" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#results" className="text-slate-400 text-sm" onClick={() => setMobileMenuOpen(false)}>Results</a>
            <a href="#faq" className="text-slate-400 text-sm" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="tel:+18334382855" className="text-slate-400 text-sm">1-833-GET-BULL</a>
            <a href="#contact" className="bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>
              Book Free Audit
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-slate-950 text-white overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-slate-900 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-8 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
              Built exclusively for personal injury firms
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.02] mb-8">
              The First Attorney<br className="hidden sm:block" /> to Respond<br className="hidden sm:block" />
              <span className="text-red-500"> Gets the Case.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              Your average competitor responds to leads in 78 minutes. The window closes in 5.
              PI Intake Growth is the done-for-you system that fixes it.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-sm text-slate-500 mb-10">GHL-powered · AI voice coverage · 90-second response · Full attribution</p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-red-600/25"
              >
                Book Your Free Intake Audit
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:border-white/50 hover:bg-white/5 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
              >
                See How It Works
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-950 border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
            {[
              { n: 5, s: ' min', l: 'Lead Window', d: 'Before prospects move on' },
              { n: 78, s: ' min', l: 'Avg Response', d: 'Typical firm response time' },
              { n: 42, s: '%', l: 'After-Hours', d: 'PI leads that come in after 5pm' },
              { n: 80, s: '%', l: 'Need 5+ Touches', d: 'Before a lead converts' },
            ].map((st) => (
              <div key={st.l} className="text-center px-4 py-8">
                <div className="text-3xl font-black text-red-400 mb-1 tabular-nums">
                  <Counter target={st.n} suffix={st.s} />
                </div>
                <div className="text-xs font-bold text-white mb-0.5">{st.l}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{st.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM: 4 FAILURE MODES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Where Firms Lose Cases</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
                Broken Intake Has<br className="hidden sm:block" /> Four Failure Modes
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Every one of these is costing you signed cases right now — and you probably can&apos;t see it because the loss happens silently.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAILURE_MODES.map((f, i) => (
              <Reveal key={f.number} delay={i * 80}>
                <div className="group p-8 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-5 mb-5">
                    <span className="text-slate-200 font-black text-4xl leading-none tabular-nums">{f.number}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-2xl font-black text-red-500 tabular-nums">{f.stat}</span>
                        <span className="text-xs text-slate-400">{f.statLabel}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section id="product" className="py-24 bg-slate-950 text-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-5xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-400 font-semibold text-xs uppercase tracking-[0.18em] mb-3">The Product</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
                A Complete Intake OS.<br className="hidden sm:block" /> Done For You.
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                PI Intake Growth isn&apos;t software you configure yourself. We build the whole system, integrate it with your lead sources, and hand you a machine that runs while you focus on cases.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_WE_BUILD.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 h-full">
                  <span className="text-2xl mb-4 block">{item.icon}</span>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">The Process</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">Live in 30 Days</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                From audit to fully-running intake system in four weeks. No months-long projects, no DIY configuration.
              </p>
            </div>
          </Reveal>
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div className="flex gap-6 p-8 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-100 border border-red-100 flex items-center justify-center transition-colors">
                    <span className="text-red-500 font-black text-sm">{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                      <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">{s.duration}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="results" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Client Results</p>
              <h2 className="text-4xl font-black tracking-tight mb-3">From the Firms We Work With</h2>
              <p className="text-slate-500 text-base">Real attorneys. Real cases. Real numbers.</p>
            </div>
          </Reveal>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-10 min-h-[200px] flex flex-col justify-center">
              <div className="flex gap-0.5 mb-6">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}</div>
              <blockquote className="text-lg sm:text-xl text-slate-800 leading-relaxed mb-6 font-medium">
                &ldquo;{TESTIMONIALS[currentTest].quote}&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900">{TESTIMONIALS[currentTest].name}</p>
                  <p className="text-slate-400 text-sm">{TESTIMONIALS[currentTest].firm}</p>
                </div>
                <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                  ✓ {TESTIMONIALS[currentTest].result}
                </span>
              </div>
            </div>
            <div className="border-t border-slate-100 px-10 py-4 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTest(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTest ? 'bg-red-500 scale-125' : 'bg-slate-200 hover:bg-slate-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Common Questions</p>
              <h2 className="text-4xl font-black tracking-tight">FAQ</h2>
            </div>
          </Reveal>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors gap-4"
                    aria-expanded={openFAQ === i}
                  >
                    <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                    <span className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFAQ === i && (
                    <div className="px-6 pb-5 border-t border-slate-100 bg-slate-50">
                      <p className="text-slate-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section id="contact" className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/25 via-transparent to-blue-950/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <p className="text-red-400 font-semibold text-xs uppercase tracking-[0.18em] mb-5">Get Started</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-6">
                  Book Your Free<br />Intake Audit
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  30 minutes. We audit your current intake process, identify exactly where cases are slipping through, and give you a clear action plan — whether you work with us or not.
                </p>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: '🔍', label: 'Intake Process Review', desc: 'We map every lead source and contact point.' },
                    { icon: '📞', label: 'Mystery Call + Form Test', desc: 'We test your intake from a prospect\'s perspective.' },
                    { icon: '📄', label: 'Written Action Plan', desc: 'A prioritized list of fixes. No pitch. No fluff.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-white text-sm">{item.label}</p>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <a href="tel:+18334382855" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                    <span>📞</span> 1-833-GET-BULL
                  </a>
                  <a href="mailto:hello@getmarketingbull.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                    <span>✉️</span> hello@getmarketingbull.com
                  </a>
                </div>
              </div>
              {/* Right — Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/30">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Request Your Free Audit</h3>
                <p className="text-slate-500 text-sm mb-6">We respond within one business hour.</p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                      <input type="text" required placeholder="Jane Smith" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Direct Phone *</label>
                      <input type="tel" required placeholder="(555) 123-4567" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work Email *</label>
                    <input type="email" required placeholder="jane@yourfirm.com" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Firm Name *</label>
                    <input type="text" required placeholder="Smith & Associates PI Law" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Monthly Lead Volume (approx)</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white">
                      <option value="">Select range</option>
                      <option>Under 50 leads/mo</option>
                      <option>50–150 leads/mo</option>
                      <option>150–400 leads/mo</option>
                      <option>400+ leads/mo</option>
                    </select>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <input type="checkbox" id="sms" className="mt-1 accent-red-600" />
                    <label htmlFor="sms" className="text-xs text-slate-500 leading-relaxed">
                      I consent to receive SMS messages from Marketing Bull about my inquiry. Message & data rates may apply.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-600/20"
                  >
                    Book My Free Intake Audit →
                  </button>
                  <p className="text-center text-xs text-slate-400">No commitment. No sales pressure. Just a free audit.</p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-white font-bold">PI Intake <span className="text-red-500">Growth</span></span>
            <span className="text-slate-500 text-xs">A product by <a href="https://getmarketingbull.com" className="hover:text-white transition">Marketing Bull, LLC</a></span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <a href="tel:+18334382855" className="hover:text-white transition">1-833-GET-BULL</a>
            <a href="mailto:hello@getmarketingbull.com" className="hover:text-white transition">hello@getmarketingbull.com</a>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
          </div>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Marketing Bull, LLC</p>
        </div>
      </footer>

    </div>
  );
}
