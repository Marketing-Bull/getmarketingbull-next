/**
 * Ad-platform conversion hooks for lead forms: Google Ads, Meta and LinkedIn.
 *
 * GA4 is not here. GA4 events go through track() in analytics.ts, which already
 * reaches both the direct gtag snippet and a future GTM container.
 *
 * Every hook is OFF until its placeholder below is filled in, and each call is
 * guarded on the platform's global actually existing, so an enabled hook whose tag
 * is not installed is a silent no-op, never an error. This file loads no scripts:
 * each platform's base tag has to be installed first (see INSTRUCTIONS.md).
 *
 * Pick ONE path per platform. If a platform's tag and conversion are later set up
 * inside GTM (triggered on the `generate_lead` dataLayer event that track() already
 * pushes), leave that platform's hook here switched off, or every lead counts twice.
 */

// Google Ads → Goals → Conversions → [action] → Tag setup → "Use Google tag".
// Paste the send_to value, e.g. 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX'. Empty = off.
// Needs gtag('config', 'AW-XXXXXXXXX') on the page (Google tag, or a Google Ads tag in GTM).
const GOOGLE_ADS_SEND_TO: string = '';

// Set to true once the Meta Pixel base code (fbq('init', '<PIXEL_ID>')) is installed.
const META_PIXEL_ENABLED: boolean = false;

// LinkedIn Campaign Manager → Analyze → Conversion tracking → [conversion] → numeric id,
// e.g. 12345678. 0 = off. Needs the LinkedIn Insight Tag installed.
const LINKEDIN_CONVERSION_ID: number = 0;

/** Reports one lead to every ad platform that is both enabled above and loaded on the page. */
export function reportLeadConversion({ formName }: { formName: string }): void {
  if (typeof window === 'undefined') return;
  // Local cast, as in analytics.ts: gtag/dataLayer are declared by @next/third-parties.
  const w = window as unknown as {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
    lintrk?: (command: string, params: Record<string, unknown>) => void;
  };

  if (GOOGLE_ADS_SEND_TO && typeof w.gtag === 'function') {
    w.gtag('event', 'conversion', { send_to: GOOGLE_ADS_SEND_TO });
  }
  if (META_PIXEL_ENABLED && typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', { content_name: formName });
  }
  if (LINKEDIN_CONVERSION_ID && typeof w.lintrk === 'function') {
    w.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
  }
}
