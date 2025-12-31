import { LazyMotion, MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const loadFeatures = () => import('framer-motion').then((mod) => mod.domAnimation);

export const MotionProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};
