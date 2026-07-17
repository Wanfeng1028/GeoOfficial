'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import type { RouteMeta } from '@/data/routes';
import styles from './SkeletonPage.module.css';

interface SkeletonPageProps {
  route: RouteMeta;
}

/**
 * Skeleton page renderer used by Iteration 1 route skeletons.
 *
 * Each skeleton page:
 * - Renders a unique H1 (from route metadata, bilingual)
 * - Shows a short description (from route metadata)
 * - Binds to the Attio reference page (visible during v2.5 development)
 * - Marks the route as "skeleton" so it's clear the content comes in later iterations
 *
 * Later iterations replace SkeletonPage with real page content section by section.
 */
export function SkeletonPage({ route }: SkeletonPageProps) {
  const { locale } = useLocale();
  const h1 = route.h1[locale];
  const description = route.description[locale];
  const title = route.title[locale];
  const isZh = locale === 'zh';

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          {isZh ? 'GeoWork v2.5 · 路由骨架' : 'GeoWork v2.5 · Route skeleton'}
        </p>
        <h1 className={styles.h1}>{h1}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <span className={styles.statusBadge}>
              {isZh ? '骨架已就绪' : 'Skeleton ready'}
            </span>
            <span className={styles.statusCategory}>
              {isZh ? '分类' : 'Category'}: {route.category}
            </span>
          </div>
          <p className={styles.statusBody}>
            {isZh
              ? '该路由已在 v2.5 Iteration 1 中建立骨架。页面内容将在后续迭代中逐步填充。'
              : 'This route skeleton was established in v2.5 Iteration 1. Page content will be filled in subsequent iterations.'}
          </p>
          {route.attioRef && (
            <p className={styles.attioRef}>
              <span className={styles.attioLabel}>
                {isZh ? 'Attio 参考页：' : 'Attio reference: '}
              </span>
              <a
                href={route.attioRef}
                target="_blank"
                rel="noreferrer"
                className={styles.attioLink}
              >
                {route.attioRef}
              </a>
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.link}>
            {isZh ? '← 返回首页' : '← Back to home'}
          </Link>
          <Link href="/platform" className={styles.link}>
            {isZh ? '了解平台 →' : 'Explore platform →'}
          </Link>
        </div>

        <p className={styles.debugMeta}>
          {isZh ? '页面标题：' : 'Page title: '} {title}
        </p>
      </div>
    </div>
  );
}
