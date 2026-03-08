import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Personal Injury Law Firm Marketing & Intake Optimization | Marketing Bull',
  description:
    'Stop turning away clients. We audit, identify, and implement best practices for law firms. Increase revenue up to 25% with our proven strategies.',
};

const FAQ_ITEMS = [
  {
    question: 'Which social media platforms should we focus on?',
    answer:
      'The best social media is where your customer spends their time. We analyze your target audience and focus on the platforms that deliver the highest ROI for your specific practice.',
  },
  {
    question: 'Should we be on every social media platform?',
    answer:
      'No, dominate the platform where your customer is. Spread yourself too thin and you\'ll see poor results. We recommend focusing on 1-2 platforms where your ideal clients spend their time.',
  },
  {
    question: 'Does content marketing really work for law firms?',
    answer:
      'Yes, amazing content establishes you as an expert. When potential clients search for legal information, they find your content and trust your expertise. This builds your reputation and drives qualified leads.',
  },
  {
    question: 'Should we have both short-term and long-term marketing strategies?',
    answer:
      'Yes, we tailor strategy with short-term and long-term components. Short-term tactics get you immediate cases while long-term strategies build your brand authority and sustain growth.',
  },
  {
    question: 'How does your marketing service help with intake and appointments?',
    answer:
      'All services designed to generate leads + help screening and appointments. We don\'t just bring in leads—we optimize your entire intake process to convert them into cases.',
  },
  {
    question: 'Can you help us get more client reviews?',
    answer:
      'Yes, we help gather reviews and make negative ones less relevant. Strong review profiles increase trust and conversions. We implement systematic approaches to collect and showcase positive feedback.',
  },
  {
    question: 'What about traditional advertising like billboards?',
    answer:
      'Out of home advertising is thriving (billboards). When combined with digital marketing, traditional channels can provide powerful results. We integrate all channels for maximum impact.',
  },
];

const faqSchema = generateFAQSchema(FAQ_ITEMS);

export default function LawFirmsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container-md text-center">
          <h1 className="text-5xl font-bold mb-6">Your Intake Department is Turning Away Clients</h1>
          <p className="text-2xl text-blue-100 mb-6">
            We Audit, Identify and Implement Best Practices for Today's Profitable Law Firms
          </p>
          <p className="text-3xl font-bold text-green-300">Increase revenue up to 25%</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Law Firm Marketing Done Right</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Personal injury law firms need more than generic marketing advice. You need strategies
            designed specifically for legal practices—ones that generate qualified leads, optimize
            intake, and help your firm close more cases.
          </p>
        </div>
      </section>

      {/* Services for Law Firms */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Services For Law Firms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '📞',
                title: 'Intake Department',
                description:
                  'Improve client acquisition and retention with modern CRMs, marketing automation and referral tracking.',
              },
              {
                icon: '☎️',
                title: 'Call Centers',
                description: 'Answer your client\'s call at the right time, on any platform.',
              },
              {
                icon: '👥',
                title: 'Business Process Outsourcing',
                description:
                  'Reduce overhead cost with offshore outsourcing for PI, Mass Torts or Class Actions.',
              },
              {
                icon: '🎯',
                title: 'Lead Generation',
                description: 'Receive qualified PI or mass torts leads directly to your intake department.',
              },
              {
                icon: '📊',
                title: 'Analytics & Reporting',
                description: 'Custom dashboards and KPIs.',
              },
              {
                icon: '📢',
                title: 'Marketing',
                description:
                  'Get in front of potential leads and acquire clients below market value.',
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Why Law Firms Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">Increase Sales</h3>
              <p className="text-gray-600">
                Our strategies generate more qualified leads and optimize your intake to close more
                cases.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">The ROI Experts</h3>
              <p className="text-gray-600">
                We track every metric that matters. You'll always know your marketing ROI.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">Best Practices</h3>
              <p className="text-gray-600">
                We've worked with hundreds of law firms. We know what works and what doesn't.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">Ask Us Anything</h3>
              <p className="text-gray-600">
                Our team is available to answer your questions about law firm marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={FAQ_ITEMS} />

      {/* CTA */}
      <CTASection
        title="Ready to Increase Your Intake and Revenue?"
        description="Let's audit your current process and identify opportunities to grow your practice."
        primaryCTA={{
          text: 'Schedule Your Free Audit',
          href: '/free-consultation',
        }}
      />
    </>
  );
}
