/**
 * Websites we have built, shown on /websites. Every fact here was read off the live
 * site (sitemap, structured data, markup) or the client's own copy at the time of
 * the audit recorded in AUDITED (or the entry's own `audited`). No traffic, ranking, or revenue figures: those are
 * the client's to publish, not ours. Re-run the audit before changing a `facts` line.
 */
export type PortfolioCategory = 'Law' | 'Medical & Wellness' | 'Real Estate & Finance' | 'Local Service' | 'Consumer & Technology';

export interface PortfolioSite {
  slug: string;
  name: string;
  /** Public URL, used for the link and the ItemList markup. */
  url: string;
  /** Hostname as shown on the card. */
  domain: string;
  category: PortfolioCategory;
  location: string;
  /** Year the current build went live, when known. */
  launched?: string;
  /** Date this entry's facts were last read from the live site, when later than AUDITED. */
  audited?: string;
  /** One short line on what the business does. */
  what: string;
  /** What is under the hood, as a benefit to the owner. Label is the lens; text is the benefit. */
  facts: { label: FactLabel; text: string }[];
  /** Stack line shown small on the card. */
  stack: string;
  /** Path under /public. 1200x750. */
  image: string;
  /** Slug of the case study on /case-studies that covers this site or the engagement behind it. */
  caseStudy?: string;
  featured?: boolean;
}

export type FactLabel = 'Brand' | 'Found' | 'Local' | 'Rich results' | 'AI search' | 'Speed' | 'Converts' | 'Measured' | 'Owned';

/** Order the lenses appear in on the page and in the legend. */
export const FACT_LABELS: { label: FactLabel; meaning: string }[] = [
  { label: 'Brand', meaning: 'Looks and reads like the business, not a template.' },
  { label: 'Found', meaning: 'Titles, canonicals and a sitemap, so the right pages get indexed.' },
  { label: 'Local', meaning: 'A page for each place and service people search for.' },
  { label: 'Rich results', meaning: 'Structured data that makes a listing eligible for enhanced results.' },
  { label: 'AI search', meaning: 'Clean, server-rendered pages AI assistants can read and cite.' },
  { label: 'Speed', meaning: 'Light pages served from the edge.' },
  { label: 'Converts', meaning: 'Tap-to-call, short forms and booking where visitors decide.' },
  { label: 'Measured', meaning: 'Calls and forms counted in GA4 or Tag Manager.' },
  { label: 'Owned', meaning: 'The client owns the code, domain and hosting.' },
];

export const AUDITED = '2026-10-21';

