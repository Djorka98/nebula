import { vars } from '@/styles/tokens.css';

type Breakpoint = keyof typeof vars.breakpoints;

type QueryType = 'min' | 'max';

const buildQuery = (type: QueryType, breakpoint: Breakpoint): string => {
  return `@media (${type}-width: ${vars.breakpoints[breakpoint]})`;
};

export const media = {
  up: (breakpoint: Breakpoint): string => buildQuery('min', breakpoint),
  down: (breakpoint: Breakpoint): string => buildQuery('max', breakpoint),
  between: (min: Breakpoint, max: Breakpoint): string => {
    return `@media (min-width: ${vars.breakpoints[min]}) and (max-width: ${vars.breakpoints[max]})`;
  }
};

export type MediaHelpers = typeof media;
