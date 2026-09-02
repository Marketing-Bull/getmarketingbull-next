import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Intake Optimization for Law Firms | Marketing Bull',
  description: 'Stop losing cases to slow response times and broken intake processes. Marketing Bull builds end-to-end intake systems that capture every lead, qualify in real time, and book consultations automatically.',
  alternates: { canonical: 'https://getmarketingbull.com/services/intake-optimization' },
};

const TESTIMONIALS = [
  { name: 'Todd D. Muhlstock, Esq.', company: 'WeSueThem.com', quote: 'I have personally referred Oleg from Marketing Bull to colleagues and clients because I knew I could trust the results. Our intake pipeline is night and day from where it was.', rating: 5 },
  { name: 'Isak Yuhan', company: '1-800-HURT-511', quote: 'They delivered results beyond our expectations — our intake pipeline has never been stronger. We went from missing 30% of calls to capturing nearly all of them.', rating: 5 },
  { name: 'Laura Cole, Esq.', title: 'Attorney at Law', quote: 'Marketing Bull is excellent!! Prompt service, rapid replies, and very professional. The intake system they built for us runs on autopilot.', rating: 5 },
];

const FAQS = [
  { question: 'How long does it take to implement an Intake OS?', answer: 'Most firms are fully live within 3–4 weeks. Week 1 is discovery and system mapping, week 2 is build and integration, week 3 is testing and staff training, and week 4 is go-live with active monitoring.' },
  { question: 'What CRM and phone systems do you integrate with?', answer: 'We integrate natively with GoHighLevel (GHL), Clio, Litify, Filevine, and most major VoIP providers (RingCentral, CallRail, Twilio). If you use something else, we evaluate it during discovery.' },
  { question: 'Do we need to replace our current phone system?', answer: 'Not necessarily. In most cases we layer our intake automation on top of your existing infrastructure. We may recommend CallRail or a GHL-native number for tracking, but full replacement is rarely required.' },
  { question: 'What is speed-to-lead, and why does it matter so much?', answer: 'Speed-to-lead is the time between a prospect submitting a form or calling and your firm making first contact. Studies show 78% of clients hire the first firm that calls them back. After 5 minutes, conversion probability drops by over 80%.' },
  { question: 'What ROI can we expect, and how soon?', answer: 'Most clients see measurable improvements within the first 30 days. The average firm increases retained case count by 20–35% within 90 days — without spending more on advertising.' },
  { question: 'Is this HIPAA and legal compliance friendly?', answer: 'Yes. All data handling follows HIPAA guidelines where applicable, and our intake scripts are designed with legal intake best practices to avoid unauthorized practice of law issues.' },
];

const INCLUDED = [
  { icon: '📞', title: '24/7 AI Receptionist', desc: 'Never miss a call. Our AI voice agent qualifies leads, captures contact info, and books consults around the clock.' },
  { icon: '🔀', title: 'Multi-Channel Lead Capture', desc: 'Web forms, calls, SMS, chat, and referral portals — every channel flows into one unified pipeline.' },
  { icon: '⚡', title: 'Speed-to-Lead Automation', desc: 'Instant SMS + email follow-up the moment a lead comes in. Response in under 90 seconds.' },
  { icon: '🗂️', title: 'CRM Integration', desc: 'We connect and configure your CRM (GHL, Clio, Litify) so every lead is tracked from first touch to signed retainer.' },
  { icon: '📊', title: 'Intake Dashboard', desc: 'Real-time visibility into lead volume, conversion rates, response times, and staff performance.' },
  { icon: '🧠', title: 'AI Lead Scoring', desc: 'Automatically prioritize high-value cases so your staff focuses their time on the best opportunities.' },
  { icon: '📋', title: 'Intake Script Optimization', desc: 'A/B tested scripts that convert callers into consultations — built specifically for your practice area.' },
  { icon: '🎓', title: 'Staff Training & SOPs', desc: 'Your team gets trained on the new system with documented standard operating procedures.' },
];

export default function IntakeOptimizationPage() {
  return (
    <>
      <Hero
        eyebrow="Intake OS for Law Firms"
        title="Your Intake Is Leaking Cases. We Fix That."
        subtitle="Most PI firms lose 40–60% of inbound leads before speaking to them. Our Intake OS captures every call, qualifies every lead, and books the consult — automatically."
        primaryCTA={{ text: 'Get a Free Intake Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855', tel: true }}
      />

      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Silent Killer</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">You&apos;re Spending Money on Leads You&apos;re Not Closing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Most law firms have the same problem: the marketing is working, but the intake is broken. Here&apos;s what that costs you every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { stat: '78%', label: 'of clients hire the first firm that calls back', detail: "If you're not first, you're paying to generate leads for your competitors." },
              { stat: '35%', label: 'of calls go unanswered at the average law firm', detail: 'Every missed call is a case that signed with someone else.' },
              { stat: '80%', label: 'drop in conversion after 5-minute response delay', detail: "Speed-to-lead isn't a nice-to-have. It's the difference between signing and losing." },
              { stat: '<30%', label: 'CRM utilization at most firms we audit', detail: 'Your intake data is trapped in voicemail, sticky notes, and email threads.' },
            ].map((item) => (
              <div key={item.stat} className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-4xl font-bold text-red-500 mb-2">{item.stat}</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">{item.label}</div>
                <div className="text-slate-600 text-sm leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-5xl text-center">
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-4xl font-bold mb-6">Intake OS: Built for High-Volume PI Firms</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed">Intake OS isn&apos;t software — it&apos;s a complete operating system. We audit your current process, identify every leak, and rebuild your intake end-to-end so no lead falls through the cracks again.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { step: '01', title: 'Audit & Map', desc: 'We record and analyze your current intake flow — calls, forms, follow-ups, CRM usage — and score every leak in your funnel.' },
              { step: '02', title: 'Build & Integrate', desc: 'We build the automation layer: AI receptionist, lead routing, CRM pipelines, follow-up sequences, and tracking dashboards.' },
              { step: '03', title: 'Launch & Optimize', desc: 'Go live with full monitoring. We track conversion rates, speed-to-lead, and intake quality — and optimize continuously.' },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-5xl font-bold text-blue-400 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">By the Numbers</p>
            <h2 className="text-4xl font-bold text-slate-900">What Clients See After Intake OS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[{ metric: '<90s', label: 'Average speed-to-lead', sub: 'Down from 4+ hours' }, { metric: '+25%', label: 'Intake conversion rate', sub: 'Average across all clients' }, { metric: '0', label: 'Missed leads per day', sub: 'Every channel captured' }].map((item) => (
              <div key={item.label} className="text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-5xl font-bold text-blue-600 mb-2">{item.metric}</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{item.label}</div>
                <div className="text-slate-500 text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything in the Intake OS</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">One engagement, fully built. No piecemeal tools, no hidden add-ons.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INCLUDED.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel testimonials={TESTIMONIALS} />
      <FAQAccordion items={FAQS} />
      <CTASection
        title="Ready to Stop Leaking Cases?"
        description="Every day without optimized intake is revenue lost. Let's fix your intake in the next 30 days."
        primaryCTA={{ text: 'Get Your Free Intake Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
