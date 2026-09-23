'use client';

import { createElement, useEffect, useRef, useState } from 'react';

type RevealTag = 'div' | 'li' | 'section' | 'article';

/**
 * Fades its children in when scrolled into view.
 *
 * The hidden starting state lives in globals.css and applies only under
 * `html.js` (set by an inline script in layout.tsx) on screens that allow
 * motion. Without JavaScript, when printing, or with reduced motion, the
 * content is simply visible — SSR never ships it at opacity 0 unconditionally.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Tells the inline safety script in layout.tsx that hydration happened, so
    // it doesn't strip `html.js` and flatten every reveal.
    document.documentElement.setAttribute('data-reveal-ready', '');
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect();
          if (delay > 0) timer = setTimeout(() => setShow(true), delay);
          else setShow(true);
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return createElement(
    as,
    { ref, className: className || undefined, 'data-reveal': '', 'data-shown': show ? '' : undefined },
    children,
  );
}
