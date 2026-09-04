import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import CallTracking from '@/components/CallTracking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/constants';
import { organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: 'Marketing Bull | Growth Consultancy for Law Firms & Medical Practices',
    template: '%s | Marketing Bull',
  },
  description:
    'A senior growth consultancy in West Palm Beach for personal injury firms and medical practices. We find where a firm is losing cases or patients, build the system that fixes it, and stay accountable for the number.',
  // Only sitewide-invariant fields here. Title, description and url are left to
  // each page so shares carry that page's own copy rather than the homepage's.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

// Unset until the container is created in GTM; the tag simply does not render,
// and every track() call stays a no-op. Vercel Analytics needs no id.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-[Inter,sans-serif] antialiased bg-white text-slate-900">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <CallTracking />
        <Analytics />
      </body>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
    </html>
  );
}
