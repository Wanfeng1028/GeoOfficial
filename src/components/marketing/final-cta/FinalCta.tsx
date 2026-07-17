'use client';

import Link from 'next/link';
import { GithubLogoIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Button } from '@/components/ui/button/Button';
import styles from './FinalCta.module.css';

export function FinalCta() {
  const { locale } = useLocale();
  const t = getDict(locale);

  return (
    <section id="final-cta" className={styles.section}>
      {/* Grid background */}
      <div className={styles.gridBg} />

      <div className={styles.inner}>
        <h2 className={styles.title}>
          {t.finalCta.title.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.description}>{t.finalCta.description}</p>
        <div className={styles.actions}>
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