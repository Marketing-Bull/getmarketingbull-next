'use client';

import { useEffect, useRef, useState } from 'react';
import { Scale, Bot, TrendingUp } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import type { LucideIcon } from 'lucide-react';

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
      const step = target / 40;
      id = setInterval(() => {
        cur += step;
        if (cur >= target) { setCount(target); clearInterval(id); }
        else setCount(Math.floor(cur));
      }, 30);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); clearInterval(id); };
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>{children}</div>;
}

const SERVICES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Scale, title: 'Intake OS', desc: 'Broken intake is the silent killer of PI law firms. We implement end-to-end intake systems that capture every lead, nurture, and book consultations instantly.' },
  { icon: Bot, title: 'AI Automation', desc: 'From custom GHL voice agents to automated lead scoring and CRM workflows, we build the digital workforce that lets you scale without hiring 10 more staff.' },
  { icon: TrendingUp, title: 'Performance Marketing', desc: "Data-driven PPC campaigns that don't just generate vanity clicks — we focus on qualified conversions, lead quality, and verified case acquisition." },
];

const TESTIMONIALS = [
  { name: 'Dr. Manoj Sadhnani', co: 'Queens Hyperbaric', quote: "Working with Marketing Bull has been a game-changer for my practice — 30 new faces every month." },
  { name: 'Todd D. Muhlstock, Esq.', co: 'WeSueThem.com', quote: "I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results." },
  { name: 'Laura Cole, Esq.', co: 'Attorney at Law', quote: "Marketing Bull is excellent!! Prompt service, rapid replies, and very professional!!" },
  { name: 'Angela McMullin', co: '3D Dental', quote: "Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results." },
  { name: 'Isak Yuhan', co: '1-800-HURT-511', quote: "They delivered results beyond our expectations — our intake pipeline has never been stronger." },
  { name: 'Vinay Gaonkar', co: 'GreenBills', quote: "Excellent results on leads and client conversions. Highly recommend Marketing Bull for any growing business." },
  { name: 'Michael R.', co: 'South Florida PI Firm', quote: "We went from missing 40% of our calls to booking every single lead. The intake system they built paid for itself in week one." },
  { name: 'Dr. Patricia W.', co: 'Wellness Medical Center', quote: "Our schedule went from half-full to booked out three weeks in advance. The patient recall system alone was worth every dollar." },
  { name: 'James T.', co: 'Premier Roofing Co.', quote: "Before Marketing Bull, we'd lose leads overnight. Now we get an instant text-back and our close rate on inbound calls is up 60%." },
];

const TEAM = [
  { name: 'Alexander M. Babenchuk', role: 'President & Managing Director', photo: '/mb-preview/alex.webp' },
  { name: 'Oleg M. Babenchuk', role: 'Chief Marketing Officer', photo: '/mb-preview/oleg.webp' },
];

export default function HomePage() {
  const [currentTest, setCurrentTest] = useState(0);
  useEffect(() => { const id = setInterval(() => setCurrentTest((p) => (p + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(id); }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/15 via-transparent to-blue-950/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-8 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
              Intake OS &amp; Growth Systems
            </p>
          </Reveal>
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto">
              Scalable Operating Systems for Law Firms &amp; Medical Practices
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              We don&apos;t just run ads. We build the operating systems that fix slow intake, missed calls, and broken tracking.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-row flex-wrap gap-3 justify-center">
              <a href="#contact" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-600/20">
                Schedule Free Consultation
              </a>
              <a href="tel:+18334382855" className="inline-flex items-center gap-2 border border-white/25 text-white hover:border-white/60 hover:bg-white/5 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5">
                Call 1-833-GET-BULL
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS — horizontal bar */}
      <section className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-slate-800">
            {[
              { n: 25, s: '%', l: 'Intake Lift', d: 'Average speed-to-lead improvement' },
              { n: 500, s: '+', l: 'Automations', d: 'Workflows deployed across clients' },
              { n: 30, s: '+', l: 'Growth Partners', d: 'Active client engagements' },
            ].map((st) => (
              <div key={st.l} className="text-center px-6 py-10">
                <div className="text-4xl font-black text-blue-400 mb-1 tracking-tight">
                  <Counter target={st.n} suffix={st.s} />
                </div>
                <div className="text-sm font-bold text-white mb-1">{st.l}</div>
                <div className="text-xs text-slate-500">{st.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">What We Build</p>
              <h2 className="text-4xl font-black tracking-tight mb-4">Scalable Operating Systems</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">We build the systems that intake every lead, track every dollar, and scale your firm.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Reveal key={s.title}>
                <div className="group p-8 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <s.icon className="w-7 h-7 text-red-500 mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
                  <div className="mt-6">
                    <span className="text-red-500 font-semibold text-sm group-hover:gap-2 transition-all">Learn More →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="results" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Client Results</p>
              <h2 className="text-4xl font-black tracking-tight mb-4">Real Results, Real Growth</h2>
              <p className="text-lg text-slate-500">Don&apos;t take our word for it — hear from our clients</p>
            </div>
          </Reveal>
          <div className="bg-white p-10 sm:p-12 rounded-2xl shadow-sm border border-slate-100 text-center min-h-[240px] flex flex-col justify-center">
            <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}</div>
            <blockquote className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">&ldquo;{TESTIMONIALS[currentTest].quote}&rdquo;</blockquote>
            <p className="font-bold text-slate-900">{TESTIMONIALS[currentTest].name}</p>
            <p className="text-slate-400 text-sm">{TESTIMONIALS[currentTest].co}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setCurrentTest(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTest ? 'bg-red-500 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`} />)}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">The Team</p>
              <h2 className="text-4xl font-black tracking-tight mb-4">The People Behind the Results</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Strategists, technologists, and operators who've done this before.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-xl mx-auto">
            {TEAM.map((t) => (
              <Reveal key={t.name}>
                <div className="text-center">
                  <img src={t.photo} alt={t.name} width={120} height={120} className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-2 border-slate-100 shadow-md" />
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / FREE AUDIT */}
      <section id="contact" className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-blue-950/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left — copy */}
              <div>
                <p className="text-red-400 font-semibold text-xs uppercase tracking-[0.18em] mb-4">Get Started</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Get Your Free Growth Audit</h2>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                  30 minutes. No pitch. No pressure. We audit your intake, marketing stack, and attribution — then give you a clear action plan you can use whether you work with us or not.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    { label: 'Intake Audit', desc: 'We map every lead source and find where calls are falling through.' },
                    { label: 'Marketing Review', desc: 'We analyze your ad spend, SEO, and attribution for quick wins.' },
                    { label: 'Clear Action Plan', desc: 'You leave with a prioritized list of fixes — no fluff.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">{item.label} — </span>
                        <span className="text-slate-400 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 text-sm text-slate-400">
                  <a href="tel:+18334382855" className="hover:text-white transition">📞 1-833-GET-BULL</a>
                  <a href="mailto:hello@getmarketingbull.com" className="hover:text-white transition">✉️ hello@getmarketingbull.com</a>
                </div>
              </div>

              {/* Right — form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Request Your Free Audit</h3>
                <p className="text-slate-500 text-sm mb-6">We respond within one business hour.</p>
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
