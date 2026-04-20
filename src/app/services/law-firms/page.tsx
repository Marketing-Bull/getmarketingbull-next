import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Law Firm Marketing & Intake Optimization | Marketing Bull',
  description: 'Marketing Bull builds growth systems for personal injury law firms — intake optimization, AI automation, and performance marketing that converts leads into signed retainers.',
  alternates: { canonical: 'https://getmarketingbull.com/services/law-firms' },
};

const TESTIMONIALS = [
  { name: 'Todd D. Muhlstock, Esq.', company: 'WeSueThem.com', quote: "I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results. They don't just generate leads — they make sure you close them.", rating: 5 },
  { name: 'Isak Yuhan', company: '1-800-HURT-511', quote: 'They delivered results beyond our expectations — our intake pipeline has never been stronger. The AI automation alone paid for the entire engagement in month one.', rating: 5 },
  { name: 'Laura Cole, Esq.', title: 'Attorney at Law', quote: 'Marketing Bull is excellent!! Prompt service, rapid replies, and very professional. Finally a marketing partner that understands how a law firm actually operates.', rating: 5 },
];

const FAQS = [
  { question: 'How is this different from a typical marketing agency?', answer: "Most agencies hand you leads and disappear. We own the outcome from the ad click to the signed retainer. That means we fix intake, build automation, and optimize every step of your funnel — not just the top of it. We measure success in cases signed, not impressions delivered." },
  { question: 'What size law firm do you work with?', answer: 'We work with PI firms ranging from solo practitioners to regional firms with 30+ attorneys. Our systems scale with you — a solo can start with a core Intake OS, and a larger firm gets the full growth stack.' },
  { question: 'Do you guarantee results?', answer: "We don't make guarantees we can't control. What we guarantee is transparent reporting, a clear improvement plan within the first 30 days, and that we don't lock you into long contracts if we're not performing." },
  { question: 'How long until we see results?', answer: 'Intake improvements are visible within the first 30 days. SEO and organic results compound over 3–6 months. PPC campaigns are typically profitable within 60–90 days after creative testing.' },
  { question: 'We already have a marketing agency. Can we add Marketing Bull?', answer: "Yes, and it's common. Many firms use a traditional agency for media buying and bring us in specifically for intake and automation — the infrastructure that makes every marketing dollar work harder." },
  { question: 'Do you work with referral-based firms that don\'t run ads?', answer: "Absolutely. Intake OS is just as valuable for referral-based practices — referrals still need to be captured, qualified, and onboarded efficiently." },
];

const STACK = [
  { icon: '⚖️', title: 'Intake OS', desc: 'End-to-end intake rebuild: AI receptionist, multi-channel capture, CRM pipelines, and speed-to-lead automation. No lead falls through.' },
  { icon: '🤖', title: 'AI Automation', desc: 'Custom GHL voice agents, automated lead scoring, follow-up sequences, and CRM workflows. Scale capacity without scaling headcount.' },
  { icon: '📈', title: 'Performance Marketing', desc: 'PI-specific PPC on Google and Meta, conversion-optimized landing pages, and retargeting. Every dollar tracked to case, not just click.' },
  { icon: '🔍', title: 'Local & Organic SEO', desc: 'Dominate local search for high-intent PI keywords. Content strategies that compound over time and reduce dependency on paid traffic.' },
  { icon: '📊', title: 'Reporting & Attribution', desc: 'Real-time dashboards connecting ad spend to signed retainers. Know exactly which campaigns are producing cases.' },
  { icon: '🎯', title: 'Landing Page Optimization', desc: 'PI-specific landing pages with urgency triggers, social proof, and A/B tested CTAs. Built to convert at 3–5x the industry average.' },
];

export default function LawFirmsPage() {
  return (
    <>
      <Hero
        eyebrow="For Personal Injury Law Firms"
        title="You Don't Have a Marketing Problem. You Have an Intake Problem."
        subtitle="Every ad you run leaks cases before your staff can answer the phone. We build the operating system that captures, qualifies, and converts — so every marketing dollar you spend actually turns into a signed retainer."
        primaryCTA={{ text: 'Get a Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855', tel: true }}
      />

      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Real Problem</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Competitors Are Winning on Response Time, Not Reputation</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">PI clients don&apos;t do extensive research. They call 2–3 firms and hire whoever picks up first. That means your reputation, your verdicts, your website — none of it matters if you don&apos;t answer the phone.</p>
              <p className="text-lg text-slate-600 leading-relaxed">The firms winning market share right now aren&apos;t necessarily the best lawyers. They&apos;re the ones with the fastest, most consistent intake machines.</p>
            </div>
            <div className="space-y-5">
              {[
                { stat: '78%', label: 'of PI clients hire the first firm to respond' },
                { stat: '5 min', label: 'is all you have before conversion drops 80%' },
                { stat: '35%', label: 'of calls at the average firm go unanswered' },
                { stat: '$0', label: 'extra ad spend needed to fix your intake' },
              ].map((item) => (
                <div key={item.stat} className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-3xl font-bold text-blue-600 min-w-[80px]">{item.stat}</div>
                  <div className="text-slate-700 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Growth Stack</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">A Complete System, Not Piecemeal Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We don&apos;t sell you one piece and leave you to figure out the rest. Every engagement includes the infrastructure to capture, convert, and track — from first contact to signed retainer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STACK.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-3">Why Marketing Bull</p>
            <h2 className="text-4xl font-bold mb-6">We Own the Gap Nobody Else Covers</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Every other agency delivers leads and hands you a report. We stay in the deal all the way to the signed retainer — because that&apos;s where the money actually is.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Lead Generated → Case Signed', desc: 'Most agencies measure impressions and clicks. We measure consults booked and retainers signed. That alignment changes everything about how we work.' },
              { title: '30+ PI Firms, Zero Cookie-Cutter', desc: "We've built intake systems for solo practitioners and regional firms. Every engagement starts with a full audit — we build for your specific volume, practice area, and market." },
              { title: 'We Show Our Work', desc: 'Full attribution from ad dollar to case file. You see every number, every test, every result. No black-box reporting.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4 text-blue-300">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Proof</p>
            <h2 className="text-4xl font-bold text-slate-900">Numbers from Active Engagements</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ metric: '25%', label: 'Average intake conversion lift' }, { metric: '<90s', label: 'Speed-to-lead, post-system' }, { metric: '500+', label: 'Automated workflows deployed' }, { metric: '30+', label: 'Active PI firm partners' }].map((item) => (
              <div key={item.label} className="text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.metric}</div>
                <div className="text-slate-700 font-semibold text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel testimonials={TESTIMONIALS} />
      <FAQAccordion items={FAQS} />
      <CTASection
        title="Let's Build Your Intake Machine"
        description="Free 30-minute audit of your current intake process. No pitch, no pressure — just a clear picture of what's leaking and how to fix it."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
