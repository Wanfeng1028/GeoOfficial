'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  BookOpenIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import {
  ecosystemPageMap,
  ecosystemCategoryLabels,
  ecosystemStatusLabels,
  type EcosystemPageData,
} from '@/data/ecosystem-pages';
import styles from './EcosystemDetailLayout.module.css';

interface EcosystemDetailLayoutProps {
  data: EcosystemPageData;
}

/**
 * Ecosystem 详情页共享布局 — v2.5 plan Iteration 6
 *
 * 结构：Hero（含状态徽章）→ 核心能力（feature 卡片）→ 文档/仓库链接 →
 *      引用 → 相关生态工具 → Final CTA
 *
 * 退出标准：
 * - 每个详情页有真实状态（未实现能力不标记为已连接）
 * - 详情页结构统一
 * - 有文档和相关工具入口
 */
export function EcosystemDetailLayout({ data }: EcosystemDetailLayoutProps) {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const eyebrow = isEn ? data.eyebrow.en : data.eyebrow.zh;
  const title = isEn ? data.title.en : data.title.zh;
  const description = isEn ? data.description.en : data.description.zh;
  const categoryLabel = isEn
    ? ecosystemCategoryLabels[data.category].en
    : ecosystemCategoryLabels[data.category].zh;
  const statusLabel = isEn
    ? ecosystemStatusLabels[data.status].en
    : ecosystemStatusLabels[data.status].zh;
  const quoteText = isEn ? data.quote.text.en : data.quote.text.zh;
  const quoteAuthor = isEn ? data.quote.author.en : data.quote.author.zh;

  const relatedPages = data.related
    .map((slug) => ecosystemPageMap[slug])
    .filter((p): p is EcosystemPageData => p != null);

  const docsLabel = isEn ? 'Read the docs' : '阅读文档';
  const repoLabel = isEn ? 'View repository' : '查看仓库';
  const backLabel = isEn ? 'All ecosystem' : '全部生态';
  const featuresLabel = isEn ? 'Capabilities' : '核心能力';
  const relatedLabel = isEn ? 'Related tools' : '相关工具';

  return (
    <>
      {/* ─── Hero（含状态徽章） ─────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <div className={styles.heroMeta}>
            <Link href="/ecosystem" className={styles.heroBack}>
              <ArrowRightIcon aria-hidden className={styles.heroBackIcon} />
              {backLabel}
            </Link>
            <span className={styles.heroCategory}>{categoryLabel}</span>
            <span
              className={styles.heroStatus}
              data-status={data.status}
            >
              <span className={styles.heroStatusDot} aria-hidden />
              {statusLabel}
            </span>
          </div>

          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroDesc}>{description}</p>

          <div className={styles.heroActions}>
            <Button
              asChild
              variant="primary"
              size="md"
              leadingIcon={<BookOpenIcon aria-hidden />}
            >
              <a href={data.docsUrl} target="_blank" rel="noreferrer">
                {docsLabel}
                <ArrowUpRightIcon aria-hidden />
              </a>
            </Button>
            {data.repoUrl && (
              <Button asChild variant="secondary" size="md">
                <a href={data.repoUrl} target="_blank" rel="noreferrer">
                  {repoLabel}
                  <ArrowUpRightIcon aria-hidden />
                </a>
              </Button>
            )}
          </div>
        </Container>
      </Section>

      {/* ─── 核心能力 ────────────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container>
          <p className={styles.featuresLabel}>{featuresLabel}</p>
          <div className={styles.featuresGrid}>
            {data.features.map((feature, idx) => {
              const fTitle = isEn ? feature.title.en : feature.title.zh;
              const fDesc = isEn
                ? feature.description.en
                : feature.description.zh;
              return (
                <article key={feature.id} className={styles.featureCard}>
                  <span className={styles.featureIndex} aria-hidden>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.featureTitle}>{fTitle}</h3>
                  <p className={styles.featureDesc}>{fDesc}</p>
                </article>
              );
            })}
          </div>

          {data.status !== 'connected' && (
            <p className={styles.planNote}>
              {isEn
                ? 'This integration is in planning or partial stage. Capabilities listed above reflect the target design, not the current implementation.'
                : '此项集成处于计划或部分支持阶段。上方列出的能力反映目标设计,而非当前实现。'}
            </p>
          )}
        </Container>
      </Section>

      {/* ─── 引用 ────────────────────────────────────────────── */}
      <Section tone="canvas" spacing="default">
        <Container width="content">
          <figure className={styles.quote}>
            <blockquote className={styles.quoteText}>{quoteText}</blockquote>
            <figcaption className={styles.quoteAuthor}>
              — {quoteAuthor}
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* ─── 相关生态工具 ────────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container>
          <p className={styles.relatedLabel}>{relatedLabel}</p>
          <div className={styles.relatedGrid}>
            {relatedPages.map((related) => {
              const rEyebrow = isEn
                ? related.eyebrow.en
                : related.eyebrow.zh;
              const rTitle = isEn ? related.title.en : related.title.zh;
              const rStatus = isEn
                ? ecosystemStatusLabels[related.status].en
                : ecosystemStatusLabels[related.status].zh;
              return (
                <Link
                  key={related.slug}
                  href={related.path}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedEyebrow}>{rEyebrow}</span>
                  <span className={styles.relatedTitle}>{rTitle}</span>
                  <span
                    className={styles.relatedStatus}
                    data-status={related.status}
                  >
                    {rStatus}
                  </span>
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

      <FinalCta />
    </>
  );
}
