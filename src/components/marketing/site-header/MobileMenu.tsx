'use client';

import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/primitives/dialog/Dialog';
import { Button } from '@/components/ui/button/Button';
import {
  mainNavigation,
  platformMegaMenu,
  resourcesMegaMenu,
  type NavMegaMenu,
} from '@/data/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { NavigationIcon, type NavigationIconName } from '@/components/icons/navigation/NavigationIcon';
import styles from './MobileMenu.module.css';

interface SimpleMenuItem {
  label: string;
  href: string;
  external?: boolean;
}

const megaMenuMap: Record<string, NavMegaMenu> = {
  Platform: platformMegaMenu,
  Resources: resourcesMegaMenu,
};

const navLabelKeys: Record<string, keyof ReturnType<typeof getDict>['nav']> = {
  Platform: 'platform',
  Resources: 'resources',
  'Use Cases': 'useCases',
  Plans: 'plans',
};

function pickLocaleText(zh: string, en: string | undefined, locale: 'zh' | 'en'): string {
  if (locale === 'en') return en ?? zh;
  return zh;
}

export function MobileMenu() {
  const { locale } = useLocale();
  const t = getDict(locale);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="quiet" size="sm" className={styles.trigger} aria-label={t.nav.menu}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.content}>
        <DialogTitle className={styles.title}>{t.nav.menu}</DialogTitle>
        <nav className={styles.nav} aria-label={t.nav.menu}>
          {mainNavigation.map((item) => {
            const label = navLabelKeys[item.label as keyof typeof navLabelKeys]
              ? t.nav[navLabelKeys[item.label as keyof typeof navLabelKeys]]
              : item.label;

            // Platform / Resources：展开 mega menu 所有分组与项目
            if ('hasMega' in item && item.hasMega && item.label in megaMenuMap) {
              const mega = megaMenuMap[item.label];
              return (
                <div key={item.label} className={styles.megaSection}>
                  <div className={styles.megaTitle}>{label}</div>
                  {mega.groups.map((group) => (
                    <div key={group.label} className={styles.group}>
                      <div className={styles.groupLabel}>{group.label}</div>
                      <ul className={styles.items}>
                        {group.items.map((menuItem) => {
                          const itemTitle = pickLocaleText(menuItem.label, menuItem.enLabel, locale);
                          const itemDesc =
                            locale === 'en'
                              ? (menuItem.enDescription ?? menuItem.description)
                              : menuItem.description;
                          return (
                            <li key={menuItem.label}>
                              <DialogClose asChild>
                                <Link href={menuItem.href} className={styles.item}>
                                  {menuItem.iconKey ? (
                                    <span className={styles.iconWrap} aria-hidden>
                                      <NavigationIcon
                                        name={menuItem.iconKey as NavigationIconName}
                                        decorative
                                        className={styles.icon}
                                      />
                                    </span>
                                  ) : null}
                                  <span className={styles.itemText}>
                                    <span className={styles.itemTitle}>{itemTitle}</span>
                                    {itemDesc ? (
                                      <span className={styles.itemDesc}>{itemDesc}</span>
                                    ) : null}
                                  </span>
                                </Link>
                              </DialogClose>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            }

            // Use Cases / Plans：直接链接
            const simpleItem = item as SimpleMenuItem;
            return (
              <DialogClose asChild key={item.label}>
                <Link href={simpleItem.href} className={styles.topLink}>
                  {label}
                </Link>
              </DialogClose>
            );
          })}
        </nav>
        <DialogClose asChild>
          <Button variant="primary" size="md" className={styles.close}>
            {t.nav.close}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
