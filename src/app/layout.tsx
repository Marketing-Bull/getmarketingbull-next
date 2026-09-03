import type { Metadata } from 'next';
import './globals.css';
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: COMPANY.website,
    siteName: COMPANY.name,
    title: 'Marketing Bull | Growth Consultancy for Law Firms & Medical Practices',
    description: 'Growth, engineered for the firms that can\'t afford to guess.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Bull | Growth Consultancy for Law Firms & Medical Practices',
    description: 'Growth, engineered for the firms that can\'t afford to guess.',
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
