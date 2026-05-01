import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://piintakegrowth.com'),
  title: 'PI Intake Growth | Stop Losing PI Cases to Slow Intake',
  description: 'PI Intake Growth is a done-for-you intake operating system built exclusively for personal injury law firms. Fix speed-to-lead, cover after-hours, and track every case back to its source.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://piintakegrowth.com',
    siteName: 'PI Intake Growth',
    title: 'PI Intake Growth | Stop Losing PI Cases to Slow Intake',
    description: 'A done-for-you intake OS built exclusively for personal injury law firms.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PI Intake Growth | Stop Losing PI Cases to Slow Intake',
    description: 'Fix your intake. Stop losing PI cases to faster firms.',
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'PI Intake Growth',
              description: 'A done-for-you intake operating system built exclusively for personal injury law firms.',
              brand: {
                '@type': 'Organization',
                name: 'Marketing Bull, LLC',
                url: 'https://getmarketingbull.com',
              },
              url: 'https://piintakegrowth.com',
            }),
          }}
        />
      </head>
      <body className="font-[Inter,sans-serif] antialiased">{children}</body>
    </html>
  );
}
