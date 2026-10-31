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
  /** Year the current build went live. */
  launched: string;
  /** Date this entry's facts were last read from the live site, when later than AUDITED. */
  audited?: string;
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
  /** Slug of the case study on /case-studies that covers this site or the engagement behind it. */
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
    what: 'A West Palm Beach firm practicing real estate law, title and closings, foreclosure defense, code and permit issues, estate planning and litigation for over 20 years.',
    job: 'Turn two decades of real estate practice into a site that answers what buyers, sellers and homeowners search, and books a free consultation.',
    facts: [
      { label: 'AI search', text: 'A library of 330 articles on Florida real estate, foreclosure, landlord-tenant, family and estate questions: the long-tail searches people type before they call a lawyer.' },
      { label: 'Found', text: 'Six practice-area pages, an estate-planning section with seven topic pages, and a bio for each of five team members.' },
      { label: 'Converts', text: 'Closing-cost calculators for buyers, sellers and refinances, a free-consultation form in the first screen, three tap-to-call points, and a video intake greeting that routes visitors by matter.' },
      { label: 'Rich results', text: 'Marked up as a LegalService with the office address.' },
      { label: 'Brand', text: 'Live Google reviews on a dedicated reviews page.' },
      { label: 'Measured', text: 'CallRail number swapping attributes each call to its source, with Google Tag Manager and the Meta pixel in place.' },
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
    what: 'Live crash reports for the full length of I-95, with date, time, exit and map, refreshed every fifteen minutes and kept for thirty days.',
    job: 'A referral asset: be the page someone opens after a crash, then route the injured to counsel.',
    facts: [
      { label: 'Local', text: 'A page for each of the fifteen I-95 states and 105 towns along the corridor, plus a page for every crash (92 in the last 30 days at audit), so "I-95 accident today" searches in any state have a destination.' },
      { label: 'Rich results', text: 'CollectionPage, ItemList and FAQ markup, so the live list of crashes and the common questions are structured for search.' },
      { label: 'Speed', text: 'A static, server-rendered homepage on Cloudflare with no images to wait for: about 49 KB of HTML carrying the full crash list.' },
      { label: 'Converts', text: 'Two tap-to-call paths for "hurt in a crash?" at the top of the page, beside a link to live I-95 traffic cameras.' },
      { label: 'Measured', text: 'GA4 on every page.' },
      { label: 'Owned', text: 'Code and data pipeline live in the client\'s own repository.' },
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
    what: 'Supervised whole-body electro-muscle-stimulation training, explained honestly, including who should skip it.',
    job: 'Explain a new modality without hype, screen for contraindications, and send people to a supervised intro session or a studio near them.',
    facts: [
      { label: 'Local', text: 'A studio finder with a page for each of 22 whole-body EMS studios across Palm Beach, Broward and Miami-Dade, verified on each studio\'s own site and listed without ranking.' },
      { label: 'AI search', text: 'Eleven training pages, a home-suits section (FDA status, reviews and a quiz) and eight guides answer the "is EMS right for me" questions directly, which is how assistants and AI Overviews pick a source.' },
      { label: 'Rich results', text: 'Organization, WebSite and FAQ markup, so the homepage questions are structured for search.' },
      { label: 'Brand', text: 'The copy leads with candor ("who should skip it"), with dated editorial bylines, an editorial policy and a medical disclaimer behind it.' },
      { label: 'Converts', text: 'A safety check and a "try EMS" intro-session path, with SMS terms published so text follow-up is compliant from the first lead.' },
      { label: 'Measured', text: 'GA4 on every page.' },
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
    what: 'A wound care center treating non-healing wounds and ulcers: diabetic, arterial, pressure, infected and more.',
    job: 'Give each wound type its own page, and turn a worried search into a question the doctors can answer.',
    facts: [
      { label: 'Found', text: 'A page for each wound type (arterial, diabetic, infected, open and pressure ulcers, ingrown toenails) and each treatment (compression therapy, debridement, hyperbaric oxygen, limb preservation).' },
      { label: 'Converts', text: 'A short patient form in the first screen asks for a description of the wound, beside four tap-to-call points.' },
      { label: 'Brand', text: 'Doctors and accepted-insurance pages answer the two questions patients ask before they book.' },
      { label: 'Local', text: 'A KML locations file points Google Maps at the center\'s exact address.' },
      { label: 'Measured', text: 'GA4 and Google Tag Manager in place.' },
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
    what: 'Direct cash offers on South Florida houses: no repairs, no fees, no commissions.',
    job: 'Own "sell my house fast" and "we buy houses" in every city the buyer serves.',
    facts: [
      { label: 'Local', text: 'Thirty "we buy houses" city pages, twenty-six "sell my house fast" city pages and a page per county, plus situation pages for probate, foreclosure, divorce, liens, rentals, damaged and as-is houses.' },
      { label: 'Rich results', text: 'RealEstateAgent, FAQ and step-by-step (HowTo) markup describe the offer process to search engines the way the page describes it to sellers.' },
      { label: 'Converts', text: 'The offer form sits in the first screen and asks for three things (address, phone, email), with five tap-to-call points around it.' },
      { label: 'AI search', text: 'A ten-post blog on the seller questions that come before the call.' },
      { label: 'Speed', text: 'Next.js on Vercel, lazy-loaded imagery.' },
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
    what: 'Buy or sell a home in West Palm Beach with neighborhood-level guidance, from El Cid to Northwood, plus valuations and property search.',
    job: 'Rank for the city name on an exact-match domain and turn neighborhood and condo research into a conversation with the agent.',
    facts: [
      { label: 'Local', text: 'Eleven neighborhood guides and fifty-nine condo building profiles, each written for the people who search that name, with an inquiry form on every guide.' },
      { label: 'Rich results', text: 'RealEstateAgent and Person markup name the agent and service area; each condo profile is marked up as an ApartmentComplex with its address and coordinates.' },
      { label: 'Speed', text: 'A static site on Cloudflare with WebP imagery, lazy-loaded below the first screen.' },
      { label: 'Converts', text: 'A property search in the hero, a free market analysis for sellers, and five tap-to-call points.' },
      { label: 'Measured', text: 'GA4 on every page.' },
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
    what: 'Fifty-six South Florida new-development condos and townhomes, with independent buyer representation.',
    job: 'Be the independent guide to pre-construction, a page per development, and capture buyers before they walk into a sales gallery.',
    facts: [
      { label: 'Local', text: 'A page for every development, plus area pages for nine cities and counties (Miami Beach, Sunny Isles, Boca Raton, West Palm Beach and more): 74 URLs, each with its own WebP imagery and share card.' },
      { label: 'Rich results', text: 'CollectionPage with an ItemList of all 56 developments, plus RealEstateAgent and Person markup, so the directory, the agent and the author are all understood.' },
      { label: 'Speed', text: 'The homepage directory carries 51 images, WebP and lazy-loaded below the first screen, so only what is on screen loads first.' },
      { label: 'Measured', text: 'GA4 on every page; four tap-to-call points and one inquiry form.' },
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
    what: 'A realtor-focused Florida title insurance company: "because title insurance companies don\'t exist without realtors."',
    job: 'Be the title company agents want to send contracts to, with everything an agent needs in the first screen.',
    facts: [
      { label: 'Converts', text: 'Send a contract, make an escrow deposit, reach the escrow agent and estimate closing costs, all from the first screen; the calculator and deposit run on the company\'s TitleLeap portal.' },
      { label: 'Brand', text: 'Copy written to realtors, the audience that sends the business, with the Google review rating beside the first call to action.' },
      { label: 'AI search', text: '63 articles on Florida closings, title, landlord-tenant and estate questions that agents can send their clients.' },
      { label: 'Rich results', text: 'Organization markup with a contact point and the office\'s coordinates.' },
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
    what: 'Curated networking events for Florida\'s personal injury professionals: attorneys, medical providers and trusted partners. "The right room can change everything."',
    job: 'Sell the room: make each event findable and bookable, and make the brand feel like the events do.',
    facts: [
      { label: 'Rich results', text: 'ProfessionalService plus BusinessEvent markup, so upcoming events are structured the way Google lists events.' },
      { label: 'Brand', text: 'Thirty-eight images, each described for screen readers or marked decorative, half of them in WebP; a dedicated social card.' },
      { label: 'Measured', text: 'GA4 in place; three tap-to-call points and two forms (register, inquire).' },
      { label: 'Owned', text: 'Content-Security-Policy enforced.' },
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
    what: 'Plant-based, pharmacist-formulated skincare. More actives, fewer steps. Handmade in the USA.',
    job: 'A brand site that looks like the product and loads like a landing page.',
    facts: [
      { label: 'Brand', text: 'A short, memorable domain, a custom share image and thirty WebP product images that lazy-load.' },
      { label: 'Found', text: 'A page per product (five), an ingredients page and an FAQ, with Organization markup, canonicals and a fifteen-URL sitemap.' },
      { label: 'Speed', text: 'Static pages on Cloudflare, 21 KB of HTML.' },
      { label: 'Owned', text: 'A Content-Security-Policy is enforced on every response.' },
      { label: 'Measured', text: 'GA4 on every page.' },
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
    what: 'Software for title agents: critical-date reminders, a live closing punch list and secure messaging for realtors, buyers and sellers.',
    job: 'Explain a new kind of title software to local title agents on one page, and book the demo.',
    facts: [
      { label: 'Converts', text: 'One page, one action: every section leads to "Schedule a demo".' },
      { label: 'Brand', text: 'Positioned for the local title agent competing with "big box title", at no cost to the agent or realtor.' },
      { label: 'Measured', text: 'Google Tag Manager container.' },
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
    what: 'A platform that follows a personal injury client from the accident through every treatment, shared by attorneys, medical providers and patients.',
    job: 'Explain a three-sided product to attorneys, providers and patients on one page, and get each to make contact.',
    facts: [
      { label: 'Brand', text: 'An explainer video in the first screen shows the product before a visitor reads a word.' },
      { label: 'Found', text: 'Separate sections for attorneys, medical providers and patients, each in its own terms, plus an integrations page.' },
      { label: 'Measured', text: 'Google Tag Manager container.' },
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
    what: 'Curated chemo and radiation care packages. A mobile-first storefront built alongside the existing WooCommerce store.',
    job: 'Give phone shoppers a storefront that opens instantly, without rebuilding the store they already run.',
    facts: [
      { label: 'Speed', text: 'A 10 KB page served from the edge, with lazy-loaded product images, beside a 556 KB WordPress homepage.' },
      { label: 'Found', text: 'Canonicals point back at the main shop, so the mobile site adds speed without creating duplicate content.' },
      { label: 'Measured', text: 'Google Tag Manager is installed, so visits from the mobile store are measured.' },
    ],
    stack: 'Static minisite on Vercel',
    image: '/work/m.rockthetreatment.webp',
    caseStudy: 'rock-the-treatment-mobile',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ['Law', 'Medical & Wellness', 'Real Estate & Finance', 'Local Service', 'Consumer & Technology'];

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
  job: string;
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
    what: 'Call tracking and a callback queue for personal injury law firms: every call rings the team at once, and missed calls become callbacks instead of lost leads.',
    job: 'Show a firm which calls were answered, missed or spam, and get a missed call called back fast.',
    facts: [
      'Tracking numbers per client or campaign, with ring groups that ring every phone at once and a voicemail fallback.',
      'A callback queue for missed calls, with a push alert to subscribed phones and spam triage with a blocklist.',
      'Dated reports on call volume, answer rate, spam share and callback speed, per client and per line, with CSV export.',
      'Installs as an app on a phone. The source is private; ask us how it would work for your firm.',
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
    what: 'A fast, offline-first Markdown, HTML and Mermaid editor. No accounts, no cloud, no tracking.',
    job: 'Write, preview and export documents and diagrams in one tool that never sends your text anywhere.',
    facts: [
      'Live preview as you type, Mermaid diagrams (flowcharts, sequence, ER, Gantt), JSON validation with the error line and column, and syntax-highlighted code.',
      'Export to PDF or standalone HTML, share a document as a link, and work in several tabs at once.',
      'Auto-saves to the browser only; nothing is sent to a server, ever.',
      'Installs as an app and works offline.',
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
    what: 'Track every billable hour, mile and dollar on client projects, and recoup it.',
    job: 'Make logging time, mileage and expenses fast enough that it actually happens, on whichever device is in hand.',
    facts: [
      'One SwiftUI codebase runs natively on iPhone, iPad and Mac, synced through the user’s own iCloud. No server to host or maintain.',
      'Hourly rates resolve from project to client and lock when an entry is saved; trips double for round trips; expenses take receipt photos.',
      'A dashboard of six summary cards with per-client and per-project breakdowns, and CSV export of everything.',
      'Forms prefill the last client and project, with preset chips instead of typing.',
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
    what: 'A native Mac app for API keys, OAuth credentials and multi-field developer secrets, stored entirely on-device.',
    job: 'A password manager that understands developer credentials: an AWS key has a Region, an OAuth client has a token URL and two tokens.',
    facts: [
      'Each field is encrypted with AES-256-GCM; the key lives in the macOS Keychain and unlocks with Touch ID.',
      'Templates for API keys, OAuth, service accounts and AWS IAM, plus custom entries with any fields.',
      'Locks on idle and screen sleep, clears copied values after 30 seconds, and warns when a credential is about to expire.',
      'Each entry records which named scripts or agents may read or update it, and the grant can be revoked.',
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
    what: 'A reading practice app for elementary readers: six original passages across fantasy, mystery and nature nonfiction, each with four comprehension questions.',
    job: 'Give kids a calm place to read and check understanding, with no timers or sibling rankings, and give parents a clear view of how each reader is doing.',
    facts: [
      'Wrong answers and optional hints highlight the paragraph that holds the answer, and the story stays on screen through every question.',
      '"Make a story with our names" builds a personalized adventure from built-in templates in the browser; it does not call an AI service.',
      'A grown-up corner separates first-try answers from assisted ones, groups results by comprehension skill and exports JSON.',
      'Progress saves on the device first; optional cloud saving syncs a family across devices with a private key, and no child accounts are used.',
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
    platform: 'Browser game, desktop and phone',
    status: 'Private beta',
    launched: '2026',
    what: 'A tower-defense game for children learning multiplication and division: build a dinosaur squad, protect the egg nest and earn gems by solving times-table questions.',
    job: 'Make times-table practice something kids ask to play, without timers or penalties for wrong answers.',
    facts: [
      'Sixteen waves: eight of multiplication, then eight of division, getting harder every two waves, with chapter bosses in waves 8 and 16.',
      'Questions pause the game so children can think; wrong answers never cost eggs or gems.',
      'Visual hints for each fact: equal groups, skip counting, regrouping by tapping rows, and shortcuts such as doubles and swapping factors.',
      'Dinosaur or unicorn theme, desktop and phone controls, and records saved in the browser.',
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
