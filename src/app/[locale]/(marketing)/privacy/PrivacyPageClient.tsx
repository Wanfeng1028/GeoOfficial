'use client';

import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import styles from './page.module.css';

export function PrivacyPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.privacy;

  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <SectionHeading
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          description={p.hero.description}
          level={1}
        />
        <p className={styles.note}>{p.draft}</p>

        {p.sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <h2 className={styles.h2}>{section.title}</h2>
            <p className={styles.p}>{section.body}</p>
            {'items' in section && section.items && (
              <ul className={styles.list}>
                {section.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Container>
    </Section>
  );
}