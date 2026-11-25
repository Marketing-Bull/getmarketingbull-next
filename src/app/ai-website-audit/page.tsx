import type { Metadata } from 'next';
import AnswerBlock from '@/components/AnswerBlock';
import Button from '@/components/Button';
import FaqSection from '@/components/FaqSection';
import Reveal from '@/components/Reveal';
import SiteAuditTool from '@/components/SiteAuditTool';
import { SampleReport, StepArt, VisitorVsCrawler } from '@/components/AuditIllustrations';
import Link from 'next/link';
import { getCaseStudy } from '@/lib/caseStudies';
import { COMPANY } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';

// The layout's title template appends " | Marketing Bull".
export const metadata: Metadata = pageMeta({
  path: '/ai-website-audit',
  title: 'Free AI Website Audit for Lovable, Bolt & v0 Sites',
  description:
    'Built your firm or practice website with an AI builder? See what Google and ChatGPT actually see, and get a copy-paste prompt that tells your AI exactly what to fix.',
  ownOgImage: true,
});

const CHECKS = [
  { title: 'Can crawlers read it?', body: 'Most Lovable, Bolt and Base44 sites send an empty page and draw everything with JavaScript. Google may index it late; ChatGPT, Claude and Perplexity see nothing.' },
  { title: 'Is it allowed in search?', body: 'Leftover noindex tags, robots.txt rules that block Google or AI assistants, and canonicals pointing at the builder\'s preview domain.' },
  { title: 'Does it look like yours?', body: 'Placeholder titles like "Vite + React", "Lovable Generated Project" descriptions, builder badges, default share images and favicons, lorem ipsum and 555 numbers.' },
  { title: 'Can a phone visitor call?', body: 'Tap-to-call links, the mobile viewport, one clear main heading, image alt text for screen readers.' },
  { title: 'Does Google know who you are?', body: 'Business structured data (LegalService, MedicalClinic), XML sitemap, llms.txt and social preview tags.' },
  { title: 'Can you measure it?', body: 'Whether any analytics is installed at all, so you can tell which marketing brings calls.' },
];

const STEPS = [
  { title: 'Enter your URL', body: 'We load your live homepage the way a crawler does, with no JavaScript, plus robots.txt, sitemap and llms.txt.' },
  { title: 'See your score', body: 'Every problem, ranked critical to low, with what we found and why it costs you clients. Free, no email needed.' },
  { title: 'Paste the fix prompt', body: 'Get one prompt with every fix in order, written for your builder, with guardrails so it asks you for real details instead of inventing them.' },
];

/**
 * What an AI builder leaves out, each beside a site we built that has it. `gap` is our framing;
 * the facts under it are the case study's own `proof` lines, so they stay in step with the data.
 */
const BUILT_BY_PEOPLE = [
  { slug: 'i-95-accidents', gap: 'A builder makes the pages you describe. This site makes its own, from live data.', proof: [0, 1] },
  { slug: '1-800-hurt-511', gap: 'A builder stops at the form. This one is wired to a CRM and an intake call center.', proof: [1, 3] },
  { slug: 'metropolitan-orthopedics', gap: 'A builder adds a contact page. This one books the consultation.', proof: [1, 0] },
].flatMap((b) => {
  const c = getCaseStudy(b.slug);
  return c ? [{ ...b, client: c.client, industry: c.industry, location: c.location, facts: b.proof.map((i) => c.proof[i]).filter(Boolean) }] : [];
});

const FINISH = [
  { title: 'Finish', body: 'Every fix in your report, made in your builder or your code. Placeholder text, default titles and fake phone numbers replaced with your real details.' },
  { title: 'Secure', body: 'Exposed API keys removed and a list of the ones to rotate. Open databases and forms locked down. Security headers added.' },
  { title: 'Publish', body: 'Live on your domain with SSL, redirects from old URLs, a sitemap, Search Console and analytics. You own the code and the accounts.' },
];

const SHORT_ANSWER =
  'An AI website audit checks a site built with a tool like Lovable, Bolt, v0 or ChatGPT for the problems those tools leave behind: pages that are blank to search engines and AI assistants, placeholder titles and text, missing tap-to-call links, blocked crawlers and missing business schema. This free tool runs those checks on your live site and writes a prompt you paste back into your AI builder to fix them.';

