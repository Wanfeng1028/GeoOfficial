'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import { platformPageMap, type PlatformPageData } from '@/data/platform-pages';
import styles from './PlatformPageLayout.module.css';

interface PlatformPageLayoutProps {
  data: PlatformPageData;
}

/**
 * Platform 页面共享布局 — v2.5 plan §3.3
 *
 * 结构：Hero → 大型产品媒体 → 至少 4 个能力章节 → 可信信息（引用）→ 相关 Platform 导航 → Final CTA
 * 每个 Platform 子页使用同一布局，内容由 platform-pages.ts 提供。
 */
export function PlatformPageLayout({ data }: PlatformPageLayoutProps) {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const title = isEn ? data.title.en : data.title.zh;
  const description = isEn ? data.description.en : data.description.zh;
  const eyebrow = isEn ? data.eyebrow.en : data.eyebrow.zh;
  const primaryCta = isEn ? data.primaryCta.en : data.primaryCta.zh;
  const secondaryCta = isEn ? data.secondaryCta.en : data.secondaryCta.zh;
  const mediaTitle = isEn ? data.mediaTitle.en : data.mediaTitle.zh;
  const quoteText = isEn ? data.quote.text.en : data.quote.text.zh;
  const quoteAuthor = isEn ? data.quote.author.en : data.quote.author.zh;

  const relatedPages = data.related
    .map((slug) => platformPageMap[slug])
    .filter((p): p is PlatformPageData => p != null);

  const relatedLabel = isEn ? 'Explore more platform' : '探索更多平台能力';

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
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
            <Button asChild variant="primary" size="md">
              <Link href="/platform">{primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href={data.secondaryCtaHref}>{secondaryCta}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 大型产品媒体 ─────────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container>
          <div
            className={styles.mediaWindow}
            data-theme={data.mediaTheme}
            role="img"
            aria-label={mediaTitle}
          >
            <div className={styles.mediaHeader}>
              <div className={styles.mediaDots}>
                <span className={styles.mediaDot} style={{ background: '#d95858' }} />
                <span className={styles.mediaDot} style={{ background: '#d79a37' }} />
                <span className={styles.mediaDot} style={{ background: '#29b36a' }} />
              </div>
              <span className={styles.mediaTitleText}>{mediaTitle}</span>
            </div>
            <div className={styles.mediaBody}>
              <PlatformMediaContent theme={data.mediaTheme} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 能力章节 ─────────────────────────────────────────── */}
      {data.capabilities.map((cap, idx) => {
        const capEyebrow = isEn ? cap.eyebrow.en : cap.eyebrow.zh;
        const capTitle = isEn ? cap.title.en : cap.title.zh;
        const capDesc = isEn ? cap.description.en : cap.description.zh;
        const capBullets = isEn ? cap.bullets.en : cap.bullets.zh;
        const tone = idx % 2 === 0 ? 'canvas' : 'surface';

        return (
          <Section key={cap.id} tone={tone} spacing="default">
            <Container>
              <div className={styles.capGrid}>
                <div className={styles.capLeft}>
                  <p className={styles.capEyebrow}>{capEyebrow}</p>
                  <h2 className={styles.capTitle}>{capTitle}</h2>
                </div>
                <div className={styles.capRight}>
                  <p className={styles.capDesc}>{capDesc}</p>
                  <ul className={styles.capBullets}>
                    {capBullets.map((bullet, bi) => (
                      <li key={bi} className={styles.capBullet}>
                        <span className={styles.capBulletDot} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* ─── 可信信息（引用） ─────────────────────────────────── */}
      <Section tone="surface" spacing="default">
        <Container width="content">
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>{quoteText}</p>
            <footer className={styles.quoteAuthor}>— {quoteAuthor}</footer>
          </blockquote>
        </Container>
      </Section>

      {/* ─── 相关 Platform 横向导航 ───────────────────────────── */}
      {relatedPages.length > 0 && (
        <Section tone="canvas" spacing="default">
          <Container>
            <p className={styles.relatedLabel}>{relatedLabel}</p>
            <div className={styles.relatedGrid}>
              {relatedPages.map((rp) => {
                const rpTitle = isEn ? rp.title.en : rp.title.zh;
                const rpEyebrow = isEn ? rp.eyebrow.en : rp.eyebrow.zh;
                return (
                  <Link key={rp.slug} href={rp.path} className={styles.relatedCard}>
                    <span className={styles.relatedEyebrow}>{rpEyebrow}</span>
                    <span className={styles.relatedTitle}>
                      {rpTitle.split('\n')[0]}
                    </span>
                    <span className={styles.relatedArrow}>
                      <ArrowRightIcon aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <FinalCta />
    </>
  );
}

/**
 * 主题化产品媒体内容 — 根据 mediaTheme 渲染不同的模拟 UI
 */
function PlatformMediaContent({
  theme,
}: {
  theme: PlatformPageData['mediaTheme'];
}) {
  switch (theme) {
    case 'assistant':
      return (
        <div className={styles.mockChat}>
          <div className={styles.mockChatMsg}>
            <span className={styles.mockChatUser}>User</span>
            <p>计算这个项目 2020-2025 年的 NDVI 变化</p>
          </div>
          <div className={styles.mockChatMsg}>
            <span className={styles.mockChatBot}>Assistant</span>
            <p>已找到 Sentinel-2 数据集。正在生成 NDVI 计算任务…</p>
            <div className={styles.mockChatTask}>
              <span className={styles.mockTaskDot} />
              Task: ndvi-calc-2025 · running
            </div>
          </div>
        </div>
      );

    case 'ai':
      return (
        <div className={styles.mockPipeline}>
          {['Plan', 'Execute', 'Verify', 'Report'].map((step, i) => (
            <div key={step} className={styles.mockPipelineStep}>
              <span className={styles.mockPipelineNum}>{i + 1}</span>
              <span className={styles.mockPipelineLabel}>{step}</span>
            </div>
          ))}
        </div>
      );

    case 'data':
      return (
        <div className={styles.mockDataModel}>
          {['Project', 'Dataset', 'Layer', 'Task', 'Artifact'].map((node) => (
            <div key={node} className={styles.mockDataNode}>
              <span className={styles.mockDataNodeIcon} />
              {node}
            </div>
          ))}
        </div>
      );

    case 'context':
      return (
        <div className={styles.mockContextGraph}>
          <div className={styles.mockContextCenter}>Project Context</div>
          <div className={styles.mockContextNodes}>
            {['Data', 'Map', 'Code', 'Tools', 'History'].map((node) => (
              <div key={node} className={styles.mockContextNode}>{node}</div>
            ))}
          </div>
        </div>
      );

    case 'workflows':
      return (
        <div className={styles.mockWorkflow}>
          {['Define', 'Prepare', 'Process', 'Analyze', 'Deliver'].map((step, i) => (
            <div key={step} className={styles.mockWorkflowStep}>
              <span className={styles.mockWorkflowNum}>{i + 1}</span>
              {step}
            </div>
          ))}
        </div>
      );

    case 'task-sequences':
      return (
        <div className={styles.mockTaskQueue}>
          {[
            { name: 'ndvi-batch-2020', status: 'done' },
            { name: 'ndvi-batch-2021', status: 'done' },
            { name: 'ndvi-batch-2022', status: 'running' },
            { name: 'ndvi-batch-2023', status: 'queued' },
          ].map((task) => (
            <div key={task.name} className={styles.mockTaskRow}>
              <span className={styles.mockTaskName}>{task.name}</span>
              <span
                className={styles.mockTaskStatus}
                data-status={task.status}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      );

    case 'research':
      return (
        <div className={styles.mockResearchList}>
          {[
            'Zhang et al. (2024) — Urban green space analysis',
            'Field log — 2025-03-15 Site visit notes',
            'Meeting notes — Advisor weekly review',
            'Paper draft — Chapter 3 methodology',
          ].map((item) => (
            <div key={item} className={styles.mockResearchItem}>
              <span className={styles.mockResearchIcon}>§</span>
              {item}
            </div>
          ))}
        </div>
      );

    case 'reporting':
      return (
        <div className={styles.mockReport}>
          <div className={styles.mockReportHeader} />
          <div className={styles.mockReportChart}>
            <div className={styles.mockReportBar} style={{ height: '40%' }} />
            <div className={styles.mockReportBar} style={{ height: '65%' }} />
            <div className={styles.mockReportBar} style={{ height: '55%' }} />
            <div className={styles.mockReportBar} style={{ height: '80%' }} />
            <div className={styles.mockReportBar} style={{ height: '70%' }} />
          </div>
          <div className={styles.mockReportLines}>
            <div className={styles.mockReportLine} style={{ width: '90%' }} />
            <div className={styles.mockReportLine} style={{ width: '75%' }} />
            <div className={styles.mockReportLine} style={{ width: '85%' }} />
          </div>
        </div>
      );

    case 'developers':
      return (
        <div className={styles.mockCode}>
          <div className={styles.mockCodeLine}>
            <span className={styles.mockCodeComment}># GeoWork Python SDK</span>
          </div>
          <div className={styles.mockCodeLine}>
            <span className={styles.mockCodeKw}>import</span> geowork <span className={styles.mockCodeKw}>as</span> gw
          </div>
          <div className={styles.mockCodeLine}> </div>
          <div className={styles.mockCodeLine}>
            project = gw.open_project(<span className={styles.mockCodeStr}>{"'urban-study'"}</span>)
          </div>
          <div className={styles.mockCodeLine}>
            task = project.tasks.create(<span className={styles.mockCodeStr}>{"'ndvi-calc'"}</span>)
          </div>
          <div className={styles.mockCodeLine}>
            {`task.run(params={'year': 2025})`}
          </div>
        </div>
      );

    default:
      return null;
  }
}
