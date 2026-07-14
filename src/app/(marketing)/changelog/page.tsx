import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { changelogEntries } from '@/data/changelog';
import { formatDate } from '@/lib/content/mdx';
import styles from './changelog.module.css';

export const metadata: Metadata = {
  title: '更新日志',
  description: 'GeoWork 版本变化、发布日期、修复和已知问题。',
};

export default function ChangelogPage() {
  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow="更新日志"
          title="版本变化记录。"
          description="按时间排序的正式版本说明，不会把每次 commit 自动列为更新日志。"
          width="content"
        />
        <ol className={styles.list}>
          {changelogEntries.map((entry) => (
            <li key={entry.slug} className={styles.item}>
              <div className={styles.itemHead}>
                <p className={styles.version}>{entry.version}</p>
                <p className={styles.date}>{formatDate(entry.date)}</p>
              </div>
              <h2 className={styles.title}>{entry.title}</h2>
              <p className={styles.summary}>{entry.summary}</p>
              <Button
                asChild
                variant="text"
                size="sm"
                trailingIcon={<ArrowRightIcon aria-hidden />}
              >
                <Link href={`/changelog/${entry.slug}`}>查看详情</Link>
              </Button>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
