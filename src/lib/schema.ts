import { COMPANY } from './constants';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  url: COMPANY.website,
  logo: `${COMPANY.website}/logo.png`,
  description: COMPANY.tagline,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    telephone: COMPANY.phoneFormatted,
    email: COMPANY.email,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.state,
    postalCode: COMPANY.zip,
    addressCountry: COMPANY.country,
  },
  sameAs: [
    'https://www.facebook.com/marketingbull',
    'https://www.linkedin.com/company/marketing-bull',
  ],
};

export const localBusinessSchema = {
  ...organizationSchema,
  '@type': 'LocalBusiness',
  priceRange: '$$$',
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
