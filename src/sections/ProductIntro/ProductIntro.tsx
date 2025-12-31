import { m } from 'framer-motion';

import { fade, floatIn, slideLeft, slideUp, stagger, viewport } from '@/animations/motion';
import { deviceImages } from '@/data/deviceImages';
import { Badge } from '@/components/Badge/Badge';
import { Chip } from '@/components/Chip/Chip';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './ProductIntro.module.scss';

const ProductIntro = (): JSX.Element => {
  const chips = copy.productIntro.badges;
  const features = copy.productIntro.features;
  const heroDevice = deviceImages.aurora;

  return (
    <section className="section" aria-labelledby="intro-heading" id="intro">
      <div className={cx('container', styles.intro)}>
        <m.div
          className={cx(styles.copy, styles['v-group'])}
          variants={stagger(0.1, 0.16)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <m.div variants={fade(0)}>
            <Badge tone="brand" size="sm" className={styles.eyebrow}>
              {copy.productIntro.eyebrow}
            </Badge>
          </m.div>
          <m.h2 id="intro-heading" className={cx(typography.subhead, styles.title)} variants={slideUp(0.04)}>
            {copy.productIntro.title}
          </m.h2>
          <m.p className={typography.body} variants={slideUp(0.1, 26)}>
            {copy.productIntro.body}
          </m.p>

          <m.ul
            className={cx(styles.badges, styles['h-group'])}
            variants={stagger(0.05)}
            role="list"
          >
            {chips.map((chip) => (
              <m.li key={chip} variants={slideUp(0, 18)}>
                <Chip>{chip}</Chip>
              </m.li>
            ))}
          </m.ul>

          <m.div className={styles.features} variants={stagger(0.08)}>
            <m.ul className={styles.grid} variants={stagger(0.06)} role="list">
              {features.map((feature) => (
                <m.li key={feature} variants={slideLeft(0, 20)}>
                  <span className={styles.spark} aria-hidden="true" />
                  <span className={cx('clamp-2', 'break-words')}>{feature}</span>
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </m.div>

        <div className={styles.media}>
          <m.div
            className={styles.panel}
            variants={floatIn(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className={styles.panelGlow} aria-hidden="true" />
            <picture className={styles.picture}>
              <source srcSet={heroDevice.srcSet} type="image/png" />
              <img
                src={heroDevice.src}
                alt="Nebula One sobre una superficie de cristal líquido"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <p className={styles.caption}>
              <span className={styles.captionDot} aria-hidden="true" />
              {copy.productIntro.mediaCaption}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default ProductIntro;
