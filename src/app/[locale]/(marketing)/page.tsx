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
import { ChangelogPreview } from '@/components/marketing/changelog-preview/ChangelogPreview';
import { CurtainReveal } from '@/components/scroll/CurtainReveal';
import { ThemeObserver } from '@/components/scroll/ThemeObserver';
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

      {/* Curtain reveal + Quote */}
      <CurtainReveal
        height="200vh"
        curtainContent={
          <div className={styles.curtainEnd}>
            <p className={styles.curtainLabel}>Universal Context</p>
            <p className={styles.curtainHint}>Scroll to reveal</p>
          </div>
        }
      >
        <ThemeObserver theme="light">
          <div className={styles.quoteSection}>
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
          </div>
        </ThemeObserver>
      </CurtainReveal>

      <ThemeObserver theme="light">
        <ChangelogPreview />
      </ThemeObserver>
      <ThemeObserver theme="dark">
        <FinalCta />
      </ThemeObserver>
    </>
  );
}