/**
 * Reports a conversion to whichever measurement path is live.
 *
 * Two different dialects, because the two paths do not understand each other:
 *   - dataLayer.push({ event }) is what a GTM container triggers on.
 *   - gtag('event', …) is what GA4 records when gtag.js is loaded directly.
 * A bare dataLayer push does NOT become a GA4 event, so both are sent. Whichever
 * path is not configured simply is not listening, and the call costs nothing.
 *
 * Both globals are declared by @next/third-parties, so this reaches them through
 * a local cast rather than re-declaring them and clashing with those types.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.('event', event, params);
}
