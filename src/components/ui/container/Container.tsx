import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/cn';
import styles from './Container.module.css';

type Width = 'wide' | 'default' | 'content' | 'text';

type Props<T extends ElementType> = {
  as?: T;
  width?: Width;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Container<T extends ElementType = 'div'>({
  as,
  width = 'default',
  className,
  ...props
}: Props<T>) {
  const Comp = as ?? 'div';
  return <Comp className={cn(styles.container, styles[width], className)} {...props} />;
}
