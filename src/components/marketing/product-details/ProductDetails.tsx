import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Figure } from '@/components/ui/figure/Figure';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './ProductDetails.module.css';

const figures = [
  {
    fig: '01',
    title: '工作区与地图',
    note: '左侧项目导航，中间地图画布，右侧属性与成果。',
  },
  {
    fig: '02',
    title: '代码与终端',
    note: '编辑器、终端、运行结果和错误定位可在同一项目下工作。',
  },
  {
    fig: '03',
    title: '研究材料与报告',
    note: '文献、笔记、引用、图表与报告草稿共享上下文。',
  },
] as const;

export function ProductDetails() {
  return (
    <Section tone="white" spacing="default" id="details">
      <Container>
        <SectionHeading
          eyebrow="协同工作"
          title="地图、代码、终端与报告协同工作。"
          description="GeoWork 让不同的工作对象在同一个项目上下文中保持连续，不再反复切换工具。"
        />
        <div className={styles.grid}>
          {figures.map((item) => (
            <Figure
              key={item.fig}
              fig={item.fig}
              title={item.title}
              note={item.note}
              className={styles.figure}
            >
              <MediaFrame ratio="16:10" tone="light">
                <span className={styles.mediaInner}>
                  待替换：GeoFrontend2.0 {item.title} 截图
                </span>
              </MediaFrame>
            </Figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
