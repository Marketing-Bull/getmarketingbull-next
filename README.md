# getmarketingbull.com

Marketing website for **Marketing Bull, LLC** — fixed-price growth products for law firms and medical practices.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npx tsc --noEmit   # typecheck (this is the real check — there is no lint config or test suite)
```

## Where things live

| You want to change… | Edit |
|---|---|
| **A product, its price, scope, FAQ, or process** | `src/lib/constants.ts` → `OFFERS`. This is the single source of truth; the homepage, `/pricing`, `/products/*`, nav, footer, and schema all read from it. |
| **Buy buttons → Stripe** | `src/lib/constants.ts` → `CHECKOUT_LINKS`. Paste Stripe Payment Link URLs. While a link is empty the button sends people to the consult form instead, so nothing breaks. |
| Company info, phone, address, socials | `src/lib/constants.ts` → `COMPANY` |
| Navigation | `src/lib/constants.ts` → `NAV_LINKS` |
| Testimonials | `src/lib/constants.ts` → `TESTIMONIALS` |
| Blog posts | `src/lib/blog.ts` → `POSTS` (hardcoded TS, no CMS) |
| Case studies | `src/app/case-studies/page.tsx` |
| Homepage | `src/app/page.tsx` |
| Site-wide `<head>`, nav, footer | `src/app/layout.tsx` (Header/Footer render here for every page) |
| Lead form behavior | `src/components/ContactForm.tsx` + `src/app/api/lead/route.ts` |

## Routes

```
/                          homepage
/pricing                   all three products
/products/[slug]           website-in-14-days · intake-gap-audit · ai-content-engine
/free-consultation         book a call (accepts ?product=<slug>)
/services, /services/law-firms, /services/medical, /services/intake-optimization
/about-us /case-studies /blog /blog/[slug] /careers /contact-us
/privacy-policy /terms-of-service /accessibility
/api/lead                  POST — lead form endpoint
```

## Lead form

`ContactForm` POSTs to `/api/lead`, which validates, drops bot submissions (honeypot), and delivers to whatever is configured:

- `LEAD_WEBHOOK_URL` — GoHighLevel inbound webhook (or Zapier/Make/n8n)
- `RESEND_API_KEY` (+ `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`) — emails the lead

See `.env.example`. Set these in Vercel → Settings → Environment Variables. **With neither set, leads are only written to the function log** — fine for previews, not for production.

## Deploying

The Vercel project is `getmarketingbull-next` (team `marketing-bull`). Pushing a branch should create a preview deployment automatically once the GitHub integration is connected (Vercel → project → Settings → Git). Production deploys from the production branch set there.

Before pointing `getmarketingbull.com` at Vercel:

1. Confirm prices in `OFFERS`.
2. Add Stripe Payment Links to `CHECKOUT_LINKS`.
3. Set lead-delivery env vars.
4. Add the domain in Vercel and move DNS from the old WordPress host.

## Conventions

- `@/*` → `./src/*`
- Pages are server components exporting `metadata`. Anything interactive is `'use client'`.
- Dynamic route params are Promise-typed: `{ params }: { params: Promise<{ slug: string }> }`.
- `tsconfig` is strict with `noUnusedLocals` — unused imports fail the typecheck.
- JSON-LD helpers in `src/lib/schema.ts` (Organization on every page, Service + FAQ on product pages).
- `images.unoptimized: true`; plain `<img>` is fine.
- `.context/` is local-only reference material (gitignored).
