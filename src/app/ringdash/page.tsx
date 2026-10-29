import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

const TITLE = 'RingDash: Call Tracking and Callback Queue for Law Firms';
const DESCRIPTION =
  'RingDash is the call-tracking dashboard Marketing Bull built for personal injury firms: tracking numbers, ring groups, a callback queue for missed calls, spam triage and dated reports. See the screens.';

export const metadata: Metadata = pageMeta({ path: '/ringdash', title: TITLE, description: DESCRIPTION });

const IMG = '/work/apps/ringdash';

const DESKTOP = [
  {
    id: 'calls',
    src: `${IMG}/calls.webp`,
    w: 1054,
    h: 689,
    title: 'Every call, sorted',
    body: 'Search by caller, filter by number called, date range or outcome, and see at a glance whether a call was answered, went to voicemail or was already called back. Play the recording, call back or mark spam from the same row.',
    alt: 'RingDash All Calls table with search, number, date and outcome filters, showing caller, location, line type, outcome, triage status and duration',
  },
  {
    id: 'by-number',
    src: `${IMG}/by-number.webp`,
    w: 1054,
    h: 749,
    title: 'Which line is working',
    body: 'Calls, answered, missed and spam per tracking number, with a share bar, plus a list of who calls most. It shows which campaign rings and which one rings into a voicemail.',
    alt: 'RingDash overview tables: calls, answered, missed and spam by tracking number, and the callers who call most',
  },
  {
    id: 'clients',
    src: `${IMG}/clients.webp`,
    w: 1054,
    h: 689,
    title: 'Clients and numbers in one place',
    body: 'Each client has its own ring group, ring time and voicemail setting, and every tracking number has a nickname, such as Facebook Ads or Google Ads. Buy a number or import one from Twilio without leaving the page.',
    alt: 'RingDash Clients and Numbers page listing a client, its ring group and five tracking numbers with nicknames',
  },
  {
    id: 'dial-out',
    src: `${IMG}/dial-out.webp`,
    w: 1054,
    h: 689,
    title: 'Call back from the firm’s number',
    body: 'Dial out rings your own phone first. Answer and press 1, and RingDash places the call from the tracking number you choose, so the person you reach sees the firm’s line and the call is tracked.',
    alt: 'RingDash Dial out dialog: choose the number to call from, the number to call and which phone to ring first',
  },
];

const PHONE = [
  { src: `${IMG}/mobile-overview.webp`, w: 406, h: 636, caption: 'Overview', alt: 'RingDash overview on a phone: calls, answered rate, callbacks needed, median callback time, spam filtered and average talk time' },
  { src: `${IMG}/mobile-clients.webp`, w: 406, h: 636, caption: 'Clients and numbers', alt: 'RingDash clients and numbers on a phone, with each tracking number marked managed by RingDash' },
  { src: `${IMG}/mobile-dial-out.webp`, w: 406, h: 637, caption: 'Dial out', alt: 'RingDash dial out dialog on a phone' },
];

const FEATURES = [
  'Tracking numbers per client or campaign, with ring groups that ring every phone at once and a voicemail fallback',
  'An email for each call with one-click triage, so spam and real leads are sorted from your inbox',
  'A callback queue for missed calls, with a push alert to every subscribed phone when one comes in and a reminder when a callback is overdue',
  'Spam triage and a blocklist, so repeat nuisance callers never ring your team',
  'Dated reports: call volume, answer rate, spam share, callback speed and top callers, per client and per line, with CSV export',
  'Installs as an app on your phone, so the callback queue and missed-call alerts are always in your pocket',
];

function BrowserFrame({ src, w, h, alt, priority = false }: { src: string; w: number; h: number; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
      </div>
      <img src={src} alt={alt} width={w} height={h} loading={priority ? 'eager' : 'lazy'} decoding="async" className="block h-auto w-full" />
    </div>
  );
}

export default function RingDashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'RingDash', url: '/ringdash' },
          ])),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-md relative">
          <nav className="text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">RingDash</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400 mb-6">Our call-tracking app · in active development</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-[1.05]">
                <span className="block text-slate-400 text-2xl sm:text-3xl mb-3">RingDash</span>
                A missed call becomes a callback, not a lost lead.
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Every call to a tracking number rings your team at once. The ones nobody answers land in a callback queue, and the spam never reaches your phones. We built it for our personal injury law firm clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href="/free-consultation">Talk to us about RingDash</Button>
                <Button variant="secondary" size="lg" href="#screens">See the screens</Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <BrowserFrame src={`${IMG}/overview.webp`} w={1054} h={749} alt="RingDash overview dashboard: calls, answered rate, callbacks needed, median callback time, spam filtered, average talk time and a calls-per-day chart" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section id="screens" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">The screens</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">What your intake team sees.</h2>
          <p className="text-slate-600 max-w-2xl leading-relaxed mb-14">
            Captured from a RingDash account loaded with sample data: the client, numbers and callers below are fictional.
          </p>
          <div className="space-y-20">
            {DESKTOP.map((s, i) => (
              <div key={s.id} id={s.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center scroll-mt-24">
                <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
                </div>
                <div className={`lg:col-span-8 ${i % 2 ? 'lg:order-1' : ''}`}>
                  <BrowserFrame src={s.src} w={s.w} h={s.h} alt={s.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHONE ── */}
      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="container-md">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">On your phone</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">The same dashboard, in your pocket.</h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed mb-12">
            RingDash installs as an app, so the callback queue and missed-call alerts are one tap away wherever your team is.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
            {PHONE.map((p) => (
              <figure key={p.src} className="text-center">
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" className="w-64 h-auto rounded-[2rem] border-[7px] border-slate-800 shadow-2xl" />
                <figcaption className="mt-4 text-sm font-semibold text-slate-300">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">What it does</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Built for firms that pay for leads.</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Personal injury firms need to know which calls were answered, missed or spam, and how fast a missed call got a callback.
            </p>
          </div>
          <ul className="lg:col-span-8 space-y-4">
            {FEATURES.map((f) => (
              <li key={f.slice(0, 32)} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 leading-relaxed">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT STARTS ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-md max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">How it starts</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-8">Three steps.</h2>
          <ol className="space-y-4 list-decimal list-inside text-slate-700 leading-relaxed">
            <li>Ask us about RingDash on a free consultation.</li>
            <li>We provision your tracking numbers and route them to your team.</li>
            <li>Missed calls start landing in your callback queue, and your reports start filling in.</li>
          </ol>
          <p className="mt-8 text-sm text-slate-500">
            RingDash is in active development and its source is private, so there is nothing to download. See also the <Link href="/websites#apps" className="underline hover:text-slate-900">apps we&apos;ve built</Link> and our <Link href="/resources" className="underline hover:text-slate-900">free tools</Link>.
          </p>
        </div>
      </section>

      <CTASection
        title="Want every call accounted for?"
        description="Twenty minutes is enough to see whether RingDash fits how your firm handles intake."
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: `tel:${COMPANY.phoneE164}` }}
      />
    </>
  );
}
