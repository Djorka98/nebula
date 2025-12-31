import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Badge.module.scss';

type BadgeTone = 'neutral' | 'brand' | 'success' | 'outline';
type BadgeSize = 'sm' | 'md';

type BadgeOwnProps = {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
  children?: ReactNode;
};

type PolymorphicProps<T extends ElementType> = BadgeOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BadgeOwnProps | 'as'>;

export const Badge = <T extends ElementType = 'span'>(
  {
    as,
    tone = 'neutral',
    size = 'md',
    icon,
    className,
    children,
    ...rest
  }: PolymorphicProps<T>
): JSX.Element => {
  const Component = (as ?? 'span') as ElementType;

  return (
    <Component
      className={cx(styles.badge, styles[tone], styles[size], icon && styles.withIcon, className)}
      {...rest}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </Component>
  );
};

Badge.displayName = 'Badge';
