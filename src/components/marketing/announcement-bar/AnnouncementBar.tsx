'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XIcon } from '@phosphor-icons/react';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';

import styles from './AnnouncementBar.module.css';

export function AnnouncementBar() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [closed, setClosed] = useState(false);
  const [exiting, setExiting] = useState(false);

  if (closed) {
    return null;
  }

  const handleClose = () => {
    setExiting(true);
    // 等 crossfade 动画结束后再移除 DOM
    setTimeout(() => setClosed(true), 260);
  };

  return (
    <div
      className={`${styles.bar}${exiting ? ` crossfade-exit-active` : ''}`}
      role="banner"
      aria-label={locale === 'zh' ? '网站公告' : 'Site announcement'}
    >
      <div className={`${styles.inner}${exiting ? ` crossfade-exit-active` : ''}`}>
        <Link
          href={`/${locale}/changelog`}
          className={styles.link}
        >
          <span className={styles.message}>
            {t.nav.announcement}
          </span>

          <span className={styles.action}>
            {t.nav.viewProgress}
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label={
            locale === 'zh'
              ? '关闭网站公告'
              : 'Close site announcement'
          }
        >
          <XIcon
            size={15}
            weight="bold"
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}
