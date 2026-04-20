export const organizationSchema = {
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
  sameAs: ['https://www.linkedin.com/company/marketing-bull'],
};
