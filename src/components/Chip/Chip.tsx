import type { HTMLAttributes, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Chip.module.scss';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  withIndicator?: boolean;
  indicatorColor?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const Chip = ({
  withIndicator = false,
  indicatorColor,
  icon,
  className,
  children,
  ...rest
}: ChipProps): JSX.Element => {
  return (
    <span className={cx(styles.chip, className)} {...rest}>
      {withIndicator && (
        <span
          className={styles.dot}
          style={indicatorColor ? { background: indicatorColor } : undefined}
          aria-hidden="true"
        />
      )}
      {icon}
      {children}
    </span>
  );
};
