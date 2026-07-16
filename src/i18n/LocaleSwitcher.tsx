'use client';

import { useLocale } from './LocaleProvider';
import { locales } from './locale';
import type { Locale } from './locale';
import styles from './LocaleSwitcher.module.css';

const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={() => setLocale(otherLocale)}
      aria-label={`Switch to ${localeLabels[otherLocale]}`}
    >
      {localeLabels[otherLocale]}
    </button>
  );
}