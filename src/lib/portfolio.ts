/**
 * Websites we have built, shown on /websites. Every fact here was read off the live
 * site (sitemap, structured data, markup) or the client's own copy at the time of
 * the audit recorded in `audited`. No traffic, ranking, or revenue figures: those are
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
  /** Year the current build went live. */
  launched: string;
  /** One line on what the business does, in the client's words where possible. */
  what: string;
  /** The job the site was built to do. */
  job: string;
  /** What is under the hood, as a benefit to the owner. Label is the lens; text is the benefit. */
  facts: { label: FactLabel; text: string }[];
  /** Stack line shown small on the card. */
  stack: string;
  /** Path under /public. 1200x750. */
  image: string;
  /** Slug of the case study on /case-studies that covers this engagement. */
  caseStudy?: string;
  featured?: boolean;
}

export type FactLabel = 'Brand' | 'Found' | 'Local' | 'Rich results' | 'AI search' | 'Speed' | 'Converts' | 'Measured' | 'Owned';

/** Order the lenses appear in on the page and in the legend. */
export const FACT_LABELS: { label: FactLabel; meaning: string }[] = [
  { label: 'Brand', meaning: 'The site looks and reads like the business, on every screen, not like a template.' },
  { label: 'Found', meaning: 'Titles, descriptions, canonical URLs, a sitemap and robots rules, so search engines index the right pages.' },
  { label: 'Local', meaning: 'A page for each place and service you want to be found for, so a nearby search has somewhere to land.' },
  { label: 'Rich results', meaning: 'Structured data (schema.org) that tells Google what kind of business, service, event or FAQ a page is, which is what makes a listing eligible for enhanced results.' },
  { label: 'AI search', meaning: 'Clean, server-rendered HTML with clear headings and marked-up facts, so ChatGPT, Gemini and Google AI Overviews can read and cite the page.' },
  { label: 'Speed', meaning: 'Static pages served from a global edge network, modern image formats, no page builder weight.' },
  { label: 'Converts', meaning: 'Tap-to-call, short forms, booking paths and proof placed where a visitor decides.' },
  { label: 'Measured', meaning: 'GA4 or Tag Manager wired in, so calls and form fills are counted, not guessed.' },
  { label: 'Owned', meaning: 'The client owns the code, the domain and the hosting account. Leaving us never means starting over.' },
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
    what: 'A personal injury referral brand for all five boroughs: free case evaluation, then the right lawyer and the right doctors for the injury.',
    job: 'Launch a brand into the most competitive PI market in the country and give every borough, precinct and language a page to land on.',
    facts: [
      { label: 'Found', text: 'English, Spanish and Russian editions with hreflang on every page, so each audience the offline media reached lands on its own language.' },
      { label: 'Local', text: '547 indexed URLs: 56 location pages, 164 NYPD precinct pages (a crash is reported to a precinct, so the precinct is the search), 45 service pages and 227 articles.' },
      { label: 'Rich results', text: 'Organization markup plus structured site navigation, so the brand entity and its sections are legible to Google.' },
      { label: 'Converts', text: 'Five tap-to-call points and three forms, with the free case evaluation as the single call to action; the site fed a dedicated intake call center.' },
      { label: 'Measured', text: 'Google Tag Manager container, wired to the CRM and call center built in the same engagement.' },
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
    what: 'Physician-led hyperbaric oxygen therapy for non-healing wounds, radiation injury, sudden hearing loss and chronic pain.',
    job: 'Make an unfamiliar treatment feel credible and easy to ask about, and be the clinic Queens finds first.',
    facts: [
      { label: 'Local', text: 'Nine neighborhood pages (Astoria, Flushing, Forest Hills, Long Island City, Brooklyn, Manhattan and more) plus eight condition pages, so a search like "hyperbaric oxygen therapy Astoria" has a page written for it.' },
      { label: 'Rich results', text: 'Marked up as a MedicalBusiness with patient reviews, a physician page per doctor and a resources library, so Google reads it as a clinic, not a brochure.' },
      { label: 'AI search', text: 'Six plain-English resource articles (cost, insurance, how many sessions, hard vs. soft chambers) answer the questions people now ask AI assistants.' },
      { label: 'Brand', text: 'A custom share image per page, so links sent in texts and WhatsApp show the clinic, not a blank card.' },
      { label: 'Converts', text: 'Six tap-to-call points and one short contact form; the phone number is never more than a thumb away.' },
      { label: 'Measured', text: 'Google Tag Manager container, so calls and forms are tracked as conversions.' },
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
    what: 'A boutique downtown Hollywood personal injury firm. Auto, bike, rideshare, slip-and-fall and workers\' compensation.',
    job: 'Win the Hollywood car-accident search in English and Spanish, and turn a free consultation into a signed case.',
    facts: [
      { label: 'Found', text: 'Every page exists in English and Spanish with hreflang tags, so Google shows Spanish speakers the Spanish page instead of a translation banner.' },
      { label: 'Local', text: 'Ten practice-area pages (car, rear-end, hit-and-run, Uber/Lyft, bike, slip-and-fall, workers\' comp, denied claims) and an office page, each targeted to Hollywood.' },
      { label: 'Rich results', text: 'LegalService, FAQ and breadcrumb markup on the pages that matter, so the listing can carry the firm\'s details and questions.' },
      { label: 'AI search', text: 'A blog built around the questions injured people type: the PIP 14-day rule, settlement calculators, uninsured-motorist coverage, what to tell the insurer.' },
      { label: 'Speed', text: 'Static pages on Cloudflare\'s edge with WebP images; nothing to load before the phone number appears.' },
      { label: 'Measured', text: 'Tag Manager in place; five tap-to-call points and a short intake form feed it.' },
    ],
    stack: 'Static site on Cloudflare · 52 pages (EN/ES)',
    image: '/work/linderdiazlaw.webp',
    featured: true,
  },
  {
    slug: 'i-95-accidents',
    name: 'I-95 Accidents',
    url: 'https://www.i-95accidents.com/',
    domain: 'i-95accidents.com',
    category: 'Law',
    location: 'Florida to Maine',
    launched: '2026',
    what: 'Live crash reports for the full length of I-95, with date, time, exit and map, refreshed every fifteen minutes and kept for thirty days.',
    job: 'A referral asset: be the page someone opens after a crash, then route the injured to counsel.',
    facts: [
      { label: 'Local', text: 'A page for each of the fifteen I-95 states plus live accident pages, so "I-95 accident today" searches in any state have a destination.' },
      { label: 'Speed', text: 'The homepage is under 6 KB of HTML served from Cloudflare. It loads on a cracked phone on the shoulder of the highway.' },
      { label: 'Found', text: 'Clean titles, a sitemap and robots rules from day one, so the data pages get crawled as fast as they are published.' },
      { label: 'Converts', text: 'Two tap-to-call paths for "hurt in a crash?" placed at the top of every report.' },
      { label: 'Owned', text: 'Code and data pipeline live in the client\'s own repository.' },
    ],
    stack: 'Static site on Cloudflare · auto-updating data',
    image: '/work/i-95accidents.webp',
  },
  {
    slug: 'claims-match',
    name: 'Claims Match',
    url: 'https://www.claimsmatch.co/',
    domain: 'claimsmatch.co',
    category: 'Law',
    location: 'National',
    launched: '2026',
    what: 'Open class-action claim deadlines, FTC refund updates and product recalls, checked against official sources, with an archive of past settlements.',
    job: 'Rebuild a legacy WordPress archive as a fast, trustworthy reference that search engines and readers return to.',
    facts: [
      { label: 'Found', text: '173 settlement pages and a news section migrated with their URLs intact, so nothing the old site had earned was lost.' },
      { label: 'Rich results', text: 'Organization and WebSite markup identify the publisher behind every settlement page.' },
      { label: 'AI search', text: 'Each settlement page states who qualifies, the deadline and the official link in plain text, the format AI answers lift from.' },
      { label: 'Speed', text: 'Next.js pages rendered on the server and cached at the edge; the old WordPress page weight is gone.' },
      { label: 'Measured', text: 'GA4 on every page.' },
    ],
    stack: 'Next.js on Vercel · 216 pages',
    image: '/work/claimsmatch.webp',
  },
  {
    slug: 'ems-south-florida',
    name: 'EMS South Florida',
    url: 'https://emssouthflorida.com/',
    domain: 'emssouthflorida.com',
    category: 'Medical & Wellness',
    location: 'Palm Beach County, FL',
    launched: '2026',
    what: 'Supervised whole-body electro-muscle-stimulation training, explained honestly, including who should skip it.',
    job: 'Explain a new modality without hype, screen for contraindications, and book a 20-minute intro session.',
    facts: [
      { label: 'AI search', text: 'Eleven training pages, five on the equipment and a guides section answer the "is EMS right for me" questions directly, which is how assistants and AI Overviews pick a source.' },
      { label: 'Brand', text: 'The copy leads with candor ("who should skip it"), which is the brand position, and a medical disclaimer page backs it.' },
      { label: 'Converts', text: 'A dedicated "try EMS" path with SMS terms published, so text follow-up is compliant from the first lead.' },
      { label: 'Found', text: 'Organization and WebSite markup, canonical URLs and a 29-URL sitemap in place for launch.' },
      { label: 'Measured', text: 'GA4 wired at launch.' },
    ],
    stack: 'Next.js on Vercel · 29 pages',
    image: '/work/emssouthflorida.webp',
  },
  {
    slug: 'cash4home-fl',
    name: 'Cash4Home FL',
    url: 'https://cash4homefl.com/',
    domain: 'cash4homefl.com',
    category: 'Real Estate & Finance',
    location: 'Palm Beach & Broward, FL',
    launched: '2026',
    what: 'Direct cash offers on South Florida houses: no repairs, no fees, no commissions.',
    job: 'Own "sell my house fast" and "we buy houses" in every city the buyer serves.',
    facts: [
      { label: 'Local', text: 'Thirty "we buy houses" city pages and twenty-six "sell my house fast" city pages, plus situation pages for probate, foreclosure, divorce, liens and rentals.' },
      { label: 'Rich results', text: 'RealEstateAgent, FAQ and step-by-step (HowTo) markup describe the offer process to search engines the way the page describes it to sellers.' },
      { label: 'Converts', text: 'A short offer form and four tap-to-call points; the first screen asks for the address, nothing else.' },
      { label: 'AI search', text: 'A ten-post blog on the seller questions that come before the call.' },
      { label: 'Speed', text: 'Next.js on Vercel, lazy-loaded imagery.' },
    ],
    stack: 'Next.js on Vercel · 82 pages',
    image: '/work/cash4homefl.webp',
  },
  {
    slug: 'west-palm-beach-florida-real-estate',
    name: 'West Palm Beach Florida Real Estate',
    url: 'https://westpalmbeachfloridarealestate.com/',
    domain: 'westpalmbeachfloridarealestate.com',
    category: 'Real Estate & Finance',
    location: 'West Palm Beach, FL',
    launched: '2026',
    what: 'Buy or sell a home in West Palm Beach with neighborhood-level guidance, from El Cid to Northwood, plus valuations and property search.',
    job: 'Rank for the city name on an exact-match domain and convert neighborhood research into a valuation request.',
    facts: [
      { label: 'Local', text: 'Neighborhood guides written for the people who search them, with a home-valuation request on each.' },
      { label: 'Rich results', text: 'RealEstateAgent markup names the agent, the service area and the contact details.' },
      { label: 'Speed', text: 'A static site on Cloudflare: one image on the homepage, instant load.' },
      { label: 'Converts', text: 'Four tap-to-call points and a valuation form.' },
    ],
    stack: 'Static site on Cloudflare',
    image: '/work/westpalmbeachfloridarealestate.webp',
  },
  {
    slug: 'south-florida-real-estate-voice',
    name: 'South Florida Real Estate Voice',
    url: 'https://southfloridarealestatevoice.com/',
    domain: 'southfloridarealestatevoice.com',
    category: 'Real Estate & Finance',
    location: 'Miami-Dade, Broward & Palm Beach, FL',
    launched: '2026',
    what: 'Fifty-six South Florida new-development condos and townhomes, with independent buyer representation.',
    job: 'Be the independent guide to pre-construction, a page per development, and capture buyers before they walk into a sales gallery.',
    facts: [
      { label: 'Local', text: 'A page for every development across the three counties (74 URLs), each with its own WebP imagery and share card.' },
      { label: 'Rich results', text: 'CollectionPage, RealEstateAgent and Person markup, so the directory, the agent and the author are all understood.' },
      { label: 'Speed', text: '131 WebP images, all lazy-loaded; a rich directory that still loads in well under a second.' },
      { label: 'Measured', text: 'GA4 on every page; four tap-to-call points and one inquiry form.' },
    ],
    stack: 'Static site on Vercel · 74 pages',
    image: '/work/southfloridarealestatevoice.webp',
  },
  {
    slug: 'zippy-title',
    name: 'ZippyTitle',
    url: 'https://zippytitle.com/',
    domain: 'zippytitle.com',
    category: 'Real Estate & Finance',
    location: 'Florida',
    launched: '2026',
    what: 'Digital title searches, e-closing and title insurance for real estate transactions.',
    job: 'A fast, credible front door for a title company, with a second domain folded in cleanly.',
    facts: [
      { label: 'Found', text: 'titlezipnow.com serves the same site with a canonical pointing to zippytitle.com, so two domains do not split the ranking signal.' },
      { label: 'Rich results', text: 'Organization markup; one clear order-a-title form.' },
      { label: 'Owned', text: 'A Content-Security-Policy header is enforced, which most small-business sites never ship.' },
      { label: 'Speed', text: 'Under 11 KB of HTML on Cloudflare.' },
    ],
    stack: 'Static site on Cloudflare',
    image: '/work/zippytitle.webp',
  },
  {
    slug: 'zippy-title-loans',
    name: 'Zippy Title Loans',
    url: 'https://zippytitleloans.com/',
    domain: 'zippytitleloans.com',
    category: 'Real Estate & Finance',
    location: 'Florida',
    launched: '2026',
    what: 'Hard-money loans for Florida real estate investors: apply in under two minutes, decision within 24 hours, close in as little as seven days.',
    job: 'Qualify investors quickly and move them to the application.',
    facts: [
      { label: 'Rich results', text: 'FinancialService markup matches the offer on the page.' },
      { label: 'Converts', text: 'A single application path, repeated at every scroll depth.' },
      { label: 'Owned', text: 'Content-Security-Policy enforced; the client holds the domain and code.' },
      { label: 'Speed', text: 'Under 10 KB of HTML on Cloudflare, images lazy-loaded.' },
    ],
    stack: 'Static site on Cloudflare',
    image: '/work/zippytitleloans.webp',
  },
  {
    slug: 'splendid-limo',
    name: 'Splendid Limo & Transportation',
    url: 'https://splendidlimo.com/',
    domain: 'splendidlimo.com',
    category: 'Local Service',
    location: 'Miami to West Palm Beach, FL',
    launched: '2026',
    what: 'Luxury chauffeured transportation across South Florida, with more than 400 five-star Google reviews.',
    job: 'Turn a reputation already earned on Google into bookings from the site itself.',
    facts: [
      { label: 'Rich results', text: 'Marked up as a LimousineService, the exact schema.org type Google has for the category.' },
      { label: 'Brand', text: 'A custom social card and a fleet presented in WebP, so the site looks as polished as the cars.' },
      { label: 'Converts', text: 'Eight tap-to-call points and a booking form; the review count sits in the first screen.' },
      { label: 'Speed', text: 'Static pages, 35 KB of HTML, lazy-loaded fleet imagery.' },
    ],
    stack: 'Static site on Vercel · 8 pages',
    image: '/work/splendidlimo.webp',
  },
  {
    slug: 'junk-removal-service-usa',
    name: 'Junk Removal Service USA',
    url: 'https://www.junkremovalserviceusa.com/',
    domain: 'junkremovalserviceusa.com',
    category: 'Local Service',
    location: 'Miami-Dade, Broward & Palm Beach, FL',
    launched: '2026',
    what: 'Same-day junk removal and light demolition across three counties, licensed and insured, upfront pricing.',
    job: 'Rank in every city for every service, and make the quote a phone call away.',
    facts: [
      { label: 'Local', text: 'A page per city from Tequesta to Weston, eleven demolition pages, eight service pages, six drop-off guides and a twelve-article guide library: 106 URLs in all.' },
      { label: 'Rich results', text: 'LocalBusiness markup with service area; share images generated per page.' },
      { label: 'Converts', text: 'Five tap-to-call points; the quote is the phone number, with no form in the way.' },
      { label: 'Owned', text: 'Content-Security-Policy enforced on every response.' },
    ],
    stack: 'Next.js on Vercel · 106 pages',
    image: '/work/junkremovalserviceusa.webp',
  },
  {
    slug: 'millers-marketing-group',
    name: "Miller's Marketing Group",
    url: 'https://www.millersmarketinggroup.com/',
    domain: 'millersmarketinggroup.com',
    category: 'Consumer & Technology',
    location: 'Florida',
    launched: '2026',
    what: 'Curated business networking events across Florida: "the right room can change everything."',
    job: 'Sell the room: make each event findable and bookable, and make the brand feel like the events do.',
    facts: [
      { label: 'Rich results', text: 'ProfessionalService plus BusinessEvent markup, so upcoming events are structured the way Google lists events.' },
      { label: 'Brand', text: 'Thirty-eight images, every one with alt text, in WebP; a dedicated social card.' },
      { label: 'Measured', text: 'GA4 in place; three tap-to-call points and two forms (register, inquire).' },
      { label: 'Owned', text: 'Content-Security-Policy enforced.' },
    ],
    stack: 'Static site on Vercel',
    image: '/work/millersmarketinggroup.webp',
  },
  {
    slug: 'kiss-selfcare',
    name: 'Kiss Selfcare',
    url: 'https://kiss.care/',
    domain: 'kiss.care',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    what: 'Plant-based, pharmacist-formulated skincare. More actives, fewer steps. Handmade in the USA.',
    job: 'A brand site that looks like the product and loads like a landing page.',
    facts: [
      { label: 'Brand', text: 'A short, memorable domain, a custom share image and thirty WebP product images that lazy-load.' },
      { label: 'Found', text: 'Organization markup, canonicals and an eleven-URL sitemap.' },
      { label: 'Speed', text: 'Static pages on Cloudflare, 18 KB of HTML.' },
    ],
    stack: 'Static site on Cloudflare · 11 pages',
    image: '/work/kiss.care.webp',
  },
  {
    slug: 'hello-viki',
    name: 'Hello Viki AI',
    url: 'https://helloviki.com/',
    domain: 'helloviki.com',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    what: 'AI-powered remote assistants for doctors, lawyers and healthcare practices. HIPAA compliant, onboarded in 24 hours.',
    job: 'Speak to two audiences (doctors, lawyers) from one brand and recruit the assistants on the same site.',
    facts: [
      { label: 'Found', text: 'helloviki.ai serves the site too, with its canonical pointing at helloviki.com, so the brand holds both domains without splitting authority.' },
      { label: 'Rich results', text: 'Organization and breadcrumb markup; audience pages for doctors, lawyers and personal injury.' },
      { label: 'Converts', text: 'Seven careers pages recruit the supply side; the demand side gets a free-trial path.' },
      { label: 'Measured', text: 'Google Tag Manager container.' },
    ],
    stack: 'Static site on Cloudflare · 15 pages',
    image: '/work/helloviki.webp',
  },
  {
    slug: 'rock-the-treatment-mobile',
    name: 'Rock The Treatment · mobile store',
    url: 'https://m.rockthetreatment.com/',
    domain: 'm.rockthetreatment.com',
    category: 'Consumer & Technology',
    location: 'USA',
    launched: '2026',
    what: 'Curated chemo and radiation care packages. A mobile-first storefront built alongside the existing WooCommerce store.',
    job: 'Give phone shoppers a storefront that opens instantly, without rebuilding the store they already run.',
    facts: [
      { label: 'Speed', text: 'A 10 KB page with WebP product imagery, served from the edge, beside a 570 KB WordPress homepage.' },
      { label: 'Found', text: 'Canonicals point back at the main shop, so the mobile site adds speed without creating duplicate content.' },
      { label: 'Measured', text: 'Shares the store\'s Tag Manager container, so purchases are attributed in one place.' },
    ],
    stack: 'Static minisite on Vercel',
    image: '/work/m.rockthetreatment.webp',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ['Law', 'Medical & Wellness', 'Real Estate & Finance', 'Local Service', 'Consumer & Technology'];
