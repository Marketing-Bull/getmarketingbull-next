'use client';

import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { SERVICE_CATEGORIES, TESTIMONIALS } from '@/lib/constants';

// Stats data with proper % symbol
const STATS = [
  { number: '25%', label: 'Revenue Increase', description: 'Average client improvement' },
  { number: '500+', label: 'Cases Handled', description: 'Successful client outcomes' },
  { number: '30+', label: 'Active Clients', description: 'Growing every month' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <Hero
        title="Helping You Grow Your Business, One Customer At A Time"
        subtitle="Expert Law Firm Marketing & Intake Optimization That Stops Revenue Leaks"
        description="Specialized personal injury marketing and medical practice marketing that converts. We fix broken intake systems and optimize lead generation to help law firms increase revenue up to 25%."
        primaryCTA={{
          text: "Schedule Free Consultation",
          href: "/free-consultation"
        }}
        secondaryCTA={{
          text: "Learn More About Our Services",
          href: "/services"
        }}
      />

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Numbers Don't Lie</h2>
            <p className="text-xl text-slate-300">Data-driven marketing that delivers measurable growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-5xl font-bold text-blue-400 mb-3">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-slate-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">We Fix the Problems That Cost You Clients</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Marketing Bull is a South Florida agency specializing in intake optimization, lead generation, and law firm marketing for legal practices, medical offices, and home service businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SERVICE_CATEGORIES.map((service, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel testimonials={TESTIMONIALS} />

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Every day without optimized intake is money left on the table. Schedule your free consultation now and discover how we help law firms increase revenue up to 25%.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/free-consultation"
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
            >
              Get Free Consultation
            </a>
            <a
              href="tel:+18334288855"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-xl transition-all duration-300"
            >
              Call 1-833-GET-BULL
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}