import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Home Services Marketing & Local Lead Generation | Marketing Bull',
  description: 'Marketing Bull builds local lead generation systems for home service businesses — HVAC, plumbing, roofing, electrical, and more. Show up first, answer fast, book more jobs.',
  alternates: { canonical: 'https://getmarketingbull.com/services/home-services' },
};

const TESTIMONIALS = [
  { name: 'Isak Yuhan', company: '1-800-HURT-511', quote: "They delivered results beyond our expectations — our intake pipeline has never been stronger. Every dollar we put in comes back multiplied.", rating: 5 },
  { name: 'Vinay Gaonkar', company: 'GreenBills', quote: "Excellent results on leads and client conversions. Highly recommend Marketing Bull for any growing business.", rating: 5 },
  { name: 'Angela McMullin', company: '3D Dental', quote: "Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results.", rating: 5 },
];

const FAQS = [
  { question: 'What home service businesses do you work with?', answer: 'We work with HVAC, plumbing, electrical, roofing, landscaping, pest control, cleaning services, and other residential and commercial service businesses. Our systems are built around high-intent local search and inbound call conversion.' },
  { question: 'How quickly can you generate new job bookings?', answer: 'Google Local Services Ads and paid search can drive booked jobs within the first week. LSA profiles with strong review counts see results almost immediately. SEO and GMB optimization compounds over 60–90 days.' },
  { question: 'Do you help with Google Local Services Ads (LSA)?', answer: 'Yes — LSA setup, verification, bid management, and lead dispute resolution are core parts of our home services package. LSA leads are often the highest-intent and lowest-cost available in local markets.' },
  { question: 'What about reputation management and reviews?', answer: 'Absolutely. We automate review requests via SMS and email after each completed job, monitor incoming reviews, and help you build a 4.8+ star profile that converts searchers at a higher rate than competitors.' },
  { question: 'Can you handle both residential and commercial?', answer: 'Yes — we build separate campaigns and landing pages for residential and commercial audiences since their search intent, decision timelines, and conversion paths are completely different.' },
  { question: 'How do you handle missed calls and after-hours leads?', answer: 'We build automated missed-call text-back systems, after-hours SMS response, and voicemail-to-text workflows so no lead goes cold overnight. Response speed is the #1 driver of booked jobs in home services.' },
];

const STACK = [
  { icon: '📍', title: 'Local SEO & GMB Domination', desc: 'Rank #1 in Google Maps and organic for your service + city. We optimize your Google Business Profile, build citations, and create service-area content that drives calls.' },
  { icon: '🏆', title: 'Google Local Services Ads', desc: 'Get the Google Guaranteed badge and show up above paid ads. We handle setup, verification, and bid management to maximize your cost per booked job.' },
  { icon: '📢', title: 'Paid Local Lead Generation', desc: 'Google Search and Meta campaigns targeting homeowners actively searching for your services. Every ad tracked to a call, form fill, or booked appointment.' },
  { icon: '📞', title: 'Missed-Call Text-Back & After-Hours', desc: 'Automated SMS response within 60 seconds of a missed call. After-hours AI response captures and qualifies leads so your team wakes up to booked jobs.' },
  { icon: '⭐', title: 'Reputation & Review Engine', desc: 'Automated post-job review requests that build your 4.8+ star profile. More stars mean higher conversion — we make it systematic.' },
  { icon: '📊', title: 'Lead & Revenue Dashboard', desc: 'Real-time visibility into cost per lead, cost per booked job, and revenue per campaign. You always know where every dollar is going.' },
];

export default function HomeServicesPage() {
  return (
    <>
      <Hero
        eyebrow="For Home Service Businesses"
        title="Homeowners Search. They Call Whoever Shows Up First."
        subtitle="We put your business at the top of local search, answer every inbound call, and turn inquiries into booked jobs — automatically."
        primaryCTA={{ text: 'Get a Free Lead Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855', tel: true }}
      />

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Real Problem</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">You&apos;re Losing Jobs to Competitors Who Answer Faster.</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">In home services, the first business to respond wins. Most contractors don&apos;t have a lead problem — they have a response speed problem. Leads come in, go unanswered for hours, and move on.</p>
              <p className="text-lg text-slate-600 leading-relaxed">We fix both ends: get you visible to the homeowners searching right now, and make sure every single inquiry gets an immediate, professional response — even at 11pm on a Sunday.</p>
            </div>
            <div className="space-y-5">
              {[
                { stat: '78%', label: 'of service calls go to the first responder' },
                { stat: '5min', label: 'response window before lead quality drops 80%' },
                { stat: '88%', label: 'of homeowners check reviews before booking' },
                { stat: '3x', label: 'more booked jobs from a 4.8★ vs 4.2★ profile' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-5 p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 min-w-[80px]">{item.stat}</div>
                  <div className="text-slate-700 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Stack */}
      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">What We Build</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Complete Home Services Growth Stack</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Six systems that work together to fill your calendar with quality jobs — from search to booked appointment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STACK.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">The Results</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Home Service Clients See</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { n: '+40%', l: 'Average Booked Job Increase', d: 'Within 90 days of full stack deployment' },
              { n: '<60s', l: 'Missed-Call Response Time', d: 'Automated SMS response to every missed call' },
              { n: '4.8★', l: 'Average Review Rating', d: 'After automated review request system' },
            ].map((st) => (
              <div key={st.l} className="text-center p-10 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">{st.n}</div>
                <div className="text-slate-900 font-bold mb-1">{st.l}</div>
                <div className="text-slate-500 text-sm">{st.d}</div>
              </div>
            ))}
          </div>

          {/* Differentiators */}
          <div className="bg-slate-900 rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-8 text-center">Why Home Service Companies Choose Marketing Bull</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '📞', title: 'We Obsess Over Response Speed', desc: 'A lead that waits more than 5 minutes is a lost job. Our systems are built around instant response — always.' },
                { icon: '📍', title: 'Hyper-Local, Not Generic', desc: 'We build campaigns for your specific service area, not a generic regional strategy. Zip code targeting, neighborhood landing pages, local keywords.' },
                { icon: '💰', title: 'Cost Per Booked Job, Not Clicks', desc: 'We track success by jobs booked and revenue generated, not impressions or traffic. Every campaign measured on ROI.' },
                { icon: '🔧', title: 'We Handle the Tech', desc: 'CRM setup, call tracking, LSA verification, review automation — we build and manage the whole stack so you can focus on the work.' },
              ].map((d) => (
                <div key={d.title} className="flex gap-4">
                  <div className="text-2xl">{d.icon}</div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{d.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Client Results</p>
            <h2 className="text-4xl font-bold text-slate-900">What Our Clients Say</h2>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-slate-900">Common Questions</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <CTASection
        title="Ready to Fill Your Calendar?"
        description="Book a free 30-minute lead audit. We&apos;ll show you exactly where you&apos;re losing jobs and how to fix it — no pitch, no pressure."
        primaryCTA={{ text: 'Get Your Free Lead Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
