'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Hero } from '@/components/marketing/hero/Hero';
import { ProductObjects } from '@/components/marketing/product-objects/ProductObjects';
import { WorkflowNarrative } from '@/components/marketing/workflow-narrative/WorkflowNarrative';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
import { ContextShowcase } from '@/components/marketing/context-showcase/ContextShowcase';
import { EcosystemShowcase } from '@/components/marketing/ecosystem-showcase/EcosystemShowcase';
import { OpenDevelopment } from '@/components/marketing/open-development/OpenDevelopment';
import { ChangelogPreview } from '@/components/marketing/changelog-preview/ChangelogPreview';
import { ThemeSection } from '@/components/theme/ThemeSection';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import styles from './page.module.css';

export default function HomePage() {
  const { locale } = useLocale();
  const t = getDict(locale);

  return (
    <>
      <Hero />
      <ProductObjects />
      <WorkflowNarrative />
      <ModeShowcase />
      <UseCaseStory />
      <ContextShowcase />
      <EcosystemShowcase />
      <OpenDevelopment />
      <ThemeSection theme="light">
        <section className={styles.quoteSection}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              {t.quote.text.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <footer className={styles.quoteAuthor}>{t.quote.author}</footer>
          </blockquote>
        </section>
      </ThemeSection>

      <ThemeSection theme="light">
        <ChangelogPreview />
      </ThemeSection>
      <ThemeSection theme="dark">
        <FinalCta />
      </ThemeSection>
    </>
  );
}