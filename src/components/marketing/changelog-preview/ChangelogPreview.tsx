'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useReveal } from '@/hooks/useReveal';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { changelogEntries } from '@/data/changelog';
import styles from './ChangelogPreview.module.css';

export function ChangelogPreview() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const previewEntries = changelogEntries.slice(0, 3);
  const revealRef = useReveal();

  return (
    <Section tone="canvas" spacing="default" id="changelog">
      <Container>
        <div ref={revealRef as React.RefObject<HTMLDivElement | null>}>
          <SectionHeading
            eyebrow={t.changelog.eyebrow}
            title={t.changelog.title}
            description={t.changelog.description}
            className="reveal"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
          />
          <div className={styles.list}>
            {previewEntries.map((entry, i) => (
              <Link
                key={entry.slug}
                href={`/changelog/${entry.slug}`}
                className={`${styles.entry} reveal`}
                data-reveal-delay={`${150 + i * 80}ms`}
              >
                <div className={styles.entryMeta}>
                  <span className={styles.entryVersion}>{entry.version}</span>
                  <span className={styles.entryDate}>{entry.date}</span>
                </div>
                <div className={styles.entryBody}>
                  <h3 className={styles.entryTitle}>
                    {locale === 'en' ? entry.enTitle : entry.title}
                  </h3>
                  <p className={styles.entrySummary}>
                    {locale === 'en' ? entry.enSummary : entry.summary}
                  </p>
                </div>
                <ArrowRightIcon aria-hidden className={styles.entryArrow} />
              </Link>
            ))}
          </div>
          <div className={`${styles.cta} reveal`} data-reveal-delay="400ms">
            <Button asChild variant="secondary" size="md">
              <Link href="/changelog">
                {t.changelog.viewAll}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
