import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { siteConfig } from '@/lib/site';
import styles from './EcosystemShowcase.module.css';

const integrations = [
  { label: 'QGIS', desc: '桌面 GIS 工程与制图', status: 'connected' as const },
  { label: 'GDAL', desc: '栅格与矢量数据转换', status: 'connected' as const },
  { label: 'Google Earth Engine', desc: '云端遥感数据处理', status: 'connected' as const },
  { label: 'Python', desc: 'Geo Worker 脚本与分析', status: 'connected' as const },
  { label: 'PostGIS', desc: '空间数据库查询', status: 'planned' as const },
  { label: 'MCP', desc: '模型路由与工具调用', status: 'connected' as const },
  { label: 'Skills', desc: '可复用 GIS 命令与工作流', status: 'connected' as const },
  { label: 'Plugins', desc: '第三方扩展接口', status: 'planned' as const },
];

export function EcosystemShowcase() {
  return (
    <Section tone="canvas" spacing="default" id="ecosystem">
      <Container>
        <SectionHeading
          eyebrow="Ecosystem"
          title="连接你的地理工具栈。"
          description="GeoWork 通过 Skills、MCP 和插件连接专业工具，不替代现有工具，而是提供统一的工作区和上下文。"
        />
        <div className={styles.grid}>
          {integrations.map((item) => (
            <div key={item.label} className={styles.integration}>
              <div className={styles.integrationHead}>
                <span className={styles.integrationLabel}>{item.label}</span>
                <span className={`${styles.integrationStatus} ${styles[item.status]}`}>
                  {item.status === 'connected' ? '已连接' : '计划中'}
                </span>
              </div>
              <p className={styles.integrationDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          {siteConfig.status} · 以上连接状态基于当前开发阶段，随版本更新持续扩展。
        </p>
      </Container>
    </Section>
  );
}
