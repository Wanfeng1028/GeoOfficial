'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useCases } from '@/data/use-cases';
import styles from './page.module.css';

export function UseCasesPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.useCases;

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          description={p.hero.description}
          width="content"
        />

        <div className={styles.filters} role="tablist" aria-label="受众筛选">
          {p.filters.map((item, idx) => (
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
                    ? p.status.available
                    : item.status === 'preview'
                      ? p.status.preview
                      : p.status.planned}
                </p>
                <Button
                  asChild
                  variant="text"
                  size="sm"
                  trailingIcon={<ArrowRightIcon aria-hidden />}
                >
                  <Link href={`/use-cases/${item.slug}`}>{p.viewDetail}</Link>
                </Button>
              </div>
              <div className={styles.meta}>
                <p className={styles.metaLabel}>{p.metaLabels.audience}</p>
                <p className={styles.metaValue}>{item.audience}</p>
                <p className={styles.metaLabel}>{p.metaLabels.status}</p>
                <p className={styles.metaValue}>
                  {item.status === 'available'
                    ? p.status.available
                    : item.status === 'preview'
                      ? p.status.preview
                      : p.status.planned}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}