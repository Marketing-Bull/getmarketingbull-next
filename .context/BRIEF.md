# GetMarketingBull.com — Build Brief

## What You're Building
A marketing agency website for Marketing Bull (getmarketingbull.com). Next.js 14+ App Router, Tailwind CSS, deployed to Cloudflare Pages.

## Brand
- **Company:** Marketing Bull, LLC
- **Tagline:** "Helping You Grow Your Business, One Customer At A Time"
- **Colors:** Primary blue (#1a56db or similar royal blue from current site), white, dark gray/black text
- **Logo:** Red bull icon (will be added later as image — use placeholder text "Marketing Bull" with a 🐂 emoji for now)
- **Phone:** 1-833-GET-BULL (1-833-438-2855)
- **Email:** hello@getmarketingbull.com
- **Address:** 319 Clematis Street, Suite 300, West Palm Beach, FL 33401
- **Verticals:** Law Firms (primary), Medical Offices, Home Services

## Design Direction
- Professional, modern, trustworthy — this sells to law firm partners and medical practice owners
- Clean hero sections with strong CTAs
- Testimonial carousels
- Stats/numbers that pop (e.g., "25% revenue increase")
- Mobile-first responsive
- Dark navy/blue hero sections with white text, white content sections
- Subtle animations (fade-in on scroll)

## Tech Stack
- Next.js 14+ (App Router, static export for Cloudflare Pages)
- Tailwind CSS
- TypeScript
- next-sitemap for sitemap.xml
- Schema markup via JSON-LD in head
- Blog: MDX files in /content/blog/
- Case studies: MDX files in /content/case-studies/

## READ THESE FILES FOR FULL CONTEXT:
1. `.context/BUILD-PLAN.md` — full site map, SEO requirements, keyword targets
2. `.context/scraped-content.md` — all existing page content (use this as starting copy)
3. `.context/agent-skills/` — coding guidelines for React, Next.js, a11y, SEO, performance

## Pages to Build (Priority Order)

### Phase 1 — Core (build these first)
1. Layout (header nav + footer) — shared across all pages
2. Homepage (/)
3. About Us (/about-us)
4. Services overview (/services)
5. Services for Law Firms (/services/law-firms)
6. Services for Medical (/services/medical)
7. Contact Us (/contact-us)
8. Free Consultation (/free-consultation)

### Phase 2 — New Service Pages
9. /services/intake-optimization — HIGHEST SEO PRIORITY
10. /services/lead-generation
11. /services/bpo-staffing
12. /services/call-centers
13. /services/ppc-management
14. /services/analytics-reporting
15. /services/home-services

### Phase 3 — Content & Local
16. Blog index + 3 existing posts (MDX)
17. Case studies index + top 5 case studies
18. /miami, /fort-lauderdale, /west-palm-beach (city pages)

### Phase 4 — Legal & Utility
19. /terms-of-service
20. /privacy-policy
21. /accessibility
22. /thank-you

## Key Components to Create
- `<Header />` — sticky nav with mega menu (How We Help, Who We Help, About dropdown)
- `<Footer />` — 4-column footer with links, social, contact
- `<Hero />` — reusable hero section (title, subtitle, CTA buttons, optional background)
- `<ServiceCard />` — icon, title, description, link
- `<TestimonialCarousel />` — rotating testimonials with star ratings
- `<CTASection />` — call-to-action banner (reused across pages)
- `<ContactForm />` — name, email, phone, message, SMS consent checkbox
- `<StatCounter />` — animated number stats (e.g., "30+ new patients/month")
- `<FAQAccordion />` — collapsible FAQ with schema markup
- `<Breadcrumbs />` — auto-generated from route
- `<SchemaMarkup />` — JSON-LD injection component

## SEO Requirements (CRITICAL)
- Every page needs unique <title> and meta description
- Organization schema on every page
- LocalBusiness schema on homepage + contact
- FAQ schema on pages with FAQ sections
- BreadcrumbList schema sitewide
- Open Graph + Twitter cards
- Canonical URLs
- Sitemap.xml auto-generated

## Content Notes
- Use scraped content from `.context/scraped-content.md` as the baseline
- For new pages (intake-optimization, lead-generation, etc.), write professional placeholder content that's SEO-relevant — Alex will refine later
- Homepage needs 500+ words, service pages need 1,500+ words
- Testimonials are in the scraped content — reuse them as a shared component
