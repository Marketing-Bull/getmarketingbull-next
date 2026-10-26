# CLAUDE.md

## Project

Marketing website for Marketing Bull, LLC — a content-driven Next.js App Router site with one API route (`/api/lead`). No database.

## Stack

Next.js 16, React 19, TypeScript 5.9 (`"type": "module"`), Tailwind CSS v4 via `@tailwindcss/postcss` (CSS-first; theme lives in `src/app/globals.css`). Deployed on Vercel (project `getmarketingbull-next`).

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
    engagements/         every engagement in OFFERS (was /pricing; 301 kept in next.config.ts)
    products/[slug]/     product pages, generateStaticParams over OFFERS
    free-consultation/   consult form; reads ?product= (dynamic)
    get-started/         same page, static: the A2P SMS opt-in URL registered with TCR (no redirect)
    api/lead/route.ts    lead endpoint: validate → webhook and/or Resend email
    websites/            gallery of every site we have built, from PORTFOLIO in lib/portfolio.ts
    resources/           free downloads from RESOURCES in lib/resources.ts; files in public/resources/
    services/ about-us/ case-studies/ blog/ careers/ contact-us/ legal pages
  components/            Header, Footer, Button, CTASection, ContactForm, ConsultationPage, Turnstile, OfferCard,
                         OfferCTA, Reveal, TestimonialCarousel, VerticalPage, CallTracking, DeferredAnalytics
  lib/
    constants.ts         COMPANY, OFFERS, NAV_LINKS, TESTIMONIALS — single source of truth
    schema.ts            organizationSchema, offerSchema(), faqSchema(),
                         breadcrumbSchema(), caseStudySchema(), personSchema(), portfolioSchema()
    metadata.ts          pageMeta(): canonical + og:url (+ og:type article) per page
    alert.ts             sendAlert(): email/Slack alert when a lead is lost or partly delivered
    blog.ts              POSTS (hardcoded)
    portfolio.ts         PORTFOLIO: the client sites on /websites, facts read from each live site (no traffic or rankings)
    resources.ts         RESOURCES: /resources entries; skills are copied from the private claude-skills repo
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
- **SMS opt-in wording is registered with the carriers (A2P 10DLC / TCR).** `SMS_CONSENT_LABEL` (checkbox label) and `SMS_OPT_IN_CONFIRMATION` (text sent after an opted-in submit) in `constants.ts` must stay word for word; the checkbox stays optional and unchecked by default, with Privacy Policy and Terms links beside the form. `/get-started` is the registered opt-in URL and must answer 200, not redirect. The SMS sections of the privacy policy and terms are part of the same review.
- **A Content-Security-Policy is enforced (`next.config.ts`).** Any new third-party script, iframe, image host or API the browser calls (an ad tag, a chat widget, an embed, a tag added inside a future GTM container) must have its origins added to `CSP` in the same change, or it is silently blocked in production. `script-src` keeps `'unsafe-inline'` on purpose: nonces would force every page to render dynamically.
- Mystery-shop language in the Intake Gap Audit must not promise recordings (Florida all-party consent). Keep "scored", not "recorded".
- `.context/` is gitignored reference material. `.claude/settings.local.json` is personal.

## Analytics

GA4 loads from Google's canonical gtag snippet, server-rendered into `<head>` in `layout.tsx`, using `GA_MEASUREMENT_ID` in `constants.ts` (a measurement id is public, not a secret). Vercel Analytics runs alongside it for cookieless traffic, mounted after load and browser idle by `DeferredAnalytics`. GTM is supported but unset.

`NEXT_PUBLIC_GTM_ID` is the switch between the two paths. Unset (today): the gtag snippet renders and GTM does not. Set: `layout.tsx` renders GTM and drops the gtag snippet, so GA4 must be configured as a tag inside the container. `NEXT_PUBLIC_GA_ID` only picks the property for the direct snippet (empty falls back to the hardcoded id); it does not switch GA off.

- **Keep the gtag snippet server-rendered. Do not replace it with `<GoogleAnalytics>` from `@next/third-parties`.** That component uses `next/script` with `afterInteractive`, so the served HTML carries only a `<link rel="preload">` and the tag is injected after hydration — GA silently collected nothing until this was found. The two `<script>` tags in `<head>` are deliberate, not an oversight to tidy up.
- GA4's origins are in the CSP (`GOOGLE_ANALYTICS` in `next.config.ts`). Tags added through a GTM container (Google Ads, Meta…) need their origins added there too.
- **Never run GA4 twice.** The snippet plus `<GoogleAnalytics>`, or the snippet plus a GA4 tag inside a GTM container, doubles every pageview and event. If a container is adopted, move GA4 into it; setting `NEXT_PUBLIC_GTM_ID` removes the snippet.
- `track()` in `src/lib/analytics.ts` sends both a `dataLayer` push (for GTM) and a `gtag('event')` call (for GA4 direct). A bare `dataLayer` push is **not** a GA4 event — dropping the gtag call silently breaks conversion tracking.
- Conversions: `lead_submit` on form success, `generate_lead` (`form_name: pi_intake_scorecard`) on scorecard form success, `phone_click` from the delegated listener in `CallTracking`.
- Ad-platform conversions (Google Ads, Meta, LinkedIn) live in `src/lib/conversions.ts`, off until configured and guarded so they no-op when a tag isn't loaded. Don't enable one there AND as a GTM tag.
- **Ahrefs Web Analytics** loads late on purpose: an inline loader in `layout.tsx` injects `analytics.js` after `load` and browser idle, using `AHREFS_ANALYTICS_KEY` in `constants.ts`. Don't move it to a plain `<script async>` in `<head>`; that puts it back in the critical path. Its origin is `AHREFS` in the CSP.

## Env

See `.env.example`. `LEAD_GHL_API_KEY`, `LEAD_GHL_LOCATION_ID`, `LEAD_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, `LEAD_ALERT_EMAIL`, `LEAD_ALERT_WEBHOOK_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`.
