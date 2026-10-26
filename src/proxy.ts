import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sends /Recoup, /KeyVault and other capitalised forms of the app pages to their
 * lowercase URLs. This can't be a redirect in next.config.ts: those match paths
 * case-insensitively, so '/Recoup' -> '/recoup' would also catch '/recoup' and loop.
 * The matcher keeps this proxy off every other request; the lowercase URLs pass through.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

// Matchers are case-sensitive, so each letter takes either case.
export const config = {
  matcher: ['/:slug([Rr][Ee][Cc][Oo][Uu][Pp]|[Kk][Ee][Yy][Vv][Aa][Uu][Ll][Tt])'],
};
