'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

/**
 * Vercel Web Analytics, mounted only after the load event and browser idle (2s cap),
 * the same window the Ahrefs loader in layout.tsx uses. <Analytics> records the
 * current page when it mounts and follows client-side navigations from then on,
 * so the first pageview is kept; only its timing moves out of the load path.
 */
export default function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancel = () => {};
    const start = () => {
      // Safari has no requestIdleCallback; a 1ms timeout still lands after load.
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
        cancel = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setReady(true), 1);
        cancel = () => clearTimeout(id);
      }
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      cancel();
    };
  }, []);

  return ready ? <Analytics /> : null;
}
