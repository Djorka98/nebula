import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { vars } from '@/styles/tokens.css';

const isBrowser = typeof window !== 'undefined';

let registered = false;

export function ensureGSAP(): void {
  if (!isBrowser || registered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const pinSection = async (
  element: HTMLElement | null,
  options?: Partial<ScrollTrigger.Vars>
): Promise<() => void> => {
  if (!isBrowser || !element) {
    return () => undefined;
  }

  ensureGSAP();

  const trigger = ScrollTrigger.create({
    trigger: element,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    ...options
  });

  return () => trigger.kill(true);
};

export const timelineFromTo = async (
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options?: gsap.TimelineVars
): Promise<() => void> => {
  if (!isBrowser) {
    return () => undefined;
  }

  ensureGSAP();

  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    ...options
  });

  timeline.fromTo(targets, fromVars, toVars);

  return () => timeline.kill();
};

export type MatchMediaHandlers = Record<string, () => void | (() => void)>;

export const matchMediaBreakpoints = async (handlers: MatchMediaHandlers): Promise<() => void> => {
  if (!isBrowser) {
    return () => undefined;
  }

  ensureGSAP();

  const matchMediaFactory = ScrollTrigger.matchMedia?.bind(ScrollTrigger);

  const mm = matchMediaFactory
    ? (matchMediaFactory({}) as unknown as {
        add: (query: string, callback: () => void | (() => void)) => () => void;
        kill: () => void;
      })
    : null;
  const disposers: Array<() => void> = [];

  const defaultQueries: Record<string, string> = {
    mobile: `(max-width: calc(${vars.breakpoints.md} - 0.02px))`,
    desktop: `(min-width: ${vars.breakpoints.md})`,
    reduced: '(prefers-reduced-motion: reduce)'
  };

  if (!mm) {
    return () => undefined;
  }

  Object.entries(handlers).forEach(([key, handler]) => {
    const query = defaultQueries[key] ?? key;

    const cleanup = mm.add(query, () => {
      const result = handler();
      return () => {
        if (typeof result === 'function') {
          result();
        }
      };
    });

    disposers.push(cleanup);
  });

  return () => {
    disposers.forEach((dispose) => dispose());
    mm.kill();
  };
};

export { gsap, ScrollTrigger };
