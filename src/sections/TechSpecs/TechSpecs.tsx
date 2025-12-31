import { m } from 'framer-motion';
import { useMemo, useState } from 'react';

import { floatIn, slideLeft, slideRight, slideUp, stagger, viewport } from '@/animations/motion';
import { copy } from '@/data/copy';
import { specs, type SpecCategory, type SpecItem } from '@/data/specs';
import useCountUp from '@/hooks/useCountUp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSectionInView } from '@/hooks/useSectionInView';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './TechSpecs.module.scss';

const TechSpecs = (): JSX.Element => {
  const [mode, setMode] = useState<SpecCategory>('performance');
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useSectionInView<HTMLDivElement>({ threshold: 0.35, once: false });

  const currentSpecs = useMemo<SpecItem[]>(() => specs[mode as SpecCategory], [mode]);
  const duration = prefersReducedMotion ? 0 : 1200;

  return (
    <section
      className="section"
      aria-labelledby="techspecs-heading"
      ref={ref}
      id="especificaciones"
    >
      <div className={cx('container', styles.shell)}>
        <m.div
          className={styles.surface}
          variants={stagger(0.12, 0.16)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <m.div className={styles.headerRow} variants={stagger(0.1)}>
            <m.div className={styles.titleGroup} variants={stagger(0.08)}>
              <m.h2 id="techspecs-heading" className={typography.subhead} variants={slideUp(0.04)}>
                {copy.techSpecs.title}
              </m.h2>
              <m.p className={typography.body} variants={slideUp(0.08, 22)}>
                {copy.techSpecs.description}
              </m.p>
            </m.div>
            <m.div className={styles.toggleWrap} variants={slideRight(0.1, 24)}>
              <div
                className={styles.toggleGroup}
                role="tablist"
                aria-label="Cambiar modo de especificaciones"
              >
                <button
                  type="button"
                  className={styles.toggleButton}
                  data-active={mode === 'performance'}
                  role="tab"
                  aria-selected={mode === 'performance'}
                  onClick={() => setMode('performance')}
                >
                  {copy.techSpecs.toggle.left.label}
                </button>
                <button
                  type="button"
                  className={styles.toggleButton}
                  data-active={mode === 'battery'}
                  role="tab"
                  aria-selected={mode === 'battery'}
                  onClick={() => setMode('battery')}
                >
                  {copy.techSpecs.toggle.right.label}
                </button>
              </div>
            </m.div>
          </m.div>
          <m.div className={styles.content} variants={stagger(0.08)}>
            <m.ul className={styles.counters} role="group" aria-live="polite" variants={stagger(0.08)}>
              {copy.techSpecs.counters.map((counter) => {
                const animatedValue = useCountUp(inView ? counter.value : 0, duration);
                const displayValue = prefersReducedMotion ? counter.value : animatedValue;

                return (
                  <m.li key={counter.label} variants={floatIn(0.02)} className={styles.counterBlock}>
                    <span className={styles.counter}>
                      {displayValue}
                      {counter.unit}
                    </span>
                    <span className={styles.counterLabel}>{counter.label}</span>
                  </m.li>
                );
              })}
            </m.ul>
            <m.ul
              className={styles.specGrid}
              aria-live="polite"
              aria-label={copy.techSpecs.ariaLive}
              variants={stagger(0.06)}
            >
              {currentSpecs.map((item: SpecItem) => (
                <m.li key={item.label} variants={slideLeft(0, 22)}>
                  <article className={styles.card}>
                    <h3 className={cx(styles.cardTitle, 'h-tight', 'h-fluid', 'clamp-2')}>
                      {item.label}
                    </h3>
                    <p className={cx(styles.description, 'clamp-3', 'break-words')}>
                      {item.description}
                    </p>
                  </article>
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default TechSpecs;
