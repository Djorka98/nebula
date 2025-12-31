import { style } from '@vanilla-extract/css';

import { vars } from './tokens.css';

const fontStack = "'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif";

const baseText = {
  fontFamily: fontStack,
  fontWeight: 400,
  margin: 0
} as const;

export const typography = {
  headline: style([
    baseText,
    {
      fontWeight: 600,
      fontSize: 'clamp(2.5rem, 3vw + 1rem, 6rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: vars.color.text
    }
  ]),
  subhead: style([
    baseText,
    {
      fontWeight: 500,
      fontSize: 'clamp(1.5rem, 2vw + 1rem, 3.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      color: vars.color.text
    }
  ]),
  body: style([
    baseText,
    {
      fontSize: 'clamp(1rem, 0.35vw + 0.95rem, 1.25rem)',
      lineHeight: 1.6,
      color: vars.color.text
    }
  ]),
  muted: style([
    baseText,
    {
      fontSize: 'clamp(1rem, 0.3vw + 0.9rem, 1.15rem)',
      lineHeight: 1.6,
      color: vars.color.textMuted
    }
  ]),
  caption: style([
    baseText,
    {
      fontSize: 'clamp(0.875rem, 0.2vw + 0.8rem, 1rem)',
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: vars.color.textMuted
    }
  ])
} as const;
