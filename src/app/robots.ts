import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/thank-you'] }],
    sitemap: `${COMPANY.website}/sitemap.xml`,
  };
}
