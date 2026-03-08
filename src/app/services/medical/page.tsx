import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Medical Practice Marketing & Patient Acquisition | Marketing Bull',
  description:
    'Your front desk is turning away patients. We audit, identify, and implement best practices for medical offices and spa clinics. Increase revenue up to 25%.',
};

const FAQ_ITEMS = [
  {
    question: 'Which platforms should we focus on for patient acquisition?',
    answer:
      'The best platforms are where your patients spend their time. We analyze your target demographic and focus marketing efforts on channels that deliver qualified patient leads.',
  },
  {
    question: 'Should we be on every social media platform?',
    answer:
      'No, focus on mastering the platforms where your patients are active. It\'s better to have a strong presence on 1-2 platforms than a weak presence everywhere.',
  },
  {
    question: 'How important is content marketing for medical practices?',
    answer:
      'Very important. Educational content establishes your expertise and builds trust with potential patients. When patients search for health information, they find you and trust your practice.',
  },
  {
    question: 'Do you create both immediate and long-term strategies?',
    answer:
      'Yes. We develop strategies that bring in patients quickly while building long-term brand authority and reputation that sustains growth over years.',
  },
  {
    question: 'How does your marketing improve patient appointments?',
    answer:
      'All our services are designed to generate qualified leads while optimizing your patient intake and scheduling processes to convert inquiries into booked appointments.',
  },
  {
    question: 'Can you help us improve our online reviews?',
    answer:
      'Yes, we implement systems to gather patient reviews and showcase positive feedback. Strong online reviews increase trust and lead to more new patient appointments.',
  },
  {
    question: 'What if we want to use traditional advertising too?',
    answer:
      'Traditional advertising still works for medical practices. We integrate digital and traditional channels for maximum reach and impact in your local market.',
  },
];

const faqSchema = generateFAQSchema(FAQ_ITEMS);

export default function MedicalPage() {
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
          <h1 className="text-5xl font-bold mb-6">Your Front Desk is Turning Away Patients</h1>
          <p className="text-2xl text-blue-100 mb-6">
            We Audit, Identify and Implement Best Practices for Today's Profitable Medical Offices &
            Spa Clinics
          </p>
          <p className="text-3xl font-bold text-green-300">Increase revenue up to 25%</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Medical Practice Marketing Done Right</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Healthcare professionals focus more of their time treating patients, with marketing &
            compliance taken care of. Our proven strategies help medical offices and spa clinics
            acquire more patients while optimizing operations.
          </p>
        </div>
      </section>

      {/* Services for Medical */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <h2 className="text-4xl font-bold text-center mb-12">Services For Medical Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '🏥',
                title: 'Patient Sign-Up',
                description:
                  'Improve patient acquisition and retention with modern systems, marketing automation and patient tracking.',
              },
              {
                icon: '☎️',
                title: 'Call Centers',
                description: 'Professional answering services that schedule appointments on any platform.',
              },
              {
                icon: '👥',
                title: 'Business Process Outsourcing',
                description:
                  'Reduce overhead cost with offshore outsourcing for administrative tasks and patient management.',
              },
              {
                icon: '🎯',
                title: 'Lead Generation',
                description: 'Receive qualified patient leads directly to your scheduling department.',
              },
              {
                icon: '📊',
                title: 'Analytics & Reporting',
                description: 'Custom dashboards tracking patient acquisition costs, revenue, and growth metrics.',
              },
              {
                icon: '📢',
                title: 'Marketing',
                description: 'Get in front of potential patients and acquire them cost-effectively.',
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
          <h2 className="text-4xl font-bold text-center mb-12">Why Medical Practices Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">More Patients</h3>
              <p className="text-gray-600">
                Our strategies generate qualified patient leads and optimize your scheduling to fill
                your books.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">The ROI Experts</h3>
              <p className="text-gray-600">
                We track patient acquisition costs and lifetime value. You'll always know your ROI.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">Healthcare Expertise</h3>
              <p className="text-gray-600">
                We've worked with medical offices, dermatology practices, urgent care, and more. We
                know healthcare marketing.
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">Compliance-First</h3>
              <p className="text-gray-600">
                All our strategies comply with HIPAA, state regulations, and healthcare advertising
                guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={FAQ_ITEMS} />

      {/* CTA */}
      <CTASection
        title="Ready to Fill Your Schedule With New Patients?"
        description="Let's audit your current patient acquisition process and identify opportunities to grow your practice."
        primaryCTA={{
          text: 'Schedule Your Free Audit',
          href: '/free-consultation',
        }}
      />
    </>
  );
}
