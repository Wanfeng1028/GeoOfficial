'use client';

import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';

import { Button } from '@/components/ui/button/Button';

import { GeoWorkPreview } from './GeoWorkPreview';

import styles from './Hero.module.css';

export function Hero() {
  const { locale } = useLocale();
  const t = getDict(locale);

  const titleLines = t.hero.title
    .split('\n')
    .filter(Boolean);

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <div className={styles.copyInner}>
          <Link
            href={`/${locale}/platform`}
            className={styles.eyebrow}
          >
            <span className={styles.eyebrowNew}>New</span>
            <span>{t.hero.eyebrow}</span>
            <span
              className={styles.eyebrowArrow}
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          <h1
            className={styles.title}
            data-locale={locale}
          >
            {titleLines.map((line) => (
              <span
                key={line}
                className={styles.titleLine}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className={styles.description}>
            {t.hero.description}
          </p>

          <div className={styles.actions}>
            <Button asChild>
              <Link href={`/${locale}/platform`}>
                {t.hero.primaryCta}
              </Link>
            </Button>

            <Button asChild variant="primary">
              <a
                href="https://github.com/Wanfeng1028/GeoWork"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon
                  size={16}
                  aria-hidden="true"
                />
                {t.hero.secondaryCta}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.windowShell}>
          <div className={styles.macWindow}>
            <div className={styles.macTitlebar}>
              <div
                className={styles.macControls}
                aria-hidden="true"
              >
                <span
                  className={`${styles.macControl} ${styles.red}`}
                />
                <span
                  className={`${styles.macControl} ${styles.yellow}`}
                />
                <span
                  className={`${styles.macControl} ${styles.green}`}
                />
              </div>
            </div>

            <div className={styles.productViewport}>
              <GeoWorkPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
