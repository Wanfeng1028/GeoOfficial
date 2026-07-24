'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useReveal } from '@/hooks/useReveal';
import { Container } from '@/components/ui/container/Container';
import { ThemeSection } from '@/components/theme/ThemeSection';
import styles from './EcosystemShowcase.module.css';

const integrations = [
  {
    label: 'QGIS',
    desc: 'Desktop GIS engineering & cartography',
    zhDesc: '桌面 GIS 工程与制图',
    status: 'connected' as const,
  },
  {
    label: 'GDAL',
    desc: 'Raster & vector data conversion',
    zhDesc: '栅格与矢量数据转换',
    status: 'connected' as const,
  },
  {
    label: 'Google Earth Engine',
    desc: 'Cloud-based remote sensing',
    zhDesc: '云端遥感分析',
    status: 'connected' as const,
  },
  {
    label: 'Python',
    desc: 'Geo Worker scripting & analysis',
    zhDesc: 'Geo Worker 脚本与分析',
    status: 'connected' as const,
  },
  {
    label: 'PostGIS',
    desc: 'Spatial database queries',
    zhDesc: '空间数据库查询',
    status: 'planned' as const,
  },
  {
    label: 'MCP',
    desc: 'Model routing & tool invocation',
    zhDesc: '模型路由与工具调用',
    status: 'connected' as const,
  },
  {
    label: 'Skills',
    desc: 'Reusable GIS commands & workflows',
    zhDesc: '可复用 GIS 命令与工作流',
    status: 'connected' as const,
  },
  {
    label: 'Plugins',
    desc: 'Third-party extension interface',
    zhDesc: '第三方扩展接口',
    status: 'planned' as const,
  },
];

export function EcosystemShowcase() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const isEn = locale === 'en';
  const connectedLabel = isEn ? 'Connected' : '已连接';
  const plannedLabel = isEn ? 'Planned' : '计划中';
  const revealRef = useReveal();

  return (
    <ThemeSection theme="dark">
      <section
        id="ecosystem"
        ref={revealRef as React.RefObject<HTMLDivElement | null>}
        className={styles.section}
      >
        <Container>
          <div className={styles.intro}>
            <p className={`${styles.eyebrow} reveal`} data-reveal-delay="0ms">
              {t.ecosystem.eyebrow}
            </p>
            <h2 className={`${styles.title} reveal`} data-reveal-delay="100ms">
              {t.ecosystem.title}
            </h2>
            <p className={`${styles.description} reveal`} data-reveal-delay="200ms">
              {t.ecosystem.description}
            </p>
          </div>

          {/* Icon track */}
          <div className={`${styles.track} reveal`} data-reveal-delay="300ms">
            <div className={styles.trackInner}>
              {[...integrations, ...integrations].map((item, i) => (
                <div key={`${item.label}-${i}`} className={styles.trackItem}>
                  <span className={styles.trackLabel}>{item.label}</span>
                  <span className={`${styles.trackStatus} ${styles[item.status]}`}>
                    {item.status === 'connected' ? connectedLabel : plannedLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SDK / Skills / MCP blocks */}
          <div className={styles.blocks}>
            {t.ecosystem.blocks.map((block, i) => (
              <div
                key={block.title}
                className={`${styles.block} reveal`}
                data-reveal-delay={`${400 + i * 80}ms`}
              >
                <h3 className={styles.blockTitle}>{block.title}</h3>
                <p className={styles.blockDesc}>{block.desc}</p>
              </div>
            ))}
          </div>

          <p className={`${styles.note} reveal`} data-reveal-delay="720ms">
            {t.ecosystem.note}
          </p>
        </Container>
      </section>
    </ThemeSection>
  );
}