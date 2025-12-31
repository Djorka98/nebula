import { m } from 'framer-motion';
import type Lenis from 'lenis';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/svg/logo.svg';
import { copy } from '@/data/copy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';
import { smoothScrollTo } from '@/lib/smoothScrollTo';

import styles from './Navbar.module.scss';
import useAutohide from './useAutohide';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

const sectionIds = copy.navbar.links.map((link) => link.id);
const heroSectionId = 'hero';
const observedIds = [heroSectionId, ...sectionIds];

const SCROLL_THRESHOLD = 24;

export const Navbar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const hidden = useAutohide();

  useEffect(() => {
    if (location.pathname === '/reservar') {
      setActiveSection('reservar');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > SCROLL_THRESHOLD);
    };

    const handleScroll = () => {
      window.requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const first = visible[0];

          if (first.target.id === heroSectionId) {
            setActiveSection(null);
            return;
          }

          if (sectionIds.includes(first.target.id)) {
            setActiveSection(first.target.id);
            return;
          }
        }

        if (window.scrollY < SCROLL_THRESHOLD * 2) {
          setActiveSection(null);
        }
      },
      {
        rootMargin: '-55% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    observedIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const scrollToSection = useCallback((id: string) => {
    if (id === 'reservar') {
      navigate('/reservar');
      return;
    }

    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }

    smoothScrollTo(`#${id}`, {
      offset: -88,
      disableSmoothing: prefersReducedMotion,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [isHome, navigate, prefersReducedMotion]);


  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const lenis = window.__lenis;

    if (lenis) {
      lenis.scrollTo(0, { offset: 0 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [prefersReducedMotion]);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      setIsMenuOpen(false);
      if (id === 'reservar') {
        setActiveSection('reservar');
        navigate('/reservar');
        return;
      }

      if (!isHome) {
        setActiveSection(id);
        navigate(`/#${id}`);
        return;
      }

      scrollToSection(id);
    },
    [isHome, navigate, scrollToSection]
  );

  const handleLogoClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsMenuOpen(false);
      scrollToTop();
      setActiveSection(null);
    },
    [scrollToTop]
  );

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.removeProperty('overflow');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <m.header
      data-hidden={hidden}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cx(styles.navbar, isScrolled && styles.scrolled)}
    >
      <div className={styles.surface}>
        <a
          className={styles.logo}
          href="#hero"
          aria-label="Nebula One"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Nebula One" width={26} height={26} />
          {copy.navbar.logoLabel}
        </a>
        <nav aria-label="Secciones principales" className={styles.navigation}>
          <ul className={styles.links}>
            {copy.navbar.links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={styles.link}
                  onClick={(event) => handleNavClick(event, link.id)}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <span className={styles.beta} aria-hidden="true">
            {copy.navbar.betaLabel}
          </span>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span aria-hidden="true" className={styles.toggleLabel}>
              Menu
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.mobileClose}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            ×
          </button>
          {copy.navbar.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.mobileLink}
              onClick={(event) => handleNavClick(event, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
      <span className={styles.progress} aria-hidden />
    </m.header>
  );
};
