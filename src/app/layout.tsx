import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import CallTracking from '@/components/CallTracking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY, GA_MEASUREMENT_ID } from '@/lib/constants';
import { organizationSchema } from '@/lib/schema';
import { OG_BASE } from '@/lib/metadata';

// Self-hosted by Next at build time: no render-blocking request to Google and no
// swap-in flash. og.tsx still fetches Inter from Google, but that runs server-side
// while rendering an OG image and never touches a visitor's critical path.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: 'Marketing Bull | Growth for Law Firms & Medical Practices',
    template: '%s | Marketing Bull',
  },
  description:
    'Senior growth consultancy for PI firms and medical practices. We find where you lose cases or patients, build the fix, and stay accountable for the number.',
  // Only sitewide-invariant fields here. Title, description and url are left to
  // each page so shares carry that page's own copy rather than the homepage's.
  openGraph: {
    ...OG_BASE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

// GA4 loads directly: there is no confirmed GTM container for this site, and the
// one from the old WordPress build cannot be assumed to exist or to be clean.
// NEXT_PUBLIC_GTM_ID is the switch between the two paths, never both:
//   - unset (today): the gtag snippet below is rendered and GTM is not.
//   - set: GTM is rendered and the gtag snippet is not. GA4 must then be configured
//     as a tag inside the container, or GA collects nothing.
// NEXT_PUBLIC_GA_ID only chooses which GA4 property the direct snippet reports to.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || undefined;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Marks the document as scripted before first paint so <Reveal> can start
          hidden (see globals.css) without SSR ever shipping invisible content. If
          the page has reveals but hydration hasn't reached them within 3s (slow
          or failed JS), drop the class so nothing stays hidden.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){d.classList.add('js');setTimeout(function(){if(!d.hasAttribute('data-reveal-ready')&&document.querySelector('[data-reveal]:not([data-shown])'))d.classList.remove('js')},3000)})(document.documentElement);`,
          }}
        />
        {/*
          Google's canonical gtag snippet, server-rendered.

          This was previously <GoogleAnalytics> from @next/third-parties, which uses
          next/script afterInteractive: the tag is injected by React after hydration,
          so the served HTML carried only a preload link and nothing ran until
          hydration finished. These two tags are in the HTML itself, so GA starts on
          page load and does not depend on hydration succeeding.

          Skipped only when a GTM container is set (see GTM_ID above), so GA4 never
          runs twice.
        */}
        {GTM_ID ? null : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-red-600"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="pt-16 focus:outline-none">{children}</main>
        <Footer />
        <CallTracking />
        <Analytics />
      </body>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
    </html>
  );
}
