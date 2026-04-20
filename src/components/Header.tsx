'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS, COMPANY } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md text-white z-50 border-b border-slate-800">
      <div className="container-md">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/mb-preview/logo.png" alt="Marketing Bull" width={36} height={36} className="rounded" />
            <span className="text-lg font-bold tracking-tight">Marketing <span className="text-red-500">Bull</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.filter((l) => !l.cta).map((link) => (
              <div key={link.href} className="relative group">
                <Link href={link.href} className="text-sm text-slate-300 hover:text-white transition font-medium">{link.label}</Link>
                {link.submenu && (
                  <div className="absolute left-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                      {link.submenu.map((sub) => (
                        <Link key={sub.href} href={sub.href} className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition">{sub.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a href={`tel:${COMPANY.phoneFormatted}`} className="text-sm text-blue-300 hover:text-white transition">{COMPANY.phone}</a>
            <Link href="/free-consultation" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-btn text-sm font-semibold transition">Free Consultation</Link>
          </nav>
          <button className="md:hidden text-blue-300 text-sm font-medium" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? '✕ Close' : '☰ Menu'}
          </button>
        </div>
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-800 pt-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link href={link.href} className={`block px-4 py-2 rounded-lg text-sm transition ${link.cta ? 'bg-blue-600 text-white font-semibold text-center mt-2' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`} onClick={() => setMobileOpen(false)}>{link.label}</Link>
                {link.submenu && (
                  <div className="pl-4 mt-1">
                    {link.submenu.map((sub) => (
                      <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition" onClick={() => setMobileOpen(false)}>{sub.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href={`tel:${COMPANY.phoneFormatted}`} className="block px-4 py-2 text-sm text-blue-300 font-medium">📞 {COMPANY.phone}</a>
          </nav>
        )}
      </div>
    </header>
  );
}
