import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import { SERVICE_CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Marketing Services | Marketing Bull',
  description:
    'Explore our comprehensive marketing services designed for law firms, medical offices, and home service businesses. From intake optimization to lead generation, we deliver results.',
};

const ALL_SERVICES = [
  {
    icon: '📞',
    title: 'Intake Optimization',
    description:
      'Improve client acquisition and retention with modern CRMs, marketing automation and referral tracking.',
    href: '/services/intake-optimization',
  },
  {
    icon: '📱',
    title: 'Call Centers',
    description: 'Answer your clients\' calls at the right time, on any platform with professional service.',
    href: '/services/call-centers',
  },
  {
    icon: '👥',
    title: 'Business Process Outsourcing',
    description:
      'Reduce overhead cost with offshore outsourcing for PI, Mass Torts or Class Actions.',
    href: '/services/bpo-staffing',
  },
  {
    icon: '🎯',
    title: 'Lead Generation',
    description: 'Receive qualified PI or mass torts leads directly to your intake department.',
    href: '/services/lead-generation',
  },
  {
    icon: '📊',
    title: 'Analytics & Reporting',
    description: 'Custom dashboards and KPIs to track your business growth and marketing performance.',
    href: '/services/analytics-reporting',
  },
  {
    icon: '📢',
    title: 'Marketing',
    description:
      'Get in front of potential leads and acquire clients with strategic, cost-effective campaigns.',
    href: '#',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container-md text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-2xl text-blue-100">Serve More Clients Better</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">PR & Marketing Agency Services, Business Consultant Results</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We deliver comprehensive marketing solutions tailored to law firms, medical offices, and
            home service businesses. Whether you need to optimize intake processes, generate qualified
            leads, or manage your entire marketing strategy, we have the expertise to help you succeed.
          </p>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Our Specialties</h2>
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

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All-in-One Approach */}
      <section className="py-16 bg-blue-50">
        <div className="container-md max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">All-in-One Agency Approach</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We solve business problems from A to Z. From initial strategy to execution, from marketing
            campaigns to intake operations, from lead generation to customer retention—we handle it
            all. This integrated approach ensures every piece of your marketing works together
            seamlessly to drive results.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's discuss which services are right for your business and create a customized plan for growth."
        primaryCTA={{
          text: 'Schedule Your Free Consultation',
          href: '/free-consultation',
        }}
      />
    </>
  );
}
