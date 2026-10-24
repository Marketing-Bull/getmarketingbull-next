/**
 * Case studies. Every number here must be traceable to a source Alex can stand behind —
 * the old site's published case study, a client testimonial, or a client-approved report.
 * Source is recorded per entry. Do not add figures without one.
 *
 * Website builds are written from the audit of the live site recorded in src/lib/portfolio.ts:
 * every count and claim comes from that audit, and none of them carry traffic, ranking or
 * revenue figures. Each one shares its slug with its PORTFOLIO entry.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  /** 'Engagement' is a multi-channel program; 'Website build' is a site we designed and built. */
  kind: 'Engagement' | 'Website build';
  vertical: 'Law' | 'Medical' | 'Wellness' | 'Real Estate & Finance' | 'Local Service' | 'Consumer & Technology';
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
  /** Date this write-up was published on this site (ISO). Article datePublished and sitemap lastmod. */
  published: string;
  featured?: boolean;
}

const WEBSITE_SOURCE = 'Audit of the live site, 2026-10-21 (src/lib/portfolio.ts). Website build; no outcome metrics published.';
const WEBSITE_SOURCE_REAUDIT = 'Re-audit of the live site after its redesign or update, 2026-10-24 (src/lib/portfolio.ts). Website build; no outcome metrics published.';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: '1-800-hurt-511',
    client: '1-800-HURT-511',
    kind: 'Engagement',
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
    published: '2026-09-03',
    featured: true,
  },
  {
    slug: 'queens-hyperbaric',
    client: 'Queens Hyperbaric',
    kind: 'Engagement',
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
    published: '2026-09-03',
    featured: true,
  },
  {
    slug: 'metropolitan-orthopedics',
    client: 'Metropolitan Orthopedics',
    kind: 'Engagement',
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
    published: '2026-09-03',
  },

  // Website builds, 2026. Facts from the live-site audit in src/lib/portfolio.ts.
  {
    slug: 'linder-diaz-law',
    client: 'Linder Diaz Law',
    kind: 'Website build',
    vertical: 'Law',
    industry: 'Personal injury law firm',
    location: 'Hollywood, Florida',
    summary: 'A bilingual personal injury site for a downtown Hollywood firm: 52 pages, every one in English and Spanish, built to turn a car-accident search into a free consultation.',
    constraint:
      'A boutique firm competing for Hollywood car-accident searches, in a city where many injured people search in Spanish. A translated page behind a language toggle does not rank for a Spanish search, and someone hurt in a crash will not wait on a slow page before calling.',
    action:
      'We built a static site served from Cloudflare\'s edge with every page in English and Spanish, linked by hreflang tags so Google shows each audience its own language. Ten practice-area pages (car, rear-end, hit-and-run, Uber/Lyft, bike, slip-and-fall, workers\' compensation, denied claims) and an office page are each targeted to Hollywood. LegalService, FAQ and breadcrumb markup sit on the pages that matter, a blog answers the questions injured people type (the PIP 14-day rule, uninsured-motorist coverage, what to tell the insurer), and five tap-to-call points and a short intake form report into Google Tag Manager.',
    result:
      'linderdiazlaw.com is live with 52 pages in two languages, structured data on its key pages, and call and form tracking in place from launch.',
    proof: [
      '52 pages, every one in English and Spanish',
      '10 practice-area pages targeted to Hollywood',
      'LegalService, FAQ and breadcrumb markup',
      '5 tap-to-call points and an intake form, tracked',
    ],
    services: ['Website design and build', 'Bilingual pages (EN / ES) with hreflang', 'Practice-area pages', 'Structured data', 'Blog', 'Google Tag Manager setup'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'i-95-accidents',
    client: 'I-95 Accidents',
    kind: 'Website build',
    vertical: 'Law',
    industry: 'Crash-report referral site',
    location: 'I-95, Florida to Maine',
    summary: 'Live crash reports for all fifteen I-95 states and 105 towns along the corridor, refreshed every fifteen minutes, built as a referral asset that routes injured drivers to counsel.',
    constraint:
      'After a highway crash, people search for what happened, often from a phone on the shoulder. A referral asset has to be the page that answers that search: fresh data, a page for every state, and a load time that holds up on a weak connection.',
    action:
      'We built a static site on Cloudflare fed by an automated data pipeline: crash reports with date, time, exit and map, refreshed every fifteen minutes and kept for thirty days, each on its own page. Each of the fifteen I-95 states and 105 towns along the corridor has a page, CollectionPage, ItemList and FAQ markup structure the live list, and titles, a sitemap and robots rules mean new reports are crawled as they publish. Two tap-to-call paths for injured drivers sit at the top of the page beside a link to live traffic cameras, and GA4 runs on every page. The code and the pipeline live in the client\'s own repository.',
    result:
      'i-95accidents.com is live with 216 pages, updating itself every fifteen minutes from a static, image-free homepage.',
    proof: [
      '15 state pages and 105 town pages',
      'A page for every crash, refreshed every 15 minutes, kept 30 days',
      'CollectionPage, ItemList and FAQ markup',
      'Code and data pipeline owned by the client',
    ],
    services: ['Website design and build', 'Automated data pipeline', 'State and town pages', 'Technical SEO', 'Structured data', 'GA4 setup', 'Tap-to-call intake paths'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'claims-match',
    client: 'Claims Match',
    kind: 'Website build',
    vertical: 'Law',
    industry: 'Class-action settlement reference',
    location: 'National',
    summary: 'A legacy WordPress settlement archive rebuilt on Next.js, with 173 settlement pages migrated at their original URLs.',
    constraint:
      'Claims Match had a library of settlement pages on WordPress that search engines already knew. A rebuild had to make the site faster and more trustworthy without losing any of the URLs that had earned their place in search.',
    action:
      'We rebuilt it on Next.js, rendered on the server and cached at the edge on Vercel, and migrated 173 settlement pages and the news section with their URLs intact. Each settlement page states who qualifies, the deadline and the official claim link in plain text, the format AI answers lift from. Organization and WebSite markup identify the publisher, and GA4 runs on every page.',
    result:
      'claimsmatch.co is live on the new build with 216 pages, and every migrated settlement page kept its URL.',
    proof: [
      '173 settlement pages migrated, URLs intact',
      '216 pages on Next.js',
      'Eligibility, deadline and official link on every settlement page',
      'GA4 on every page',
    ],
    services: ['WordPress to Next.js migration', 'URL-preserving content migration', 'Structured data', 'GA4 setup'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'ems-south-florida',
    client: 'EMS South Florida',
    kind: 'Website build',
    vertical: 'Wellness',
    industry: 'EMS training studio',
    location: 'Palm Beach County, Florida',
    summary: 'A 57-page site that explains whole-body EMS training without hype, including who should skip it, lists 22 studios across South Florida, and routes people to a supervised intro session.',
    constraint:
      'Whole-body electro-muscle stimulation is new to most people and easy to oversell. The studio needed a site that answered the safety and suitability questions honestly, screened out people with contraindications, and still moved the right visitors to book.',
    action:
      'We built a Next.js site on Vercel, since grown to 57 pages: eleven training pages, a home-suits section (FDA status, reviews and a quiz) and eight guides that answer the "is EMS right for me" questions directly, and a studio finder with a page for each of 22 studios across Palm Beach, Broward and Miami-Dade, listed without ranking. The copy leads with who should not train, behind dated editorial bylines, an editorial policy and a medical disclaimer. A safety check and a "try EMS" intro-session path publish SMS terms, so text follow-up is compliant from the first lead. Organization, WebSite and FAQ markup, canonical URLs, a sitemap and GA4 are in place.',
    result:
      'emssouthflorida.com is live with 57 pages, a 22-studio directory, a compliant SMS opt-in on the intro-session path, and GA4 on every page.',
    proof: [
      '57 pages: training, home suits, guides and studios',
      '22 studios across three counties, a page for each',
      'A "who should skip it" position, backed by a medical disclaimer',
      'SMS terms published on the intro-session path',
    ],
    services: ['Website design and build', 'Studio directory', 'Guides section', 'SMS opt-in compliance', 'Structured data', 'GA4 setup'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'cash4home-fl',
    client: 'Cash4Home FL',
    kind: 'Website build',
    vertical: 'Real Estate & Finance',
    industry: 'Cash home buyer',
    location: 'Palm Beach and Broward, Florida',
    summary: 'An 82-page site with a page for every city the buyer serves, built to own "we buy houses" and "sell my house fast" across two counties.',
    constraint:
      'Cash home buyers compete on two searches, "we buy houses" and "sell my house fast", city by city. One homepage cannot rank in thirty cities, and a seller in a hard situation (probate, foreclosure, divorce) wants to see that situation named before they call.',
    action:
      'We built an 82-page Next.js site on Vercel with thirty "we buy houses" city pages, twenty-six "sell my house fast" city pages, a page per county, and situation pages for probate, foreclosure, divorce, liens, rentals, damaged and as-is houses. RealEstateAgent, FAQ and HowTo markup describe the offer process the way the page does. The offer form sits in the first screen and asks for three things (address, phone, email), with five tap-to-call points around it, and a ten-post blog covers the questions sellers ask before they call.',
    result:
      'cash4homefl.com is live with 56 city pages across Palm Beach and Broward, and a three-field offer form in the first screen.',
    proof: [
      '30 "we buy houses" city pages',
      '26 "sell my house fast" city pages',
      'Situation pages: probate, foreclosure, divorce, liens, rentals, damaged, as-is',
      'RealEstateAgent, FAQ and HowTo markup',
    ],
    services: ['Website design and build', 'City and county pages', 'Situation pages', 'Structured data', 'Blog'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'west-palm-beach-florida-real-estate',
    client: 'West Palm Beach Florida Real Estate',
    kind: 'Website build',
    vertical: 'Real Estate & Finance',
    industry: 'Residential real estate agent',
    location: 'West Palm Beach, Florida',
    summary: 'An exact-match-domain site with eleven neighborhood guides and fifty-nine condo building profiles, built to turn West Palm Beach research into a conversation with the agent.',
    constraint:
      'Buyers and sellers research West Palm Beach by neighborhood, and condo buyers by building, long before they pick an agent. The site had to rank for the city name and give each of those searches a page that ends in a reason to get in touch.',
    action:
      'We built an 81-page static site on Cloudflare on the exact-match domain: eleven neighborhood guides from El Cid to Northwood and fifty-nine condo building profiles, each written for the people who search that name, with an inquiry form on every guide. RealEstateAgent and Person markup name the agent and service area, and each condo profile is marked up as an ApartmentComplex with its address and coordinates. A property search leads the homepage, sellers get a free market analysis, and five tap-to-call points and GA4 are in place.',
    result:
      'westpalmbeachfloridarealestate.com is live with 81 pages: 11 neighborhood guides and 59 condo profiles, each with a way to reach the agent.',
    proof: [
      '11 neighborhood guides, El Cid to Northwood',
      '59 condo building profiles',
      'RealEstateAgent, Person and ApartmentComplex markup',
      'An inquiry form on every guide',
    ],
    services: ['Website design and build', 'Neighborhood guides', 'Condo building profiles', 'Structured data', 'Lead capture', 'GA4 setup'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'south-florida-real-estate-voice',
    client: 'South Florida Real Estate Voice',
    kind: 'Website build',
    vertical: 'Real Estate & Finance',
    industry: 'New-construction buyer representation',
    location: 'Miami-Dade, Broward and Palm Beach, Florida',
    summary: 'A directory of 56 South Florida pre-construction condo and townhome developments, a page for each, built to reach buyers before they walk into a sales gallery.',
    constraint:
      'Pre-construction buyers usually start at the developer\'s sales gallery. To offer independent buyer representation, the site had to be where buyers research developments first, which means a credible page for every project across three counties.',
    action:
      'We built a 74-page static site on Vercel with a page per development and area pages for nine cities and counties, each with its own WebP imagery and share card. CollectionPage (with an ItemList of all 56 developments), RealEstateAgent and Person markup describe the directory, the agent and the author. Images below the first screen lazy-load, so the directory stays fast, and GA4 runs on every page alongside four tap-to-call points and an inquiry form.',
    result:
      'southfloridarealestatevoice.com is live with 56 developments across three counties, each on its own page.',
    proof: [
      '56 developments, a page for each',
      '74 pages, including 9 city and county area pages',
      'CollectionPage, RealEstateAgent and Person markup',
      'GA4 on every page',
    ],
    services: ['Website design and build', 'Development directory', 'Structured data', 'GA4 setup'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'zippy-title',
    client: 'ZippyTitle',
    kind: 'Website build',
    vertical: 'Real Estate & Finance',
    industry: 'Title company',
    location: 'Florida',
    summary: 'A fast, credible front door for a digital title company, with a second domain folded in without splitting its search signal.',
    constraint:
      'ZippyTitle sells digital title searches, e-closing and title insurance, and holds two domains, zippytitle.com and titlezipnow.com. Two copies of one site compete with each other in search, and a title company has to look trustworthy at first glance.',
    action:
      'We built a static site on Cloudflare served on both domains, with titlezipnow.com canonicalized to zippytitle.com so the ranking signal stays in one place. Organization markup and one clear order-a-title form keep the path short, and a Content-Security-Policy header is enforced on every response.',
    result:
      'zippytitle.com is live at under 11 KB of HTML, with both domains consolidating to one canonical site.',
    proof: [
      'Two domains, one canonical site',
      'One order-a-title form',
      'Content-Security-Policy enforced',
      'Under 11 KB of HTML',
    ],
    services: ['Website design and build', 'Domain consolidation', 'Structured data', 'Security headers'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'zippy-title-loans',
    client: 'Zippy Title Loans',
    kind: 'Website build',
    vertical: 'Real Estate & Finance',
    industry: 'Hard-money lender',
    location: 'Florida',
    summary: 'A single-path site that qualifies Florida real estate investors and moves them to a two-minute loan application.',
    constraint:
      'Investors shopping for hard-money loans compare lenders quickly. The site had to state the terms that matter (apply in under two minutes, a decision within 24 hours, close in as little as seven days) and keep the application within reach at every point on the page.',
    action:
      'We built a static site on Cloudflare with a single application path repeated at every scroll depth, FinancialService markup that matches the offer on the page, lazy-loaded images, and a Content-Security-Policy enforced. The client holds the domain and the code.',
    result:
      'zippytitleloans.com is live at under 10 KB of HTML, with one path from landing to application.',
    proof: [
      'One application path at every scroll depth',
      'FinancialService markup',
      'Under 10 KB of HTML',
      'Client owns the domain and code',
    ],
    services: ['Website design and build', 'Structured data', 'Security headers'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'splendid-limo',
    client: 'Splendid Limo & Transportation',
    kind: 'Website build',
    vertical: 'Local Service',
    industry: 'Luxury chauffeured transportation',
    location: 'Miami to West Palm Beach, Florida',
    summary: 'A site built to turn more than 400 five-star Google reviews into bookings, with the review count in the first screen.',
    constraint:
      'Splendid Limo had already earned its reputation on Google, with more than 400 five-star reviews. Its own website needed to look as polished as the fleet and turn that reputation into bookings from the site itself.',
    action:
      'We built an eight-page static site on Vercel marked up as a LimousineService, the schema.org type Google has for the category. The fleet is presented in lazy-loaded WebP with a custom social card, the review count sits in the first screen, and eight tap-to-call points and a booking form make the next step obvious.',
    result:
      'splendidlimo.com is live at 35 KB of HTML, with its Google reputation on the first screen.',
    proof: [
      '400+ five-star Google reviews, in the first screen',
      'LimousineService markup',
      '8 tap-to-call points and a booking form',
      '35 KB of HTML',
    ],
    services: ['Website design and build', 'Structured data', 'Booking form'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'junk-removal-service-usa',
    client: 'Junk Removal Service USA',
    kind: 'Website build',
    vertical: 'Local Service',
    industry: 'Junk removal and light demolition',
    location: 'Miami-Dade, Broward and Palm Beach, Florida',
    summary: 'A 106-page site with a page for every city and service across three counties, where the quote is a phone call.',
    constraint:
      'Junk removal is searched city by city and service by service, and the customer usually wants a price the same day. The site needed a page for each search worth ranking for, and nothing standing between the visitor and a quote.',
    action:
      'We built a 106-page Next.js site on Vercel: a page per city from Tequesta to Weston, eleven demolition pages, eight service pages, six drop-off guides and a twelve-article guide library. LocalBusiness markup carries the service area, share images are generated per page, five tap-to-call points take the place of a quote form, and a Content-Security-Policy is enforced on every response.',
    result:
      'junkremovalserviceusa.com is live with 106 pages across three counties.',
    proof: [
      '106 pages: cities, services, demolition, drop-off guides',
      'A page per city from Tequesta to Weston',
      'LocalBusiness markup with service area',
      'The quote is the phone number: 5 tap-to-call points',
    ],
    services: ['Website design and build', 'City and service pages', 'Guide library', 'Structured data', 'Security headers'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'millers-marketing-group',
    client: "Miller's Marketing Group",
    kind: 'Website build',
    vertical: 'Consumer & Technology',
    industry: 'Business networking events',
    location: 'Florida',
    summary: 'A site that sells the room: networking events for Florida\'s personal injury professionals made findable and bookable, with event markup Google can list.',
    constraint:
      'Miller\'s Marketing Group runs curated networking events for Florida\'s personal injury attorneys, medical providers and partners, so the site has two jobs: make each upcoming event easy to find and register for, and make the brand feel the way the events do.',
    action:
      'We built a static site on Vercel with ProfessionalService and BusinessEvent markup, so upcoming events are structured the way Google lists events. Thirty-eight images, each described for screen readers or marked decorative, and a dedicated social card carry the brand. Register and inquire forms, three tap-to-call points and GA4 are in place, and a Content-Security-Policy is enforced.',
    result:
      'millersmarketinggroup.com is live with event markup on its upcoming events and GA4 in place.',
    proof: [
      'BusinessEvent markup on upcoming events',
      '38 images, each described or marked decorative',
      'Register and inquire forms',
      'Content-Security-Policy enforced',
    ],
    services: ['Website design and build', 'Event markup', 'Registration forms', 'GA4 setup', 'Security headers'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'kiss-selfcare',
    client: 'Kiss Selfcare',
    kind: 'Website build',
    vertical: 'Consumer & Technology',
    industry: 'Skincare brand',
    location: 'USA',
    summary: 'A brand site for a pharmacist-formulated, plant-based skincare line that looks like the product and loads like a landing page.',
    constraint:
      'Kiss Selfcare\'s pitch is more actives and fewer steps. The site needed the same restraint: product imagery that does the selling, and nothing that slows the first screen.',
    action:
      'We built a static site on Cloudflare at kiss.care, now fifteen pages: a page per product (five), an ingredients page and an FAQ, with thirty lazy-loaded WebP product images, a custom share image, Organization markup, canonical URLs and a sitemap. A Content-Security-Policy is enforced and GA4 runs on every page.',
    result:
      'kiss.care is live with 15 pages at 21 KB of HTML for the homepage.',
    proof: [
      '15 pages, including 5 product pages',
      '30 lazy-loaded WebP product images',
      'Content-Security-Policy enforced',
      '21 KB of HTML',
    ],
    services: ['Website design and build', 'Product pages', 'Product imagery', 'Technical SEO', 'Security headers', 'GA4 setup'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
  {
    slug: 'hello-viki',
    client: 'Hello Viki AI',
    kind: 'Website build',
    vertical: 'Consumer & Technology',
    industry: 'AI-powered remote assistants',
    location: 'USA',
    summary: 'One brand speaking to doctors and lawyers, and recruiting the assistants who serve them, on a single 15-page site.',
    constraint:
      'Hello Viki sells AI-powered remote assistants to two different buyers, medical practices and law firms, and has to recruit the assistants as well. It also holds two domains, helloviki.com and helloviki.ai.',
    action:
      'We built a 15-page static site on Cloudflare with audience pages for doctors, lawyers and personal injury firms, a free-trial path for buyers and seven careers pages for recruits. helloviki.ai serves the same site with its canonical pointing at helloviki.com, Organization and breadcrumb markup are in place, and a Google Tag Manager container is installed.',
    result:
      'helloviki.com is live, serving buyers and recruits from one brand across two domains.',
    proof: [
      'Audience pages for doctors, lawyers and PI firms',
      '7 careers pages for recruiting',
      'Two domains, one canonical site',
      'Google Tag Manager installed',
    ],
    services: ['Website design and build', 'Audience pages', 'Careers pages', 'Domain consolidation', 'Google Tag Manager setup'],
    source: WEBSITE_SOURCE,
    published: '2026-10-24',
  },
  {
    slug: 'rock-the-treatment-mobile',
    client: 'Rock The Treatment',
    kind: 'Website build',
    vertical: 'Consumer & Technology',
    industry: 'Chemo and radiation care packages',
    location: 'USA',
    summary: 'A 10 KB mobile storefront built beside an existing WooCommerce store, so phone shoppers get a page that opens instantly.',
    constraint:
      'Rock The Treatment sells curated chemo and radiation care packages from a WooCommerce store whose homepage weighs about 556 KB. The brief was not to rebuild the store; it was to give phone shoppers a fast way in.',
    action:
      'We built a static, mobile-first storefront on Vercel at m.rockthetreatment.com, served from the edge with lazy-loaded product images. Its canonicals point back at the main shop, so it adds speed without creating duplicate content, and Google Tag Manager is installed so its visits are measured.',
    result:
      'm.rockthetreatment.com is live at about 10 KB of HTML, beside the 556 KB WordPress homepage it complements.',
    proof: [
      '10 KB page beside a 556 KB store homepage',
      'Canonicals point at the main shop',
      'Google Tag Manager installed',
      'No rebuild of the existing store',
    ],
    services: ['Mobile storefront design and build', 'Technical SEO', 'Tag Manager setup'],
    source: WEBSITE_SOURCE_REAUDIT,
    published: '2026-10-24',
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
