'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Writes the current scroll position to --vp-scroll on the given element so
 * descendant layers can derive differential parallax via CSS calc().
 * No-ops entirely under prefers-reduced-motion.
 */
export function useScrollDepth(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      el.style.setProperty('--vp-scroll', '0');
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--vp-scroll', String(window.scrollY));
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
