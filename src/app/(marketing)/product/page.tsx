import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { productPrinciples, ecosystemGroups } from '@/data/product';
import styles from './product.module.css';

export const metadata: Metadata = {
  title: '产品',
  description: 'GeoWork 产品工作台、对象、模式与可扩展能力。',
};

const productObjects = [
  {
    title: 'Workspace',
    description: '项目、数据、文件、工具与成果在同一上下文中组织。',
  },
  {
    title: 'Work / Code / Map',
    description: '三种工作模式共享项目，不丢失上下文。',
  },
  {
    title: 'Terminal / Browser / Events / Logs',
    description: '运行结果、任务事件和日志集中查看。',
  },
  {
    title: 'Research / Report',
    description: '文献、笔记、引用、图表和报告在同一项目下生成。',
  },
  {
    title: 'Automation / Extensions',
    description: '工作流自动化、Skills、MCP 与插件扩展能力。',
  },
];

export default function ProductPage() {
  return (
    <>
      <Section tone="canvas" spacing="large">
        <Container>
          <SectionHeading
            eyebrow="产品"
            title="一个工作台，贯穿项目到成果。"
            description="GeoWork 把工作区、模式、终端、研究与自动化组织在同一个项目上下文中，不为单一算法或工具绑定。"
            width="content"
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

      <Section tone="white" spacing="default">
        <Container>
          <SectionHeading eyebrow="原则" title="三条产品原则。" />
          <ol className={styles.principles}>
            {productPrinciples.map((item) => (
              <li key={item.index} className={styles.principle}>
                <p className={styles.principleIndex}>{item.index}</p>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleDesc}>{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="对象"
            title="工作台上的核心对象。"
            description="每个对象不是孤立功能，而是与项目上下文连续。"
          />
          <ul className={styles.objects}>
            {productObjects.map((obj) => (
              <li key={obj.title} className={styles.object}>
                <h3 className={styles.objectTitle}>{obj.title}</h3>
                <p className={styles.objectDesc}>{obj.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" spacing="default">
        <Container>
          <SectionHeading eyebrow="生态" title="可扩展能力。" />
          <div className={styles.ecosystem}>
            {ecosystemGroups.map((group) => (
              <div key={group.title} className={styles.ecosystemGroup}>
                <p className={styles.ecosystemTitle}>{group.title}</p>
                <ul className={styles.ecosystemItems}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.ecosystemItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
