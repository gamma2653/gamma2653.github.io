import { useEffect, useRef, useState } from 'react';

/**
 * True when scroll-triggered reveals should be skipped: there is no
 * IntersectionObserver (jsdom, very old browsers) or the user asked for
 * reduced motion. Content is then shown immediately.
 */
function shouldSkipObserver(): boolean {
  if (typeof IntersectionObserver === 'undefined') return true;
  if (typeof window === 'undefined') return true;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Reports whether the referenced element has entered the viewport.
 * Observes once: after the first intersection the element is unobserved
 * and the value stays `true`.
 */
export function useInView<T extends Element = HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(shouldSkipObserver);
  const { root = null, rootMargin, threshold } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (inView || !el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { root, rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, root, rootMargin, threshold]);

  return [ref, inView];
}
