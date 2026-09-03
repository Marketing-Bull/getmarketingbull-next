import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Marketing Bull is a small senior team. We are not hiring right now, but we read every note from people who do good work in legal and medical marketing.',
  alternates: { canonical: `${COMPANY.website}/careers` },
};

export default function CareersPage() {
  return (
    <>
      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md max-w-3xl relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Careers</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">A small team, by design.</h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            There are no open roles at the moment. When we grow, it&apos;s deliberately — one person who is unusually good at one thing we need.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-3xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-4">If that might be you</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We work only with law firms and medical practices, so the people we hire tend to have already done something notable in one of those worlds — intake operations, legal or healthcare content, paid search for regulated verticals, or engineering on modern web stacks.
          </p>
          <p className="text-slate-700 leading-relaxed mb-8">
            Send a short note to <a href={`mailto:${COMPANY.email}`} className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-red-600">{COMPANY.email}</a> with what you&apos;ve built and a link to it. We read all of them and reply to the ones that fit.
          </p>
          <p className="text-sm text-slate-500">
            Looking to hire us instead? <Link href="/free-consultation" className="font-semibold text-slate-900 hover:text-red-600">Start a conversation →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
