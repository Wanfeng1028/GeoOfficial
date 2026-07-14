import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import styles from './SectionHeading.module.css';

type Align = 'left' | 'center';
type Width = 'text' | 'content';

interface SectionHeadingProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: Align;
  level?: 1 | 2 | 3;
  width?: Width;
  as?: ElementType;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
  width = 'content',
  as,
  className,
  ...props
}: SectionHeadingProps) {
  const Comp = as ?? `h${level}`;
  return (
    <div className={cn(styles.heading, styles[align], styles[width], className)} {...props}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Comp className={styles.title}>{title}</Comp>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
