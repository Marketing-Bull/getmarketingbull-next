# CLAUDE.md

## Project

Marketing website for Marketing Bull, LLC — a content-driven Next.js App Router site with one API route (`/api/lead`). No database.

## Stack

Next.js 16, React 19, TypeScript 5.9 (`"type": "module"`), Tailwind CSS v4 via `@tailwindcss/postcss` (CSS-first; theme lives in `src/app/globals.css`), lucide-react. Deployed on Vercel (project `getmarketingbull-next`).

## Commands

```bash
npm install
npm run dev
npm run build
npx tsc --noEmit   # the real verification step; no tests, no usable lint config
```

## Layout

```
src/
  app/
    layout.tsx           root layout: metadata, Inter, Organization JSON-LD, <Header/> + <Footer/>
    page.tsx             homepage (server component)
    engagements/         all three engagements (was /pricing; 301 kept in next.config.ts)
    products/[slug]/     product pages, generateStaticParams over OFFERS
    free-consultation/   consult form; reads ?product= (dynamic)
    api/lead/route.ts    lead endpoint: validate → webhook and/or Resend email
    services/ about-us/ case-studies/ blog/ careers/ contact-us/ legal pages
  components/            Header, Footer, Hero, Button, CTASection, ContactForm,
                         OfferCard, OfferCTA, Reveal, FAQAccordion, TestimonialCarousel
  lib/
    constants.ts         COMPANY, OFFERS, NAV_LINKS, TESTIMONIALS — single source of truth
    schema.ts            organizationSchema, offerSchema(), faqSchema(),
                         breadcrumbSchema(), caseStudySchema(), personSchema()
    blog.ts              POSTS (hardcoded)
```

## Rules

- **Offers, nav, and testimonials are data in `src/lib/constants.ts`.** Don't hardcode them in pages.
- **Pricing is not published.** Fees are quoted per firm, so no page, OG image, metadata title, or JSON-LD may carry a dollar figure for an engagement. `Offer` has no `price`/`priceLabel`/`billing` field and `offerSchema()` deliberately emits no `Offer`/`price` node — adding one back would make the markup contradict the page. "Fixed scope, fixed price" (agreed before we start) is the claim; "published price" is not.
- Header and Footer render from `layout.tsx`. Don't inline nav/footer markup in pages.
- Keep `'use client'` off pages; put interactivity in components.
- Dynamic params are Promise-typed (`await params`, `await searchParams`).
- Strict TS with `noUnusedLocals` — unused imports break the build.
- **A `breadcrumbSchema()` trail must match the visual breadcrumb on the same page.** Markup that disagrees with the page is worse than none.
- `logo.png` (96KB, 783x506) is for OG images and `organizationSchema` only. The DOM uses `logo-mark.webp` (3.7KB) — don't point an `<img>` back at the PNG to render a 32px mark.
- Verticals are Law Firms and Medical Practices only. Home Services was deliberately removed; don't reintroduce it.
- Mystery-shop language in the Intake Gap Audit must not promise recordings (Florida all-party consent). Keep "scored", not "recorded".
- `.context/` is gitignored reference material. `.claude/settings.local.json` is personal.

## Analytics

GA4 loads directly via `@next/third-parties` using `GA_MEASUREMENT_ID` in `constants.ts` (a measurement id is public, not a secret). Vercel Analytics runs alongside it for cookieless traffic. GTM is supported but unset.

- **Never run GA4 both directly and inside a GTM container** — that double-counts every pageview and event. If a container is adopted, move GA4 into it and unset `NEXT_PUBLIC_GA_ID`.
- `track()` in `src/lib/analytics.ts` sends both a `dataLayer` push (for GTM) and a `gtag('event')` call (for GA4 direct). A bare `dataLayer` push is **not** a GA4 event — dropping the gtag call silently breaks conversion tracking.
- Conversions: `lead_submit` on form success, `phone_click` from the delegated listener in `CallTracking`.

## Env

See `.env.example`. `LEAD_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`.