const FAQS = [
  { q: 'What is an AI website audit?', a: SHORT_ANSWER },
  {
    q: 'Why does my Lovable or Bolt site not show up on Google?',
    a: 'Most AI builders produce a single-page React app: the server sends an empty page and JavaScript draws the content in the browser. Google can render JavaScript, but later and less reliably, and AI assistants like ChatGPT, Claude and Perplexity mostly do not run it at all. The fix is to prerender or server-render every page so the HTML already contains the content. The audit tells you whether your site has this problem and the prompt tells your builder how to fix it.',
  },
  {
    q: 'What does the fix prompt do?',
    a: 'It lists every problem the audit found, in priority order, with what was found, why it matters and the exact change to make. It tells the AI not to touch your design or URLs, to ask you for real details like your phone number and address instead of inventing them, and, for law firms and medical practices, to stay inside advertising and health-privacy rules.',
  },
  {
    q: 'Which builders does it work with?',
    a: 'The prompt works in any AI coding tool that can edit your site: Lovable, Bolt, v0, Base44, Replit, Cursor, Claude Code or ChatGPT. The audit itself works on any public website, including WordPress, Wix and Squarespace, though those are fixed in their own editors.',
  },
  {
    q: 'Can you fix my AI-built site for me?',
    a: 'Yes. Run the audit and choose "Have us finish my site" under your report. We fix what the report found, check the site for exposed keys and open data, and publish it on your domain. The scope and the fee are agreed in writing before we start, and you own the code and the accounts.',
  },
  {
    q: 'Does the audit check every page?',
    a: 'It checks the page you enter (usually your homepage) plus your robots.txt, sitemap and llms.txt. Run it on your most important practice-area or service pages too.',
  },
  {
    q: 'Do you store my website?',
    a: 'No. The page is fetched, checked and discarded. If you ask for the prompt, we keep your name, email, mobile number, website address and the audit report so we can follow up.',
  },
];

export default function AiWebsiteAuditPage() {
  return (
    <>
      {/* ── HERO + TOOL ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="container-md relative py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_21rem]">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
                Free tool · Lovable, Bolt, v0, ChatGPT
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Your AI-built website looks great. Can Google see it?
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
                Enter your firm&apos;s or practice&apos;s website. We check what search engines and AI assistants actually receive, score it, and write the prompt that tells your AI builder exactly what to fix.
              </p>
            </div>
            <SampleReport className="hidden lg:block mb-10" />
          </div>
          <div className="max-w-4xl">
            <SiteAuditTool />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="h-full rounded-2xl border border-slate-200 p-8">
                <StepArt step={i as 0 | 1 | 2} />
                <span className="text-xs font-black text-red-600" aria-hidden="true">0{i + 1}</span>
                <p className="mt-2 text-xl font-black tracking-tight text-slate-900">{s.title}</p>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHAT IT CHECKS ── */}
      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">What the audit checks</h2>
          <AnswerBlock question="What is an AI website audit?" answer={SHORT_ANSWER} className="mb-10 bg-white" />
          <VisitorVsCrawler />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHECKS.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="h-full rounded-2xl bg-white border border-slate-200 p-7">
                <p className="text-lg font-black tracking-tight text-slate-900">{c.title}</p>
                <p className="mt-2 text-slate-600 leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <Button variant="primary" size="lg" href="#audit-url">Audit my site</Button>
          </div>
        </div>
      </section>

      {/* ── WHY A BUILT SITE IS DIFFERENT ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">An AI builder builds what you ask for. Most of what brings in clients is what nobody asks for.</h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              We use AI to build sites too. The difference is knowing what to tell it: which searches a firm can win in its city, what the bar or a medical board lets you say, and where a visitor gives up before calling. Three sites we built, and what a prompt would have missed.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUILT_BY_PEOPLE.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={i * 80} className="h-full">
                <Link href={`/case-studies/${b.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 p-7 transition hover:border-slate-900">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-600">{b.client} · {b.industry}, {b.location}</p>
                  <p className="mt-3 text-xl font-black tracking-tight text-slate-900">{b.gap}</p>
                  <ul className="mt-4 space-y-1.5 text-slate-600">
                    {b.facts.map((f) => <li key={f} className="flex gap-2"><span className="text-emerald-600" aria-hidden="true">✓</span>{f}</li>)}
                  </ul>
                  <span className="mt-auto pt-5 text-sm font-semibold text-slate-900 group-hover:text-red-600">Read how we built it</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── DONE FOR YOU ── */}
      <section className="py-20 md:py-24 bg-slate-950 text-white">
        <div className="container-md grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4">Done for you</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Your AI got the site most of the way. We finish it, secure it and publish it.</h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Run the audit, then send us the report. We fix what it found, check the site for exposed keys and open data, and put it live on your domain. The scope and the fee are agreed in writing before we start.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" href="#audit-url">Audit my site first</Button>
            </div>
          </div>
          <ol className="space-y-4">
            {FINISH.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="rounded-2xl border border-white/10 p-6">
                <span className="text-xs font-black text-red-400" aria-hidden="true">0{i + 1}</span>
                <p className="mt-1 text-xl font-black tracking-tight">{s.title}</p>
                <p className="mt-2 text-slate-400 leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faqs={FAQS} title="AI website audit questions" />

      <section className="py-8 bg-white">
        <p className="container-md text-center text-sm text-slate-500">
          {COMPANY.name} · {COMPANY.address} ·{' '}
          <a href={`tel:${COMPANY.phoneE164}`} className="font-semibold text-slate-700 hover:text-red-600">{COMPANY.phone}</a>
        </p>
      </section>
    </>
  );
}
