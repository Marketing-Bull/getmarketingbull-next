export const COMPANY = {
  name: 'Marketing Bull',
  legalName: 'Marketing Bull, LLC',
  tagline: 'Fixed-price growth systems for law firms and medical practices.',
  phone: '1-833-GET-BULL',
  phoneFormatted: '1-833-438-2855',
  email: 'hello@getmarketingbull.com',
  address: '319 Clematis Street, Suite 300, West Palm Beach, FL 33401',
  city: 'West Palm Beach',
  state: 'FL',
  zip: '33401',
  country: 'USA',
  website: 'https://getmarketingbull.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/marketing-bull',
    instagram: 'https://www.instagram.com/getmarketingbull',
    facebook: 'https://www.facebook.com/getmarketingbull',
    twitter: 'https://x.com/getmarketingbull',
  },
  goleadsUrl: 'https://app.goleadsconnect.com',
  bookingUrl: '/free-consultation',
};

/**
 * Checkout links. Paste Stripe Payment Link URLs here (Stripe Dashboard → Payment Links).
 * While a link is empty the button falls back to the consultation form, so nothing breaks
 * before Stripe is configured.
 */
export const CHECKOUT_LINKS: Record<OfferSlug, string> = {
  'website-in-14-days': '',
  'intake-gap-audit': '',
  'ai-content-engine': '',
};

export type OfferSlug = 'website-in-14-days' | 'intake-gap-audit' | 'ai-content-engine';

export interface Offer {
  slug: OfferSlug;
  step: string;
  name: string;
  headline: string;
  short: string;
  price: number;
  priceLabel: string;
  billing: 'one-time' | 'monthly';
  terms: string;
  timeline: string;
  bestFor: string;
  problem: string;
  includes: string[];
  notIncluded: string[];
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  accent: string;
}

