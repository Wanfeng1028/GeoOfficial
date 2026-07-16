'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Button } from '@/components/ui/button/Button';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import { useCases } from '@/data/use-cases';
import styles from './UseCaseStory.module.css';

export function UseCaseStory() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [urban, ndvi, report] = useCases;

  const statusLabels: Record<string, string> = {
    available: locale === 'zh' ? '当前可运行' : 'Available',
    preview: 'Developer Preview',
    planned: locale === 'zh' ? '计划中' : 'Planned',
  };

  return (
    <section id="use-cases" className={styles.section} aria-labelledby="cases-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t.useCases.eyebrow}</p>
        <h2 id="cases-title" className={styles.title}>
          {t.useCases.title}
        </h2>
        <p className={styles.description}>
          {t.useCases.description}
        </p>
      </div>

      {urban && (
        <article className={styles.caseUrban}>
          <div className={styles.caseCopy}>
            <p className={styles.audience}>{urban.audience}</p>
            <h3 className={styles.caseTitle}>{urban.title}</h3>
            <p className={styles.caseDesc}>{urban.description}</p>
            <div className={styles.caseStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>2.3 km²</span>
                <span className={styles.statLabel}>
                  {locale === 'zh' ? '变化面积（2020–2025）' : 'Change area (2020–2025)'}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>87.5%</span>
                <span className={styles.statLabel}>
                  {locale === 'zh' ? '分类精度' : 'Classification accuracy'}
                </span>
              </div>
            </div>
            <p className={styles.status} data-status={urban.status}>
              {statusLabels[urban.status] ?? urban.status}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${urban.slug}`}>
                {locale === 'zh' ? '查看详情' : 'View details'}
              </Link>
            </Button>
          </div>
          <MediaFrame className={styles.caseMedia} ratio="16:9" tone="light">
            <span className={styles.mediaInner}>
              {locale === 'zh' ? '待替换：城市扩张土地利用变化地图' : 'Placeholder: Urban expansion land use change map'}
            </span>
          </MediaFrame>
        </article>
      )}

      {ndvi && (
        <article className={styles.caseNdvi}>
          <MediaFrame className={styles.caseMediaSmall} ratio="4:3" tone="light">
            <span className={styles.mediaInner}>
              {locale === 'zh' ? '待替换：NDVI 时间序列图' : 'Placeholder: NDVI time series chart'}
            </span>
          </MediaFrame>
          <div className={styles.caseCopy}>
            <p className={styles.audience}>{ndvi.audience}</p>
            <h3 className={styles.caseTitle}>{ndvi.title}</h3>
            <p className={styles.caseDesc}>{ndvi.description}</p>
            <div className={styles.caseStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>0.32 → 0.48</span>
                <span className={styles.statLabel}>
                  {locale === 'zh' ? 'NDVI 均值变化' : 'NDVI mean change'}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{locale === 'zh' ? '6 期' : '6 scenes'}</span>
                <span className={styles.statLabel}>
                  {locale === 'zh' ? 'Landsat 影像' : 'Landsat images'}
                </span>
              </div>
            </div>
            <p className={styles.status} data-status={ndvi.status}>
              {statusLabels[ndvi.status] ?? ndvi.status}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${ndvi.slug}`}>
                {locale === 'zh' ? '查看详情' : 'View details'}
              </Link>
            </Button>
          </div>
          <MediaFrame className={styles.caseMediaWide} ratio="16:9" tone="light">
            <span className={styles.mediaInner}>
              {locale === 'zh' ? '待替换：NDVI 空间分布地图' : 'Placeholder: NDVI spatial distribution map'}
            </span>
          </MediaFrame>
        </article>
      )}

      {report && (
        <article className={styles.caseReport}>
          <div className={styles.caseReportIntro}>
            <p className={styles.audience}>{report.audience}</p>
            <h3 className={styles.caseTitle}>{report.title}</h3>
            <p className={styles.caseDesc}>{report.description}</p>
            <p className={styles.status} data-status={report.status}>
              {statusLabels[report.status] ?? report.status}
            </p>
            <Button
              asChild
              variant="text"
              size="sm"
              trailingIcon={<ArrowRightIcon aria-hidden />}
              className={styles.cta}
            >
              <Link href={`/use-cases/${report.slug}`}>
                {locale === 'zh' ? '查看详情' : 'View details'}
              </Link>
            </Button>
          </div>
          <div className={styles.caseReportGrid}>
            <MediaFrame className={styles.reportMediaMain} ratio="16:9" tone="light">
              <span className={styles.mediaInner}>
                {locale === 'zh' ? '待替换：研究报告' : 'Placeholder: Research report'}
              </span>
            </MediaFrame>
            <MediaFrame className={styles.reportMediaChart} ratio="4:3" tone="light">
              <span className={styles.mediaInner}>
                {locale === 'zh' ? '待替换：图表' : 'Placeholder: Chart'}
              </span>
            </MediaFrame>
            <MediaFrame className={styles.reportMediaCode} ratio="16:9" tone="light">
              <span className={styles.mediaInner}>
                {locale === 'zh' ? '待替换：代码与引用' : 'Placeholder: Code & references'}
              </span>
            </MediaFrame>
          </div>
        </article>
      )}
    </section>
  );
}
