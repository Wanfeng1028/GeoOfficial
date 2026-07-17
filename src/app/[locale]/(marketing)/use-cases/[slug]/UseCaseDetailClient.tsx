'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useCases } from '@/data/use-cases';
import { getPlatformPage } from '@/data/platform-pages';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import styles from './entry.module.css';

interface UseCaseDetailClientProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * Use Case 详情页客户端布局 — v2.5 plan Iteration 7
 *
 * 退出标准：
 * - 案例包含问题、数据、工具、流程、验证和成果（由 MDX 内容提供）
 * - 无无来源数字（MDX 中所有数据源已标注）
 * - 有下一案例导航
 * - 有相关 Platform 能力
 * - 详情页达到完整案例模板要求
 */
export function UseCaseDetailClient({ slug, children }: UseCaseDetailClientProps) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.useCases;
  const isEn = locale === 'en';

  const item = useCases.find((entry) => entry.slug === slug)!;

  // 下一案例：在 useCases 数组中循环找下一个
  const currentIdx = useCases.findIndex((entry) => entry.slug === slug);
  const nextItem = useCases[(currentIdx + 1) % useCases.length];

  // 相关 Platform 能力
  const relatedPlatformPages = item.relatedPlatform
    .map((s) => getPlatformPage(s))
    .filter((pp): pp is NonNullable<ReturnType<typeof getPlatformPage>> => pp != null);

  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <nav aria-label={isEn ? 'Breadcrumb' : '面包屑'} className={styles.breadcrumb}>
            <Link href="/use-cases" className={styles.breadcrumbLink}>
              {p.hero.eyebrow}
            </Link>
            <span aria-hidden> · </span>
            <span className={styles.breadcrumbCurrent}>
              {isEn ? item.enTitle : item.title}
            </span>
          </nav>

          <p className={styles.audience}>
            {isEn ? item.enAudience : item.audience}
          </p>
          <h1 className={styles.title}>
            {isEn ? item.enTitle : item.title}
          </h1>
          <p className={styles.status} data-status={item.status}>
            {item.status === 'available'
              ? p.status.available
              : item.status === 'preview'
                ? p.status.preview
                : p.status.planned}
          </p>
          <p className={styles.description}>
            {isEn ? item.enDescription : item.description}
          </p>
        </Container>
      </Section>

      <Section tone="canvas" spacing="large">
        <Container width="content">
          <figure className={styles.cover}>
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={1800}
              height={1200}
              sizes="(max-width: 768px) 100vw, 720px"
              className={styles.coverImage}
            />
            <figcaption className={styles.coverCaption}>{item.imageAlt}</figcaption>
          </figure>

          <article className={styles.prose}>
            {children}
          </article>

          <div className={styles.actions}>
            <Button asChild variant="primary" size="md">
              <Link href="/download">{p.downloadGeoWork}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">{p.backToList}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 相关平台能力 ────────────────────────────────────── */}
      {relatedPlatformPages.length > 0 && (
        <Section tone="surface" spacing="default">
          <Container>
            <p className={styles.relatedLabel}>{p.relatedPlatform}</p>
            <div className={styles.relatedGrid}>
              {relatedPlatformPages.map((platform) => {
                const pEyebrow = isEn ? platform.eyebrow.en : platform.eyebrow.zh;
                const pTitle = isEn ? platform.title.en : platform.title.zh;
                const pDesc = isEn ? platform.description.en : platform.description.zh;
                return (
                  <Link
                    key={platform.slug}
                    href={platform.path}
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedEyebrow}>{pEyebrow}</span>
                    <span className={styles.relatedTitle}>{pTitle}</span>
                    <span className={styles.relatedDesc}>{pDesc}</span>
                    <ArrowRightIcon
                      aria-hidden
                      className={styles.relatedArrow}
                    />
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 下一案例 ────────────────────────────────────────── */}
      {nextItem && nextItem.slug !== slug && (
        <Section tone="canvas" spacing="default">
          <Container>
            <p className={styles.nextLabel}>{p.nextCase}</p>
            <Link href={`/use-cases/${nextItem.slug}`} className={styles.nextCard}>
              <div className={styles.nextCopy}>
                <span className={styles.nextAudience}>
                  {isEn ? nextItem.enAudience : nextItem.audience}
                </span>
                <span className={styles.nextTitle}>
                  {isEn ? nextItem.enTitle : nextItem.title}
                </span>
                <span className={styles.nextDesc}>
                  {isEn ? nextItem.enDescription : nextItem.description}
                </span>
              </div>
              <ArrowRightIcon aria-hidden className={styles.nextArrow} />
            </Link>
          </Container>
        </Section>
      )}

      <FinalCta />
    </>
  );
}
