import type { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Marketing Bull | Our Story & Team',
  description:
    'Learn about Marketing Bull—the marketing agency trusted by law firms and medical practices. Meet our team and discover our approach to helping businesses grow.',
};

export default function AboutUs() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container-md text-center">
          <h1 className="text-5xl font-bold mb-6">About Marketing Bull</h1>
          <p className="text-2xl text-blue-100">
            Helping businesses achieve their growth goals since day one
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl">
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Marketing Bull was founded on a simple belief: businesses shouldn't have to choose
              between growth and sustainability. We've spent years working with law firms, medical
              offices, and home service companies—and we've seen firsthand what separates the
              successful from the struggling.
            </p>
            <p>
              It comes down to three things: the right strategy, the right execution, and the right
              people. We built Marketing Bull around these principles, and it shows in our results.
            </p>
            <p>
              Today, we're proud to be trusted by hundreds of businesses across multiple industries.
              Whether it's optimizing intake processes, generating qualified leads, or managing
              comprehensive marketing campaigns, we know what works—and we deliver it consistently.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To help businesses achieve their net income goals and grow to the next level by
                delivering strategic marketing solutions that attract the right clients and
                optimize operations.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Approach</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Industry expertise in legal, medical, and home services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Data-driven decision making and real-time reporting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Transparent communication and partnership mentality</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Results-oriented with measurable ROI</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                👤
              </div>
              <h3 className="text-xl font-bold mb-2">Alexander</h3>
              <p className="text-gray-600">Chief Strategy Officer</p>
              <p className="text-sm text-gray-500 mt-2">10+ years of marketing excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container-md text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="space-y-4 text-lg">
            <p>
              <strong>Address:</strong>
              <br />
              {COMPANY.address}
            </p>
            <p>
              <strong>Phone:</strong>
              <br />
              <a href={`tel:${COMPANY.phoneFormatted}`} className="text-primary hover:underline">
                {COMPANY.phone}
              </a>
            </p>
            <p>
              <strong>Email:</strong>
              <br />
              <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Work Together"
        description="Whether you have questions or are ready to start your growth journey, we're here to help."
        primaryCTA={{
          text: 'Schedule a Call',
          href: '/free-consultation',
        }}
      />
    </>
  );
}
