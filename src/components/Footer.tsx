import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="container-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/mb-preview/logo.png" alt="Marketing Bull" width={28} height={28} className="rounded" />
              <span className="text-white font-bold">Marketing <span className="text-red-500">Bull</span></span>
            </div>
            <p className="text-sm leading-relaxed">{COMPANY.tagline}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Services</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/services/intake-optimization" className="hover:text-white transition">Intake Optimization</Link></li>
              <li><Link href="/services/law-firms" className="hover:text-white transition">For Law Firms</Link></li>
              <li><Link href="/services/medical" className="hover:text-white transition">For Medical</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/free-consultation" className="hover:text-white transition">Free Consultation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="text-sm space-y-2">
              <li><a href={`tel:${COMPANY.phoneFormatted}`} className="text-blue-400 hover:text-blue-300">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="text-blue-400 hover:text-blue-300">{COMPANY.email}</a></li>
              <li>{COMPANY.address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} {COMPANY.name}, LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
