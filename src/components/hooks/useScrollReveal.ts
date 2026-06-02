'use client';

import { useEffect, useRef } from 'react';

interface Options {
  threshold?: number;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, direction = 'up', delay = 0 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transition = 'none';
    if (direction === 'up') el.style.transform = 'translateY(30px)';
    else if (direction === 'left') el.style.transform = 'translateX(-40px)';
    else if (direction === 'right') el.style.transform = 'translateX(40px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, direction, delay]);

  return ref;
}
