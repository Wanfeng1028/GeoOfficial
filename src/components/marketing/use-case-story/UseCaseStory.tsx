import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/ui/button/Button';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import { useCases } from '@/data/use-cases';
import styles from './UseCaseStory.module.css';

export function UseCaseStory() {
  const [urban, ndvi, report] = useCases;

  return (
    <section id="use-cases" className={styles.section} aria-labelledby="cases-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>真实地理空间工作</p>
        <h2 id="cases-title" className={styles.title}>
          从问题到成果的完整工作过程。
        </h2>
        <p className={styles.description}>
          每个案例包含输入、过程、工具、输出和当前可用状态，不用抽象形容词替代成果。
        </p>
      </div>

      {/* 案例 1：城市扩张 — 左文字，右大地图 */}
      {urban && (
        <article className={styles.caseUrban}>
          <div className={styles.caseCopy}>
            <p className={styles.audience}>{urban.audience}</p>
            <h3 className={styles.caseTitle}>{urban.title}</h3>
            <p className={styles.caseDesc}>{urban.description}</p>
            <div className={styles.caseStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>2.3 km²</span>
                <span className={styles.statLabel}>变化面积（2020–2025）</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>87.5%</span>
                <span className={styles.statLabel}>分类精度</span>
              </div>
            </div>
            <p className={styles.status} data-status={urban.status}>
              {urban.status === 'available'
                ? '当前可运行'
                : urban.status === 'preview'
                  ? 'Developer Preview'
                  : '计划中'}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${urban.slug}`}>查看详情</Link>
            </Button>
          </div>
          <MediaFrame className={styles.caseMedia} ratio="16:9" tone="dark">
            <span className={styles.mediaInner}>待替换：城市扩张土地利用变化地图</span>
          </MediaFrame>
        </article>
      )}

      {/* 案例 2：NDVI — 左图表，右地图 */}
      {ndvi && (
        <article className={styles.caseNdvi}>
          <MediaFrame className={styles.caseMediaSmall} ratio="4:3" tone="light">
            <span className={styles.mediaInner}>待替换：NDVI 时间序列图</span>
          </MediaFrame>
          <div className={styles.caseCopy}>
            <p className={styles.audience}>{ndvi.audience}</p>
            <h3 className={styles.caseTitle}>{ndvi.title}</h3>
            <p className={styles.caseDesc}>{ndvi.description}</p>
            <div className={styles.caseStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>0.32 → 0.48</span>
                <span className={styles.statLabel}>NDVI 均值变化</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>6 期</span>
                <span className={styles.statLabel}>Landsat 影像</span>
              </div>
            </div>
            <p className={styles.status} data-status={ndvi.status}>
              {ndvi.status === 'available'
                ? '当前可运行'
                : ndvi.status === 'preview'
                  ? 'Developer Preview'
                  : '计划中'}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${ndvi.slug}`}>查看详情</Link>
            </Button>
          </div>
          <MediaFrame className={styles.caseMediaWide} ratio="16:9" tone="dark">
            <span className={styles.mediaInner}>待替换：NDVI 空间分布地图</span>
          </MediaFrame>
        </article>
      )}

      {/* 案例 3：科研报告 — 全宽组合 */}
      {report && (
        <article className={styles.caseReport}>
          <div className={styles.caseReportIntro}>
            <p className={styles.audience}>{report.audience}</p>
            <h3 className={styles.caseTitle}>{report.title}</h3>
            <p className={styles.caseDesc}>{report.description}</p>
            <p className={styles.status} data-status={report.status}>
              {report.status === 'available'
                ? '当前可运行'
                : report.status === 'preview'
                  ? 'Developer Preview'
                  : '计划中'}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${report.slug}`}>查看详情</Link>
            </Button>
          </div>
          <div className={styles.caseReportGrid}>
            <MediaFrame className={styles.reportMediaMain} ratio="16:9" tone="dark">
              <span className={styles.mediaInner}>待替换：研究报告</span>
            </MediaFrame>
            <MediaFrame className={styles.reportMediaChart} ratio="4:3" tone="light">
              <span className={styles.mediaInner}>待替换：图表</span>
            </MediaFrame>
            <MediaFrame className={styles.reportMediaCode} ratio="16:9" tone="dark">
              <span className={styles.mediaInner}>待替换：代码与引用</span>
            </MediaFrame>
          </div>
        </article>
      )}
    </section>
  );
}