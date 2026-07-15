'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, XIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/container/Container';
import styles from './AnnouncementBar.module.css';

export function AnnouncementBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className={styles.bar} role="banner" aria-label="公告">
      <Container className={styles.inner}>
        <Link href="/changelog" className={styles.link}>
          <span className={styles.text}>
            GeoWork is in active development
          </span>
          <span className={styles.separator}>·</span>
          <span className={styles.action}>
            View progress
            <ArrowRightIcon aria-hidden className={styles.arrow} />
          </span>
        </Link>
        <button
          className={styles.close}
          onClick={() => setClosed(true)}
          aria-label="关闭公告"
          type="button"
        >
          <XIcon aria-hidden />
        </button>
      </Container>
    </div>
  );
}
