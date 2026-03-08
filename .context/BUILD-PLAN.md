# GetMarketingBull.com — Next.js Rebuild Plan
**Updated:** Mar 5, 2026 (SEO audit applied)

## Stack
- **Framework:** Next.js (App Router, SSG)
- **Hosting:** Cloudflare Pages
- **Blog:** Markdown files in `/posts/`
- **Styling:** TBD (Tailwind CSS recommended)
- **Tracking:** Meta Pixel + Google Tag (GTM)
- **Domain:** getmarketingbull.com

## Site Map (New — SEO-Optimized)

### Core Pages
- `/` — Homepage (500+ words, keyword-rich)
- `/about-us/` — Team, story, mission, client logos
- `/contact-us/` — Form, address, phone
- `/free-consultation/` — CTA landing page
- `/careers/` — Recruiting

### Services Hub
- `/services/` — Overview of all services
- `/services/intake-optimization/` — 🔴 NEW, #1 priority
- `/services/lead-generation/` — 🔴 NEW
- `/services/bpo-staffing/` — 🔴 NEW
- `/services/call-centers/` — 🔴 NEW
- `/services/ppc-management/` — 🔴 NEW
- `/services/analytics-reporting/` — 🔴 NEW

### Verticals
- `/services/law-firms/` — PI, mass torts, class actions
- `/services/medical/` — Medical offices, spa clinics
- `/services/home-services/` — 🔴 NEW (was missing)

### Local SEO Pages
- `/miami/` — 🔴 NEW
- `/fort-lauderdale/` — 🔴 NEW
- `/west-palm-beach/` — 🔴 NEW

### Content
- `/blog/` — Blog index
- `/blog/[slug]/` — Individual posts (markdown)
- `/case-studies/` — Case study index
- `/case-studies/[slug]/` — Individual case studies

### Lead Generation
- `/intake-scorecard/` — 🔴 NEW, interactive quiz (10 questions, scored 0-100, email gate on results)
  - Spec: `../lead-magnets/intake-scorecard.md`
  - Client-side scoring, GHL webhook on completion, mobile-first
  - Link from: homepage hero, `/services/intake-optimization/`, `/free-consultation/`

### Legal
- `/terms-of-service/`
- `/privacy-policy/`
- `/accessibility/`

### Lead Magnets
- `/intake-scorecard/` — 🔴 NEW, interactive 10-question quiz (client-side scoring, email gate on results, GHL webhook)

### Utility
- `/thank-you/` — Form confirmation
- `/sitemap.xml` — Auto-generated
- `/robots.txt`

## Pages Removed (from old site)
- /webinars/ — empty
- /resources/ — empty
- /get-started/ — merged into /free-consultation/
- /newsletter-signup/ — section on homepage
- /software-license/ — TBD
- /get-more-customers/ — merged into homepage

## SEO Requirements (from Lex audit, MC #396)

### Title Tags (per-page, keyword-rich)
- Home: "Law Firm Marketing & Intake Optimization Agency | Marketing Bull"
- Services: "Marketing, Intake & Lead Gen for Law Firms & Medical | Marketing Bull"
- Law Firms: "Personal Injury Law Firm Marketing & Intake Optimization | Marketing Bull"
- Medical: "Medical Practice Marketing & Patient Acquisition | Marketing Bull"
- Each page gets UNIQUE meta description

### Schema Markup
- Organization — every page
- LocalBusiness — homepage, contact, city pages
- FAQ — service pages with FAQ sections
- Article — blog posts
- Review — testimonials/case studies
- BreadcrumbList — sitewide

### Content Depth Minimums
- Homepage: 500+ words
- Service pages: 1,500+ words each
- Vertical pages: 1,500+ words
- City pages: 800+ words
- Blog posts: 1,000-3,000 words
- Case studies: 500+ words with real metrics

### Technical SEO
- SSG (static HTML) — no JS rendering issues
- Auto sitemap.xml
- Breadcrumb navigation
- Canonical URLs
- Open Graph + Twitter cards
- next/image with WebP/AVIF
- Core Web Vitals optimized (Cloudflare edge)
- 301 redirects from old WordPress URLs

### Target Keywords
| Priority | Keyword | Page |
|----------|---------|------|
| 🔴 P1 | law firm intake optimization | /services/intake-optimization/ |
| 🔴 P1 | personal injury law firm marketing | /services/law-firms/ |
| 🔴 P1 | legal marketing agency Miami | /miami/ |
| 🟠 P2 | law firm intake audit | blog post |
| 🟠 P2 | law firm lead generation | /services/lead-generation/ |
| 🟠 P2 | medical practice marketing agency | /services/medical/ |
| 🟡 P3 | law firm BPO staffing | /services/bpo-staffing/ |
| 🟡 P3 | cost per case personal injury | blog post |
| 🟡 P3 | Google Ads for law firms | blog post |

## Notion Content Page
https://www.notion.so/3150c897e04a810d92d0dfa437a0f044

## Lead Magnet: Intake Scorecard
- **Page:** `/intake-scorecard/`
- **Spec:** `../lead-magnets/intake-scorecard.md`
- **Tech:** Single Next.js page, client-side scoring, email capture before results, POST to GHL webhook
- **Links from:** Homepage hero CTA, `/services/intake-optimization/`, `/free-consultation/`
- **Post-quiz:** 5-email GHL nurture sequence (score-bracket triggered)
- **Promotion:** LinkedIn, MMG networking, email sig, Skool, cold outreach, Meta/Google/LinkedIn ads

## Status
- [x] Scrape current site
- [x] Organize content in Notion
- [x] SEO audit applied to plan
- [x] Intake Scorecard spec written
- [ ] Alex reviews/edits Notion content
- [ ] Scaffold Next.js project
- [ ] Build pages
- [ ] Build intake scorecard quiz
- [ ] Deploy to Cloudflare Pages
- [ ] 301 redirects from old URLs
- [ ] Google Business Profile claim
