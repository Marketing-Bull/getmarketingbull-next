import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://getmarketingbull.com'),
  title: 'Marketing Bull - Law Firm & Medical Marketing Agency',
  description: 'Marketing Bull helps law firms, medical offices, and home service businesses grow with targeted marketing strategies, intake optimization, and lead generation.',
  keywords: ['law firm marketing', 'medical marketing', 'intake optimization', 'lead generation'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getmarketingbull.com',
    siteName: 'Marketing Bull',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://getmarketingbull.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
