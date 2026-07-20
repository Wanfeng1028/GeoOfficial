'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  mainNavigation,
  platformMegaMenu,
  resourcesMegaMenu,
} from '@/data/navigation';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';

import { Logo } from '@/components/ui/logo/Logo';
import { MegaMenu } from '@/components/marketing/mega-menu/MegaMenu';

import { MobileMenu } from './MobileMenu';

import styles from './SiteHeader.module.css';

const navLabelKeys: Record<
  string,
  keyof ReturnType<typeof getDict>['nav']
> = {
  Platform: 'platform',
  Resources: 'resources',
  'Use Cases': 'useCases',
  Plans: 'plans',
};

const megaMenuMap = {
  Platform: platformMegaMenu,
  Resources: resourcesMegaMenu,
} as const;

export function SiteHeader() {
  const { locale } = useLocale();
  const t = getDict(locale);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top;
      setIsDarkTheme(
        document.documentElement.dataset.pageTheme === "dark" ||
          (footerTop !== undefined && footerTop <= 82),
      );
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top;
      setIsDarkTheme(
        root.dataset.pageTheme === "dark" ||
          (footerTop !== undefined && footerTop <= 82),
      );
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-page-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`${styles.header}${
        isScrolled ? ` ${styles.scrolled}` : ''
      }${isDarkTheme ? ` ${styles.dark}` : ``}`}
    >
      <div className={styles.inner}>
        <Link
          href={`/${locale}`}
          aria-label={
            locale === 'zh'
              ? 'GeoWork 首页'
              : 'Return to GeoWork homepage'
          }
          className={styles.brand}
        >
          <Logo wordmark variant={isDarkTheme ? "on-dark" : "on-light"} />
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={
            locale === 'zh'
              ? '主导航'
              : 'Main navigation'
          }
        >
          {mainNavigation.map((item) => {
            const dictionaryKey =
              navLabelKeys[item.label];

            const label = dictionaryKey
              ? t.nav[dictionaryKey]
              : item.label;

            if (
              'hasMega' in item &&
              item.hasMega &&
              item.label in megaMenuMap
            ) {
              const megaData =
                megaMenuMap[
                  item.label as keyof typeof megaMenuMap
                ];

              const itemWithLabel = {
                ...megaData,
                label,
              };

              return (
                <MegaMenu
                  key={item.label}
                  item={itemWithLabel}
                />
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                target={
                  'external' in item
                    ? '_blank'
                    : undefined
                }
                rel={
                  'external' in item
                    ? 'noreferrer'
                    : undefined
                }
                className={styles.navLink}
              >
                {label}
              </Link>
            );
          })}

          <LocaleSwitcher
            variant="nav"
            className={styles.desktopLocale}
          />
        </nav>

        <div className={styles.actions}>
          <a
            href="https://github.com/Wanfeng1028/GeoWork"
            target="_blank"
            rel="noreferrer"
            className={`${styles.actionButton} ${styles.secondaryAction} ${styles.desktopAction}`}
          >
            {t.nav.github}
          </a>

          <Link
            href={`/${locale}/platform`}
            className={`${styles.actionButton} ${styles.primaryAction} ${styles.desktopAction}`}
          >
            {t.nav.exploreGeoWork}
          </Link>

          <div className={styles.mobileControls}>
            <LocaleSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
