import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { changelogEntries } from '@/data/changelog';
import { formatDate } from '@/lib/content/mdx';
import styles from './entry.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return changelogEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = changelogEntries.find((item) => item.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.version} 更新日志`,
    description: entry.summary,
  };
}

export default async function ChangelogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = changelogEntries.find((item) => item.slug === slug);
  if (!entry) notFound();

  const { default: Body } = await entry.load();

  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <nav aria-label="面包屑" className={styles.breadcrumb}>
          <Link href="/changelog" className={styles.breadcrumbLink}>
            更新日志
          </Link>
          <span aria-hidden> · </span>
          <span className={styles.breadcrumbCurrent}>{entry.version}</span>
        </nav>

        <div className={styles.head}>
          <p className={styles.version}>{entry.version}</p>
          <p className={styles.date}>{formatDate(entry.date)}</p>
        </div>
        <h1 className={styles.title}>{entry.title}</h1>
        <p className={styles.summary}>{entry.summary}</p>

        <div className={styles.highlights}>
          <h2 className={styles.h2}>亮点</h2>
          <ul className={styles.list}>
            {entry.highlights.map((item) => (
              <li key={item} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>

        {entry.fixes.length > 0 ? (
          <div className={styles.fixes}>
            <h2 className={styles.h2}>修复</h2>
            <ul className={styles.list}>
              {entry.fixes.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {entry.knownIssues.length > 0 ? (
          <div className={styles.known}>
            <h2 className={styles.h2}>已知问题</h2>
            <ul className={styles.list}>
              {entry.knownIssues.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className={styles.body}>
          <h2 className={styles.h2}>完整说明</h2>
          <Body />
        </div>

        <div className={styles.actions}>
          <Button
            asChild
            variant="secondary"
            size="md"
            trailingIcon={<GithubLogoIcon aria-hidden />}
          >
            <a href={entry.releaseUrl} target="_blank" rel="noreferrer">
              GitHub Release
            </a>
          </Button>
          <Button
            asChild
            variant="text"
            size="md"
            trailingIcon={<ArrowRightIcon aria-hidden />}
          >
            <Link href="/changelog">返回列表</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}