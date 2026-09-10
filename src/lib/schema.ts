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
    areaServed: ['Florida', 'United States'],
    // No Offer/price node: pricing is quoted per engagement and not published,
    // so emitting a price here would contradict the page.
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

/**
 * BreadcrumbList for the three sections that have a real hierarchy. The product and
 * case-study pages already render a visual breadcrumb; this is the markup behind it,
 * so keep the two in step — a trail that disagrees with the page is worse than none.
 */
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${COMPANY.website}${item.url}`,
    })),
  };
}

/**
 * A case study is an Article about the engagement, not a Review or a Product: the
 * subject is the client's outcome, and the claims are ours. `about` names the client
 * as the organization the piece concerns without asserting they endorse anything.
 */
export function caseStudySchema(cs: {
  slug: string;
  client: string;
  industry: string;
  location: string;
  summary: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cs.client} — Case Study`,
    description: cs.summary,
    url: `${COMPANY.website}/case-studies/${cs.slug}`,
    author: { '@id': `${COMPANY.website}/#organization` },
    publisher: { '@id': `${COMPANY.website}/#organization` },
    about: {
      '@type': 'Organization',
      name: cs.client,
      description: `${cs.industry} — ${cs.location}`,
    },
  };
}

/**
 * Person nodes for the team. This is the E-E-A-T signal for a consultancy whose
 * pitch is that the people on the first call do the work, so the names on the page
 * should be legible as entities rather than plain text.
 */
export function personSchema(person: { name: string; role: string; bio: string; photo: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: `${COMPANY.website}${person.photo}`,
    worksFor: { '@id': `${COMPANY.website}/#organization` },
    url: `${COMPANY.website}/about-us`,
  };
}
