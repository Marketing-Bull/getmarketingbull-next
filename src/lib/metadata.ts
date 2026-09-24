import type { Metadata } from 'next';
import { COMPANY } from './constants';

/**
 * The sitewide share image, served by src/app/opengraph-image.tsx. Named here so a
 * page-level openGraph object can carry it: without it, pages that have no
 * opengraph-image of their own would lose og:image (and twitter:image) entirely.
 */
export const SITE_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Marketing Bull — growth consultancy for law firms and medical practices',
};

/** Sitewide Open Graph fields. The root layout and every page share this object. */
export const OG_BASE = {
  siteName: COMPANY.name,
  locale: 'en_US',
  images: [SITE_OG_IMAGE],
};

interface PageMetaInput {
  /** Site-relative path, e.g. '/engagements'. '/' is the homepage. */
  path: string;
  title?: Metadata['title'];
  description?: string;
  /** Marks the page og:type article. Dates are ISO strings (YYYY-MM-DD). */
  article?: { publishedTime?: string; modifiedTime?: string };
  /**
   * True when the page's own segment has an opengraph-image file (the homepage,
   * products/[slug], case-studies/[slug]). Config images set on the page would
   * override that file, so the default image is left out and the file supplies it.
   */
  ownOgImage?: boolean;
}

/**
 * Per-page metadata with the canonical and og:url kept in step.
 *
 * A page-level `openGraph` object replaces the layout's rather than merging with it,
 * so siteName, locale and the default image are set here again. og:title and
 * og:description are left out on purpose: Next fills them from the page's own title
 * and description.
 */
export function pageMeta({ path, title, description, article, ownOgImage }: PageMetaInput): Metadata {
  const url = path === '/' ? COMPANY.website : `${COMPANY.website}${path}`;
  const { images, ...ogShared } = OG_BASE;
  const base = ownOgImage ? { ...ogShared, url } : { ...ogShared, images, url };
  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    alternates: { canonical: url },
    openGraph: article
      ? { ...base, type: 'article', ...article }
      : { ...base, type: 'website' },
  };
}
