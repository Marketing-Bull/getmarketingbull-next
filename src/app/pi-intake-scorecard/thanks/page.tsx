import type { Metadata } from 'next';
import Button from '@/components/Button';
import { COMPANY } from '@/lib/constants';

/**
 * TODO(launch): the public URL of the scorecard PDF. For a file in /public, use a
 * site-relative path such as '/pi-intake-scorecard.pdf'. Until this is a real URL the
 * page shows a visible TODO box instead of a broken download link.
 */
const SCORECARD_PDF_URL = '[LINK TO PDF]';
const PDF_READY = SCORECARD_PDF_URL.startsWith('/') || SCORECARD_PDF_URL.startsWith('https://');

export const metadata: Metadata = {
  title: 'Your scorecard is on its way',
  description: 'Check your inbox for the PDF (and your spam folder, just in case).',
  // Same as /thank-you: noindex, and no canonical (a canonical asks Google to index
  // this URL, which contradicts the noindex). Deliberately not in the sitemap.
  robots: { index: false, follow: true },
};

export default function PiIntakeScorecardThanksPage() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="container-md relative py-24 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">PI Intake Scorecard</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">Your scorecard is on its way.</h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            Check your inbox for the PDF (and your spam folder, just in case). Score it with whoever runs intake, and make the Saturday-night call yourself if you can.
          </p>
          {PDF_READY ? (
            <Button variant="secondary" size="md" href={SCORECARD_PDF_URL} external>Download the scorecard (PDF)</Button>
          ) : (
            <p className="inline-block rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              TODO: set SCORECARD_PDF_URL in src/app/pi-intake-scorecard/thanks/page.tsx ({SCORECARD_PDF_URL})
            </p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="h-full flex flex-col rounded-2xl border border-red-500/40 bg-slate-900/60 p-8">
            <p className="text-slate-300 leading-relaxed flex-1">
              <span className="font-bold text-white">Rather have it measured from the outside?</span> The Intake Gap Audit: two scored mystery-shop calls (one during business hours, one after hours), a timed web-form and chat test, and an ROI report on the leak, delivered in 7 to 10 business days. The fee is quoted in writing and credited in full toward any engagement you start within 60 days.
            </p>
            <div className="mt-8">
              <Button variant="primary" size="md" href="/free-consultation?product=intake-gap-audit">Book the Intake Gap Audit</Button>
            </div>
          </div>
          <div className="h-full flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-slate-300 leading-relaxed flex-1">
              <span className="font-bold text-white">Not sure yet?</span> Twenty minutes about your firm. We&apos;ll tell you where we&apos;d look first, and whether we&apos;re the right people to look.
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
