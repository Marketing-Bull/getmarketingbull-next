import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';
import { RESOURCES } from '@/lib/resources';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  path: '/resources',
  title: 'Resources',
  description:
    'Free tools from Marketing Bull: a Claude skill that audits law firm ads against the Florida Bar rules, an offline-first Markdown editor, our RingDash call-tracking app, and the open-source Recoup and KeyVault apps.',
});

const updatedLabel = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Resources', url: '/resources' },
          ])),
        }}
      />

      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md max-w-4xl relative">
          <nav className="text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Resources</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Resources</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">Free tools we use ourselves.</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            The checklists, AI skills and apps behind our own work. Download them, read the code, and use what helps your firm or practice.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-5xl space-y-10">
          {RESOURCES.map((r) => (
            <article key={r.slug} id={r.slug} className="rounded-3xl border border-slate-200 p-6 md:p-10 scroll-mt-32">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-2.5 py-0.5 font-semibold">{r.kind}</span>
                <span className="text-slate-500">Updated {updatedLabel(r.updated)}</span>
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-slate-900">{r.name}</h2>
              <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-3xl">{r.summary}</p>
              <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-900">For:</span> {r.audience}</p>

              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                {r.links.map((d, i) => {
                  const cls = `inline-flex flex-col rounded-2xl px-5 py-3 transition ${i === 0 ? 'bg-slate-900 text-white hover:bg-red-600' : 'border border-slate-300 text-slate-900 hover:border-slate-900'}`;
                  const inner = (
                    <>
                      <span className="font-semibold">{d.label}</span>
                      <span className={`text-xs ${i === 0 ? 'text-slate-300' : 'text-slate-500'}`}>{d.note}</span>
                    </>
                  );
                  // Same-site paths navigate in place; files download; everything else opens in a new tab.
                  return d.href.startsWith('/') && !d.href.endsWith('.zip') && !d.href.endsWith('.md') ? (
                    <Link key={d.href} href={d.href} className={cls}>{inner}</Link>
                  ) : (
                    <a
                      key={d.href}
                      href={d.href}
                      {...(d.href.endsWith('.zip') ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                      className={cls}
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">{r.coversLabel}</h3>
                  <ul className="space-y-2.5">
                    {r.covers.map((c) => (
                      <li key={c} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What you get</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{r.output}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How to use it</h3>
                    <ol className="space-y-2.5 list-decimal list-inside text-sm text-slate-700 leading-relaxed">
                      {r.howTo.map((h) => <li key={h}>{h}</li>)}
                    </ol>
                  </div>
                </div>
              </div>

              {r.caveat && (
                <p className="mt-10 rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600 leading-relaxed">{r.caveat}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Want us to run it for you?"
        description="This is the checklist we run on our own law firm clients’ sites and ads. Twenty minutes is enough to see where yours stands."
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: `tel:${COMPANY.phoneE164}` }}
      />
    </>
  );
}
