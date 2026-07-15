# CLAUDE.md

## Project

Marketing website for Marketing Bull, LLC (a marketing agency in West Palm Beach, FL) — a static, content-driven Next.js App Router site. No backend, no database, no API routes.

## Stack

- **Next.js 16.1.6**, App Router (`src/app`)
- **React 19.2.4**, **TypeScript 5.9.3** (`"type": "module"`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config, no `tailwind.config.ts` (only a stale `tailwind.config.ts.v3bak`). Theme/utilities live in `src/app/globals.css` (`@import "tailwindcss"`).
- **lucide-react 1.8.0** for icons
- Deployed via **Vercel** (`.vercel/project.json` → project `getmarketingbull-next`)

## Commands

```bash
npm install       # node_modules may be incomplete; run this first
npm run dev       # next dev — port 3000
npm run build     # next build
npm run start     # next start (serve production build)
npx tsc --noEmit  # typecheck (no script for this, but it's the real check)
```

- **No tests.** No test script, runner, or test files exist. Don't invent one.
- **`npm run lint` is not usable as-is** — the script is `next lint`, but there is no ESLint config anywhere in the repo and `eslint` is not in `dependencies`. Use `tsc --noEmit` for verification instead.

## Layout

```
src/
  app/                    # App Router — one directory per route, each with page.tsx
    layout.tsx            # Root layout: metadata, Inter via <link>, JSON-LD
    page.tsx              # Homepage ('use client', ~large single file)
    globals.css           # Tailwind import + .container-md helper
    about-us/ accessibility/ blog/ careers/ case-studies/
    contact-us/ free-consultation/ privacy-policy/ terms-of-service/
    services/             # + intake-optimization/ law-firms/ medical/ home-services/
    blog/[slug]/page.tsx  # generateStaticParams over POSTS
  components/             # Button, CTASection, ContactForm, FAQAccordion,
                          # Hero, TestimonialCarousel (+ unused: Header, Footer, ServiceCard)
  lib/
    blog.ts               # ALL blog content — POSTS array + Section union type
    constants.ts          # COMPANY, TESTIMONIALS, NAV_LINKS (currently unused)
    schema.ts             # organizationSchema (currently unused)
public/                   # logo.png, team photos (oleg.webp, yossi.png, alex.webp)
```

## Conventions

- Import via the `@/*` alias → `./src/*`. Used consistently (`@/components/Hero`, `@/lib/blog`).
- Pages are server components exporting `export const metadata: Metadata`. Interactive pieces are marked `'use client'` (page.tsx, ContactForm, FAQAccordion, Header, TestimonialCarousel).
- Dynamic route params are **Promise-typed** (Next 15+ style): `{ params }: { params: Promise<{ slug: string }> }`, then `await params`.
- Blog posts are hardcoded TypeScript in `src/lib/blog.ts` — no CMS, no MDX. Content is a `Section[]` discriminated union (`p | h2 | h3 | ul | ol | callout | stat-row`). To add a post, append to `POSTS`; `generateStaticParams` picks it up automatically.
- JSON-LD is inlined per-page via `dangerouslySetInnerHTML`, not through `lib/schema.ts`.
- `tsconfig.json` is strict and includes `noUnusedLocals` / `noUnusedParameters` — unused imports break the typecheck.
- Fonts: Inter is loaded via a Google Fonts `<link>` in `layout.tsx`, not `next/font`.
- `images.unoptimized: true` in `next.config.ts`. Most images are plain `<img>`; only `about-us/page.tsx` uses `next/image`.

## Gotchas

- **README.md is stale.** It claims `output: 'export'` and a `/mb-preview/` basePath. Neither is in the current `next.config.ts` — the config only sets `reactStrictMode` and `images.unoptimized`. Trust `next.config.ts`, not the README.
- **`src/app/layout.tsx` is branded for a different site.** Root metadata, OpenGraph, and JSON-LD all say "PI Intake Growth" / `piintakegrowth.com`, while every page, component, and canonical URL says Marketing Bull / `getmarketingbull.com`. Confirm intent before "fixing" either side.
- **`Header.tsx`, `Footer.tsx`, and `ServiceCard.tsx` are imported by nothing.** Pages inline their own nav/footer markup. `lib/constants.ts` and `lib/schema.ts` are only referenced by those dead components, so they are effectively unused too. Editing them changes nothing on the site.
- Header/Footer also hardcode `/mb-preview/logo.png` — a leftover from a basePath that no longer exists.
- **`ContactForm.tsx` does not submit anywhere.** `handleSubmit` only sets local state; there's a `// TODO: Wire to GHL webhook`.
- `tsconfig.json` has `"references": [{ "path": "./tsconfig.node.json" }]` but that file does not exist.
- `src/app/page-full.tsx.bak` is a dead backup file, not a route.
- `.context/` is gitignored and local-only — it holds build briefs and design/SEO guidance docs. Useful background, but treat as reference, not spec.
- `.claude/settings.local.json` is gitignored (personal); the rest of `.claude/` is shared and committed.
