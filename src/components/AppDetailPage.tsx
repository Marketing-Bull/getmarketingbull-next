import Link from 'next/link';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';
import type { AppPageData } from '@/lib/appPages';
import { APPS } from '@/lib/portfolio';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

/** /recoup and /keyvault. Content is data in lib/appPages.ts; the screenshot, when there is one, comes from APPS. */
export default function AppDetailPage({ app }: { app: AppPageData }) {
  const project = APPS.find((a) => a.slug === app.slug);
  const image = project?.image;
  const gallery = project?.gallery;
  const primary = app.editions[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: app.name, url: `/${app.slug}` },
          ])),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(app.faqs)) }} />

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className={image ? 'lg:col-span-7' : 'lg:col-span-10'}>
            <nav className="text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{app.name}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400 mb-6">{app.kicker}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
              <span className="block text-slate-400 text-2xl sm:text-3xl mb-3">{app.name}</span>
              {app.headline}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">{app.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href={primary.repo} external>View the source</Button>
              <Button variant="secondary" size="lg" href="#get-it">How to get it</Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {app.badges.map((b) => (
                <li key={b} className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">{b}</li>
              ))}
            </ul>
          </div>
          {image && (
            <div className="lg:col-span-5 flex justify-center">
              {image.frame === 'phone' ? (
                <img src={image.src} alt={`${app.name} on a phone`} width={image.width} height={image.height} className="w-64 h-auto rounded-[2rem] border-[7px] border-slate-800 shadow-2xl" />
              ) : (
                <img src={image.src} alt={`${app.name} screenshot`} width={image.width} height={image.height} className="w-full h-auto rounded-2xl border border-slate-800 shadow-2xl" />
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── SCREENS ── */}
      {gallery && gallery.length > 0 && (
        <section id="screens" className="py-16 md:py-20 bg-slate-950 text-white border-t border-slate-900 scroll-mt-24">
          <div className="container-md">
            <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">The screens</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{app.name}, in use.</h2>
            <p className="text-slate-400 max-w-2xl leading-relaxed mb-10">Captured with the app&apos;s built-in sample data: the clients, projects and amounts are fictional.</p>
            <div className="flex gap-8 overflow-x-auto pb-4 snap-x">
              {gallery.map((g) => (
                <figure key={g.src} className="shrink-0 snap-center text-center first:ml-auto last:mr-auto">
                  <img src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" className="w-56 h-auto rounded-[2rem] border-[7px] border-slate-800 shadow-2xl" />
                  {g.caption && <figcaption className="mt-4 text-sm font-semibold text-slate-300">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-md grid grid-cols-1 md:grid-cols-3 gap-6">
          {app.why.map((w) => (
            <div key={w.title} className="rounded-2xl border border-slate-200 p-7">
              <h2 className="text-xl font-black tracking-tight text-slate-900">{w.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What it does</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-10">Everything in {app.name}.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900">{f.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {f.items.map((i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Privacy</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{app.data.title}</h2>
          </div>
          <ul className="lg:col-span-8 space-y-4">
            {app.data.points.map((p) => (
              <li key={p} className="flex gap-4 rounded-2xl border border-slate-200 p-5 text-slate-700 leading-relaxed">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── GET IT ── */}
      <section id="get-it" className="py-16 md:py-20 bg-slate-950 text-white scroll-mt-24">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">How to get it</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Build it from the source.</h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed mb-10">
            {app.name} is open source under the MIT License: free to use, change and build. There is nothing to buy and no account to create.
          </p>
          <div className={`grid grid-cols-1 gap-6 ${app.editions.length > 1 ? 'lg:grid-cols-2' : 'lg:max-w-3xl'}`}>
            {app.editions.map((e) => (
              <article key={e.name} className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-slate-700 px-2.5 py-0.5 font-semibold text-slate-300">{e.platforms}</span>
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 font-semibold text-amber-300">{e.status}</span>
                </div>
                <h3 className="mt-4 text-2xl font-black tracking-tight">{e.name}</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">{e.summary}</p>
                <h4 className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-500">You need</h4>
                <ul className="mt-3 space-y-2">
                  {e.requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-500">Steps</h4>
                <ol className="mt-3 space-y-2.5 list-decimal list-inside text-sm text-slate-300 leading-relaxed">
                  {e.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
                <div className="mt-auto pt-6">
                  <a href={e.repo} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-red-400 transition">
                    {e.repo.replace('https://', '')} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK + ROADMAP ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className={`container-md grid grid-cols-1 gap-10 ${app.roadmap ? 'lg:grid-cols-2' : 'lg:max-w-3xl'}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Under the hood</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-6">How it&apos;s built</h2>
            <dl className="divide-y divide-slate-100 border-y border-slate-100">
              {app.stack.map((s) => (
                <div key={s.layer} className="grid grid-cols-3 gap-4 py-3 text-sm">
                  <dt className="font-semibold text-slate-900">{s.layer}</dt>
                  <dd className="col-span-2 text-slate-600">{s.tech}</dd>
                </div>
              ))}
            </dl>
          </div>
          {app.roadmap && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Planned</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-6">On the roadmap, not built yet</h2>
              <ul className="space-y-2.5">
                {app.roadmap.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
        <div className="container-md max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-8">Questions</h2>
          <div className="space-y-4">
            {app.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white border border-slate-200 p-6">
                <summary className="cursor-pointer list-none font-bold text-slate-900 flex justify-between gap-4">
                  {f.q}
                  <span className="text-red-600 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            {app.name} is released under the MIT License. Copyright &copy; 2026 {COMPANY.legalName}. See also our <Link href="/resources" className="underline hover:text-slate-900">other free tools</Link> and the <Link href="/websites#apps" className="underline hover:text-slate-900">apps we&apos;ve built</Link>.
          </p>
        </div>
      </section>

      <CTASection
        title="Want software like this for your firm?"
        description={`We built ${app.name} for our own work. If your firm or practice needs a tool like it, twenty minutes is enough to see whether we can help.`}
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: `tel:${COMPANY.phoneE164}` }}
      />
    </>
  );
}
