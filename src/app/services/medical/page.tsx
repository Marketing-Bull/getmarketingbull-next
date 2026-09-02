import type { Metadata } from 'next';
import { MapPin, Stethoscope, Star, CalendarCheck, RefreshCw, BarChart2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Medical Practice Marketing & Patient Acquisition | Marketing Bull',
  description: 'Marketing Bull builds patient acquisition systems for medical practices — local SEO, paid search, automated recall, and reputation management that fills your schedule and keeps it full.',
  alternates: { canonical: 'https://getmarketingbull.com/services/medical' },
};

const TESTIMONIALS = [
  { name: 'Dr. Manoj Sadhnani', company: 'Queens Hyperbaric', quote: "Working with Marketing Bull has been a game-changer for my practice. We went from struggling to fill slots to seeing 30 new faces every month. The ROI speaks for itself.", rating: 5 },
  { name: 'Angela McMullin', company: '3D Dental', quote: "Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results. Our new patient volume is up significantly and our no-show rate dropped.", rating: 5 },
  { name: 'Laura Cole, Esq.', title: 'Attorney at Law', quote: "Marketing Bull is excellent!! Prompt service, rapid replies, and very professional. They understand the regulated space better than any agency I've worked with.", rating: 5 },
];

const FAQS = [
  { question: 'What types of medical practices do you work with?', answer: 'We work with a wide range of practices including hyperbaric oxygen therapy, dental, physical therapy, chiropractic, med spas, and specialty practices. Our systems adapt to your specific patient acquisition economics and referral structure.' },
  { question: 'How do you handle HIPAA compliance in your marketing?', answer: 'All campaigns are designed with HIPAA compliance in mind. We never use PHI in advertising, use compliant tracking methods, and build intake systems with appropriate data handling protocols. We document our compliance processes for every engagement.' },
  { question: 'Can you help with insurance vs. cash-pay patient acquisition?', answer: 'Yes — we build separate funnels for insurance-based and cash-pay acquisition, since the conversion economics are completely different. Cash-pay patients require stronger value messaging and price anchoring; insurance patients require trust signals and in-network verification.' },
  { question: 'What does a patient acquisition system actually include?', answer: 'At minimum: local SEO domination for your specialty + geography, Google and Meta paid campaigns, a conversion-optimized landing page, automated inquiry response (under 2 minutes), appointment booking integration, and a recall/reactivation system for existing patients.' },
  { question: 'How long until we see new patients from your campaigns?', answer: 'Paid search campaigns can drive new patient bookings within the first 2 weeks. Local SEO and review generation compounds over 3–6 months. Most practices see measurable new patient volume increases within 30–45 days of launch.' },
  { question: 'Do you help with online reviews and reputation management?', answer: 'Yes — automated review generation is a core part of every medical engagement. We trigger review requests at the right moment post-visit, route negative feedback privately, and help you build a 4.8+ star profile that drives organic trust and rankings.' },
];

const STACK: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: MapPin, title: 'Local SEO Domination', desc: 'Rank #1 in Google Maps and organic for your specialty + city. We optimize your GMB, build citations, and create content that converts searchers to callers.' },
  { Icon: Stethoscope, title: 'Paid Patient Acquisition', desc: 'Google Search and Meta campaigns targeting patients actively looking for your services. Every dollar tracked to a booked appointment.' },
  { Icon: Star, title: 'Reputation Management', desc: 'Automated post-visit review requests that build your 4.8+ star profile. Negative feedback routed privately before it goes public.' },
  { Icon: CalendarCheck, title: 'Booking & Intake Automation', desc: 'Online booking integration, automated SMS/email confirmation, and reminder sequences that cut no-shows by 40–60%.' },
  { Icon: RefreshCw, title: 'Patient Recall System', desc: 'Automated reactivation campaigns for lapsed patients. Your existing database is an untapped revenue source.' },
  { Icon: BarChart2, title: 'Practice Growth Dashboard', desc: 'Real-time reporting on new patient volume, cost per acquisition, and revenue per campaign. Know exactly what\'s working.' },
];

export default function MedicalPage() {
  return (
    <>
      <Hero
        eyebrow="For Medical Practices"
        title="Empty Appointment Slots Are a Marketing Problem. We Fix It."
        subtitle="Whether you're a specialty practice, dental office, or med spa — we build the patient acquisition systems that fill your schedule with qualified patients who show up and pay."
        primaryCTA={{ text: 'Get a Free Practice Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855', tel: true }}
      />

      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Real Problem</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Patients Are Searching. They&apos;re Just Finding Your Competitors.</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">Most medical practices have two problems they don&apos;t realize are related: not enough new patients, and too many no-shows from the ones they do get. Both are fixable with the right systems.</p>
              <p className="text-lg text-slate-600 leading-relaxed">The practices winning market share right now aren&apos;t necessarily the best clinicians. They have the best online presence, the fastest response time, and a system that keeps patients coming back.</p>
            </div>
            <div className="space-y-5">
              {[
                { stat: '77%', label: 'of patients research online before booking' },
                { stat: '3.5x', label: 'more patients from a 4.8★ vs 4.2★ rating' },
                { stat: '40%', label: 'average no-show reduction with automated reminders' },
                { stat: '60%', label: 'of lapsed patients return with a recall campaign' },
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">A Complete Patient Acquisition System</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We don&apos;t run one campaign and call it marketing. Every engagement includes the full infrastructure to find, convert, and retain patients.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STACK.map((item) => (
              <div key={item.title} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <item.Icon className="w-7 h-7 text-red-500 mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest mb-3">Why Marketing Bull</p>
            <h2 className="text-4xl font-bold mb-6">We Know the Economics of Medical Marketing</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Most agencies treat medical practices like any other local business. We understand the compliance requirements, the referral dynamics, the insurance vs. cash-pay split, and what actually drives patient lifetime value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'HIPAA-Aware Campaigns', desc: 'Every campaign is built with compliance in mind. No PHI in ads, compliant tracking, and documented processes that protect your practice.' },
              { title: 'Specialty-Specific Strategy', desc: "Hyperbaric, dental, chiropractic, and med spa each have different patient acquisition economics. We build for your specific conversion path and reimbursement model." },
              { title: 'Retention-First Thinking', desc: 'New patients matter. But the real profit is in retention. We build recall systems, loyalty sequences, and review generation that maximizes patient LTV.' },
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
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-4xl font-bold text-slate-900">What Practices See After 90 Days</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '30+', label: 'New patients per month average' },
              { metric: '4.8★', label: 'Average review rating post-system' },
              { metric: '−40%', label: 'No-show rate reduction' },
              { metric: '60%', label: 'Lapsed patient reactivation rate' },
            ].map((item) => (
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
        title="Let's Fill Your Schedule"
        description="Free 30-minute audit of your current patient acquisition setup. We'll show you exactly where new patients are going instead of you."
        primaryCTA={{ text: 'Get Your Free Practice Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
