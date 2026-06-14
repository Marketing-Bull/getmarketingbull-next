import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://getmarketingbull.com'),
  title: 'Marketing Bull | Law Firm Marketing & Intake Optimization',
  description: 'Marketing Bull helps law firms, medical practices, and home service businesses grow with targeted marketing, intake optimization, and lead generation. Stop losing clients to slow intake.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getmarketingbull.com',
    siteName: 'Marketing Bull',
    title: 'Marketing Bull | Law Firm Marketing & Intake Optimization',
    description: 'Helping law firms, medical practices, and home service businesses grow with targeted marketing and intake optimization.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Bull | Law Firm Marketing & Intake Optimization',
    description: 'Helping law firms, medical practices, and home service businesses grow.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://getmarketingbull.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Marketing Bull, LLC',
              url: 'https://getmarketingbull.com',
              logo: 'https://getmarketingbull.com/logo.png',
              telephone: '1-833-438-2855',
              email: 'hello@getmarketingbull.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '319 Clematis Street, Suite 300',
                addressLocality: 'West Palm Beach',
                addressRegion: 'FL',
                postalCode: '33401',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.linkedin.com/company/marketing-bull',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
