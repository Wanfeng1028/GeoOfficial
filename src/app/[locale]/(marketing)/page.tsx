'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useReveal } from '@/hooks/useReveal';
import { Hero } from '@/components/marketing/hero/Hero';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
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
      <ModeShowcase />
      <UseCaseStory />
      <EcosystemShowcase />
      <ThemeSection theme="dark">
        <OpenDevelopment />

        <ChangelogPreview />

        <RevealSection>
          <section className={styles.quoteSection}>
            <blockquote className={styles.quote}>
              <p
                className={`${styles.quoteText} reveal`}
                data-locale={locale}
                data-reveal-delay="0ms"
              >
                {t.quote.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              <footer className={`${styles.quoteAuthor} reveal`} data-reveal-delay="200ms">
                {t.quote.author}
              </footer>
            </blockquote>
          </section>
        </RevealSection>

        <FinalCta />
      </ThemeSection>
    </>
  );
}

/** 为 Quote 等内联区块提供独立的 reveal 观察上下文 */
function RevealSection({ children }: { children: React.ReactNode }) {
  const revealRef = useReveal({ rootMargin: '0px 0px -60px 0px' });
  return <div ref={revealRef as React.RefObject<HTMLDivElement | null>}>{children}</div>;
}
