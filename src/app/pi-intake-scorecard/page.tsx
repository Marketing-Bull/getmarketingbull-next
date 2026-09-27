import type { Metadata } from 'next';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import ScorecardForm from '@/components/ScorecardForm';
import { COMPANY, TESTIMONIALS } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';

// The root layout's title template appends " | Marketing Bull", so this renders as
// "PI Intake Scorecard for Law Firm Owners | Marketing Bull".
export const metadata: Metadata = pageMeta({
  path: '/pi-intake-scorecard',
  title: 'PI Intake Scorecard for Law Firm Owners',
  description:
    'A free 19-question scorecard for personal injury firms: after-hours coverage, speed to lead, follow-up, Spanish intake and lead-source tracking.',
});

const BENEFITS = [
  {
    title: 'Find the leak before you buy more leads.',
    body: 'See whether cases slip after hours, on hold, in the callback queue, or in follow-up that stops after one voicemail.',
  },
  {
    title: 'Score it yourself.',
    body: 'No software, no call recordings, no sales call needed to get it.',
  },
  {
    title: 'Written for South Florida PI firms.',
    body: 'It covers Spanish-language intake and weekend coverage, not just office-hours etiquette.',
  },
  {
    title: 'Know what to fix first.',
    body: 'A three-band scoring key tells you plainly whether to tune, fix or get an outside measurement.',
  },
];

const INSIDE = [
  '19 scored questions in five sections: Coverage, Speed to lead, Qualification, Follow-up, Attribution and oversight',
  'A scoring key with three bands and what each one means',
  'A five-step self mystery-shop you can run on your own firm this week',
  'Red-flag questions to fix first, whatever your total',
];

// Testimonials are data in constants.ts. The strip quotes the last sentence of this one.
const PROOF = TESTIMONIALS.find((t) => t.company === 'WeSueThem.com');
const PROOF_QUOTE = PROOF ? PROOF.quote.slice(Math.max(0, PROOF.quote.indexOf("They don't"))) : '';

export default function PiIntakeScorecardPage() {
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
                For personal injury firm owners · Free scorecard
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Would your firm sign the case that calls at 9pm on a Saturday?
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                A 19-question scorecard you fill in with your intake lead. It covers the five areas we test in a paid Intake Gap Audit: coverage, speed to lead, qualification, follow-up and attribution. You&apos;ll see where cases slip before anyone else does.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div id="get-scorecard" className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl p-8 scroll-mt-24">
                <ScorecardForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 100} className="h-full rounded-2xl border border-slate-200 p-8">
                <p className="text-xl font-black tracking-tight text-slate-900">{b.title}</p>
                <p className="mt-3 text-slate-600 leading-relaxed">{b.body}</p>
              </Reveal>
            ))}
          </ul>

          {/* ── PROOF STRIP ── */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-t border-slate-100 pt-8">
            {PROOF && (
              <figure className="flex-1">
                <blockquote className="text-lg font-semibold text-slate-900">&ldquo;{PROOF_QUOTE}&rdquo;</blockquote>
                <figcaption className="mt-1 text-sm text-slate-500">{PROOF.name}, {PROOF.company}</figcaption>
              </figure>
            )}
            {/* TODO(copy): replace with a real, attributable Florida client result before launch. Do not invent one. */}
            <p className="md:max-w-xs rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              [ADD: Florida client result]
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">What&apos;s inside</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {INSIDE.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 100} className="flex gap-5 rounded-2xl bg-white border border-slate-200 p-6">
                  <span className="text-xs font-black text-red-600 pt-1" aria-hidden="true">0{i + 1}</span>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8">
              <Button variant="primary" size="lg" href="#get-scorecard">Send me the scorecard</Button>
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
