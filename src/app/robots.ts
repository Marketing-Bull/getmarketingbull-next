import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    // /thank-you is deliberately not disallowed: it is noindex, and a crawler that is
    // blocked from fetching it never sees the noindex and can still index the URL.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${COMPANY.website}/sitemap.xml`,
  };
}
