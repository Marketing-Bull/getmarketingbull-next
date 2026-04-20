# Marketing Bull — Next.js Website

Marketing Bull's website built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Inter (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Project Structure

```
src/
  app/           # App Router pages and layouts
    page.tsx     # Homepage
    layout.tsx   # Root layout
    globals.css  # Global styles
  components/    # Reusable React components
  lib/           # Utility functions
public/          # Static assets (images, fonts)
```

## Deployment

The site is configured for static export (`output: 'export'`). Build outputs to `out/`.

Preview URL path: `/mb-preview/`

## Notes

- Images live in `public/`
- Set `basePath` in `next.config.ts` when deploying to a subdirectory
- Production deployment via Cloudflare Pages or any static host
