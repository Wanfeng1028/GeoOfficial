'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import type { ArticleMeta } from '@/data/articles';
import { sectionIndexPath } from '@/data/articles';
import styles from './ArticleDetailLayout.module.css';

interface ArticleDetailLayoutProps {
  article: ArticleMeta;
  children: React.ReactNode;
}

/**
 * 资源详情页共享布局 — v2.5 plan Iteration 8
 *
 * 用于 blog / engineering / help / learn 四类详情页。
 *
 * 结构:
 * - 面包屑(返回 section 索引)
 * - Hero: eyebrow(section 标签) + H1 + 元信息(日期 / 作者 / 阅读时长) + 描述
 * - Prose: MDX 渲染内容
 * - 标签(可选)
 * - 底部 CTA: 返回 section 列表
 * - FinalCta
 */
export function ArticleDetailLayout({
  article,
  children,
}: ArticleDetailLayoutProps) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const a = t.pages.article;
  const isEn = locale === 'en';

  const title = isEn ? article.title.en : article.title.zh;
  const description = isEn ? article.description.en : article.description.zh;
  const author = article.author
    ? isEn
      ? article.author.en
      : article.author.zh
    : null;
  const readingTime = article.readingTime
    ? isEn
      ? article.readingTime.en
      : article.readingTime.zh
    : null;
  const tags = article.tags
    ? isEn
      ? article.tags.en
      : article.tags.zh
    : null;

  const sectionLabel = a.sectionLabels[article.section];
  const indexPath = sectionIndexPath[article.section];

  // 格式化日期:zh 用 YYYY-MM-DD,en 用 Mon DD, YYYY
  const dateObj = new Date(article.date);
  const formattedDate = isEn
    ? dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <nav aria-label={isEn ? 'Breadcrumb' : '面包屑'} className={styles.breadcrumb}>
            <Link href={indexPath} className={styles.breadcrumbLink}>
              {sectionLabel}
            </Link>
            <span aria-hidden className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{title}</span>
          </nav>

          <p className={styles.eyebrow}>{sectionLabel}</p>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>{a.publishedOn}</span>
              <span className={styles.metaValue}>{formattedDate}</span>
            </span>
            {author && (
              <span className={styles.metaItem}>
                <span className={styles.metaLabel}>{a.by}</span>
                <span className={styles.metaValue}>{author}</span>
              </span>
            )}
            {readingTime && (
              <span className={styles.metaItem}>
                <span className={styles.metaLabel}>{a.readingTime}</span>
                <span className={styles.metaValue}>{readingTime}</span>
              </span>
            )}
          </div>

          <p className={styles.description}>{description}</p>
        </Container>
      </Section>

      {/* ─── Prose ───────────────────────────────────────── */}
      <Section tone="canvas" spacing="large">
        <Container width="content">
          <article className={styles.prose}>{children}</article>

          {tags && tags.length > 0 && (
            <div className={styles.tagsRow}>
              <span className={styles.tagsLabel}>{a.tagsLabel}</span>
              <ul className={styles.tagsList}>
                {tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.actions}>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href={indexPath}>{a.backToList}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
