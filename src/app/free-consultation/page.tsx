import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Free Strategy Consultation | Marketing Bull',
  description:
    'Get a free strategy consultation and branding & intake audit. Let\'s discuss your business growth goals and create a customized plan.',
};

export default function FreeConsultation() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container-md text-center">
          <h1 className="text-5xl font-bold mb-6">Free Strategy Consultation</h1>
          <p className="text-2xl text-blue-100 mb-6">
            Get a Branding & Intake Audit Report
          </p>
          <p className="text-lg text-blue-100">
            No obligation. No catch. Just honest insights on how to grow your business.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Custom Strategy</h3>
              <p className="text-gray-600">
                We analyze your business and create a customized growth strategy based on your goals
                and industry.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">Intake Audit</h3>
              <p className="text-gray-600">
                We audit your current intake process and identify missed opportunities that are
                costing you clients.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Action Plan</h3>
              <p className="text-gray-600">
                You'll get a clear, prioritized action plan with specific steps to implement
                immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Schedule Your Consultation</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Fill out the form and we'll schedule a time that works for you. This is a
                completely free consultation with no obligation.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long does it take?</h3>
                  <p className="text-gray-600">
                    Most consultations last 30-45 minutes. We'll discuss your business, goals, and
                    current challenges.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">What happens next?</h3>
                  <p className="text-gray-600">
                    After the call, we'll send you a detailed audit report with our findings and
                    recommendations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Questions?</h3>
                  <p className="text-gray-600">
                    Call us at{' '}
                    <a href={`tel:${COMPANY.phoneFormatted}`} className="text-primary font-semibold">
                      {COMPANY.phone}
                    </a>{' '}
                    or email{' '}
                    <a href={`mailto:${COMPANY.email}`} className="text-primary font-semibold">
                      {COMPANY.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Get Started</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why Schedule a Consultation?</h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span>
                <strong>Free & Confidential</strong> — No cost, no obligation, and everything you
                share is confidential.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span>
                <strong>Expert Analysis</strong> — We've worked with hundreds of businesses. We know
                what works.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span>
                <strong>Actionable Insights</strong> — You'll get specific, practical advice you can
                implement immediately.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span>
                <strong>No Pressure</strong> — We only work with clients we're confident we can help.
                If it's not a fit, we'll tell you.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span>
                <strong>Clear Plan</strong> — You'll walk away with a clear understanding of how to
                grow your business.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
