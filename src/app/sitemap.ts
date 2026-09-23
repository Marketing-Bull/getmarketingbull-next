import type { MetadataRoute } from 'next';
import { COMPANY, OFFERS } from '@/lib/constants';
import { CASE_STUDIES } from '@/lib/caseStudies';
import { POSTS } from '@/lib/blog';

/**
 * lastModified is set only where a real content date exists (posts, case studies).
 * Static and product pages have none, and stamping them with the build time tells
 * crawlers every page changed on every deploy, which teaches them to ignore lastmod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.website;
  const statics = ['', '/engagements', '/free-consultation', '/services', '/services/law-firms', '/services/medical', '/services/intake-optimization', '/about-us', '/case-studies', '/blog', '/careers', '/contact-us', '/privacy-policy', '/terms-of-service', '/accessibility', '/software-license'];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...OFFERS.map((o) => ({ url: `${base}/products/${o.slug}`, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...CASE_STUDIES.map((c) => ({ url: `${base}/case-studies/${c.slug}`, lastModified: new Date(c.published), changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updatedISO ?? p.dateISO), changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
