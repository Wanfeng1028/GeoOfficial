import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

type Tone = 'canvas' | 'surface' | 'raised';
type Spacing = 'compact' | 'default' | 'large';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  tone?: Tone;
  spacing?: Spacing;
}

export function Section({
  tone = 'canvas',
  spacing = 'default',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(styles.section, styles[tone], styles[spacing], className)}
      {...props}
    />
  );
}
