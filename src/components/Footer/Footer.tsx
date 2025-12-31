import { m } from 'framer-motion';

import { fade, slideLeft, slideUp, stagger, viewport } from '@/animations/motion';
import { Badge } from '@/components/Badge/Badge';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';

import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const contact = copy.footer.contact;
  const navLinks = copy.navbar.links;
  const supportLinks = copy.footer.links;

  return (
    <m.footer
      className={styles.footer}
      variants={fade(0)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={cx('container', styles.container)}>
        <m.div className={styles.content} variants={stagger(0.08, 0.12)}>
          <m.div variants={slideUp(0, 16)} className={styles.brandColumn}>
            <div className={styles.brandHeader}>
              <Badge tone="outline" size="sm" className={styles.badge}>
                {copy.navbar.betaLabel}
              </Badge>
              <span className={styles.wordmark}>{copy.navbar.logoLabel}</span>
            </div>
            <p className={styles.tagline}>Tecnología líquida que reacciona a tu intención.</p>

            <ul className={styles.metaList}>
              <li>
                <span className={styles.metaLabel}>Estado</span>
                <span className={styles.metaValue}>Beta Dev · Acceso controlado</span>
              </li>
              <li>
                <span className={styles.metaLabel}>Soporte</span>
                <span className={styles.metaValue}>Respuesta garantizada &lt; 24h</span>
              </li>
            </ul>

          </m.div>

          <m.nav aria-label="Mapa del sitio" className={styles.linksColumn} variants={slideUp(0.02, 18)}>
            <p className={styles.columnTitle}>Explora</p>
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a className={styles.link} href={`#${link.id}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>

          <m.div className={styles.linksColumn} variants={slideUp(0.04, 18)}>
            <p className={styles.columnTitle}>Recursos</p>
            <ul className={styles.links}>
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>

          <m.div className={styles.contactColumn} variants={slideLeft(0.06, 20)}>
            <p className={styles.columnTitle}>Contacto directo</p>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactLabel}>Soporte</span>
                <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                  {contact.email}
                </a>
              </li>
              <li>
                <span className={styles.contactLabel}>Prensa</span>
                <a href={`mailto:${contact.press}`} className={styles.contactLink}>
                  {contact.press}
                </a>
              </li>
              <li>
                <span className={styles.contactLabel}>Teléfono</span>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className={styles.contactLink}>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </m.div>
        </m.div>

        <div className={styles.bottomBar}>
          <p className={styles.legalBlock}>
            © {currentYear} Nebula Labs — Algunos efectos visuales son simulaciones. Batería medida en
            pruebas internas. Diseñado para quienes construyen el futuro.
          </p>
        </div>
      </div>
      </m.footer>
  );
};
