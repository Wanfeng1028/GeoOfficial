'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/ui/button/Button';
import styles from './Hero.module.css';

const IMAGE_TILES = [
  '/media/placeholders/hero-product.svg',
  '/media/placeholders/map.svg',
  '/media/placeholders/work.svg',
  '/media/placeholders/code.svg',
  '/media/placeholders/ndvi-series.svg',
  '/media/placeholders/research-report.svg',
  '/media/placeholders/urban-expansion.svg',
];

export function Hero() {
  const { locale } = useLocale();
  const t = getDict(locale);

  const titleLines = t.hero.title
    .split('\n')
    .filter(Boolean);

  return (
    <section id="hero" className={styles.hero}>
      {/* Masonry image tile background */}
      <div className={styles.tileGrid} aria-hidden="true">
        {IMAGE_TILES.map((src, i) => (
          <div
            key={src}
            className={`${styles.tile} ${styles[`tileSpan${(i % 3) + 1}`]}`}
          >
            <img src={src} alt="" loading={i < 4 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className={styles.overlay} />

      {/* Massive centered title + actions */}
      <div className={styles.content}>
        <Link
          href={`/${locale}/platform`}
          className={styles.eyebrow}
        >
          <span className={styles.eyebrowNew}>New</span>
          <span>{t.hero.eyebrow}</span>
          <span className={styles.eyebrowArrow} aria-hidden="true">
            →
          </span>
        </Link>

        <h1 className={styles.title} data-locale={locale}>
          {titleLines.map((line) => (
            <span key={line} className={styles.titleLine}>
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
              <GithubLogoIcon size={16} aria-hidden="true" />
              {t.hero.secondaryCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
