import { AnimatePresence, m } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

import { fade, floatIn, scaleIn, slideLeft, slideUp, stagger, viewport } from '@/animations/motion';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { deviceImages, type DeviceColorId } from '@/data/deviceImages';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './Configurator.module.scss';

type ConfigState = {
  storage: string;
  energy: string;
  color: DeviceColorId;
};

const initialState: ConfigState = {
  storage: copy.configurator.options.storage[0].value,
  energy: copy.configurator.options.energy[0].value,
  color: copy.configurator.options.colors[0].value as DeviceColorId
};

export const Configurator = (): JSX.Element => {
  const [configuration, setConfiguration] = useState<ConfigState>(initialState);
  const pricing = copy.configurator.pricing;
  const colors = copy.configurator.options.colors;

  const formatPrice = useMemo(
    () =>
      new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }),
    []
  );

  const selectSingle = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfiguration((prev) => ({ ...prev, [key]: value }));
  };

  const summary = useMemo(() => {
    const storageLabel = copy.configurator.options.storage.find(
      (option) => option.value === configuration.storage
    )?.label;
    const energyLabel = copy.configurator.options.energy.find(
      (option) => option.value === configuration.energy
    )?.label;
    const colorOption = colors.find((option) => option.value === configuration.color);

    return {
      storage: storageLabel,
      energy: energyLabel,
      color: colorOption
    };
  }, [colors, configuration]);

  const totalPrice = useMemo(() => {
    const storagePrice = pricing.storage[
      configuration.storage as keyof typeof pricing.storage
    ] ?? 0;
    const energyPrice = pricing.energy[
      configuration.energy as keyof typeof pricing.energy
    ] ?? 0;
    return pricing.base + storagePrice + energyPrice;
  }, [configuration.energy, configuration.storage, pricing]);

  const selectedColor = useMemo(
    () => colors.find((option) => option.value === configuration.color),
    [colors, configuration.color]
  );

  const deviceForColor = deviceImages[configuration.color] ?? deviceImages.aurora;

  return (
    <m.section
      className="section"
      aria-labelledby="configurator-heading"
      id="personaliza"
      variants={stagger(0.12, 0.18)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className={cx('container', styles.configurator)}>
        <m.div className={styles.surface} variants={stagger(0.1, 0.16)}>
          <m.div className={cx(styles.header, styles['v-group'])} variants={stagger(0.08)}>
            <m.div variants={fade(0)}>
              <Badge tone="brand" size="sm" className={styles.badge}>
                Personaliza
              </Badge>
            </m.div>
            <m.h2 id="configurator-heading" className={typography.subhead} variants={slideUp(0.05, 18)}>
              {copy.configurator.title}
            </m.h2>
            <m.p className={typography.body} variants={slideUp(0.08, 16)}>
              {copy.configurator.description}
            </m.p>
          </m.div>
          <div className="hr" aria-hidden="true" />
          <div className={styles.columns}>
            <m.div className={cx(styles.options, styles['grid'])} variants={stagger(0.08)}>
              <m.fieldset className={styles.option} variants={slideUp(0.06, 20)}>
                <legend>Almacenamiento</legend>
                <div className={styles.choices}>
                  {copy.configurator.options.storage.map((option) => (
                    <m.button
                      key={option.value}
                      type="button"
                      className={styles.choice}
                      data-selected={configuration.storage === option.value}
                      onClick={() => selectSingle('storage', option.value)}
                      role="radio"
                      aria-checked={configuration.storage === option.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>{option.label}</span>
                    </m.button>
                  ))}
                </div>
              </m.fieldset>
              <m.fieldset className={styles.option} variants={slideUp(0.08, 20)}>
                <legend>Energía</legend>
                <div className={styles.choices}>
                  {copy.configurator.options.energy.map((option) => (
                    <m.button
                      key={option.value}
                      type="button"
                      className={styles.choice}
                      data-selected={configuration.energy === option.value}
                      onClick={() => selectSingle('energy', option.value)}
                      role="radio"
                      aria-checked={configuration.energy === option.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>{option.label}</span>
                    </m.button>
                  ))}
                </div>
              </m.fieldset>
              <m.fieldset className={styles.option} variants={slideUp(0.1, 20)}>
                <legend>Color</legend>
                <div className={styles.choices}>
                  {colors.map((option) => (
                    <m.button
                      key={option.value}
                      type="button"
                      className={cx(styles.choice, styles.colorChoice)}
                      data-selected={configuration.color === option.value}
                      onClick={() => selectSingle('color', option.value as DeviceColorId)}
                      role="radio"
                      aria-checked={configuration.color === option.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ '--choice-color': option.hex } as CSSProperties}
                    >
                      <span className={styles.colorSwatch} aria-hidden="true" />
                      <span className={styles.colorMeta}>
                        <span className={styles.colorName}>{option.label}</span>
                        <span className={styles.colorHex} aria-hidden="true">
                          {option.hex}
                        </span>
                      </span>
                    </m.button>
                  ))}
                </div>
              </m.fieldset>
            </m.div>
            <m.aside className={cx(styles.summary, styles['v-group'])} aria-live="polite" variants={slideLeft(0.12, 26)}>
              <span className={cx(styles.summaryTitle, 'clamp-2', 'break-words')}>
                {copy.configurator.summaryHeading}
              </span>
              <m.figure
                className={styles.devicePreview}
                style={{ '--preview-accent': selectedColor?.hex ?? '#7c8cff' } as CSSProperties}
                variants={floatIn(0.12)}
              >
                <span className={styles.devicePreviewGlow} aria-hidden="true" />
                <AnimatePresence mode="wait">
                  <m.picture
                    key={configuration.color}
                    className={styles.devicePictureWrap}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.24 }}
                  >
                    <source srcSet={deviceForColor.srcSet} type="image/png" />
                    <img
                      key={deviceForColor.src}
                      src={deviceForColor.src}
                      alt={`Nebula One en acabado ${selectedColor?.label ?? 'personalizado'}`}
                      loading="lazy"
                    />
                  </m.picture>
                </AnimatePresence>
              </m.figure>
              <AnimatePresence mode="wait">
                <m.div
                  key={`${configuration.storage}-${configuration.energy}-${configuration.color}`}
                  className={styles.summaryBlock}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                >
                  <span className={styles.priceTag}>{formatPrice.format(totalPrice)}</span>
                  <dl className={styles.summaryList}>
                    <div>
                      <dt>Color</dt>
                      <dd>
                        <span>{summary.color?.label}</span>
                        <span
                          className={styles.summarySwatch}
                          aria-hidden="true"
                          style={{ '--summary-swatch': summary.color?.hex ?? '#7c8cff' } as CSSProperties}
                        />
                      </dd>
                    </div>
                    <div>
                      <dt>Almacenamiento</dt>
                      <dd>{summary.storage}</dd>
                    </div>
                    <div>
                      <dt>Energía</dt>
                      <dd>{summary.energy}</dd>
                    </div>
                  </dl>
                </m.div>
              </AnimatePresence>
              <m.div variants={scaleIn(0.16, 0.95)}>
                <Button variant="primary" size="lg">
                  Reservar por {formatPrice.format(totalPrice)}
                </Button>
              </m.div>
              <m.p className={styles.shipping} variants={fade(0.18)}>
                {copy.configurator.shipping}
              </m.p>
            </m.aside>
          </div>
        </m.div>
      </div>
    </m.section>
  );
};

export default Configurator;
