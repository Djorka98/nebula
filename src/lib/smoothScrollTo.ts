type ScrollTarget = string | HTMLElement | null;

export type SmoothScrollOptions = {
  offset?: number;
  duration?: number;
  behavior?: ScrollBehavior;
  disableSmoothing?: boolean;
};

export function smoothScrollTo(target: ScrollTarget, options: SmoothScrollOptions = {}): void {
  if (typeof document === 'undefined' || !target) {
    return;
  }

  const { offset = 0, duration = 0.85, behavior = 'smooth', disableSmoothing = false } = options;
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

  if (!element) {
    return;
  }

  if (disableSmoothing) {
    element.scrollIntoView({ behavior: behavior === 'smooth' ? 'auto' : behavior, block: 'start' });
    return;
  }

  const lenis = typeof window !== 'undefined' ? window.__lenis : null;

  if (lenis) {
    lenis.scrollTo(
      element,
      { offset, duration } as Parameters<typeof lenis.scrollTo>[1]
    );
    return;
  }

  element.scrollIntoView({ behavior, block: 'start' });
}
