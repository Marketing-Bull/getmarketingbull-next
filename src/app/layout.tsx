import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/constants';
import { organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: 'Marketing Bull | Fixed-Price Marketing for Law Firms & Medical Practices',
    template: '%s | Marketing Bull',
  },
  description:
    'Three fixed-price growth products for personal injury firms and medical practices: a website in 14 days, an intake gap audit, and an AI content & search engine. Published pricing. You own everything.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: COMPANY.website,
    siteName: COMPANY.name,
    title: 'Marketing Bull | Fixed-Price Marketing for Law Firms & Medical Practices',
    description: 'Get found. Get called. Get signed. Three products, published prices, 14-day delivery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Bull | Fixed-Price Marketing for Law Firms & Medical Practices',
    description: 'Get found. Get called. Get signed. Three products, published prices, 14-day delivery.',
  },
  robots: { index: true, follow: true },
};

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
      </body>
    </html>
  );
}
