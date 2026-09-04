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
    schema.ts            organizationSchema, offerSchema(), faqSchema()
    blog.ts              POSTS (hardcoded)
```

## Rules

- **Offers, nav, and testimonials are data in `src/lib/constants.ts`.** Don't hardcode them in pages.
- **Pricing is not published.** Fees are quoted per firm, so no page, OG image, metadata title, or JSON-LD may carry a dollar figure for an engagement. `Offer` has no `price`/`priceLabel`/`billing` field and `offerSchema()` deliberately emits no `Offer`/`price` node — adding one back would make the markup contradict the page. "Fixed scope, fixed price" (agreed before we start) is the claim; "published price" is not.
- Header and Footer render from `layout.tsx`. Don't inline nav/footer markup in pages.
- Keep `'use client'` off pages; put interactivity in components.
- Dynamic params are Promise-typed (`await params`, `await searchParams`).
- Strict TS with `noUnusedLocals` — unused imports break the build.
- Verticals are Law Firms and Medical Practices only. Home Services was deliberately removed; don't reintroduce it.
- Mystery-shop language in the Intake Gap Audit must not promise recordings (Florida all-party consent). Keep "scored", not "recorded".
- `.context/` is gitignored reference material. `.claude/settings.local.json` is personal.

## Env

See `.env.example`. `LEAD_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`.
