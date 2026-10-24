import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';
import { APPS, AUDITED, FACT_LABELS, PORTFOLIO, PORTFOLIO_CATEGORIES, type FactLabel } from '@/lib/portfolio';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbSchema, portfolioSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  path: '/websites',
  title: "Websites We've Built",
  description:
    'Every website and app Marketing Bull has built, with what is under the hood of each one: brand, search, local pages, structured data, speed, conversion and measurement, explained as what it does for the owner.',
});

const LABEL_STYLE: Record<FactLabel, string> = {
  Brand: 'bg-rose-50 text-rose-700 border-rose-100',
  Found: 'bg-blue-50 text-blue-700 border-blue-100',
  Local: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Rich results': 'bg-amber-50 text-amber-800 border-amber-100',
  'AI search': 'bg-violet-50 text-violet-700 border-violet-100',
  Speed: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Converts: 'bg-red-50 text-red-700 border-red-100',
  Measured: 'bg-slate-100 text-slate-700 border-slate-200',
  Owned: 'bg-stone-100 text-stone-700 border-stone-200',
};

const auditedLabel = new Date(`${AUDITED}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function WebsitesPage() {
  const totalPages = PORTFOLIO.reduce((n, s) => {
    const m = s.stack.match(/(\d+) pages/);
    return n + (m ? Number(m[1]) : 0);
  }, 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema(PORTFOLIO)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: "Websites We've Built", url: '/websites' },
          ])),
        }}
      />

      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md max-w-4xl relative">
          <nav className="text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Websites We&apos;ve Built</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Our work</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">The websites we&apos;ve built.</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            {PORTFOLIO.length} live sites, {totalPages}+ pages. For each one: what the business does, what the site was built to do, and what is under the hood, explained as what it does for the owner rather than what it is called.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Every site below is live. Click through; it is the fastest way to judge the work. Then see the <a href="#apps" className="font-semibold text-slate-300 hover:text-white transition">{APPS.length} apps we&apos;ve built ↓</a>
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-slate-100">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How to read the cards</p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-8 max-w-3xl">Nine things every site is checked for. The label is the lens; the line beside it is what it does for you.</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
            {FACT_LABELS.map((f) => (
              <div key={f.label} className="flex gap-3 items-start">
                <dt className={`shrink-0 mt-0.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${LABEL_STYLE[f.label]}`}>{f.label}</dt>
                <dd className="text-sm text-slate-600 leading-relaxed">{f.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-slate-50 py-6 border-b border-slate-100 md:sticky md:top-16 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-50/90">
        <div className="container-md flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mr-2">Jump to</span>
          {PORTFOLIO_CATEGORIES.map((c) => (
            <a key={c} href={`#${slugify(c)}`} className="text-sm font-semibold text-slate-700 hover:text-red-600 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 transition">
              {c} <span className="text-slate-400 font-normal">({PORTFOLIO.filter((s) => s.category === c).length})</span>
            </a>
          ))}
          <a href="#apps" className="text-sm font-semibold text-slate-700 hover:text-red-600 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 transition">
            Apps <span className="text-slate-400 font-normal">({APPS.length})</span>
          </a>
        </div>
      </section>

      {PORTFOLIO_CATEGORIES.map((category) => {
        const sites = PORTFOLIO.filter((s) => s.category === category);
        return (
          <section key={category} id={slugify(category)} className="py-16 md:py-20 bg-white scroll-mt-32">
            <div className="container-md">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">{category}</h2>
              <div className="space-y-8">
                {sites.map((s) => (
                  <article key={s.slug} id={s.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-slate-200 p-6 md:p-8 scroll-mt-32">
                    <div className="lg:col-span-5">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                        <img
                          src={s.image}
                          alt={`${s.name} homepage`}
                          width={1200}
                          height={750}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </a>
                      <p className="mt-3 text-xs text-slate-500">{s.stack} · launched {s.launched}</p>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.category} · {s.location}</p>
                      <h3 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">{s.name}</a>
                      </h3>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-sm font-semibold text-blue-700 hover:underline">{s.domain} ↗</a>
                      <p className="mt-4 text-slate-700 leading-relaxed">{s.what}</p>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-slate-900">Built to:</span> {s.job}</p>
                      {s.caseStudy && (
                        <Link href={`/case-studies/${s.caseStudy}`} className="mt-3 inline-block text-sm font-semibold text-slate-900 hover:text-red-600 transition">Read the case study →</Link>
                      )}
                      <ul className="mt-5 space-y-3">
                        {s.facts.map((f) => (
                          <li key={f.label + f.text.slice(0, 24)} className="flex gap-3 items-start">
                            <span className={`shrink-0 mt-0.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${LABEL_STYLE[f.label]}`}>{f.label}</span>
                            <span className="text-sm text-slate-700 leading-relaxed">{f.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="apps" className="py-16 md:py-20 bg-slate-950 text-white scroll-mt-32">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">Apps</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Apps we&apos;ve built.</h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed mb-10">
            Installable web apps and native apps for iPhone, iPad and Mac. The source for each one is public, so the work can be read as well as used.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {APPS.map((a) => (
              <article key={a.slug} id={a.slug} className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden scroll-mt-32">
                <div className="aspect-[16/10] bg-slate-800/60 border-b border-slate-800 flex items-center justify-center overflow-hidden">
                  {a.image ? (
                    a.image.frame === 'phone' ? (
                      <img src={a.image.src} alt={`${a.name} on a phone`} width={a.image.width} height={a.image.height} loading="lazy" decoding="async" className="h-[88%] w-auto mt-[12%] rounded-t-[1.75rem] border-[6px] border-b-0 border-slate-950 shadow-2xl" />
                    ) : (
                      <img src={a.image.src} alt={`${a.name} screenshot`} width={a.image.width} height={a.image.height} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                    )
                  ) : (
                    <div className="text-center px-6">
                      <p className="text-3xl md:text-4xl font-black tracking-tight">{a.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{a.platform}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-slate-700 px-2.5 py-0.5 font-semibold text-slate-300">{a.platform}</span>
                    <span className={`rounded-full px-2.5 py-0.5 font-semibold ${a.status === 'Live' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>{a.status}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight">{a.name}</h3>
                  <p className="mt-3 text-slate-300 leading-relaxed">{a.what}</p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed"><span className="font-semibold text-white">Built to:</span> {a.job}</p>
                  <ul className="mt-5 space-y-2.5">
                    {a.facts.map((f) => (
                      <li key={f.slice(0, 32)} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {a.url && (
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-red-400 transition">Open the app ↗</a>
                    )}
                    <a href={a.repo} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-red-400 transition">Source on GitHub ↗</a>
                    <span className="text-xs text-slate-500">{a.stack} · {a.launched}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What they have in common</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">The same foundation under every one.</h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { t: 'Built on code, not a page builder', b: 'Every site is a static or server-rendered build (Next.js or plain HTML) deployed to Vercel or Cloudflare. No plugins to update, no database to hack, no theme licence to renew.' },
              { t: 'Search foundations on day one', b: 'Titles and descriptions written per page, canonical URLs, an XML sitemap, robots rules and share images, so the first crawl indexes the right pages.' },
              { t: 'Structured data that matches the page', b: 'Schema.org markup for the business type, services, events, FAQs and people, and only for what the page actually says. Markup that disagrees with the page is worse than none.' },
              { t: 'A page for every place and service', b: 'Where the business serves a territory, the site has a page per city or neighborhood and per service, written for that search, not stamped from a template.' },
              { t: 'Conversion in the first screen', b: 'Tap-to-call on every page, the shortest form that still qualifies, and proof (reviews, credentials, numbers) placed where the visitor decides.' },
              { t: 'You own it', b: 'The domain, the code repository and the hosting account are in your name. Twelve months of hosting are included, and leaving us never means starting over.' },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-white border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{x.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-t border-slate-100">
        <div className="container-md max-w-3xl text-center">
          <p className="text-slate-500 text-sm">
            Facts on this page were read from each live site in {auditedLabel}. Rankings and traffic belong to each client and are not published here.
            Want yours in this list? <Link href="/products/website-in-14-days" className="font-semibold text-slate-900 hover:text-red-600">See Website in 14 Days</Link>.
          </p>
        </div>
      </section>

      <CTASection
        title="Want a site like these?"
        description="Fixed scope, fixed price, live in 14 days. Twenty minutes on the phone is enough to know whether it fits."
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: `tel:${COMPANY.phoneE164}` }}
      />
    </>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
