import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Figure.module.css';

interface FigureProps extends HTMLAttributes<HTMLElement> {
  fig: string;
  title: string;
  note?: string;
  source?: string;
  children?: ReactNode;
}

export function Figure({
  fig,
  title,
  note,
  source,
  children,
  className,
  ...props
}: FigureProps) {
  return (
    <figure className={cn(styles.figure, className)} {...props}>
      {children}
      <figcaption className={styles.caption}>
        <p className={styles.fig}>
          <span className={styles.figIndex}>FIG {fig}</span>
          <span className={styles.figTitle}>{title}</span>
        </p>
        {note ? <p className={styles.note}>{note}</p> : null}
        {source ? <p className={styles.source}>来源 · {source}</p> : null}
      </figcaption>
    </figure>
  );
}
