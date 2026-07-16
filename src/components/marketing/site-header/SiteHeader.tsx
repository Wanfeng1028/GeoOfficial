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
import { usePageTheme } from '@/components/theme/use-page-theme';
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

// MegaMenu 分组标签的翻译 key 映射
const megaMenuGroupKeys: Record<string, string> = {
  Platform: 'product.platform',
  Modes: 'product.modes',
  Tools: 'product.tools',
  Analyze: 'workflows.analyze',
  Research: 'workflows.research',
  Automation: 'workflows.automation',
};

// MegaMenu 项目标签的翻译 key 映射
const megaMenuItemKeys: Record<string, string> = {
  Workspace: 'product.items.workspace',
  Project: 'product.items.project',
  Dataset: 'product.items.dataset',
  Layer: 'product.items.layer',
  Task: 'product.items.task',
  Artifact: 'product.items.artifact',
  Work: 'product.items.work',
  Code: 'product.items.code',
  Map: 'product.items.map',
  Terminal: 'product.items.terminal',
  Browser: 'product.items.browser',
  Events: 'product.items.events',
  Logs: 'product.items.logs',
  'Urban expansion': 'workflows.items.urbanExpansion',
  'Remote sensing': 'workflows.items.remoteSensing',
  'NDVI time series': 'workflows.items.ndviTimeSeries',
  'Literature review': 'workflows.items.literatureReview',
  'Report generation': 'workflows.items.reportGeneration',
  'Scheduled tasks': 'workflows.items.scheduledTasks',
  Skills: 'workflows.items.skills',
  MCP: 'workflows.items.mcp',
  Plugins: 'workflows.items.plugins',
};

/** 根据 locale 翻译 MegaMenu 的 groups 和 items */
function translateMegaMenu(
  megaData: typeof megaMenuMap[keyof typeof megaMenuMap],
  t: ReturnType<typeof getDict>,
): typeof megaData {
  return {
    ...megaData,
    groups: megaData.groups.map((group) => ({
      ...group,
      label: megaMenuGroupKeys[group.label]
        ? (getNestedValue(t.megaMenu, megaMenuGroupKeys[group.label]) as string) ?? group.label
        : group.label,
      items: group.items.map((item) => ({
        ...item,
        label: megaMenuItemKeys[item.label]
          ? (getNestedValue(t.megaMenu, megaMenuItemKeys[item.label]) as string) ?? item.label
          : item.label,
      })),
    })),
  };
}

/** 从嵌套对象中按点分隔路径取值 */
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function SiteHeader() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = usePageTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.header}${isScrolled ? ` ${styles.scrolled}` : ''}`}
      data-theme={theme}
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
              const megaData = megaMenuMap[item.label as keyof typeof megaMenuMap];
              const translatedMegaData = translateMegaMenu(megaData, t);
              translatedMegaData.label = label;
              return (
                <MegaMenu
                  key={item.label}
                  item={translatedMegaData}
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
