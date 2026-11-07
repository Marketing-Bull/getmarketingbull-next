import type { Metadata } from 'next';
import Link from 'next/link';
import AuditForm from '@/components/AuditForm';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { COMPANY } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';

// The root layout's title template appends " | Marketing Bull".
export const metadata: Metadata = pageMeta({
  path: '/ai-site-audit',
  title: 'Free AI Site Audit for AI-Built Websites',
  description:
    'Built your site with Lovable, Bolt, v0 or another AI tool? Get a free audit and a fix document your AI can execute: crawlability, exposed keys, speed and intake.',
});

const CHECKS = [
  {
    title: 'Can search engines and AI assistants read it?',
    body: 'Many AI-built sites render in the browser, so Google, ChatGPT and Perplexity get a nearly empty page. We check what a crawler actually receives, plus titles, headings, sitemap and robots rules.',
  },
  {
    title: 'Are your API keys sitting in the page source?',
    body: 'We scan the HTML and JavaScript bundles for secret keys (OpenAI, Stripe, Supabase service keys and more) that anyone can copy.',
  },
  {
    title: 'Will AI answers cite you?',
    body: 'Structured data for law firms and medical practices, llms.txt, and the business facts AI assistants need to recommend you by name.',
  },
  {
    title: 'Does a mobile visitor become a call?',
    body: 'Mobile speed from Google PageSpeed, a tap-to-call number, a working form path, and leftover template text that costs trust.',
  },
];

const STEPS = [
  { title: 'Paste your URL', body: 'Any public site, whatever built it: Lovable, Bolt, v0, Replit, Base44, Framer, Cursor or Claude Code.' },
  { title: 'We run 20+ checks', body: 'A fixed checklist, scored the same way for every site. The score comes from the checks, not from a model’s opinion.' },
  { title: 'Your AI fixes it', body: 'You get FIX-PROMPTS.md by email: one copy-paste prompt per issue, in priority order, with a way to confirm each fix worked.' },
];

export default function AiSiteAuditPage() {
  return (
    <>
      {/* ── HERO + FORM ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="container-md relative py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
                Free tool · AI-built websites
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Your AI built the site. Ours checks the work.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Paste your URL. We audit what AI site builders routinely get wrong (crawlability, exposed keys, speed and the path to a call) and email you a fix document your AI can execute, prompt by prompt.
              </p>
              <p className="mt-6 text-sm text-slate-400">You keep the findings whether or not you ever work with us.</p>
            </div>
            <div className="lg:col-span-5">
              <div id="get-audit" className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl p-8 scroll-mt-24">
                <AuditForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE CHECK ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What we check</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">The four places AI-built sites quietly fail.</h2>
            </div>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHECKS.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 100} className="h-full rounded-2xl border border-slate-200 p-8">
                <p className="text-xl font-black tracking-tight text-slate-900">{c.title}</p>
                <p className="mt-3 text-slate-600 leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">How it works</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 100} className="flex gap-5 rounded-2xl bg-white border border-slate-200 p-6">
                  <span className="text-xs font-black text-red-600 pt-1" aria-hidden="true">0{i + 1}</span>
                  <span className="text-slate-700 leading-relaxed">
                    <span className="block font-bold text-slate-900">{s.title}</span>
                    {s.body}
                  </span>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button variant="primary" size="lg" href="#get-audit">Audit my site</Button>
              <Link href="/products/website-in-14-days" className="text-sm font-semibold text-slate-600 hover:text-red-600">
                Rather we rebuild it? Website in 14 Days →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAGE FOOTER LINE ── */}
      <section className="py-8 bg-white">
        <p className="container-md text-center text-sm text-slate-500">
          {COMPANY.name} · {COMPANY.address} ·{' '}
          <a href={`tel:${COMPANY.phoneE164}`} className="font-semibold text-slate-700 hover:text-red-600">{COMPANY.phone}</a>
        </p>
      </section>
    </>
  );
}
