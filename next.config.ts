import type { NextConfig } from "next";

/**
 * 301 map from the legacy WordPress site (getmarketingbull.com, sitemap crawled Sep 2 2026).
 * Next.js strips trailing slashes before matching, so sources are written without them.
 * Keep this list in sync with claude/PLAN.md → Migration.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Core pages
  { source: '/pricing', destination: '/engagements' },
  { source: '/get-started', destination: '/free-consultation' },
  { source: '/get-more-customers', destination: '/free-consultation' },
  { source: '/tos', destination: '/terms-of-service' },
  { source: '/accessibility-statement', destination: '/accessibility' },
  { source: '/thank-you-event', destination: '/thank-you' },
  { source: '/newsletter-signup', destination: '/blog' },
  { source: '/resources', destination: '/blog' },
  { source: '/webinars', destination: '/contact-us' },
  { source: '/services/medical-services', destination: '/services/medical' },
  { source: '/services/services-law-firms', destination: '/services/law-firms' },

  // Team member pages (WordPress CPT, not in sitemap but indexed)
  { source: '/team-member/:slug', destination: '/about-us' },

  // Blog posts lived at the root on WordPress
  { source: '/ultimate-guide-to-personal-injury-intake', destination: '/blog/ultimate-guide-to-personal-injury-intake' },
  { source: '/speed-is-key-when-converting-legal-leads-to-clients', destination: '/blog/speed-is-key-when-converting-legal-leads-to-clients' },
  { source: '/the-ultimate-guide-to-dermatology-marketing-10-creative-ideas-to-boost-your-practice', destination: '/services/medical' },

  // Case studies with real published content get their own page; everything else → index
  { source: '/case_studies/1-800-hurt-511', destination: '/case-studies/1-800-hurt-511' },
  { source: '/case_studies/queens-hyperbaric', destination: '/case-studies/queens-hyperbaric' },
  { source: '/case_studies/metropolitan-orthopedics', destination: '/case-studies/metropolitan-orthopedics' },
  { source: '/case_studies/:slug', destination: '/case-studies' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
