'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Reports clicks on any tel: link as a `phone_click` event.
 *
 * Uses one delegated listener rather than an onClick on each of the ~16 call
 * links, so new phone links are tracked automatically without being wired up.
 */
export default function CallTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      track('phone_click', {
        phone_number: link.getAttribute('href')?.replace('tel:', '') ?? '',
        link_text: link.textContent?.trim().slice(0, 80) ?? '',
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
