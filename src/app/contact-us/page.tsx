import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Marketing Bull | Get In Touch',
  description: 'Contact Marketing Bull today. Call us, email us, or fill out the form below. We\'re ready to discuss how we can help your business grow.',
};

export default function ContactUs() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container-md text-center">
          <h1 className="text-5xl font-bold mb-6">We're Happy to Connect With You</h1>
          <p className="text-2xl text-blue-100">
            Let's discuss how we can help your business grow
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {COMPANY.address}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <a
                    href={`tel:${COMPANY.phoneFormatted}`}
                    className="text-primary font-semibold text-lg hover:underline"
                  >
                    {COMPANY.phone}
                  </a>
                  <p className="text-gray-600 mt-1">{COMPANY.phoneFormatted}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-primary font-semibold text-lg hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                    <br />
                    Saturday: By Appointment
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                📍 {COMPANY.address}
              </p>
              <p className="text-gray-500 mt-2">West Palm Beach, FL 33401</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
