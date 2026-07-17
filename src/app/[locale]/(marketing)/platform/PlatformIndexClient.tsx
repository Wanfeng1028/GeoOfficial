'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import { platformPages, type PlatformPageData } from '@/data/platform-pages';
import { getRouteMeta } from '@/data/routes';
import styles from './PlatformIndexClient.module.css';

/**
 * Platform 索引页 — v2.5 Iteration 5
 *
 * 展示 9 个平台能力的概览，每个卡片链接到对应的平台子页。
 */
export function PlatformIndexClient() {
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const route = getRouteMeta('/platform')!;

  const h1 = isEn ? route.h1.en : route.h1.zh;
  const description = isEn ? route.description.en : route.description.zh;
  const eyebrow = isEn ? 'Platform' : '平台';
  const exploreLabel = isEn ? 'Explore platform' : '了解平台';
  const viewCasesLabel = isEn ? 'View use cases' : '查看使用案例';

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1 className={styles.heroTitle}>{h1}</h1>
          <p className={styles.heroDesc}>{description}</p>
          <div className={styles.heroActions}>
            <Button asChild variant="primary" size="md">
              <Link href="/platform/assistant">{exploreLabel}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">{viewCasesLabel}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 平台能力卡片网格 ─────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container>
          <div className={styles.cardGrid}>
            {platformPages.map((page: PlatformPageData) => {
              const cardEyebrow = isEn ? page.eyebrow.en : page.eyebrow.zh;
              const cardTitle = isEn ? page.title.en : page.title.zh;
              const cardDesc = isEn ? page.description.en : page.description.zh;

              return (
                <Link key={page.slug} href={page.path} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrow}>{cardEyebrow}</span>
                    <span
                      className={styles.cardIcon}
                      data-theme={page.mediaTheme}
                      aria-hidden
                    >
                      <span className={styles.cardIconDot} />
                    </span>
                  </div>
                  <h2 className={styles.cardTitle}>
                    {cardTitle.split('\n')[0]}
                  </h2>
                  <p className={styles.cardDesc}>{cardDesc}</p>
                  <span className={styles.cardArrow}>
                    <ArrowRightIcon aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <FinalCta />
    </>
  );
}
