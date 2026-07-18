'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XIcon } from '@phosphor-icons/react';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Container } from '@/components/ui/container/Container';
import styles from './AnnouncementBar.module.css';

export function AnnouncementBar() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className={styles.bar} role="banner" aria-label={locale === 'zh' ? '公告' : 'Announcement'}>
      <Container className={styles.inner}>
        <Link href="/changelog" className={styles.link}>
          <span className={styles.text}>
            {t.nav.announcement}
          </span>
          <span className={styles.separator}>{'\u3000'}</span>
          <span className={styles.action}>
            {t.nav.viewProgress}
            <span aria-hidden> →</span>
          </span>
        </Link>
        <button
          className={styles.close}
          onClick={() => setClosed(true)}
          aria-label={locale === 'zh' ? '关闭公告' : 'Close announcement'}
          type="button"
        >
          <XIcon aria-hidden />
        </button>
      </Container>
    </div>
  );
}
