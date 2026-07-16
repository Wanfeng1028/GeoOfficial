'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from './LocaleProvider';
import type { Locale } from './locale';
import styles from './LocaleSwitcher.module.css';

const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

export function LocaleSwitcher() {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  function switchLocale() {
    // 当前路径形如 /zh/about 或 /en/about；替换第一段为另一个 locale
    const segments = pathname.split('/');
    // segments[0] === ''（前导斜杠），segments[1] 是 locale
    if (segments.length > 1 && (segments[1] === 'zh' || segments[1] === 'en')) {
      segments[1] = otherLocale;
      router.push(segments.join('/') || '/');
    } else {
      // 无 locale 前缀时，回退到默认 locale 路由
      router.push(`/${otherLocale}`);
    }
  }

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={switchLocale}
      aria-label={`Switch to ${localeLabels[otherLocale]}`}
    >
      {localeLabels[otherLocale]}
    </button>
  );
}
