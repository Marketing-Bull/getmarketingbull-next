import type { NextConfig } from "next";

/**
 * 301 map from the legacy WordPress site (getmarketingbull.com, sitemap crawled Sep 2 2026).
 * Next.js strips trailing slashes before matching, so sources are written without them.
 * Keep this list in sync with claude/PLAN.md → Migration.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Core pages
  { source: '/pricing', destination: '/engagements' },
  // /get-started is not redirected: it is the live SMS opt-in page (src/app/get-started).
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

/**
 * Content-Security-Policy. Every third-party origin the browser talks to must be listed here,
 * or it is blocked: adding a tag, embed or widget means adding its origins in the same change.
 *
 * script-src keeps 'unsafe-inline'. Next's inline RSC payload scripts differ per page, so the
 * only alternative is a per-request nonce, which forces every page to render dynamically
 * (no static HTML, slower TTFB, more function invocations). Without it the policy still blocks
 * scripts from any origin not listed, plugins, <base> hijacking, framing, and forms posting
 * anywhere but this site.
 */
const isDev = process.env.NODE_ENV === 'development';
// The Vercel Toolbar (comments, feedback) is injected on preview deployments only.
const isPreview = process.env.VERCEL_ENV === 'preview';
const toolbar = (...extra: string[]) => (isPreview ? ['https://vercel.live', ...extra] : []);

const GOOGLE_ANALYTICS = [
  'https://*.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.g.doubleclick.net', // Google Signals
  'https://*.google.com',
];

const CSP = [
  ["default-src", "'self'"],
  ['script-src', "'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), 'https://*.googletagmanager.com', 'https://challenges.cloudflare.com', 'https://va.vercel-scripts.com', ...toolbar()],
  ['style-src', "'self'", "'unsafe-inline'", ...toolbar()],
  ['img-src', "'self'", 'data:', 'blob:', ...GOOGLE_ANALYTICS, ...toolbar('https://vercel.com')],
  ['font-src', "'self'", 'data:', ...toolbar('https://assets.vercel.com')],
  ['connect-src', "'self'", ...GOOGLE_ANALYTICS, 'https://challenges.cloudflare.com', 'https://va.vercel-scripts.com', ...toolbar('wss://ws-us3.pusher.com')],
  // Contact page map, Turnstile, and GTM's <noscript> iframe if a container is ever set.
  ['frame-src', 'https://maps.google.com', 'https://www.google.com', 'https://challenges.cloudflare.com', 'https://www.googletagmanager.com', ...toolbar()],
  ['object-src', "'none'"],
  ['base-uri', "'self'"],
  ['form-action', "'self'"],
  ['frame-ancestors', "'none'"],
  ...(isDev ? [] : [['upgrade-insecure-requests']]),
]
  .map((d) => d.join(' '))
  .join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Inert today: nothing imports next/image, so this flag changes no output. Left in
  // place deliberately — removing it would silently switch on Vercel image
  // optimization (and its billing) the first time someone adds a next/image.
  images: {
    unoptimized: true,
  },
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
  // Security headers on every response. CSP is defined above.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
