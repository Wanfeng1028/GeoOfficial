'use client';

import Link from 'next/link';
import { GithubLogoIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useReveal } from '@/hooks/useReveal';
import { Button } from '@/components/ui/button/Button';
import styles from './FinalCta.module.css';

export function FinalCta() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const revealRef = useReveal();

  return (
    <section id="final-cta" ref={revealRef as React.RefObject<HTMLDivElement | null>} className={styles.section}>
      {/* Grid background */}
      <div className={styles.gridBg} />

      <div className={styles.inner}>
        <h2
          className={`${styles.title} reveal`}
          data-locale={locale}
          data-reveal-delay="0ms"
       >
          {t.finalCta.title.split('\n').map((line, i) => (
            <span key={i} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>
        <p className={`${styles.description} reveal`} data-reveal-delay="150ms">
          {t.finalCta.description}
        </p>
        <div className={`${styles.actions} reveal`} data-reveal-delay="300ms">
          <Button asChild variant="primary" size="md">
            <Link href="/platform">
              {t.finalCta.primaryBtn}
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="md">
            <a href="https://github.com/Wanfeng1028/GeoWork" target="_blank" rel="noreferrer">
              <GithubLogoIcon aria-hidden />
              {t.finalCta.secondaryBtn}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}