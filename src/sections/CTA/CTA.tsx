import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { fade, scaleIn, slideUp, stagger, viewport } from '@/animations/motion';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './CTA.module.scss';

const CTA = (): JSX.Element => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate(copy.cta.button.href);
  };

  return (
    <m.section
      className="section"
      aria-labelledby="cta-heading"
      id="cta"
      variants={stagger(0.12, 0.16)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className={cx('container', styles.cta)}>
        <m.div className={cx(styles.surface, styles['v-group'])} variants={stagger(0.1, 0.18)}>
          <m.div variants={fade(0)}>
            <Badge tone="brand" size="sm">
              Acceso anticipado
            </Badge>
          </m.div>
          <m.h2
            id="cta-heading"
            className={cx(styles.title, typography.subhead, 'h-tight', 'h-fluid')}
            variants={slideUp(0.08, 24)}
          >
            {copy.cta.title}
          </m.h2>
          <m.p className={cx(styles.copy, typography.body, 'clamp-3')} variants={slideUp(0.12, 20)}>
            {copy.cta.description}
          </m.p>
          <div className="hr" aria-hidden="true" />
          <m.div className={styles.actions} variants={scaleIn(0.1, 0.96)}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleReserveClick}
            >
              {copy.cta.button.label}
            </Button>
          </m.div>
          <m.p
            className={cx(styles.legal, typography.caption, 'clamp-3')}
            variants={fade(0.14)}
          >
            {copy.cta.legal}
          </m.p>
        </m.div>
      </div>
    </m.section>
  );
};

export default CTA;
