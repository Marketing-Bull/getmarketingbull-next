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
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
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
  return (
    <div ref={ref} className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  );
}

/* ── Data ── */
const SERVICES = [
  { icon: '⚖️', title: 'Intake OS', desc: 'Broken intake is the silent killer of PI law firms. We implement end-to-end intake systems that capture every lead, nurture, and book consultations instantly.' },
  { icon: '🤖', title: 'AI Automation', desc: 'From custom GHL voice agents to automated lead scoring and CRM workflows, we build the digital workforce that lets you scale without hiring 10 more staff.' },
  { icon: '📈', title: 'Performance Marketing', desc: "Data-driven PPC campaigns that don't just generate vanity clicks—we focus on qualified conversions, lead quality, and verified case acquisition." },
];

const TESTIMONIALS = [
  { name: 'Dr. Manoj Sadhnani', co: 'Queens Hyperbaric', quote: "Working with Marketing Bull has been a game-changer for my practice — 30 new faces every month." },
  { name: 'Todd D. Muhlstock, Esq.', co: 'WeSueThem.com', quote: "I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results." },
  { name: 'Laura Cole, Esq.', co: 'Attorney at Law', quote: "Marketing Bull is excellent!! Prompt service, rapid replies, and very professional!!" },
  { name: 'Angela McMullin', co: '3D Dental', quote: "Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results." },
  { name: 'Isak Yuhan', co: '1-800-HURT-511', quote: "They delivered results beyond our expectations — our intake pipeline has never been stronger." },
  { name: 'Vinay Gaonkar', co: 'GreenBills', quote: "Excellent results on leads and client conversions. Highly recommend Marketing Bull for any growing business." },
];

const TEAM = [
  { name: 'Alexander M. Babenchuk', role: 'President & Managing Director', photo: '/mb-preview/alex.webp' },
  { name: 'Oleg M. Babenchuk', role: 'Chief Marketing Officer', photo: '/mb-preview/oleg.webp' },
  { name: 'Yossi Ben Barouch', role: 'Chief Technology Officer', photo: '/mb-preview/yossi.png' },
];

export default function HomePage() {
  const [currentTest, setCurrentTest] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrentTest((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ━━━ NAV ━━━ */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md text-white z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/mb-preview/logo.png" alt="Marketing Bull" width={36} height={36} className="rounded" />
            <span className="text-lg font-bold tracking-tight">
              Marketing <span className="text-red-500">Bull</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Results', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-slate-300 hover:text-white transition font-medium">
                {l}
              </a>
            ))}
            <a href="tel:+18334288855" className="text-sm text-blue-300 hover:text-white transition">
              1-833-GET-BULL
            </a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">
              Free Consultation
            </a>
          </div>
          <a href="tel:+18334288855" className="md:hidden text-blue-300 text-sm font-medium">📞 Call</a>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <Reveal>
            <p className="text-blue-300 font-medium mb-6 text-sm uppercase tracking-widest">Intake OS & Growth Systems</p>
          </Reveal>
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 max-w-5xl mx-auto">
              Scalable Operating Systems for Law Firms & Medical Practices
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              We don't just run ads. We build the operating systems that fix slow intake, missed calls, and broken tracking.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg shadow-blue-600/25">
                Schedule Free Consultation
              </a>
              <a href="tel:+18334288855" className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition">
                Call 1-833-GET-BULL
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ STATS ━━━ */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">The Numbers Don&apos;t Lie</h2>
        </div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { n: 25, s: '%', l: 'Intake Conversion', d: 'Average increase in speed to lead' },
            { n: 500, s: '+', l: 'Workflows Deployed', d: 'Automated business processes' },
            { n: 30, s: '+', l: 'Active Growth Partners', d: 'Trusting us with their pipeline' },
          ].map((st) => (
            <div key={st.l} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-800/80 transition">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                <Counter target={st.n} suffix={st.s} />
              </div>
              <div className="text-lg font-semibold mb-1">{st.l}</div>
              <div className="text-slate-400 text-sm">{st.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Scalable Operating Systems</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We build the systems that intake every lead, track every dollar, and scale your firm.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <Reveal key={s.title}>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-4xl mb-5">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                  <div className="mt-6">
                    <span className="text-blue-600 font-medium text-sm hover:text-blue-500 cursor-pointer">Learn More →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section id="results" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Real Results, Real Growth</h2>
              <p className="text-lg text-slate-600">Don&apos;t take our word for it — hear from our clients</p>
            </div>
          </Reveal>
          <div className="relative">
            <div className="bg-white p-10 sm:p-12 rounded-2xl shadow-lg border border-slate-100 text-center min-h-[260px] flex flex-col justify-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl text-slate-700 italic leading-relaxed mb-6 max-w-2xl mx-auto">
                &ldquo;{TESTIMONIALS[currentTest].quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-bold text-slate-900">{TESTIMONIALS[currentTest].name}</p>
                <p className="text-slate-500 text-sm">{TESTIMONIALS[currentTest].co}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTest(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentTest ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT / TEAM ━━━ */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet the Team Behind the Results</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A dedicated team of marketing strategists, technologists, and creatives working together to grow your business.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
            {TEAM.map((t) => (
              <Reveal key={t.name}>
                <div className="text-center">
                  <img
                    src={t.photo}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                  <p className="font-bold text-lg text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA / CONTACT ━━━ */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Every day without optimized intake is money left on the table. Let&apos;s fix that.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18334288855" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg shadow-blue-600/25">
                Call 1-833-GET-BULL
              </a>
              <a href="mailto:hello@getmarketingbull.com" className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-4 rounded-xl font-semibold text-lg transition">
                Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/mb-preview/logo.png" alt="Marketing Bull" width={28} height={28} className="rounded" />
                <span className="text-white font-bold">Marketing <span className="text-red-500">Bull</span></span>
              </div>
              <p className="text-sm leading-relaxed">Strategic marketing and intake optimization for growing businesses.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
              <p className="text-sm mb-1">319 Clematis Street, Suite 300</p>
              <p className="text-sm mb-3">West Palm Beach, FL 33401</p>
              <p className="text-sm"><a href="tel:+18334288855" className="text-blue-400 hover:text-blue-300">1-833-GET-BULL</a></p>
              <p className="text-sm"><a href="mailto:hello@getmarketingbull.com" className="text-blue-400 hover:text-blue-300">hello@getmarketingbull.com</a></p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Services</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#services" className="hover:text-white transition">Intake OS</a></li>
                <li><a href="#services" className="hover:text-white transition">AI Automation</a></li>
                <li><a href="#services" className="hover:text-white transition">Performance Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#results" className="hover:text-white transition">Results</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 Marketing Bull, LLC. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