export const OFFERS: Offer[] = [
  {
    slug: 'website-in-14-days',
    step: 'Get found',
    name: 'Website in 14 Days',
    headline: 'A law firm or medical website that converts — live in 14 days, at a price you can see.',
    short:
      'A conversion-built site on a modern stack. Fixed scope, fixed price, fixed deadline. You own the code, the domain, and the data.',
    price: 4950,
    priceLabel: '$4,950',
    billing: 'one-time',
    terms: '50% to start, 50% at launch. Includes 12 months of hosting.',
    timeline: '14 business days from kickoff',
    bestFor: 'Firms and practices whose current site is slow, dated, or built by an agency that holds it hostage.',
    problem:
      'Prospects Google you before they call you. If the site loads slowly, looks like 2016, or buries the phone number, they call the next firm in the results. Most agency sites also lock you in — you don\'t own the code, and leaving means starting over.',
    includes: [
      'Up to 10 pages: home, practice areas or services, about, team, results, contact, plus legal pages',
      'Built on Next.js — sub-second load times, no WordPress plugins to get hacked',
      'Conversion layout: sticky call button, click-to-call on mobile, short intake form on every page',
      'Local SEO foundation: schema markup, Google Business Profile alignment, Google / Apple / Bing Maps listings',
      'Copy written for your practice area from a structured intake questionnaire — you review, we revise',
      'ADA-conscious build (WCAG 2.1 AA targets) and mobile-first responsive design',
      'Lead form wired to your CRM or inbox, with SMS-consent language for compliance',
      '12 months of hosting and SSL, plus a 30-minute handoff call',
      'You own everything: repo, domain, hosting account, content',
    ],
    notIncluded: [
      'Ongoing content or blog writing (see AI Content & Search Engine)',
      'Paid ads management',
      'Custom web applications, client portals, or e-commerce',
      'Professional photography (we use licensed stock or your existing photos)',
    ],
    process: [
      { title: 'Day 1 — Kickoff', desc: 'You complete a 20-minute intake questionnaire and share brand assets. We confirm the sitemap.' },
      { title: 'Days 2–8 — Build', desc: 'We build all pages, write copy, and configure SEO and tracking. You get a private preview link on day 8.' },
      { title: 'Days 9–12 — Revise', desc: 'One structured revision round. You mark up the preview, we apply every change.' },
      { title: 'Days 13–14 — Launch', desc: 'DNS cutover, redirects from your old URLs, Search Console submission, handoff call.' },
    ],
    faqs: [
      { q: 'What if I need more than 10 pages?', a: 'Additional pages are $350 each, quoted before we start so the price never moves mid-project.' },
      { q: 'Do I really own the site?', a: 'Yes. The code lives in a GitHub repository under your account and hosting is in your name. If you ever leave, you take everything.' },
      { q: 'What happens after the 12 months of hosting?', a: 'Hosting renews at $25/month, or you move it anywhere you like — it\'s a standard Next.js project.' },
      { q: 'Can you migrate my existing blog posts?', a: 'Up to 10 existing posts are migrated free. Beyond that it\'s $25 per post.' },
    ],
    ctaLabel: 'Start my website',
    accent: 'red',
  },
  {
    slug: 'intake-gap-audit',
    step: 'Get signed',
    name: 'Intake Gap Audit',
    headline: 'Find out exactly how many cases your intake is losing — and what each one is costing you.',
    short:
      'Two mystery-shop calls, a full audit against our PI & medical intake checklist, and an ROI report that puts a dollar figure on the leak.',
    price: 1495,
    priceLabel: '$1,495',
    billing: 'one-time',
    terms: 'Paid upfront. Credited in full toward any Marketing Bull product purchased within 60 days.',
    timeline: '7–10 business days',
    bestFor: 'Firms spending on lead generation who suspect the problem isn\'t the leads.',
    problem:
      'The average firm takes 78 minutes to respond to a new lead. The prospect has called three other firms in the first 10. 42% of PI leads come in after 5pm and most go to voicemail. You\'re paying for leads and losing them at the front desk — and nobody inside the firm can see it happening.',
    includes: [
      'Two mystery-shop calls scored on a timestamped scorecard: one during business hours, one after hours',
      'Web form and chat response test with timestamps',
      'Full audit against the Marketing Bull Intake Checklist (speed-to-lead, coverage, follow-up, qualification, attribution)',
      'CRM and intake workflow review, if you give us read-only access',
      'Intake ROI Report: a personalized "cost of lost opportunity" estimate using your lead volume and average case value',
      'Prioritized fix list — what to change first, what it costs, what it\'s worth',
      '45-minute readout call to walk through the scorecards and report',
    ],
    notIncluded: [
      'Implementation of the fixes (that\'s a separate engagement, and this audit is credited toward it)',
      'Staff training',
      'Ongoing monitoring',
    ],
    process: [
      { title: 'Day 1 — Setup', desc: 'You tell us your lead sources and average case value. We schedule the mystery shops without telling your staff.' },
      { title: 'Days 2–5 — Test', desc: 'We call, submit forms, and use your chat like a real prospect would. Every response is timestamped and scored.' },
      { title: 'Days 6–8 — Score', desc: 'We score every touchpoint against the checklist and build your ROI model.' },
      { title: 'Days 9–10 — Readout', desc: 'You get the report, the scorecards, and a call to walk through what to fix first.' },
    ],
    faqs: [
      { q: 'Will my staff know they\'re being tested?', a: 'Not unless you tell them. Our tester calls exactly like a prospect would and scores the interaction on a timestamped scorecard. We don\'t record calls by default — Florida is an all-party consent state. If you want recordings, you authorize it as the business owner at kickoff and we handle the disclosure.' },
      { q: 'Is $1,495 refundable?', a: 'No, but it\'s fully credited toward any Marketing Bull product within 60 days — so if you act on the findings, the audit is free.' },
      { q: 'We don\'t have a CRM. Can you still audit us?', a: 'Yes. The mystery shops and ROI report don\'t depend on a CRM. We\'ll note it as a gap.' },
    ],
    ctaLabel: 'Book my audit',
    accent: 'blue',
  },
  {
    slug: 'ai-content-engine',
    step: 'Get called',
    name: 'AI Content & Search Engine',
    headline: 'Show up in Google and in AI answers — every week, without writing a word.',
    short:
      'A managed content system that publishes search- and AI-optimized content to your site every week, tracks where you appear in ChatGPT, Perplexity, and Google AI Overviews, and reports it monthly.',
    price: 2500,
    priceLabel: '$2,500',
    billing: 'monthly',
    terms: '3-month minimum, then month-to-month. Cancel with 30 days notice.',
    timeline: 'First content live within 10 business days',
    bestFor: 'Firms and practices that want to compound organic visibility without hiring a writer or an SEO agency.',
    problem:
      'Prospects are asking ChatGPT and Google "best personal injury lawyer near me" and getting an answer with three names in it. If you\'re not one of them, you don\'t exist. Traditional SEO agencies sell you a blog nobody reads; AI-generated spam gets your site penalized. The middle path — expert-reviewed, structured, locally specific content at volume — is what wins now.',
    includes: [
      '4 long-form articles per month (1,200–2,000 words), built on your practice areas and the questions prospects actually ask',
      'Every article structured for both Google (E-E-A-T, schema, internal linking) and AI engines (citable answers, entity clarity)',
      'Attorney or physician review workflow — nothing publishes without a human in your firm approving it',
      'Weekly Google Business Profile posts',
      'Monthly AI visibility report: where you appear in ChatGPT, Perplexity, Gemini, and Google AI Overviews for your target queries',
      'Monthly search report from Ahrefs: rankings, traffic, and the pages driving calls',
      'Quarterly content strategy review and topic plan',
      'Published directly to your site — WordPress, Next.js, or most CMS platforms',
    ],
    notIncluded: [
      'Website build or redesign (see Website in 14 Days)',
      'Paid ads',
      'Link-buying or private blog networks — we don\'t do it, and neither should you',
      'Social media management beyond Google Business Profile',
    ],
    process: [
      { title: 'Week 1 — Foundation', desc: 'Keyword and AI-query research, competitor gap analysis, 90-day topic plan. You approve the plan.' },
      { title: 'Week 2 — First publish', desc: 'First article and GBP posts go through your review and go live. Tracking baselines are recorded.' },
      { title: 'Monthly — Publish & report', desc: 'Four articles, four GBP posts, one report showing rankings and AI visibility movement.' },
      { title: 'Quarterly — Strategy', desc: 'We review what moved the needle and rebalance the next 90 days of topics.' },
    ],
    faqs: [
      { q: 'Is this AI-written content?', a: 'It\'s AI-drafted, structured by our system, and reviewed by a human in your firm before it publishes. Google penalizes unreviewed AI spam, not AI-assisted content that\'s accurate and useful. The review step is what keeps you on the right side of that line.' },
      { q: 'How long until we see results?', a: 'Google Business Profile changes and AI citations can move within 30–60 days. Organic rankings for competitive terms typically take 90–180 days to compound. The 3-month minimum exists because anything shorter can\'t show you a real trend.' },
      { q: 'Do we keep the content if we cancel?', a: 'Yes. Everything published on your site is yours.' },
      { q: 'Can you write about our specific case results?', a: 'Yes, within Florida Bar advertising rules. We flag anything that needs a disclaimer or that can\'t be claimed.' },
    ],
    ctaLabel: 'Start publishing',
    accent: 'emerald',
  },
];

