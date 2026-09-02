'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS, COMPANY } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-md text-white z-50 border-b border-slate-800">
      <div className="container-md">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="" width={32} height={32} className="rounded" />
            <span className="text-lg font-black tracking-tight">
              Marketing <span className="text-red-500">Bull</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.filter((l) => !l.cta).map((link) => (
              <div key={link.label} className="relative group">
                <Link href={link.href} className="text-sm text-slate-300 hover:text-white transition font-medium py-2 inline-block">
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="absolute left-0 top-full pt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                      {link.submenu.map((sub) => (
                        <Link key={sub.href + sub.label} href={sub.href} className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a href={`tel:${COMPANY.phoneFormatted}`} className="text-sm text-slate-300 hover:text-white transition font-medium">
              {COMPANY.phone}
            </a>
            <Link href="/free-consultation" className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition">
              Book a Call
            </Link>
          </nav>

          <button
            className="md:hidden text-slate-200 text-sm font-medium px-2 py-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕ Close' : '☰ Menu'}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-5 border-t border-slate-800 pt-3 space-y-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm transition ${link.cta ? 'bg-red-600 text-white font-semibold text-center mt-3' : 'text-slate-200 hover:bg-slate-800 font-medium'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="pl-4">
                    {link.submenu.map((sub) => (
                      <Link key={sub.href + sub.label} href={sub.href} className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded transition" onClick={() => setMobileOpen(false)}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href={`tel:${COMPANY.phoneFormatted}`} className="block px-4 py-2.5 text-sm text-slate-300 font-medium">
              Call {COMPANY.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
