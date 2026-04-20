import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Services | Marketing Bull',
  description: 'Marketing Bull builds growth systems for law firms, medical practices, and home service businesses — intake optimization, AI automation, and performance marketing.',
  alternates: { canonical: 'https://getmarketingbull.com/services' },
};

const TESTIMONIALS = [
  { name: 'Todd D. Muhlstock, Esq.', company: 'WeSueThem.com', quote: "I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results. They don't just generate leads — they make sure you close them.", rating: 5 },
  { name: 'Dr. Manoj Sadhnani', company: 'Queens Hyperbaric', quote: "Working with Marketing Bull has been a game-changer for my practice. We went from struggling to fill slots to seeing 30 new faces every month.", rating: 5 },
  { name: 'Angela McMullin', company: '3D Dental', quote: "Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results. Our new patient volume is up 40%.", rating: 5 },
];

const SERVICES = [
  {
    icon: '⚖️',
    label: 'For Law Firms',
    title: 'Intake OS & PI Marketing',
    desc: 'PI clients hire the first firm that picks up. We fix the intake machines that miss calls, lose leads, and bleed cases — then layer in high-converting PPC and SEO on top.',
    href: '/services/law-firms',
    stats: [
      { n: '78%', l: 'of clients hire the first responder' },
      { n: '<90s', l: 'speed-to-lead after Intake OS' },
      { n: '+25%', l: 'average case conversion lift' },
    ],
    cta: 'Law Firm Growth System →',
  },
  {
    icon: '🏥',
    label: 'For Medical Practices',
    title: 'Patient Acquisition & Retention',
    desc: 'Empty appointment slots and no-shows kill revenue. We fill your schedule with qualified patients through local SEO, paid search, and automated recall systems.',
    href: '/services/medical',
    stats: [
      { n: '30+', l: 'new patients/month average' },
      { n: '60%', l: 'reduction in no-show rate' },
      { n: '4.8★', l: 'average review rating post-system' },
    ],
    cta: 'Medical Growth System →',
  },
  {
    icon: '🔨',
    label: 'For Home Services',
    title: 'Local Lead Generation',
    desc: 'Homeowners search, click, and call whoever shows up first. We put your business at the top of local search and turn inbound calls into booked jobs.',
    href: '/services/home-services',
    stats: [
      { n: '#1', l: 'local map pack placement' },
      { n: '3x', l: 'average lead volume increase' },
      { n: '$0', l: 'wasted ad spend on bad leads' },
    ],
    cta: 'Home Services Growth →',
  },
];

const STACK = [
  { icon: '📞', title: 'Intake OS', desc: '24/7 AI receptionist, speed-to-lead automation, CRM integration, and multi-channel capture. No lead falls through.' },
  { icon: '🤖', title: 'AI Automation', desc: 'Custom GHL voice agents, automated follow-up sequences, lead scoring, and CRM workflows that scale without headcount.' },
  { icon: '📈', title: 'Performance Marketing', desc: 'Industry-specific PPC on Google and Meta. Every dollar tracked to a signed client, booked patient, or completed job.' },
  { icon: '🔍', title: 'Local & Organic SEO', desc: 'Dominate local search for high-intent keywords. Content strategies that reduce dependency on paid traffic over time.' },
  { icon: '📊', title: 'Reporting & Attribution', desc: 'Real-time dashboards connecting ad spend to revenue. Know exactly which campaigns produce results.' },
  { icon: '🎯', title: 'Landing Page Optimization', desc: 'Industry-specific pages with urgency triggers, social proof, and A/B tested CTAs built to convert at 3–5x average.' },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="What We Build"
        title="Growth Systems, Not Marketing Campaigns"
        subtitle="We don't run ads and send reports. We build the operating systems that capture every lead, convert at the highest rate, and tell you exactly where every dollar went."
        primaryCTA={{ text: 'Get a Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855', tel: true }}
      />

      {/* Industry verticals */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Who We Serve</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for High-Stakes Industries</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We specialize in industries where every missed lead costs thousands. Our systems are built for the economics of your specific business.</p>
          </div>
          <div className="space-y-8">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-slate-50 rounded-2xl border border-slate-200 p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">{s.label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.icon} {s.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                    <a href={s.href} className="text-blue-600 font-semibold hover:text-blue-500 transition">{s.cta}</a>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {s.stats.map((st) => (
                      <div key={st.l} className="text-center p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{st.n}</div>
                        <div className="text-slate-600 text-xs leading-snug">{st.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core stack */}
      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Full Stack</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Every Engagement Includes the Infrastructure</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We don&apos;t sell you one piece and leave you to figure out the rest. Every client gets the full growth stack configured for their industry and market.</p>
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

      {/* Why MB */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-3">Why Marketing Bull</p>
            <h2 className="text-4xl font-bold mb-6">We Measure Success the Same Way You Do</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Most agencies optimize for impressions and clicks. We optimize for signed retainers, booked appointments, and completed jobs — because that&apos;s what actually matters to your P&L.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Full-Funnel Ownership', desc: 'We own the outcome from the first ad impression to the signed client. That means we fix intake, build automation, and optimize every step — not just the top of the funnel.' },
              { title: 'Industry-Specific Systems', desc: 'PI law, medical, and home services have completely different economics. We build for your specific CAC, LTV, and intake dynamics — not generic funnels.' },
              { title: 'Transparent Attribution', desc: 'You see every number, every test, every result. Full attribution from ad dollar to closed deal. No black-box reporting, no vanity metrics.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4 text-blue-300">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel testimonials={TESTIMONIALS} />
      <CTASection
        title="Not Sure Where to Start?"
        description="Book a free 30-minute growth audit. We'll review your current intake, marketing stack, and attribution — and show you exactly where the leaks are."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
