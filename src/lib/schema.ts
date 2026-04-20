import { COMPANY } from './constants';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: `${COMPANY.name}, LLC`,
  url: COMPANY.website,
  logo: `${COMPANY.website}/logo.png`,
  telephone: COMPANY.phoneFormatted,
  email: COMPANY.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '319 Clematis Street, Suite 300',
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.state,
    postalCode: COMPANY.zip,
    addressCountry: COMPANY.country === 'USA' ? 'US' : COMPANY.country,
  },
  sameAs: ['https://www.linkedin.com/company/marketing-bull'],
};
