import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import styles from './ContextShowcase.module.css';

const contextItems = [
  { label: '项目上下文', desc: '研究问题、区域、数据来源和验收标准，一次定义全程使用。' },
  { label: '地图与图层', desc: '多源影像、矢量图层、空间分析结果在同一画布中叠加。' },
  { label: '代码与终端', desc: 'Python / GDAL / GEE 代码在项目环境中运行，直接访问项目数据。' },
  { label: '任务与日志', desc: '每个分析步骤可追踪，日志记录参数、输入、输出和运行状态。' },
  { label: '文献与报告', desc: '研究材料、参考文献和生成报告与项目关联，不散落在文件夹中。' },
  { label: 'Skills 与工具', desc: '可复用的 GIS 命令、遥感时序、报告生成 Skill 连接专业工具。' },
];

export function ContextShowcase() {
  return (
    <Section tone="surface" spacing="default" id="context">
      <Container>
        <SectionHeading
          eyebrow="Universal Context"
          title="数据、工具和成果，共享同一个上下文。"
          description="GeoWork 项目中的每个对象、每个操作和每份成果，都关联同一个项目上下文，不再需要反复切换工具和重建环境。"
        />
        <div className={styles.grid}>
          {contextItems.map((item) => (
            <div key={item.label} className={styles.item}>
              <h3 className={styles.itemLabel}>{item.label}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
