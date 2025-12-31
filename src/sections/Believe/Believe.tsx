import { m } from 'framer-motion';
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent
} from 'react';

import { fade, slideUp, stagger, viewport } from '@/animations/motion';
import nebula1 from '@/assets/images/nebula_carousel_1.jpg';
import nebula2 from '@/assets/images/nebula_carousel_2.jpg';
import nebula3 from '@/assets/images/nebula_carousel_3.jpg';
import { Badge } from '@/components/Badge/Badge';
import { Container } from '@/components/Container/Container';
import { copy } from '@/data/copy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';

import styles from './Believe.module.scss';

const slideImages = [nebula1, nebula2, nebula3] as const;
const AUTOPLAY_DURATION = 6500;

const Believe = () => {
  const { title, subtitle } = copy.believe;
  const slides = copy.believe.slides;
  type Slide = (typeof slides)[number];
  type SlideWithMedia = Slide & { image: string };
  const carouselId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const targetIndexRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  const slidesWithMedia = useMemo<SlideWithMedia[]>(() => {
    return slides.map((slide, index) => ({
      ...slide,
      image: slideImages[index % slideImages.length]
    }));
  }, [slides]);

  const scrollToIndex = useCallback(
    (index: number, options?: { allowLoop?: boolean; behavior?: ScrollBehavior }) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const { allowLoop = false, behavior } = options ?? {};
      const lastIndex = slidesWithMedia.length - 1;
      let target = index;

      if (allowLoop) {
        if (index < 0) {
          target = lastIndex;
        } else if (index > lastIndex) {
          target = 0;
        }
      } else {
        target = Math.max(0, Math.min(index, lastIndex));
      }

      const offset = target * viewport.clientWidth;
      targetIndexRef.current = target;
      isAnimatingRef.current = true;
      viewport.scrollTo({
        left: offset,
        behavior: behavior ?? (prefersReducedMotion ? 'auto' : 'smooth')
      });
      if (prefersReducedMotion || behavior === 'auto') {
        isAnimatingRef.current = false;
      }
      activeIndexRef.current = target;
      setActiveIndex(target);
      setProgress(0);
    },
    [prefersReducedMotion, slidesWithMedia.length]
  );

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const { scrollLeft, clientWidth } = viewport;
    if (!clientWidth) {
      return;
    }

    const index = Math.round(scrollLeft / clientWidth);
    const clampedIndex = Math.max(0, Math.min(index, slidesWithMedia.length - 1));

    if (isAnimatingRef.current) {
      isAnimatingRef.current = false;
    }

    targetIndexRef.current = clampedIndex;

    if (clampedIndex !== activeIndexRef.current) {
      activeIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);
      setProgress(0);
    }
  }, [slidesWithMedia.length]);

  const showPrevious = useCallback(() => {
    scrollToIndex(activeIndex - 1, { allowLoop: true });
  }, [activeIndex, scrollToIndex]);
  const showNext = useCallback(() => {
    scrollToIndex(activeIndex + 1, { allowLoop: true });
  }, [activeIndex, scrollToIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    },
    [showNext, showPrevious]
  );

  useEffect(() => {
    if (prefersReducedMotion || slidesWithMedia.length <= 1) {
      setProgress(0);
      return;
    }

    let frameId: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const ratio = Math.min(elapsed / AUTOPLAY_DURATION, 1);
      setProgress(ratio);

      if (elapsed >= AUTOPLAY_DURATION) {
        startTime = timestamp;
        scrollToIndex(activeIndex + 1, { allowLoop: true });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeIndex, prefersReducedMotion, scrollToIndex, slidesWithMedia.length]);

  const progressStyle = useMemo<CSSProperties>(
    () =>
      ({
        '--progress': `${Math.min(progress, 1)}`
      } as CSSProperties),
    [progress]
  );

  return (
    <section className={styles.section} id="believe" aria-labelledby={`${carouselId}-title`}>
      <Container className={styles.container} as="div">
        <m.div
          className={styles.header}
          variants={stagger(0.08, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <m.div variants={fade(0)}>
            <Badge tone="brand" size="sm" aria-hidden>
              Experiencia Nebula
            </Badge>
          </m.div>
          <m.h2 className={cx(styles.title, 'clamp-2')} id={`${carouselId}-title`} variants={slideUp(0.04, 20)}>
            {title}
          </m.h2>
          <m.p className={cx(styles.subtitle, 'clamp-2')} variants={slideUp(0.08, 18)}>
            {subtitle}
          </m.p>
        </m.div>

        <m.div
          className={styles.carousel}
          variants={stagger(0.06, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <m.div className={styles.viewportShell} variants={fade(0.06)}>
            <m.div
              className={styles.viewport}
              ref={viewportRef}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              role="region"
              aria-roledescription="carrusel"
              aria-live="polite"
              aria-label="Galería interactiva de Nebula One"
              id={carouselId}
              tabIndex={0}
              variants={stagger(0.05)}
            >
              <ul className={styles.track}>
                {slidesWithMedia.map((slide, index) => {
                  const isActive = activeIndex === index;
                  const scale = prefersReducedMotion ? 1 : isActive ? 1.02 : 1;

                  return (
                    <m.li
                      key={slide.id}
                      className={cx(
                        styles.slide,
                        isActive && !prefersReducedMotion && styles.slideActive
                      )}
                      aria-roledescription="diapositiva"
                      aria-label={`${index + 1} de ${slidesWithMedia.length}`}
                      aria-current={isActive}
                      animate={{ scale }}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      variants={fade(0.04)}
                    >
                      <figure className={styles.media}>
                        <img src={slide.image} alt={slide.imageAlt} loading="lazy" />
                        <span className={styles.mediaOverlay} aria-hidden="true" />
                      </figure>
                      <div className={styles.content}>
                        <h3 className={cx(styles.slideTitle, 'h-tight', 'h-fluid', 'clamp-2')}>
                          {slide.title}
                        </h3>
                        <p className={cx(styles.slideDescription, 'clamp-3', 'break-words')}>
                          {slide.description}
                        </p>
                      </div>
                    </m.li>
                  );
                })}
              </ul>
            </m.div>
          </m.div>

          <m.div className={styles.controls} variants={stagger(0.05)}>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={showPrevious}
                aria-label="Mostrar anterior"
                aria-controls={carouselId}
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={showNext}
                aria-label="Mostrar siguiente"
                aria-controls={carouselId}
              >
                <span aria-hidden>›</span>
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Seleccionar diapositiva">
              {slidesWithMedia.map((slide, index) => {
                const isActive = activeIndex === index;

                return (
                  <m.button
                    key={slide.id}
                    type="button"
                    className={cx(styles.dot, {
                      [styles.dotActive]: isActive
                    })}
                    onClick={() => scrollToIndex(index, { allowLoop: true })}
                    aria-label={`Ir a la diapositiva ${index + 1}`}
                    aria-controls={carouselId}
                    role="tab"
                    aria-selected={isActive}
                    animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.92 }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </div>

            {!prefersReducedMotion && slidesWithMedia.length > 1 && (
              <div className={styles.progressTrack} aria-hidden="true">
                <span className={styles.progressIndicator} style={progressStyle} />
              </div>
            )}
          </m.div>
        </m.div>
      </Container>
    </section>
  );
};

export default Believe;
