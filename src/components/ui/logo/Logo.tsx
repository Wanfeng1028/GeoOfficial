import Image from 'next/image';

import { cn } from '@/lib/cn';
import styles from './Logo.module.css';

type LogoVariant = 'on-light' | 'on-dark' | 'gradient';

interface LogoProps {
  className?: string;
  /** Show the full horizontal lockup instead of the symbol alone. */
  wordmark?: boolean;
  /** Use the official light, dark, or gradient asset. */
  variant?: LogoVariant;
  /** Alternative text label for the logo. */
  label?: string;
}

export function Logo({
  className,
  wordmark = false,
  variant = 'on-light',
  label = 'GeoWork',
}: LogoProps) {
  const asset = wordmark
    ? '/GeoWork_Logo_Kit_v1.0/02_Web/Navbar/geowork-logo-horizontal-' + variant + '.svg'
    : '/GeoWork_Logo_Kit_v1.0/02_Web/Navbar/geowork-symbol-' + variant + '.svg';

  return (
    <Image
      src={asset}
      alt={label}
      width={wordmark ? 980 : 260}
      height={260}
      className={cn(
        styles.logo,
        wordmark ? styles.horizontal : styles.symbol,
        className,
      )}
    />
  );
}
