import type { Metadata } from 'next';
import Button from '@/components/Button';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Your audit is running',
  description: 'Your AI Site Audit is on its way by email.',
  // Same as /thank-you: noindex, no canonical, not in the sitemap.
  robots: { index: false, follow: true },
};

export default function AiSiteAuditThanksPage() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="container-md relative py-24 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">AI Site Audit</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">Your audit is running.</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Check your inbox in about five minutes for your score and <span className="font-semibold text-white">FIX-PROMPTS.md</span>. Paste the prompts into the AI tool that built your site, one at a time, in order. If an exposed key turns up, rotate it before anything else.
          </p>
          <p className="mt-4 text-sm text-slate-400">Nothing after ten minutes? Check spam, or reply to {COMPANY.email}.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="h-full flex flex-col rounded-2xl border border-red-500/40 bg-slate-900/60 p-8">
            <p className="text-slate-300 leading-relaxed flex-1">
              <span className="font-bold text-white">Rather have it done for you?</span> Website in 14 Days: a fast Next.js site built to convert, with schema markup, click-to-call and a lead form wired to your CRM. You own the code. Fixed scope and fixed price, agreed before we start.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="md" href="/products/website-in-14-days">See Website in 14 Days</Button>
            </div>
          </div>
          <div className="h-full flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-slate-300 leading-relaxed flex-1">
              <span className="font-bold text-white">Want to talk it through?</span> Twenty minutes on what the audit found and what we would fix first.
            </p>
            <div className="mt-8">
              <Button variant="secondary" size="md" href="/free-consultation">Book a 20-minute conversation</Button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Prefer to call?{' '}
          <a href={`tel:${COMPANY.phoneE164}`} className="font-semibold text-white underline decoration-red-500 underline-offset-4">{COMPANY.phone}</a>, Mon to Fri, 9am to 6pm ET.
        </p>
      </div>
    </section>
  );
}
