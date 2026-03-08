import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://getmarketingbull.com'),
  title: 'Marketing Bull | Coming Soon — Strategic Marketing for Growing Businesses',
  description:
    'Marketing Bull is rebuilding. Strategic marketing and intake optimization for law firms, medical practices, and home service businesses. Launching soon.',
  keywords: ['law firm marketing', 'medical marketing', 'intake optimization', 'lead generation', 'Marketing Bull'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getmarketingbull.com',
    siteName: 'Marketing Bull',
    title: 'Marketing Bull | Something Bigger Is Coming',
    description:
      'Strategic marketing for law firms, medical practices, and home services. New site launching soon.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://getmarketingbull.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
