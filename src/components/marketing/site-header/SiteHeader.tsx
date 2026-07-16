'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { mainNavigation, productMegaMenu, workflowsMegaMenu } from '@/data/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { MegaMenu } from '@/components/marketing/mega-menu/MegaMenu';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

const navLabelKeys: Record<string, keyof ReturnType<typeof getDict>['nav']> = {
  Product: 'product',
  Workflows: 'workflows',
  'Use Cases': 'useCases',
  Developers: 'developers',
  Changelog: 'changelog',
};

const megaMenuMap = {
  Product: productMegaMenu,
  Workflows: workflowsMegaMenu,
} as const;

export function SiteHeader() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.header}${isScrolled ? ` ${styles.scrolled}` : ''}`}
    >
      <Container className={styles.inner}>
        <Link href="/" aria-label="GeoWork 首页" className={styles.brand}>
          <Logo wordmark />
        </Link>

        <nav className={styles.desktopNav} aria-label="主导航">
          {mainNavigation.map((item) => {
            const label = navLabelKeys[item.label as keyof typeof navLabelKeys]
              ? t.nav[navLabelKeys[item.label as keyof typeof navLabelKeys]]
              : item.label;
            if ('hasMega' in item && item.hasMega && item.label in megaMenuMap) {
              return (
                <MegaMenu
                  key={item.label}
                  item={megaMenuMap[item.label as keyof typeof megaMenuMap]}
                />
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                target={'external' in item ? '_blank' : undefined}
                rel={'external' in item ? 'noreferrer' : undefined}
                className={styles.navLink}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <LocaleSwitcher />
          <Button asChild variant="quiet" size="sm" className={styles.githubBtn}>
            <a
              href="https://github.com/Wanfeng1028/GeoWork"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon aria-hidden /> {t.nav.github}
            </a>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href="/product">{t.nav.exploreGeoWork}</Link>
          </Button>
          <div className={styles.mobileOnly}>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
