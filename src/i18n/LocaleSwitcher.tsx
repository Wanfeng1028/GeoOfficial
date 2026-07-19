'use client';

import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/cn';

import { useLocale } from './LocaleProvider';
import type { Locale } from './locale';

import styles from './LocaleSwitcher.module.css';

const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

type LocaleSwitcherVariant = 'control' | 'nav';

interface LocaleSwitcherProps {
  className?: string;
  variant?: LocaleSwitcherVariant;
}

export function LocaleSwitcher({
  className,
  variant = 'control',
}: LocaleSwitcherProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale: Locale =
    locale === 'zh' ? 'en' : 'zh';

  function switchLocale() {
    const segments = pathname.split('/');

    if (
      segments.length > 1 &&
      (segments[1] === 'zh' || segments[1] === 'en')
    ) {
      segments[1] = otherLocale;
      router.push(segments.join('/') || '/');
      return;
    }

    router.push(`/${otherLocale}`);
  }

  return (
    <button
      type="button"
      className={cn(styles.switcher, className)}
      data-variant={variant}
      onClick={switchLocale}
      aria-label={
        locale === 'zh'
          ? 'Switch to English'
          : '切换到中文'
      }
    >
      {localeLabels[otherLocale]}
    </button>
  );
}
