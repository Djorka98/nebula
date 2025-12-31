import { AnimatePresence, m } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

import { fade, floatIn, scaleIn, slideUp, stagger, viewport } from '@/animations/motion';
import { ensureGSAP, gsap } from '@/animations/scroll';
import { Badge } from '@/components/Badge/Badge';
import { deviceImages, type DeviceColorId } from '@/data/deviceImages';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './ColorPicker.module.scss';

export const ColorPicker = (): JSX.Element => {
  const [activeColorId, setActiveColorId] = useState<DeviceColorId>(
    copy.colorPicker.colors[0].id as DeviceColorId
  );
  const activeColor = copy.colorPicker.colors.find((color) => color.id === activeColorId);
  const activeDevice = deviceImages[activeColorId] ?? deviceImages.aurora;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureGSAP();
  }, []);

  useEffect(() => {
    if (!panelRef.current || !activeColor) {
      return;
    }

    gsap.to(panelRef.current, {
      duration: 0.6,
      ease: 'power1.out',
      '--color-panel-tint': `linear-gradient(180deg, ${activeColor.hex}22, transparent)`
    } as gsap.TweenVars & Record<string, unknown>);
  }, [activeColor]);

  useEffect(() => {
    if (!previewRef.current || !activeColor) {
      return;
    }

    gsap.to(previewRef.current, {
      duration: 0.6,
      ease: 'power1.out',
      '--preview-accent': activeColor.hex
    } as gsap.TweenVars & Record<string, unknown>);
  }, [activeColor]);

  return (
    <m.section
      className="section"
      aria-labelledby="color-picker-heading"
      id="colores"
      variants={stagger(0.12, 0.16)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className={cx('container', styles.colorPicker)}>
        <m.div className={styles.surface} ref={panelRef} variants={stagger(0.1, 0.14)}>
          <m.div className={cx(styles.header, styles['v-group'])} variants={stagger(0.08)}>
            <m.div variants={fade(0)}>
              <Badge tone="brand" size="sm" className={styles.badge}>
                Color exclusivo
              </Badge>
            </m.div>
            <m.h2 id="color-picker-heading" className={cx(typography.subhead, styles.title)} variants={slideUp(0.06, 18)}>
              {copy.colorPicker.title}
            </m.h2>
            <m.p className={cx(typography.body, styles.bodyText, 'clamp-3', 'break-words')} variants={slideUp(0.1, 16)}>
              {copy.colorPicker.description}
            </m.p>
            <m.p className={cx(styles.poem, 'clamp-2', 'break-words')} aria-live="polite" variants={fade(0.14)}>
              {activeColor?.poem}
            </m.p>
          </m.div>
          <div className="hr" aria-hidden="true" />
          <div className={styles.selection}>
            <m.div
              className={cx(styles.swatches, styles.grid)}
              role="radiogroup"
              aria-label="Selector de color"
              variants={stagger(0.06)}
            >
              {copy.colorPicker.colors.map((color) => (
                <m.button
                  key={color.id}
                  type="button"
                  role="radio"
                  aria-checked={activeColorId === color.id}
                  className={styles.swatch}
                  style={{ '--swatch-accent': color.hex } as CSSProperties}
                  data-selected={activeColorId === color.id}
                  onClick={() => setActiveColorId(color.id as DeviceColorId)}
                  variants={scaleIn(0.04, 0.96)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.meta}>
                    <strong className="clamp-2">{color.name}</strong>
                    <span className={styles.colorCode} aria-hidden="true">
                      {color.hex}
                    </span>
                    <span className={styles.preview} aria-hidden="true" />
                    <span className={styles.descriptor}>{color.tagline}</span>
                  </div>
                </m.button>
              ))}
            </m.div>
            <m.figure
              className={styles.previewPane}
              ref={previewRef}
              style={{ '--preview-accent': activeColor?.hex ?? '#7c8cff' } as CSSProperties}
              variants={floatIn(0.1)}
            >
              <span className={styles.previewGlow} aria-hidden="true" />
              <div className={styles.previewFrame}>
                <AnimatePresence mode="wait">
                  <m.picture
                    key={activeColorId}
                    className={styles.previewPicture}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.28 }}
                  >
                    <source srcSet={activeDevice.srcSet} type="image/png" />
                    <img
                      key={activeDevice.src}
                      src={activeDevice.src}
                      alt={`Nebula One en acabado ${activeColor?.name ?? 'personalizado'}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </m.picture>
                </AnimatePresence>
              </div>
            </m.figure>
          </div>
          <m.p className={cx(styles.footer, styles.bodyText, 'clamp-3', 'break-words')} aria-live="polite" variants={fade(0.16)}>
            Estás viendo el acabado <strong>{activeColor?.name}</strong>. {activeColor?.poem}{' '}
            Suaviza los reflejos y resalta los bordes esculpidos del dispositivo.
          </m.p>
        </m.div>
      </div>
    </m.section>
  );
};

export default ColorPicker;
