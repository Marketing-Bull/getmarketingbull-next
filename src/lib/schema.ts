import { COMPANY, type Offer } from './constants';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${COMPANY.website}/#organization`,
  name: COMPANY.legalName,
  alternateName: COMPANY.name,
  url: COMPANY.website,
  logo: `${COMPANY.website}/logo.png`,
  telephone: COMPANY.phoneFormatted,
  email: COMPANY.email,
  description: COMPANY.tagline,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '319 Clematis Street, Suite 300',
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.state,
    postalCode: COMPANY.zip,
    addressCountry: 'US',
  },
  areaServed: ['Florida', 'United States'],
  sameAs: Object.values(COMPANY.social),
};

export function offerSchema(offer: Offer) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offer.name,
    description: offer.short,
    provider: { '@id': `${COMPANY.website}/#organization` },
    url: `${COMPANY.website}/products/${offer.slug}`,
    offers: {
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: 'USD',
      url: `${COMPANY.website}/products/${offer.slug}`,
      ...(offer.billing === 'monthly'
        ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: offer.price, priceCurrency: 'USD', billingDuration: 1, billingIncrement: 1, unitCode: 'MON' } }
        : {}),
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
