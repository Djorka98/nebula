import type { ComponentPropsWithoutRef, ElementType, Ref } from 'react';
import { forwardRef } from 'react';

import { cx } from '@/lib/cx';

import styles from './Container.module.scss';

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  fullBleed?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'ref'>;

const ContainerBase = (
  { as, fullBleed = false, className, ...rest }: ContainerProps<ElementType>,
  ref: Ref<HTMLElement>
) => {
  const Component = (as ?? 'div') as ElementType;

  return (
    <Component
      ref={ref}
      className={cx(styles.container, fullBleed && styles.fullBleed, className)}
      {...rest}
    />
  );
};

export const Container = forwardRef(ContainerBase) as <T extends ElementType = 'div'>(
  props: ContainerProps<T> & { ref?: Ref<HTMLElement> }
) => JSX.Element;
