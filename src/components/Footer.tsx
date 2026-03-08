import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16 border-t border-gray-700/50">
      <div className="container-md py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">{COMPANY.name}</h3>
            <p className="text-gray-400 text-sm">{COMPANY.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services/law-firms" className="hover:text-white transition">
                  For Law Firms
                </Link>
              </li>
              <li>
                <Link href="/services/medical" className="hover:text-white transition">
                  For Medical
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/free-consultation" className="hover:text-white transition">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href={`tel:${COMPANY.phoneFormatted}`} className="hover:text-white transition">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
