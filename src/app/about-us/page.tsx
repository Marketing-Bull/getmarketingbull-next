import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Marketing Bull is a small senior growth consultancy in West Palm Beach that works only with law firms and medical practices. Meet the two people who do the work.',
  alternates: { canonical: `${COMPANY.website}/about-us` },
};

const TEAM = [
  {
    name: 'Alexander M. Babenchuk',
    role: 'Founder · Strategy, client relationships, copy',
    photo: '/alex.webp',
    bio: 'Alex has spent more than a decade building growth systems for personal injury firms and medical practices — from a referral brand launched into the New York market with billboards, radio, and a call center, to single-location clinics that needed a front door. He runs every engagement personally.',
  },
  {
    name: 'Oleg M. Babenchuk',
    role: 'Technical delivery · Web, paid media, integrations',
    photo: '/oleg.webp',
    bio: 'Oleg builds what the engagement calls for: the site, the tracking, the ad accounts, the CRM wiring. He has built websites and intake infrastructure for dozens of PI firms and medical practices, and he is the reason the fourteen-day website is fourteen days.',
  },
];

const BELIEFS = [
  { title: 'Diagnose before prescribing', body: 'The wrong fix is expensive. We measure where a firm is losing cases or patients before we recommend anything, and we say so when the answer is "not us."' },
  { title: 'Build what we recommend', body: 'A strategy in a slide deck is a strategy that dies there. Every engagement ends in something running, and we stay accountable for the number it was meant to move.' },
  { title: 'The client owns everything', body: 'Code, domain, hosting, ad accounts, data. We build inside infrastructure you control so the relationship continues because it is working, never because leaving would mean starting over.' },
  { title: 'Fixed scope, published price', body: 'We define the deliverable, the date, and the fee before anything begins, and we publish the fee. The first conversation is about your firm, not your budget.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative py-24 md:py-32 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">About</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">Small on purpose. Narrow on purpose.</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Marketing Bull is a two-person growth consultancy in West Palm Beach. We work only with law firms and medical practices, and the people you meet on the first call are the people who do the work.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How we got here</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">We kept asking what happened after the click.</h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-lg text-slate-700 leading-relaxed">
            <p>Marketing Bull started as a conventional agency — websites, search, paid media — for whoever asked. The clients who got the best results had two things in common: they were law firms or medical practices, and the work that moved their numbers was rarely the ad. It was the site that finally loaded, the phone that finally got answered, the content that finally showed up when a prospect searched.</p>
            <p>So we narrowed. Two verticals, where we know the regulations and the patient or client behavior cold. Three fixed-scope engagements, each built around one of the three places a case or patient is lost. And a consulting posture: diagnose first, build what the diagnosis calls for, and stay accountable for the outcome.</p>
            <p>The work we are proudest of is in the <Link href="/case-studies" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-red-600">case studies</Link> — with only the numbers the client reported.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">The team</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Two people. No account-manager layer.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-8 flex gap-6">
                <img src={m.photo} alt={m.name} width={80} height={80} className="h-20 w-20 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900">{m.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mt-1 mb-3">{m.role}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What we believe</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Four commitments, in writing.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {BELIEFS.map((b, i) => (
              <div key={b.title} className="bg-white p-8 md:p-10">
                <span className="text-xs font-black text-red-600">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{b.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="container-md max-w-3xl text-sm text-slate-500">
          <p>{COMPANY.legalName} · {COMPANY.address} · <a href={`tel:${COMPANY.phoneFormatted}`} className="font-semibold text-slate-700">{COMPANY.phone}</a> · <a href={`mailto:${COMPANY.email}`} className="font-semibold text-slate-700">{COMPANY.email}</a></p>
        </div>
      </section>

      <CTASection
        title="Start with a conversation."
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first — and whether we're the right people to look."
        primaryCTA={{ text: 'Book a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'See the engagements', href: '/pricing' }}
      />
    </>
  );
}
