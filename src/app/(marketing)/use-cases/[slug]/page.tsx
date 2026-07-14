import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useCases } from '@/data/use-cases';
import styles from './[slug].module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <nav aria-label="面包屑" className={styles.breadcrumb}>
          <Link href="/use-cases" className={styles.breadcrumbLink}>
            使用案例
          </Link>
          <span aria-hidden> · </span>
          <span className={styles.breadcrumbCurrent}>{item.title}</span>
        </nav>

        <p className={styles.audience}>{item.audience}</p>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.status} data-status={item.status}>
          {item.status === 'available'
            ? '当前可运行'
            : item.status === 'preview'
              ? 'Developer Preview'
              : '计划中'}
        </p>
        <p className={styles.description}>{item.description}</p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>问题</h2>
          <p className={styles.sectionBody}>{item.problem}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>输入</h2>
          <ul className={styles.list}>
            {item.inputs.map((input) => (
              <li key={input} className={styles.listItem}>{input}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>工作过程</h2>
          <ol className={styles.list}>
            {item.workflow.map((step, idx) => (
              <li key={step} className={styles.listItem}>
                <span className={styles.listIndex}>{String(idx + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>使用工具</h2>
          <p className={styles.sectionBody}>{item.tools.join(' · ')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>输出</h2>
          <ul className={styles.list}>
            {item.outputs.map((output) => (
              <li key={output} className={styles.listItem}>{output}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>限制</h2>
          <ul className={styles.list}>
            {item.limitations.map((limitation) => (
              <li key={limitation} className={styles.listItem}>{limitation}</li>
            ))}
          </ul>
        </div>

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
            <Link href="/use-cases">返回案例列表</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
