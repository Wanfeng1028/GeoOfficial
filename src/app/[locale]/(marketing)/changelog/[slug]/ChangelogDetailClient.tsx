'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { changelogEntries } from '@/data/changelog';
import { formatDate } from '@/lib/content/mdx';
import styles from './entry.module.css';

interface ChangelogDetailClientProps {
  slug: string;
  children: React.ReactNode;
}

export function ChangelogDetailClient({ slug, children }: ChangelogDetailClientProps) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.changelog;

  const entry = changelogEntries.find((item) => item.slug === slug)!;

  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <nav aria-label="面包屑" className={styles.breadcrumb}>
          <Link href="/changelog" className={styles.breadcrumbLink}>
            {p.hero.eyebrow}
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
          <h2 className={styles.h2}>{p.highlights}</h2>
          <ul className={styles.list}>
            {entry.highlights.map((item) => (
              <li key={item} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>

        {entry.fixes.length > 0 ? (
          <div className={styles.fixes}>
            <h2 className={styles.h2}>{p.fixes}</h2>
            <ul className={styles.list}>
              {entry.fixes.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {entry.knownIssues.length > 0 ? (
          <div className={styles.known}>
            <h2 className={styles.h2}>{p.knownIssues}</h2>
            <ul className={styles.list}>
              {entry.knownIssues.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className={styles.body}>
          <h2 className={styles.h2}>{p.fullDetails}</h2>
          {children}
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
            <Link href="/changelog">{p.backToList}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}