import type { MetadataRoute } from 'next';
import { COMPANY, OFFERS } from '@/lib/constants';
import { CASE_STUDIES } from '@/lib/caseStudies';
import { POSTS } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.website;
  const now = new Date();
  const statics = ['', '/pricing', '/free-consultation', '/services', '/services/law-firms', '/services/medical', '/services/intake-optimization', '/about-us', '/case-studies', '/blog', '/careers', '/contact-us', '/privacy-policy', '/terms-of-service', '/accessibility', '/software-license'];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...OFFERS.map((o) => ({ url: `${base}/products/${o.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...CASE_STUDIES.map((c) => ({ url: `${base}/case-studies/${c.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.dateISO), changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
