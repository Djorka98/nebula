import type { PropsWithChildren } from 'react';

import styles from './StickyViewport.module.scss';

export const StickyViewport = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <section className={styles.viewport} aria-label="Hero viewport">
      {children}
    </section>
  );
};
