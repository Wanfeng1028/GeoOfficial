import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { productObjects } from '@/data/product-objects';
import { ecosystemNodes } from '@/data/ecosystem';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '产品 · GeoWork',
  description: 'GeoWork 产品工作台、对象、模式与可扩展能力。',
};

export default function ProductPage() {
  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container>
          <SectionHeading
            eyebrow="产品"
            title="一个工作台，贯穿项目到成果。"
            description="GeoWork 把地图、遥感、代码、研究与自动化组织在同一个项目上下文中，不为单一算法或工具绑定。"
            level={1}
          />
          <div className={styles.actions}>
            <Button asChild variant="primary" size="md">
              <Link href="/download">下载 GeoWork</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">查看真实案例</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Objects"
            title="五个核心对象。"
            description="Project / Dataset / Layer / Task / Artifact — 每个对象不是孤立功能，而是与项目上下文连续。"
          />
          <div className={styles.objects}>
            {productObjects.map((obj) => (
              <article key={obj.id} className={styles.object}>
                <h3 className={styles.objectTitle}>{obj.label}</h3>
                <p className={styles.objectDesc}>{obj.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Modes"
            title="Work / Code / Map 三种模式。"
            description="在三种模式之间切换不会丢失上下文，工具、数据和成果保持连续。"
          />
          <div className={styles.modes}>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>Work</h3>
              <p className={styles.modeDesc}>项目管理、任务调度、工具集成、成果汇总。</p>
            </div>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>Code</h3>
              <p className={styles.modeDesc}>编辑器、Python 终端、运行结果和代码版本管理。</p>
            </div>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>Map</h3>
              <p className={styles.modeDesc}>图层叠加、影像分析、属性查询和制图输出。</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Ecosystem"
            title="可扩展能力。"
            description="Core → Skills → 工具 / MCP → Outputs，每一层职责明确。"
          />
          <div className={styles.ecosystem}>
            {ecosystemNodes.map((node) => (
              <div key={node.id} className={styles.ecoNode}>
                <p className={styles.ecoLabel}>{node.label}</p>
                <p className={styles.ecoDesc}>{node.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}