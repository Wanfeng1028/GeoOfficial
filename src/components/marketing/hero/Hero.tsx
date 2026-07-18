'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Button } from '@/components/ui/button/Button';
import { GeoWorkPreview } from './GeoWorkPreview';
import styles from './Hero.module.css';

export function Hero() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Hero copy fades out and drifts up as user scrolls
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Product window entrance and subtle exit
  const windowScale = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.92, 1, 1, 0.98]);
  const windowY = useTransform(scrollYProgress, [0, 0.25], [80, 0]);
  const windowOpacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

  const scaleSpring = useSpring(windowScale, { stiffness: 120, damping: 24 });
  const ySpring = useSpring(windowY, { stiffness: 120, damping: 24 });

  return (
    <section ref={sectionRef} id="hero" className={styles.hero} aria-labelledby="home-title">
      {/* StickyBackground */}
      <div className={styles.background} aria-hidden="true">
        <div className={styles.backgroundBase} />
        <div className={styles.backgroundStripes} />
        <div className={styles.backgroundMask} />
      </div>

      <div className={styles.foreground}>
        {/* HeroCopy */}
        <motion.div
          className={styles.copy}
          style={{
            y: copyY,
            opacity: copyOpacity,
          }}
        >
          <div className={styles.copyInner}>
            <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
            <h1
              id="home-title"
              className={styles.title}
              data-locale={locale}
            >
              {t.hero.title.split('\n').map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h1>
            <p className={styles.description}>{t.hero.description}</p>
            <div className={styles.actions}>
              <Button asChild variant="primary" size="sm">
                <Link href="/platform">{t.hero.primaryCta}</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                leadingIcon={<GithubLogoIcon aria-hidden />}
              >
                <a
                  href="https://github.com/Wanfeng1028/GeoWork"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.hero.secondaryCta}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ProductStage */}
        <div className={styles.stage}>
          <div className={styles.windowShell}>
            <motion.div
              className={styles.macWindow}
              style={{
                scale: scaleSpring,
                y: ySpring,
                opacity: windowOpacity,
              }}
            >
              <div className={styles.macTitlebar}>
                <div className={styles.macControls}>
                  <span className={`${styles.macControl} ${styles.red}`} aria-hidden="true" />
                  <span className={`${styles.macControl} ${styles.yellow}`} aria-hidden="true" />
                  <span className={`${styles.macControl} ${styles.green}`} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.productViewport}>
                <GeoWorkPreview />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