export const NAV_LINKS = [
  {
    label: 'Products',
    href: '/pricing',
    submenu: OFFERS.map((o) => ({ label: o.name, href: `/products/${o.slug}` })),
  },
  {
    label: 'Who We Help',
    href: '/services',
    submenu: [
      { label: 'Law Firms', href: '/services/law-firms' },
      { label: 'Medical Practices', href: '/services/medical' },
      { label: 'Intake Optimization', href: '/services/intake-optimization' },
    ],
  },
  {
    label: 'About',
    href: '/about-us',
    submenu: [
      { label: 'Our Team', href: '/about-us' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Book a Call', href: '/free-consultation', cta: true },
];

export const TESTIMONIALS = [
  { name: 'Todd D. Muhlstock, Esq.', company: 'WeSueThem.com', quote: "I have personally referred this team to colleagues and clients because I knew I could trust the results. They don't just generate leads — they make sure you close them.", rating: 5 },
  { name: 'Dr. Manoj Sadhnani', company: 'Queens Hyperbaric', quote: 'We went from struggling to fill slots to seeing 30 new faces every month.', rating: 5 },
  { name: 'Angela McMullin', company: '3D Dental', quote: 'Alexander is the best! He goes above and beyond to make sure his clients are happy and getting results. Our new patient volume is up 40%.', rating: 5 },
  { name: 'Isak Yuhan', company: '1-800-HURT-511', quote: 'They delivered results beyond expectations.', rating: 5 },
  { name: 'Laura Cole, Esq.', company: 'Attorney at Law', quote: 'Marketing Bull is excellent!!', rating: 5 },
  { name: 'Vinay Gaonkar', company: 'GreenBills', quote: 'Excellent results on leads and client conversions.', rating: 5 },
];

export function getOffer(slug: string): Offer | undefined {
  return OFFERS.find((o) => o.slug === slug);
}
