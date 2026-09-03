import Link from 'next/link';
import { COMPANY, OFFERS } from '@/lib/constants';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="container-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Marketing Bull" width={28} height={28} className="rounded" />
              <span className="text-white font-bold">Marketing <span className="text-red-500">Bull</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5">{COMPANY.tagline}</p>
            <div className="flex gap-3">
              <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" aria-label="Instagram"><InstagramIcon /></a>
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" aria-label="Facebook"><FacebookIcon /></a>
              <a href={COMPANY.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" aria-label="X / Twitter"><XIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Products</h4>
            <ul className="text-sm space-y-2">
              {OFFERS.map((o) => (
                <li key={o.slug}><Link href={`/products/${o.slug}`} className="hover:text-white transition">{o.name}</Link></li>
              ))}
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/services/law-firms" className="hover:text-white transition">For Law Firms</Link></li>
              <li><Link href="/services/medical" className="hover:text-white transition">For Medical</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition">Case Studies</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="text-sm space-y-2">
              <li><a href={`tel:${COMPANY.phoneFormatted}`} className="text-blue-400 hover:text-blue-300">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="text-blue-400 hover:text-blue-300">{COMPANY.email}</a></li>
              <li>{COMPANY.address}</li>
              <li className="pt-2">
                <a href={COMPANY.goleadsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white px-3 py-1.5 rounded-full transition">
                  GoLeads Connect →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>&copy; {currentYear} {COMPANY.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-white transition">Accessibility</Link>
            <Link href="/software-license" className="hover:text-white transition">Software License</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