export const PORTFOLIO: PortfolioSite[] = [
  {
    slug: '1-800-hurt-511',
    name: '1-800-HURT-511',
    url: 'https://hurt511.com/',
    domain: 'hurt511.com',
    category: 'Law',
    location: 'New York City',
    launched: '2021',
    what: 'A personal injury referral brand for all five NYC boroughs.',
    facts: [
      { label: 'Local', text: '547 pages, including 164 NYPD precinct pages.' },
      { label: 'Found', text: 'English, Spanish and Russian editions.' },
      { label: 'Converts', text: 'One call to action, feeding a dedicated call center.' },
    ],
    stack: 'WordPress (WPML) on Cloudflare · 547 pages',
    image: '/work/hurt511.webp',
    caseStudy: '1-800-hurt-511',
    featured: true,
  },
  {
    slug: 'hbotq',
    name: 'HBOTQ · Queens Hyperbaric',
    url: 'https://www.hbotq.com/',
    domain: 'hbotq.com',
    category: 'Medical & Wellness',
    location: 'Woodside, Queens, NY',
    launched: '2026',
    what: 'Physician-led hyperbaric oxygen therapy in Queens.',
    facts: [
      { label: 'Local', text: 'Nine neighborhood pages and eight condition pages.' },
      { label: 'Rich results', text: 'Marked up as a medical business with reviews.' },
      { label: 'AI search', text: 'Plain answers on cost, insurance and sessions.' },
    ],
    stack: 'Next.js on Vercel · 41 pages',
    image: '/work/hbotq.webp',
    caseStudy: 'queens-hyperbaric',
    featured: true,
  },
  {
    slug: 'linder-diaz-law',
    name: 'Linder Diaz Law',
    url: 'https://linderdiazlaw.com/',
    domain: 'linderdiazlaw.com',
    category: 'Law',
    location: 'Hollywood, FL',
    launched: '2026',
    what: 'A boutique personal injury firm in downtown Hollywood, FL.',
    facts: [
      { label: 'Found', text: 'Every page in English and Spanish.' },
      { label: 'Local', text: 'Ten practice-area pages targeted to Hollywood.' },
      { label: 'Speed', text: 'Static pages on Cloudflare with WebP images.' },
    ],
    stack: 'Static site on Cloudflare · 52 pages (EN/ES)',
    image: '/work/linderdiazlaw.webp',
    caseStudy: 'linder-diaz-law',
    featured: true,
  },
  {
    slug: 'james-brown-law',
    name: 'James Brown Law',
    url: 'https://jamesbrownlaw.com/',
    domain: 'jamesbrownlaw.com',
    category: 'Law',
    location: 'West Palm Beach, FL',
    launched: '2023',
    audited: '2026-10-24',
    what: 'Real estate, title, foreclosure and estate law for over 20 years.',
    facts: [
      { label: 'AI search', text: '330 articles answering Florida real estate questions.' },
      { label: 'Converts', text: 'Closing-cost calculators and a consult form up front.' },
      { label: 'Measured', text: 'CallRail attributes every call to its source.' },
    ],
    stack: 'WordPress (Elementor) on Cloudflare · 366 pages',
    image: '/work/jamesbrownlaw.webp',
  },
  {
    slug: 'i-95-accidents',
    name: 'I-95 Accidents',
    url: 'https://i-95accidents.com/',
    domain: 'i-95accidents.com',
    category: 'Law',
    location: 'Florida to Maine',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Live crash reports along all of I-95, refreshed every 15 minutes.',
    facts: [
      { label: 'Local', text: 'A page per state, per town and per crash.' },
      { label: 'Speed', text: 'About 49 KB of HTML, with no images to wait for.' },
      { label: 'Owned', text: 'Code and data pipeline in the client’s repository.' },
    ],
    stack: 'Static site on Cloudflare · 216 pages, auto-updating',
    image: '/work/i-95accidents.webp',
    caseStudy: 'i-95-accidents',
  },
  {
    slug: 'claims-match',
    name: 'Claims Match',
    url: 'https://www.claimsmatch.co/',
    domain: 'claimsmatch.co',
    category: 'Law',
    location: 'National',
    launched: '2026',
    what: 'Open class-action claim deadlines, refunds and recalls.',
    facts: [
      { label: 'Found', text: '173 settlement pages migrated with URLs intact.' },
      { label: 'AI search', text: 'Who qualifies, the deadline and the official link.' },
      { label: 'Speed', text: 'Server-rendered Next.js, cached at the edge.' },
    ],
    stack: 'Next.js on Vercel · 216 pages',
    image: '/work/claimsmatch.webp',
    caseStudy: 'claims-match',
  },
  {
    slug: 'ems-south-florida',
    name: 'EMS South Florida',
    url: 'https://emssouthflorida.com/',
    domain: 'emssouthflorida.com',
    category: 'Medical & Wellness',
    location: 'Palm Beach County, FL',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Supervised whole-body EMS training, explained honestly.',
    facts: [
      { label: 'Local', text: 'A finder for 22 South Florida EMS studios.' },
      { label: 'AI search', text: 'Guides that answer "is EMS right for me?"' },
      { label: 'Brand', text: 'Leads with who should skip it.' },
    ],
    stack: 'Next.js on Vercel · 57 pages',
    image: '/work/emssouthflorida.webp',
    caseStudy: 'ems-south-florida',
  },
  {
    slug: 'wound-care-nyc',
    name: 'Wound Care NYC',
    url: 'https://woundcarenyc.com/',
    domain: 'woundcarenyc.com',
    category: 'Medical & Wellness',
    location: 'Woodside, Queens, NY',
    launched: '2023',
    audited: '2026-10-24',
    what: 'A wound care center for non-healing wounds and ulcers.',
    facts: [
      { label: 'Found', text: 'A page per wound type and per treatment.' },
      { label: 'Converts', text: 'A short patient form in the first screen.' },
      { label: 'Measured', text: 'GA4 and Tag Manager in place.' },
    ],
    stack: 'WordPress (Elementor) on Cloudflare · 26 pages',
    image: '/work/woundcarenyc.webp',
  },
  {
    slug: 'cash4home-fl',
    name: 'Cash4Home FL',
    url: 'https://cash4homefl.com/',
    domain: 'cash4homefl.com',
    category: 'Real Estate & Finance',
    location: 'Palm Beach & Broward, FL',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Cash offers on South Florida houses, as-is.',
    facts: [
      { label: 'Local', text: '56 city pages, plus county and situation pages.' },
      { label: 'Converts', text: 'A three-field offer form in the first screen.' },
      { label: 'Rich results', text: 'FAQ and step-by-step markup of the offer.' },
    ],
    stack: 'Next.js on Vercel · 82 pages',
    image: '/work/cash4homefl.webp',
    caseStudy: 'cash4home-fl',
  },
  {
    slug: 'west-palm-beach-florida-real-estate',
    name: 'West Palm Beach Florida Real Estate',
    url: 'https://westpalmbeachfloridarealestate.com/',
    domain: 'westpalmbeachfloridarealestate.com',
    category: 'Real Estate & Finance',
    location: 'West Palm Beach, FL',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Neighborhood-level home buying and selling in West Palm Beach.',
    facts: [
      { label: 'Local', text: '11 neighborhood guides and 59 condo profiles.' },
      { label: 'Rich results', text: 'Each condo marked up with address and coordinates.' },
      { label: 'Converts', text: 'Property search in the hero.' },
    ],
    stack: 'Static site on Cloudflare · 81 pages',
    image: '/work/westpalmbeachfloridarealestate.webp',
    caseStudy: 'west-palm-beach-florida-real-estate',
  },
  {
    slug: 'south-florida-real-estate-voice',
    name: 'South Florida Real Estate Voice',
    url: 'https://southfloridarealestatevoice.com/',
    domain: 'southfloridarealestatevoice.com',
    category: 'Real Estate & Finance',
    location: 'Miami-Dade, Broward & Palm Beach, FL',
    launched: '2026',
    audited: '2026-10-24',
    what: '56 South Florida new-construction projects, with independent buyer representation.',
    facts: [
      { label: 'Local', text: 'A page per development and per city.' },
      { label: 'Rich results', text: 'The full directory marked up as a list.' },
      { label: 'Speed', text: '51 WebP images, lazy-loaded.' },
    ],
    stack: 'Static site on Vercel · 74 pages',
    image: '/work/southfloridarealestatevoice.webp',
    caseStudy: 'south-florida-real-estate-voice',
  },
  {
    slug: 'zippy-title',
    name: 'ZippyTitle',
    url: 'https://zippytitle.com/',
    domain: 'zippytitle.com',
    category: 'Real Estate & Finance',
    location: 'Florida',
    launched: '2026',
    what: 'Digital title searches, e-closing and title insurance.',
    facts: [
      { label: 'Found', text: 'Two domains, one canonical, no split ranking.' },
      { label: 'Speed', text: 'Under 11 KB of HTML on Cloudflare.' },
      { label: 'Owned', text: 'Content-Security-Policy enforced.' },
    ],
    stack: 'Static site on Cloudflare',
    image: '/work/zippytitle.webp',
    caseStudy: 'zippy-title',
  },
  {
    slug: 'zippy-title-loans',
    name: 'Zippy Title Loans',
    url: 'https://zippytitleloans.com/',
    domain: 'zippytitleloans.com',
    category: 'Real Estate & Finance',
    location: 'Florida',
    launched: '2026',
    what: 'Hard-money loans for Florida real estate investors.',
    facts: [
      { label: 'Converts', text: 'One application path, repeated down the page.' },
      { label: 'Speed', text: 'Under 10 KB of HTML on Cloudflare.' },
      { label: 'Owned', text: 'The client holds the domain and code.' },
    ],
    stack: 'Static site on Cloudflare',
    image: '/work/zippytitleloans.webp',
    caseStudy: 'zippy-title-loans',
  },
  {
    slug: 'new-path-title',
    name: 'New Path Title',
    url: 'https://newpathtitle.com/',
    domain: 'newpathtitle.com',
    category: 'Real Estate & Finance',
    location: 'West Palm Beach, FL',
    launched: '2023',
    audited: '2026-10-24',
    what: 'A Florida title company built for realtors.',
    facts: [
      { label: 'Converts', text: 'Send a contract or deposit escrow from the first screen.' },
      { label: 'AI search', text: '63 articles agents can send their clients.' },
      { label: 'Brand', text: 'Google rating beside the first call to action.' },
    ],
    stack: 'WordPress (Elementor) · 84 pages',
    image: '/work/newpathtitle.webp',
  },
  {
    slug: 'splendid-limo',
    name: 'Splendid Limo & Transportation',
    url: 'https://splendidlimo.com/',
    domain: 'splendidlimo.com',
    category: 'Local Service',
    location: 'Miami to West Palm Beach, FL',
    launched: '2026',
    what: 'Luxury chauffeured transportation across South Florida.',
    facts: [
      { label: 'Brand', text: '400+ five-star reviews in the first screen.' },
      { label: 'Rich results', text: 'Marked up as a limousine service.' },
      { label: 'Speed', text: '35 KB of HTML, lazy-loaded fleet images.' },
    ],
    stack: 'Static site on Vercel · 8 pages',
    image: '/work/splendidlimo.webp',
    caseStudy: 'splendid-limo',
  },
  {
    slug: 'junk-removal-service-usa',
    name: 'Junk Removal Service USA',
    url: 'https://www.junkremovalserviceusa.com/',
    domain: 'junkremovalserviceusa.com',
    category: 'Local Service',
    location: 'Miami-Dade, Broward & Palm Beach, FL',
    launched: '2026',
    what: 'Same-day junk removal and light demolition in three counties.',
    facts: [
      { label: 'Local', text: '106 pages: every city, service and drop-off.' },
      { label: 'Converts', text: 'The quote is a phone call, not a form.' },
      { label: 'Owned', text: 'Content-Security-Policy enforced.' },
    ],
    stack: 'Next.js on Vercel · 106 pages',
    image: '/work/junkremovalserviceusa.webp',
    caseStudy: 'junk-removal-service-usa',
  },
  {
    slug: 'millers-marketing-group',
    name: "Miller's Marketing Group",
    url: 'https://www.millersmarketinggroup.com/',
    domain: 'millersmarketinggroup.com',
    category: 'Consumer & Technology',
    location: 'Florida',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Networking events for Florida personal injury professionals.',
    facts: [
      { label: 'Rich results', text: 'Events marked up the way Google lists them.' },
      { label: 'Converts', text: 'Register or inquire in two short forms.' },
      { label: 'Measured', text: 'GA4 in place.' },
    ],
    stack: 'Static site on Vercel',
    image: '/work/millersmarketinggroup.webp',
    caseStudy: 'millers-marketing-group',
  },
  {
    slug: 'kiss-selfcare',
    name: 'Kiss Selfcare',
    url: 'https://kiss.care/',
    domain: 'kiss.care',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    audited: '2026-10-24',
    what: 'Plant-based, pharmacist-formulated skincare.',
    facts: [
      { label: 'Brand', text: 'A short domain and 30 product images.' },
      { label: 'Found', text: 'A page per product, plus ingredients and FAQ.' },
      { label: 'Speed', text: '21 KB of HTML on Cloudflare.' },
    ],
    stack: 'Static site on Cloudflare · 15 pages',
    image: '/work/kiss.care.webp',
    caseStudy: 'kiss-selfcare',
  },
  {
    slug: 'hello-viki',
    name: 'Hello Viki AI',
    url: 'https://helloviki.com/',
    domain: 'helloviki.com',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    what: 'AI-powered remote assistants for medical and legal practices.',
    facts: [
      { label: 'Found', text: 'Two domains, one canonical.' },
      { label: 'Converts', text: 'A free trial for clients, careers pages for assistants.' },
      { label: 'Measured', text: 'Google Tag Manager in place.' },
    ],
    stack: 'Static site on Cloudflare · 15 pages',
    image: '/work/helloviki.webp',
    caseStudy: 'hello-viki',
  },
  {
    slug: 'titleleap',
    name: 'TitleLeap',
    url: 'https://titleleap.com/',
    domain: 'titleleap.com',
    category: 'Consumer & Technology',
    location: 'Florida',
    launched: '2022',
    audited: '2026-10-24',
    what: 'Software for local title agents.',
    facts: [
      { label: 'Converts', text: 'One page, one action: schedule a demo.' },
      { label: 'Brand', text: 'Positioned against "big box title".' },
      { label: 'Measured', text: 'Google Tag Manager in place.' },
    ],
    stack: 'WordPress (Elementor) on Cloudflare · one-page site',
    image: '/work/titleleap.webp',
  },
  {
    slug: 'trakcharts',
    name: 'TrakCharts by GreenBills',
    url: 'https://trakcharts.com/',
    domain: 'trakcharts.com',
    category: 'Consumer & Technology',
    location: 'Florida',
    launched: '2021',
    audited: '2026-10-24',
    what: 'Personal injury case tracking for attorneys, providers and patients.',
    facts: [
      { label: 'Brand', text: 'An explainer video in the first screen.' },
      { label: 'Found', text: 'A section for each of the three audiences.' },
      { label: 'Measured', text: 'Google Tag Manager in place.' },
    ],
    stack: 'WordPress (Elementor) on Cloudflare · 5 pages',
    image: '/work/trakcharts.webp',
  },
  {
    slug: 'rock-the-treatment-mobile',
    name: 'Rock The Treatment · mobile store',
    url: 'https://m.rockthetreatment.com/',
    domain: 'm.rockthetreatment.com',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    audited: '2026-10-24',
    what: 'A mobile storefront for chemo and radiation care packages.',
    facts: [
      { label: 'Speed', text: 'A 10 KB page beside a 556 KB WordPress store.' },
      { label: 'Found', text: 'Canonicals point at the main shop.' },
      { label: 'Measured', text: 'Google Tag Manager in place.' },
    ],
    stack: 'Static minisite on Vercel',
    image: '/work/m.rockthetreatment.webp',
    caseStudy: 'rock-the-treatment-mobile',
  },
  {
    slug: 'moreland-mendez',
    name: 'Moreland & Mendez, P.A.',
    url: 'https://mandmpa.com/',
    domain: 'mandmpa.com',
    category: 'Law',
    location: 'Maitland, FL',
    launched: '2024',
    audited: '2026-10-31',
    what: 'A multi-practice law firm in Maitland, FL.',
    facts: [
      { label: 'Converts', text: 'Order title and price a closing from the homepage.' },
      { label: 'Rich results', text: 'Organization markup with the office address.' },
      { label: 'Measured', text: 'GA4 in place.' },
    ],
    stack: 'WordPress on Cloudflare · 7 pages',
    image: '/work/mandmpa.webp',
  },
  {
    slug: 'mosaic-diagnostic-imaging',
    name: 'Mosaic Diagnostic Imaging',
    url: 'https://mosaicdiagnostics.com/',
    domain: 'mosaicdiagnostics.com',
    category: 'Medical & Wellness',
    location: 'New York City & Long Island',
    launched: '2025',
    audited: '2026-10-31',
    what: 'Open MRI and imaging at seven NYC and Long Island centers.',
    facts: [
      { label: 'Local', text: 'A page per location, plus a map file.' },
      { label: 'Found', text: 'A full Spanish edition; five languages tagged.' },
      { label: 'Converts', text: 'Booking for patients, a referral portal for doctors.' },
    ],
    stack: 'WordPress',
    image: '/work/mosaicdiagnostics.webp',
  },
  {
    slug: 'mosaic-open-mri',
    name: 'Mosaic Open MRI',
    url: 'https://mosaicopenmri.com/',
    domain: 'mosaicopenmri.com',
    category: 'Medical & Wellness',
    location: 'Delaware',
    launched: '2025',
    audited: '2026-10-31',
    what: 'MRI, ultrasound and X-ray at four Delaware centers.',
    facts: [
      { label: 'Local', text: 'A page per location and per service.' },
      { label: 'Converts', text: 'A booking page linked from the first screen.' },
      { label: 'Found', text: 'Sitemap, canonicals and alt text on every image.' },
    ],
    stack: 'WordPress · 26 pages',
    image: '/work/mosaicopenmri.webp',
  },
  {
    slug: 'clear-kayaking-adventures',
    name: 'Clear Kayaking Adventures',
    url: 'https://clear-kayaking-adventures.vercel.app/',
    domain: 'clear-kayaking-adventures.vercel.app',
    category: 'Local Service',
    location: 'Jupiter, FL',
    launched: '2026',
    audited: '2026-10-31',
    what: 'Clear kayak eco tours in Jupiter, Florida.',
    facts: [
      { label: 'Converts', text: 'FareHarbor booking behind every Book Now button.' },
      { label: 'Rich results', text: 'Tours, FAQs and reviews in structured data.' },
      { label: 'Owned', text: 'The owner edits tours in a built-in CMS.' },
    ],
    stack: 'Next.js on Vercel · 7 pages',
    image: '/work/clearkayakingadventures.webp',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ['Law', 'Medical & Wellness', 'Real Estate & Finance', 'Local Service', 'Consumer & Technology'];

/**
 * Earlier sites we built that are no longer live in the form we delivered: the business
 * closed, moved on, or another team has since rebuilt the site. Shown from our own
 * screenshots, with only the services listed in our project records. No outbound link and
 * no ItemList markup, because the URL no longer shows our work.
 */
export interface ArchivedSite {
  slug: string;
  name: string;
  category: PortfolioCategory;
  location?: string;
  what: string;
  /** What we delivered, from the project record. */
  services: string[];
  /** Path under /public. 1200x750, taken from our own screenshot of the delivered site. */
  image: string;
  /** Why the live URL is not linked. */
  status: string;
}

export const ARCHIVE: ArchivedSite[] = [
  {
    slug: 'metropolitan-orthopedics',
    name: 'Metropolitan Orthopedics',
    category: 'Medical & Wellness',
    location: 'New York City',
    what: 'An orthopedic practice for spine, sports and joint pain. Brand built from scratch.',
    services: ['Brand identity: logo and color palette', 'Website design', 'Social media setup and content, including Reels'],
    image: '/work/archive/metropolitanortho.webp',
    status: 'No longer online',
  },
  {
    slug: 'blue-star-urgent-care',
    name: 'Blue Star Urgent Care',
    category: 'Medical & Wellness',
    what: 'An urgent care center treating injuries, illnesses and allergies, with vaccinations, physical exams and occupational medicine.',
    services: ['Website design', 'Integration with the Athena EMR and online scheduling', 'Marketing materials, including the brochure'],
    image: '/work/archive/bluestarurgentcare.webp',
    status: 'Since rebuilt by another team',
  },
  {
    slug: 'sanders-law-group',
    name: 'Sanders Law Group',
    category: 'Law',
    what: 'A law firm with a free-consultation offer up front and a page for each practice area and attorney.',
    services: ['Website design', 'Search engine optimization and content marketing'],
    image: '/work/archive/sanderslawgroup.webp',
    status: 'Since rebuilt by another team',
  },
  {
    slug: 'greenbills',
    name: 'GreenBills',
    category: 'Consumer & Technology',
    what: 'Billing and collections software and services for PIP, no-fault and workers\u2019 compensation providers.',
    services: ['Website design', 'Sales brochure'],
    image: '/work/archive/greenbills.webp',
    status: 'No longer online',
  },
  {
    slug: '1-guy-with-a-vac',
    name: '1 Guy With A Vac',
    category: 'Local Service',
    location: 'Gainesville, FL',
    what: 'Fabric steam cleaning for sofas, chairs, rugs and carpets, booked online.',
    services: ['Website design', 'Social media management', 'Google Maps optimization', 'Reputation management', 'Lead generation and management'],
    image: '/work/archive/1guywithavac.webp',
    status: 'No longer online',
  },
  {
    slug: 'lady-lee-salon',
    name: 'Lady Lee Salon',
    category: 'Local Service',
    what: 'A hair salon with a looks gallery, tap-to-call and appointment booking, in English and Spanish.',
    services: ['Website design', 'Accounting outsourcing'],
    image: '/work/archive/ladyleesalon.webp',
    status: 'No longer online',
  },
  {
    slug: 'el-cafe-mediterraneo',
    name: 'El Café Mediterráneo',
    category: 'Local Service',
    location: 'Puerto Rico',
    what: 'A modern Mediterranean restaurant serving food fresh off a charcoal grill, with pickup and delivery ordering online.',
    services: [
      'Website and menu design',
      'Online ordering through DoorDash, and pickup through Orderspoon and Clover',
      'Google Maps listing with menu and photos, reviews, and submission to map aggregators',
      'Social media management',
      'Staff hiring',
    ],
    image: '/work/archive/elcafepr.webp',
    status: 'No longer online',
  },
];

/**
 * Apps we have built, shown under "Apps we've built" on /websites. Facts come from each
 * repository's README and code as of 2026-10-24; native apps that
 * are not in a public store link to their source instead of a live URL.
 */
export interface AppProject {
  slug: string;
  name: string;
  /** Where to use it. Omitted for apps with no public build. */
  url?: string;
  /** Public source repository. Omitted when the source is private (RingDash). */
  repo?: string;
  platform: string;
  /** How it ships today, shown as a badge. */
  status: string;
  launched: string;
  what: string;
  facts: string[];
  stack: string;
  /** Its own page on this site (/recoup, /keyvault), when it has one. */
  page?: string;
  /** Path under /public. Phone captures are 540x1169, desktop captures 1200x750. */
  image?: { src: string; width: number; height: number; frame: 'phone' | 'desktop' };
  /** Up to 3 extra screenshots, shown as thumbnails under the main image on /websites. */
  gallery?: { src: string; width: number; height: number; alt: string; caption?: string }[];
}

export const APPS: AppProject[] = [
  {
    slug: 'ringdash',
    name: 'RingDash',
    page: '/ringdash',
    platform: 'Web app, installable',
    status: 'In development',
    launched: '2026',
    what: 'Call tracking and a callback queue for personal injury firms.',
    facts: [
      'Ring groups that ring every phone at once.',
      'Missed calls become a callback queue with push alerts.',
      'Reports on answer rate, spam and callback speed.',
    ],
    stack: 'Python · FastAPI, Postgres, Twilio',
    image: { src: '/work/apps/ringdash/overview.webp', width: 1054, height: 749, frame: 'desktop' },
    gallery: [
      { src: '/work/apps/ringdash/calls.webp', width: 1054, height: 689, alt: 'RingDash All Calls table with filters' },
      { src: '/work/apps/ringdash/clients.webp', width: 1054, height: 689, alt: 'RingDash clients and tracking numbers' },
      { src: '/work/apps/ringdash/mobile-overview.webp', width: 406, height: 636, alt: 'RingDash overview on a phone' },
    ],
  },
  {
    slug: 'markdown-editor',
    name: 'Markdown Editor',
    url: 'https://md.getmarketingbull.com/',
    repo: 'https://github.com/Marketing-Bull/md-preview-pwa',
    platform: 'Browser app, installable',
    status: 'Live',
    launched: '2026',
    what: 'An offline-first Markdown, HTML and Mermaid editor. No accounts, no tracking.',
    facts: [
      'Live preview, Mermaid diagrams and JSON validation.',
      'Export to PDF or HTML, or share as a link.',
      'Saves to the browser only; installs and works offline.',
    ],
    stack: 'React + Vite on Cloudflare · PWA',
    image: { src: '/work/apps/md-editor.webp', width: 1200, height: 750, frame: 'desktop' },
  },
  {
    slug: 'recoup',
    name: 'Recoup',
    repo: 'https://github.com/Marketing-Bull/amb-recoup',
    page: '/recoup',
    platform: 'iPhone, iPad and Mac',
    status: 'TestFlight beta',
    launched: '2026',
    what: 'Track billable hours, miles and expenses, and recoup them.',
    facts: [
      'One SwiftUI app for iPhone, iPad and Mac.',
      'Syncs through your own iCloud; no server.',
      'Dashboard, receipt photos and CSV export.',
    ],
    stack: 'Swift · SwiftUI, SwiftData, CloudKit',
    image: { src: '/work/apps/recoup/dashboard.webp', width: 540, height: 1169, frame: 'phone' },
    gallery: [
      { src: '/work/apps/recoup/time.webp', width: 540, height: 1169, caption: 'Time', alt: 'Recoup Time list with hours and billable amounts per entry' },
      { src: '/work/apps/recoup/mileage.webp', width: 540, height: 1169, caption: 'Mileage', alt: 'Recoup Mileage list with trips, miles and deductible value' },
      { src: '/work/apps/recoup/expenses.webp', width: 540, height: 1169, caption: 'Expenses', alt: 'Recoup Expenses list with categories, amounts and billable flags' },
      { src: '/work/apps/recoup/clients.webp', width: 540, height: 1169, caption: 'Clients', alt: 'Recoup Clients list with hourly rates' },
      { src: '/work/apps/recoup/log-trip.webp', width: 540, height: 1169, caption: 'Log a trip', alt: 'Recoup Log Trip form with repeat-a-recent-trip shortcut and round-trip toggle' },
    ],
  },
  {
    slug: 'keyvault',
    name: 'KeyVault',
    repo: 'https://github.com/Marketing-Bull/KeyVault',
    page: '/keyvault',
    platform: 'Mac',
    status: 'Source available',
    launched: '2026',
    what: 'A native Mac vault for API keys and developer secrets.',
    facts: [
      'AES-256-GCM per field, unlocked with Touch ID.',
      'Templates for API keys, OAuth and AWS IAM.',
      'Auto-locks, clears the clipboard and flags expiring keys.',
    ],
    stack: 'Swift · SwiftUI, SwiftData, CryptoKit',
    image: { src: '/work/apps/keyvault.webp', width: 1200, height: 750, frame: 'desktop' },
  },
  {
    slug: 'story-spark',
    name: 'Story Spark',
    url: 'https://kids-reading-3rd-grade.vercel.app/',
    repo: 'https://github.com/ababen/kids-reading-3rd-grade',
    platform: 'Browser app, desktop and phone',
    status: 'Live',
    launched: '2026',
    what: 'Reading practice for elementary readers, with comprehension questions.',
    facts: [
      'Hints highlight the paragraph that holds the answer.',
      'A grown-up corner groups results by skill.',
      'Saves on the device; no child accounts.',
    ],
    stack: 'HTML, CSS and JavaScript · Vercel, Upstash Redis',
    image: { src: '/work/apps/story-spark/home.webp', width: 1200, height: 750, frame: 'desktop' },
    gallery: [
      { src: '/work/apps/story-spark/reading.webp', width: 1200, height: 750, alt: 'Story Spark reading screen with a story about a dragon' },
      { src: '/work/apps/story-spark/mobile-home.webp', width: 540, height: 1169, alt: 'Story Spark home screen on a phone' },
      { src: '/work/apps/story-spark/mobile-reading.webp', width: 540, height: 1169, alt: 'Story Spark reading screen on a phone' },
    ],
  },
  {
    slug: 'dino-defenders',
    name: 'Dino Defenders',
    url: 'https://dino-defenders.vercel.app/',
    platform: 'Browser game, desktop and phone',
    status: 'Live',
    launched: '2026',
    what: 'A tower-defense game for practicing multiplication and division.',
    facts: [
      'Sixteen waves, with bosses at 8 and 16.',
      'Questions pause the game; wrong answers cost nothing.',
      'Visual hints for every times-table fact.',
    ],
    stack: 'HTML, CSS and JavaScript modules · no build step',
    image: { src: '/work/apps/dino-defenders/board.webp', width: 1200, height: 750, frame: 'desktop' },
    gallery: [
      { src: '/work/apps/dino-defenders/question.webp', width: 1200, height: 750, alt: 'Dino Defenders multiplication question: 3 × 2' },
      { src: '/work/apps/dino-defenders/mobile-board.webp', width: 540, height: 1169, alt: 'Dino Defenders game board on a phone' },
      { src: '/work/apps/dino-defenders/mobile-question.webp', width: 540, height: 1169, alt: 'Dino Defenders question on a phone' },
    ],
  },
];
