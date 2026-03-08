'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date('2026-04-15T09:00:00-04:00');

    const tick = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {blocks.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {String(b.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-blue-200 mt-2 uppercase tracking-widest font-medium">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // TODO: wire to email provider
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-950 text-white overflow-hidden flex flex-col">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-red-500/15 rounded-full blur-[120px] animate-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[150px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Marketing Bull" width={44} height={44} className="rounded-lg" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            MARKETING <span className="text-red-500">BULL</span>
          </span>
        </div>
        <a
          href="tel:+18334288855"
          className="hidden sm:flex items-center gap-2 text-sm text-blue-300 hover:text-white transition"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          1-833-GET-BULL
        </a>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-8">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            New Website Launching Soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-4xl mb-6 animate-fade-in-up">
          Something{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            Bigger
          </span>{' '}
          Is Coming
        </h1>

        {/* Sub */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed animate-fade-in-up-delay">
          We&apos;re rebuilding our digital home from the ground up.
          Same Marketing Bull results — elevated experience.
        </p>

        {/* Countdown */}
        <div className="mb-12 animate-fade-in-up-delay-2">
          <CountdownTimer />
        </div>

        {/* Email capture */}
        <div className="w-full max-w-md animate-fade-in-up-delay-2">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for launch updates"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition backdrop-blur-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition shrink-0"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="bg-green-500/10 border border-green-400/20 rounded-xl px-6 py-4 text-green-300 text-sm">
              ✓ You&apos;re on the list. We&apos;ll notify you at launch.
            </div>
          )}
        </div>

        {/* Existing clients CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm animate-fade-in-up-delay-3">
          <span className="text-slate-500">Already a client?</span>
          <div className="flex items-center gap-4">
            <a
              href="tel:+18334288855"
              className="text-white hover:text-blue-300 font-medium transition flex items-center gap-2"
            >
              📞 Call Us
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="mailto:hello@getmarketingbull.com"
              className="text-white hover:text-blue-300 font-medium transition flex items-center gap-2"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-slate-600">
        &copy; 2026 Marketing Bull, LLC &middot; West Palm Beach, FL
      </footer>

      <style jsx>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }
        .animate-drift-1 { animation: drift1 12s ease-in-out infinite; }
        .animate-drift-2 { animation: drift2 15s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-fade-in-up-delay { animation: fadeInUp 0.8s ease-out 0.15s both; }
        .animate-fade-in-up-delay-2 { animation: fadeInUp 0.8s ease-out 0.3s both; }
        .animate-fade-in-up-delay-3 { animation: fadeInUp 0.8s ease-out 0.5s both; }
      `}</style>
    </div>
  );
}
