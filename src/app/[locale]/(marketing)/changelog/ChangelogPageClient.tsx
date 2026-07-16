'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { changelogEntries } from '@/data/changelog';
import { formatDate } from '@/lib/content/mdx';
import styles from './page.module.css';

export function ChangelogPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.changelog;

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          description={p.hero.description}
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
                <Link href={`/changelog/${entry.slug}`}>{p.viewDetail}</Link>
              </Button>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}