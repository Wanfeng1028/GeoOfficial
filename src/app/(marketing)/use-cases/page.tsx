import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useCases } from '@/data/use-cases';
import styles from './use-cases.module.css';

export const metadata: Metadata = {
  title: '使用案例',
  description: 'GeoWork 真实地理空间工作案例：城市扩张、NDVI 时序与科研报告。',
};

const audienceFilter = ['全部', '科研', '教学', '行业分析', '开发'] as const;

export default function UseCasesPage() {
  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow="使用案例"
          title="从问题到成果的完整工作过程。"
          description="每个案例包含输入、过程、工具、输出和当前可用状态，不用抽象形容词替代成果。"
          width="content"
        />

        <div className={styles.filters} role="tablist" aria-label="受众筛选">
          {audienceFilter.map((item, idx) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={idx === 0}
              className={styles.filter}
            >
              {item}
            </button>
          ))}
        </div>

        <ul className={styles.list}>
          {useCases.map((item) => (
            <li key={item.slug} className={styles.item}>
              <div className={styles.copy}>
                <p className={styles.audience}>{item.audience}</p>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.status} data-status={item.status}>
                  {item.status === 'available'
                    ? '当前可运行'
                    : item.status === 'preview'
                      ? 'Developer Preview'
                      : '计划中'}
                </p>
                <Button
                  asChild
                  variant="text"
                  size="sm"
                  trailingIcon={<ArrowRightIcon aria-hidden />}
                >
                  <Link href={`/use-cases/${item.slug}`}>查看详情</Link>
                </Button>
              </div>
              <div className={styles.meta}>
                <p className={styles.metaLabel}>输入</p>
                <p className={styles.metaValue}>{item.inputs.join(' · ')}</p>
                <p className={styles.metaLabel}>输出</p>
                <p className={styles.metaValue}>{item.outputs.join(' · ')}</p>
                <p className={styles.metaLabel}>工具</p>
                <p className={styles.metaValue}>{item.tools.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
