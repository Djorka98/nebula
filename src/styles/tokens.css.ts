import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    bg: '#0a0c12',
    surface: '#111624',
    text: '#f3f5fb',
    textMuted: 'rgba(215, 222, 240, 0.72)',
    line: 'rgba(255, 255, 255, 0.08)',
    brand: '#7c8cff',
    brandAlt: '#5ac8fa',
    glass: 'rgba(17, 22, 36, 0.45)',
    overlay: 'rgba(5, 7, 12, 0.68)',
    success: '#4cd989',
    warn: '#ffb84a',
    danger: '#ff6f6f'
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px'
  },
  radii: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '28px',
    pill: '999px'
  },
  shadows: {
    sm: '0 8px 18px rgba(4, 6, 12, 0.28)',
    md: '0 18px 42px rgba(4, 6, 14, 0.36)',
    lg: '0 36px 84px rgba(2, 3, 8, 0.45)'
  },
  dur: {
    fast: '120ms',
    base: '220ms',
    slow: '420ms'
  },
  ease: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.76, 0, 0.24, 1)'
  },
  zIndex: {
    base: '0',
    header: '10',
    overlay: '20',
    modal: '30',
    max: '999'
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  }
} as const);

export type ThemeVars = typeof vars;
