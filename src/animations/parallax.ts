import type { CSSProperties } from 'react';

import { clamp } from '@/lib/clamp';
import { lerp } from '@/lib/lerp';

export type ParallaxAxis = 'x' | 'y' | 'scale';

export interface ParallaxConfig {
  input: [number, number];
  output: [number, number];
  axis?: ParallaxAxis;
  unit?: string;
}

export const parallaxStyle = (progress: number, config: ParallaxConfig): CSSProperties => {
  const { input, output, axis = 'y', unit = 'px' } = config;
  const [inputStart, inputEnd] = input;
  const [outputStart, outputEnd] = output;

  const normalized = clamp(
    (progress - inputStart) / (inputEnd - inputStart || 1),
    0,
    1
  );

  const value = lerp(outputStart, outputEnd, normalized);

  if (axis === 'scale') {
    const scaleValue = clamp(value, 0.5, 2);
    return {
      transform: `scale(${scaleValue})`
    };
  }

  const translate = axis === 'x' ? `translateX(${value}${unit})` : `translateY(${value}${unit})`;

  return {
    transform: translate
  };
};
