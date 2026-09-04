/**
 * Thin wrapper over the GTM dataLayer.
 *
 * Every call is a no-op until NEXT_PUBLIC_GTM_ID is set and the container
 * loads, so tracking calls are safe to leave in place before GTM is
 * configured — same pattern as the optional integrations in /api/lead.
 *
 * The dataLayer global is declared by @next/third-parties, so this reaches it
 * through a local cast rather than re-declaring it and clashing with that type.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}
