import { m } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { fade, floatIn, scaleIn, slideUp, stagger, viewport } from '@/animations/motion';
import { ensureGSAP, gsap, ScrollTrigger } from '@/animations/scroll';
import heroBackground from '@/assets/images/hero_bg.png';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { deviceImages } from '@/data/deviceImages';
import { copy } from '@/data/copy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';
import { smoothScrollTo } from '@/lib/smoothScrollTo';
import { typography } from '@/styles/typography.css';

import styles from './Hero.module.scss';

const Hero = (): JSX.Element => {
  const root = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroDevice = deviceImages.aurora;

  const handlePrimaryClick = () => {
    smoothScrollTo(copy.hero.ctaPrimary.href, {
      offset: -88,
      disableSmoothing: prefersReducedMotion,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  const handleSecondaryClick = () => {
    const href = copy.hero.ctaSecondary?.href;
    if (!href) {
      return;
    }

    if (href.startsWith('#')) {
      smoothScrollTo(href, {
        offset: -88,
        disableSmoothing: prefersReducedMotion,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      return;
    }

    if (typeof window !== 'undefined') {
      window.open(href, '_blank', 'noopener');
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    ensureGSAP();
    const element = root.current;
    if (!element) {
      return undefined;
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.pin === element || trigger.vars.trigger === element) {
        trigger.kill(true);
      }
    });
    const parent = element.parentElement;
    if (parent?.classList.contains('pin-spacer')) {
      parent.parentElement?.insertBefore(element, parent);
      parent.remove();
    }

    const ctx = gsap.context(() => {
      const device = element.querySelector<HTMLElement>('.device');
      if (!device) {
        return;
      }

      gsap.to(device, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, element);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.pin === element || trigger.vars.trigger === element) {
          trigger.kill(true);
        }
      });
      const currentParent = element.parentElement;
      if (currentParent?.classList.contains('pin-spacer')) {
        currentParent.parentElement?.insertBefore(element, currentParent);
        currentParent.remove();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={root}
      className={cx('section', styles.hero)}
      id="hero"
      aria-label="Nebula One hero"
    >
      <div className={styles.backdrop} aria-hidden="true">
        <img src={heroBackground} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={cx('container', styles.wrap)}>
        <m.div
          className={styles.copy}
          variants={stagger(0.08, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <m.div variants={fade(0)}>
            <Badge tone="brand" size="sm">
              {copy.hero.kicker}
            </Badge>
          </m.div>

          <m.h1 className={cx(typography.headline, styles.headline)} variants={slideUp(0.05)}>
            {copy.hero.title}
          </m.h1>

          <m.p className={typography.body} variants={slideUp(0.1, 24)}>
            {copy.hero.subtitle}
          </m.p>

          <m.div className={styles.ctas} variants={scaleIn(0.16)}>
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryClick}
            >
              {copy.hero.ctaPrimary.label}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSecondaryClick}
            >
              {copy.hero.ctaSecondary?.label ?? 'Ver video'}
            </Button>
          </m.div>

          <m.div className={styles.metrics} variants={stagger(0.06)}>
            {copy.hero.metrics.map((metric) => (
              <m.div key={metric.label} variants={slideUp(0, 18)} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
                <p className={styles.metricDescription}>{metric.description}</p>
              </m.div>
            ))}
          </m.div>

          <m.p className={cx(typography.caption, styles.caption)} variants={fade(0.18)}>
            {copy.hero.finePrint}
          </m.p>
        </m.div>

        <m.div
          className={cx(styles.deviceColumn, 'device')}
          variants={floatIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className={styles.deviceAura} aria-hidden="true" />
          <div className={styles.deviceFrame}>
            <picture>
              <source srcSet={heroDevice.srcSet} type="image/png" />
              <img
                className={styles.devicePicture}
                src={heroDevice.src}
                alt="Nebula One flotando en un haz de luz"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
