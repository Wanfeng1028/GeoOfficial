import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { changelogEntries } from '@/data/changelog';
import styles from './ChangelogPreview.module.css';

export function ChangelogPreview() {
  const previewEntries = changelogEntries.slice(0, 3);

  return (
    <Section tone="canvas" spacing="default" id="changelog">
      <Container>
        <SectionHeading
          eyebrow="Changelog"
          title="开发进展公开透明。"
          description="每个版本的功能、修复和已知问题都记录在更新日志中，不把 commit 当正式发布说明。"
        />
        <div className={styles.list}>
          {previewEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/changelog/${entry.slug}`}
              className={styles.entry}
            >
              <div className={styles.entryMeta}>
                <span className={styles.entryVersion}>{entry.version}</span>
                <span className={styles.entryDate}>{entry.date}</span>
              </div>
              <div className={styles.entryBody}>
                <h3 className={styles.entryTitle}>{entry.title}</h3>
                <p className={styles.entrySummary}>{entry.summary}</p>
              </div>
              <ArrowRightIcon aria-hidden className={styles.entryArrow} />
            </Link>
          ))}
        </div>
        <div className={styles.cta}>
          <Button asChild variant="secondary" size="md">
            <Link href="/changelog">
              查看完整更新日志
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
