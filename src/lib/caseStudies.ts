/**
 * Case studies. Every number here must be traceable to a source Alex can stand behind —
 * the old site's published case study, a client testimonial, or a client-approved report.
 * Source is recorded per entry. Do not add figures without one.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  vertical: 'Law' | 'Medical';
  industry: string;
  location: string;
  summary: string;
  constraint: string;
  action: string;
  result: string;
  proof: string[];
  services: string[];
  quote?: { text: string; name: string; title: string };
  source: string;
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: '1-800-hurt-511',
    client: '1-800-HURT-511',
    vertical: 'Law',
    industry: 'Personal injury referral brand',
    location: 'New York City',
    summary: 'From zero calls to roughly twenty personal injury cases a month in twelve months, with missed intake calls eliminated in the first thirty days.',
    constraint:
      'A brand-new personal injury referral brand launching into the most competitive PI market in the country. No inbound calls, no intake infrastructure, no CRM, no call-center process, and a multilingual audience — English, Spanish, Russian, and Uzbek — to reach with expensive offline media.',
    action:
      'We built the business from the ground up across brand, marketing, and operations. Brand identity and a multilingual, SEO-built website launched alongside a coordinated media program: twenty billboard placements across New York City for a year, six months of Hispanic radio with a commissioned jingle, negotiated television placements, and paid digital across Google, Meta, Snapchat, TikTok, and display. On the operations side, we implemented a custom Zoho CRM and deployed a full intake call center so every lead was captured and routed.',
    result:
      'Within twelve months the business scaled from zero calls to approximately twenty personal injury cases per month. Missed intake calls fell to zero within thirty days of the call center and CRM going live. SEO reached first-page rankings across dozens of pages, and offline and digital media compounded into recognizable brand presence in a saturated market.',
    proof: [
      'Launch to ~20 PI cases per month in one year',
      'Zero missed intake calls after 30 days',
      'First-page rankings across dozens of pages',
      '20 billboards, Hispanic radio, TV, and paid digital run as one program',
    ],
    services: ['Brand design', 'Multilingual website (EN / ES / RU / UZ)', 'SEO', 'Google, Meta, Snapchat, TikTok, Display ads', 'Billboard, radio, and TV buying', 'Zoho CRM implementation', 'Intake call-center deployment'],
    quote: { text: 'They delivered results beyond expectations.', name: 'Isak Yuhan', title: '1-800-HURT-511' },
    source: 'Published case study, getmarketingbull.com (migrated Sep 2026); client testimonial.',
    featured: true,
  },
  {
    slug: 'queens-hyperbaric',
    client: 'Queens Hyperbaric',
    vertical: 'Medical',
    industry: 'Hyperbaric oxygen therapy clinic',
    location: 'Queens, New York',
    summary: 'A specialty clinic with strong outcomes and no marketing engine went from an empty schedule to thirty-plus new patients a month.',
    constraint:
      'Hyperbaric oxygen therapy is a specialty most patients have never searched for. The clinic had clinical results worth talking about and no way to be found — no brand system, no search presence, and no consistent way to turn a curious call into a booked evaluation.',
    action:
      'We built the full patient-acquisition stack in sequence: a brand style guide and website first, then local search — Google Business Profile optimization and Maps presence — followed by Google Ads, a dedicated landing page, review generation, social content and advertising, and a video commercial. The system was designed to make an unfamiliar treatment feel credible and easy to ask about.',
    result:
      'The practice went from struggling to fill slots to seeing more than thirty new patients per month, in the clinic\'s own words. Marketing Bull continues to work with the practice on patient acquisition.',
    proof: [
      '30+ new patients per month (client-reported)',
      'Brand, website, and social content delivered as a first-phase package',
      'Local search, Google Ads, and reputation running as one system',
    ],
    services: ['Brand style guide', 'Website and landing page', 'SEO and content', 'Google Business Profile / Maps', 'Google Ads', 'Review generation', 'Social media management and ads', 'Video commercial'],
    quote: { text: 'Working with Marketing Bull has been a game-changer for my practice. We went from struggling to fill slots to seeing 30 new faces every month.', name: 'Dr. Manoj Sadhnani', title: 'Queens Hyperbaric' },
    source: 'Published case study (services) and client testimonial (30+ patients), getmarketingbull.com.',
    featured: true,
  },
  {
    slug: 'metropolitan-orthopedics',
    client: 'Metropolitan Orthopedics',
    vertical: 'Medical',
    industry: 'Spine and orthopedic surgical center',
    location: 'Queens, New York',
    summary: 'A newly opened surgical center launched with a brand, a website that books consultations, and a local presence — before the first patient walked in.',
    constraint:
      'A new spine-orthopedic surgical center opening in Queens with no brand identity, no web presence, and no local listings. Surgeons were ready; the front door didn\'t exist yet.',
    action:
      'We planned the launch as one program: brand identity and style guidelines, a full-service website with patient consultation scheduling built in, Google Business Profile and local listings, and social channels on Facebook and Instagram seeded with branded content and Reels so the practice looked established on day one.',
    result:
      'The center opened with a complete, consistent presence — brand guide, booking-enabled website, local listings, and active social channels — and a foundation the practice could grow patient volume on.',
    proof: [
      'Brand guide, website, listings, and social live for opening day',
      'Consultation scheduling built into the site',
    ],
    services: ['Marketing strategy', 'Brand design and style guidelines', 'Website with consultation scheduling', 'Google Business Profile', 'Facebook and Instagram content'],
    source: 'Published case study, getmarketingbull.com. Launch engagement; no outcome metrics were published.',
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
