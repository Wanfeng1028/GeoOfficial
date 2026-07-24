'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import {
  ecosystemPageList,
  ecosystemCategoryLabels,
  ecosystemStatusLabels,
  type EcosystemCategory,
} from '@/data/ecosystem-pages';
import styles from './EcosystemIndexClient.module.css';

type CategoryFilter = 'all' | EcosystemCategory;

/**
 * Ecosystem 索引页客户端组件 — v2.5 plan Iteration 6
 *
 * 功能：
 * - 关键词搜索（匹配 eyebrow / title / description 双语字段）
 * - 分类过滤（all / desktop / library / language / database / cloud / protocol / workflow / extension）
 * - 状态徽章（connected / planned / partial）
 * - 卡片网格链接到每个详情页
 *
 * 退出标准：Listing 支持搜索和分类。
 */
export function EcosystemIndexClient() {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const heroEyebrow = isEn ? 'Ecosystem' : '生态';
  const heroTitle = isEn
    ? 'Connect your geospatial tool stack'
    : '连接你的地理工具栈';
  const heroDesc = isEn
    ? 'GeoWork connects QGIS, GDAL, Python, GEE, PostGIS, MCP, Skills and Plugins through a unified workspace. Every integration status is real — planned features are not marked as connected.'
    : 'GeoWork 通过统一工作区连接 QGIS、GDAL、Python、GEE、PostGIS、MCP、Skills 和 Plugins。每个集成状态都是真实的——计划中的能力不会被标记为已连接。';

  const searchPlaceholder = isEn
    ? 'Search integrations...'
    : '搜索集成工具...';
  const allLabel = isEn ? 'All' : '全部';
  const filterLabel = isEn ? 'Filter by category' : '按分类过滤';
  const noResultsLabel = isEn
    ? 'No integrations match your search.'
    : '没有匹配的集成工具。';
  const resultsCountLabel = (n: number) =>
    isEn ? `${n} integration${n === 1 ? '' : 's'}` : `${n} 个集成`;

  // 提取所有出现的分类（按 ecosystemPageList 中首次出现顺序排序）
  const categoryOrder: EcosystemCategory[] = useMemo(() => {
    const seen = new Set<EcosystemCategory>();
    const order: EcosystemCategory[] = [];
    for (const page of ecosystemPageList) {
      if (!seen.has(page.category)) {
        seen.add(page.category);
        order.push(page.category);
      }
    }
    return order;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ecosystemPageList.filter((page) => {
      if (activeCategory !== 'all' && page.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        page.eyebrow.zh,
        page.eyebrow.en,
        page.title.zh,
        page.title.en,
        page.description.zh,
        page.description.en,
        page.slug,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <p className={styles.heroEyebrow}>{heroEyebrow}</p>
          <h1 className={styles.heroTitle}>
            {heroTitle.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroDesc}>{heroDesc}</p>
        </Container>
      </Section>

      {/* ─── 搜索 + 过滤 ─────────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <MagnifyingGlassIcon aria-hidden className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={searchPlaceholder}
              />
            </div>

            <div
              className={styles.categoryList}
              role="group"
              aria-label={filterLabel}
            >
              <button
                type="button"
                className={styles.categoryChip}
                data-active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              >
                {allLabel}
              </button>
              {categoryOrder.map((cat) => {
                const label = isEn
                  ? ecosystemCategoryLabels[cat].en
                  : ecosystemCategoryLabels[cat].zh;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={styles.categoryChip}
                    data-active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className={styles.resultMeta}>
            {resultsCountLabel(filtered.length)}
          </p>

          {filtered.length === 0 ? (
            <p className={styles.noResults}>{noResultsLabel}</p>
          ) : (
            <div className={styles.cardGrid}>
              {filtered.map((page) => {
                const eyebrow = isEn ? page.eyebrow.en : page.eyebrow.zh;
                const title = isEn ? page.title.en : page.title.zh;
                const desc = isEn ? page.description.en : page.description.zh;
                const statusLabel = isEn
                  ? ecosystemStatusLabels[page.status].en
                  : ecosystemStatusLabels[page.status].zh;
                const categoryLabel = isEn
                  ? ecosystemCategoryLabels[page.category].en
                  : ecosystemCategoryLabels[page.category].zh;
                return (
                  <Link
                    key={page.slug}
                    href={page.path}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardCategory}>
                        {categoryLabel}
                      </span>
                      <span
                        className={styles.cardStatus}
                        data-status={page.status}
                      >
                        <span className={styles.cardStatusDot} aria-hidden />
                        {statusLabel}
                      </span>
                    </div>
                    <p className={styles.cardEyebrow}>{eyebrow}</p>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.cardDesc}>{desc}</p>
                    <span className={styles.cardCta}>
                      {isEn ? 'View details' : '查看详情'}
                      <ArrowRightIcon aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
