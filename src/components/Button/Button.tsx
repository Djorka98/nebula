import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cx } from '@/lib/cx';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: string;
  leadingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      type = 'button',
      className,
      isLoading = false,
      loadingLabel = 'Cargando',
      disabled,
      leadingIcon,
      children,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={cx(styles.button, styles[variant], styles[size], className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-live="polite"
        data-variant={variant}
        {...rest}
      >
        {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
        <span className={cx(isLoading && styles.labelHidden)}>{children}</span>
        {isLoading && (
          <span className={styles.loadingIndicator} role="status" aria-label={loadingLabel} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
