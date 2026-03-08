import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTASection from '@/components/CTASection';
import { TESTIMONIALS, SERVICE_CATEGORIES } from '@/lib/constants';
import { localBusinessSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Law Firm & Medical Marketing Agency | Marketing Bull',
  description:
    'Helping law firms, medical offices, and home service businesses grow with targeted marketing, intake optimization, and lead generation. Increase revenue up to 25%.',
  openGraph: {
    title: 'Law Firm & Medical Marketing Agency | Marketing Bull',
    description: 'Increase your revenue up to 25% with our proven marketing solutions.',
    type: 'website',
    url: 'https://getmarketingbull.com',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Hero Section */}
      <Hero
        title="Helping You Grow Your Business, One Customer At A Time"
        subtitle="Tailored Marketing Solutions for Law Firms, Healthcare Providers, and Home Service Businesses"
        primaryCTA={{
          text: 'Get Free Consultation',
          href: '/free-consultation',
        }}
        secondaryCTA={{
          text: 'Learn More',
          href: '/services',
        }}
      />

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Marketing Bull?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  🎯
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Targeted Strategies</h3>
                <p className="text-gray-600">
                  Boost your business with targeted marketing strategies that attract the right
                  clients.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  📈
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Steady Growth</h3>
                <p className="text-gray-600">
                  We ensure a steady flow of customers, so your business is always thriving.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  📊
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
                <p className="text-gray-600">
                  Stay informed with real-time data to measure your success and optimize
                  performance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  💰
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cost Efficiency</h3>
                <p className="text-gray-600">
                  Achieve your growth goals without overspending by maximizing marketing
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Marketing Bull, where our mission is simple: to help businesses achieve
              their net income goals and grow to the next level. We work with law firms, medical
              offices, and home service companies to deliver results that matter. Whether you need
              intake optimization, lead generation, or comprehensive marketing strategies, we have
              the expertise and passion to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Serve More Clients Better
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((service) => (
              <ServiceCard
                key={service.href}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Our Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">25%</div>
              <p className="text-xl">Average Revenue Increase</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-xl">Successful Cases</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">30+</div>
              <p className="text-xl">Years Combined Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel testimonials={TESTIMONIALS} />

      {/* CTA */}
      <CTASection
        title="Ready to Grow Your Business?"
        description="Let's schedule a free consultation to discuss your marketing goals and how we can help."
        primaryCTA={{
          text: 'Get Your Free Consultation',
          href: '/free-consultation',
        }}
      />
    </>
  );
}
