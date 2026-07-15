import type { Metadata } from 'next';
import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '开发者 · GeoWork',
  description: 'GeoWork 开发者文档、架构参考和扩展指南。',
};

const layers = [
  {
    label: 'Desktop Layer',
    detail: 'Electron + React + TypeScript',
    description: '用户界面层，处理布局、交互、媒体渲染。使用 Radix UI 组件库，CSS Modules 样式隔离。',
  },
  {
    label: 'Go Runtime',
    detail: 'Core 运行时与任务编排',
    description: '项目生命周期管理、任务调度、数据索引、Skills 注册与 MCP 连接。本地优先，不依赖云服务。',
  },
  {
    label: 'Python Geo Worker',
    detail: 'FastAPI 地理空间 Worker',
    description: 'Python 工作进程处理地理空间计算：GDAL 操作、遥感分析、模型推理。通过 HTTP 与 Go Runtime 通信。',
  },
  {
    label: 'Tools',
    detail: 'QGIS · GDAL · Google Earth Engine',
    description: 'GeoWork 通过 Command Skills 调用已安装的专业工具，不重复实现已有功能。',
  },
  {
    label: 'Skills / MCP',
    detail: '可扩展能力',
    description: 'Skills 是可组合的工作单元，MCP 是 Model Context Protocol 扩展点。支持第三方开发。',
  },
];

export default function DevelopersPage() {
  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container>
          <SectionHeading
            eyebrow="开发者"
            title="在清晰的本地架构之上扩展。"
            description="Desktop → Go Runtime → Python Worker → Tools → Skills / MCP，每一层职责明确。"
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
                <p className={styles.layerDesc}>{layer.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Local-first"
            title="本地优先，不依赖云服务。"
            description="所有核心功能在本地运行。数据、配置和成果保留在用户本地，不经过第三方服务器。"
          />
        </Container>
      </Section>
    </>
  );
}

