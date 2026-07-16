'use client';

import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import styles from './page.module.css';

const layers = [
  {
    label: 'Desktop Layer',
    detail: 'Electron + React + TypeScript',
    descriptionKey: 'desktop' as const,
  },
  {
    label: 'Go Runtime',
    detail: 'Core 运行时与任务编排',
    descriptionKey: 'goRuntime' as const,
  },
  {
    label: 'Python Geo Worker',
    detail: 'FastAPI 地理空间 Worker',
    descriptionKey: 'pythonWorker' as const,
  },
  {
    label: 'Tools',
    detail: 'QGIS · GDAL · Google Earth Engine',
    descriptionKey: 'tools' as const,
  },
  {
    label: 'Skills / MCP',
    detail: '可扩展能力',
    descriptionKey: 'skillsMcp' as const,
  },
];

// Layer descriptions in both languages
const layerDescriptions: Record<string, { zh: string; en: string }> = {
  desktop: {
    zh: '用户界面层，处理布局、交互、媒体渲染。使用 Radix UI 组件库，CSS Modules 样式隔离。',
    en: 'User interface layer handling layout, interaction, and media rendering. Uses Radix UI component library with CSS Modules for style isolation.',
  },
  goRuntime: {
    zh: '项目生命周期管理、任务调度、数据索引、Skills 注册与 MCP 连接。本地优先，不依赖云服务。',
    en: 'Project lifecycle management, task scheduling, data indexing, Skills registration, and MCP connections. Local-first, no cloud dependency.',
  },
  pythonWorker: {
    zh: 'Python 工作进程处理地理空间计算：GDAL 操作、遥感分析、模型推理。通过 HTTP 与 Go Runtime 通信。',
    en: 'Python worker process for geospatial computing: GDAL operations, remote sensing analysis, model inference. Communicates with Go Runtime via HTTP.',
  },
  tools: {
    zh: 'GeoWork 通过 Command Skills 调用已安装的专业工具，不重复实现已有功能。',
    en: 'GeoWork calls installed professional tools through Command Skills, without reimplementing existing functionality.',
  },
  skillsMcp: {
    zh: 'Skills 是可组合的工作单元，MCP 是 Model Context Protocol 扩展点。支持第三方开发。',
    en: 'Skills are composable work units. MCP is the Model Context Protocol extension point. Supports third-party development.',
  },
};

export function DevelopersPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.developers;
  const isZh = locale === 'zh';

  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container>
          <SectionHeading
            eyebrow={p.hero.eyebrow}
            title={p.hero.title}
            description={p.hero.description}
            level={1}
          />
        </Container>
      </Section>

      <Section tone="surface" spacing="default">
        <Container>
          <div className={styles.layers}>
            {layers.map((layer) => (
              <article key={layer.label} className={styles.layerCard}>
                <div className={styles.layerHead}>
                  <h2 className={styles.layerTitle}>{layer.label}</h2>
                  <span className={styles.layerDetail}>{layer.detail}</span>
                </div>
                <p className={styles.layerDesc}>
                  {isZh
                    ? layerDescriptions[layer.descriptionKey].zh
                    : layerDescriptions[layer.descriptionKey].en}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised" spacing="default">
        <Container>
          <SectionHeading
            eyebrow={p.localFirst.eyebrow}
            title={p.localFirst.title}
            description={p.localFirst.description}
          />
        </Container>
      </Section>
    </>
  );
}