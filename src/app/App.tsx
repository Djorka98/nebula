import Lenis from 'lenis';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { ensureGSAP, gsap, ScrollTrigger } from '@/animations/scroll';
import { AppRoutes } from '@/app/routes';
import { copy } from '@/data/copy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { smoothScrollTo } from '@/lib/smoothScrollTo';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

const lenisEasing = (t: number): number => 1 - Math.pow(2, -10 * t);

const App = (): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (prefersReducedMotion) {
      window.__lenis?.destroy?.();
      window.__lenis = null;
      return undefined;
    }

    ensureGSAP();

    const lenis = new Lenis({
      duration: 0.85,
      easing: lenisEasing,
      smoothWheel: true,
      smoothTouch: false
    });

    const updateProgress = () => {
      const root = document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = root;
      const progress = scrollHeight <= clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight);
      root.style.setProperty('--nav-progress', progress.toString());
    };

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    lenis.on('scroll', updateProgress);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    updateProgress();

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      lenis.off('scroll', updateProgress);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(12, 12);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (!location.hash) {
      return undefined;
    }

    let cancelled = false;

    const attemptScroll = (retries = 0) => {
      if (cancelled) {
        return;
      }

      const target = document.querySelector<HTMLElement>(location.hash);

      if (target) {
        smoothScrollTo(target, {
          offset: -88,
          disableSmoothing: prefersReducedMotion,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        return;
      }

      if (retries < 10) {
        window.setTimeout(() => attemptScroll(retries + 1), 80);
      }
    };

    attemptScroll();

    return () => {
      cancelled = true;
    };
  }, [location.hash, prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const onScroll = () => {
      const root = document.documentElement;
      const progress = root.scrollHeight <= root.clientHeight
        ? 0
        : root.scrollTop / (root.scrollHeight - root.clientHeight);
      root.style.setProperty('--nav-progress', progress.toString());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{copy.meta.title}</title>
        <meta name="description" content={copy.meta.description} />
        <link rel="canonical" href={copy.meta.canonical} />
      </Helmet>
      <AppRoutes />
    </>
  );
};

export default App;
