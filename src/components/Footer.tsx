import Link from 'next/link';
import { POSTS } from '@/lib/blog';
import { COMPANY, FOOTER_APPS, FOOTER_NAV } from '@/lib/constants';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const SOCIAL = [
  { href: COMPANY.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: COMPANY.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: COMPANY.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: COMPANY.social.twitter, label: 'X', Icon: XIcon },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Software License', href: '/software-license' },
];

const POST_HREFS = new Set(POSTS.map((p) => `/blog/${p.slug}`));
/** A guide whose post was removed is dropped rather than left as a dead sitewide link. */
const COLUMNS = FOOTER_NAV.map((c) => ({ ...c, links: c.links.filter((l) => !l.href.startsWith('/blog/') || POST_HREFS.has(l.href)) }));

const link = 'hover:text-white transition';

/**
 * Three bands: a call to action, link columns grouped by what the visitor came to do, and the
 * business's name, address and phone exactly as on the Google Business Profile, with legal links.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* ── CTA BAND ── */}
      <div className="border-b border-slate-800">
        <div className="container-md py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <img src="/logo-mark.webp" alt="" width={28} height={18} className="rounded" />
              <span className="text-white font-bold">Marketing <span className="text-red-500">Bull</span></span>
            </div>
            <p className="mt-4 text-2xl font-black tracking-tight text-white">{COMPANY.tagline}</p>
            <p className="mt-2 text-sm">Serving firms and practices across Florida and the United States.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={COMPANY.bookingUrl} className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition">
              Start a conversation
            </Link>
            <Link href="/ai-website-audit" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:border-white transition">
              Audit my website free
            </Link>
            <a href={`tel:${COMPANY.phoneE164}`} className="px-2 py-3 text-sm font-semibold text-white hover:text-red-400 transition">
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── LINK COLUMNS ── */}
      <nav aria-label="Footer" className="container-md py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-white font-semibold mb-4 text-sm">{col.title}</h2>
              <ul className="text-sm space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* ── NAP + LEGAL ── */}
      <div className="border-t border-slate-800">
        <div className="container-md py-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center text-sm">
          <address className="not-italic leading-relaxed">
            <span className="text-white font-semibold">{COMPANY.legalName}</span>
            {' · '}
            <a href={COMPANY.googleProfile} target="_blank" rel="noopener noreferrer" className={link}>{COMPANY.address}</a>
            <br />
            <a href={`tel:${COMPANY.phoneE164}`} className={link}>{COMPANY.phone} ({COMPANY.phoneFormatted})</a>
            {' · '}
            <a href={`mailto:${COMPANY.email}`} className={link}>{COMPANY.email}</a>
            {' · '}
            <a href={COMPANY.googleReview} target="_blank" rel="noopener noreferrer" className={link}>Review us on Google</a>
          </address>
          <ul className="flex gap-4">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Marketing Bull on ${label}`} className="text-slate-500 hover:text-white transition"><Icon /></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-md pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {year} {COMPANY.legalName}. All rights reserved.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 md:border-l md:border-slate-800 md:pl-5">
              <li>Open source:</li>
              {FOOTER_APPS.map((a) => (
                <li key={a.href}>
                  {a.href.startsWith('http') ? (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className={link}>{a.label}</a>
                  ) : (
                    <Link href={a.href} className={link}>{a.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
