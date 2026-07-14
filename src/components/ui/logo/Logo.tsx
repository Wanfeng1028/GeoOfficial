import { cn } from '@/lib/cn';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  /** show wordmark beside the mark */
  wordmark?: boolean;
  /** alternative text label for the mark */
  label?: string;
}

export function Logo({ className, wordmark = false, label = 'GeoWork' }: LogoProps) {
  return (
    <span className={cn(styles.logo, className)} aria-label={label}>
      <svg
        className={styles.mark}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        role="presentation"
      >
        <path
          d="M5 3.5 L19 20 L5 20 Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M5 3.5 L19 3.5 L13 11.5 Z"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>
      {wordmark ? <span className={styles.wordmark}>GeoWork</span> : null}
    </span>
  );
}
