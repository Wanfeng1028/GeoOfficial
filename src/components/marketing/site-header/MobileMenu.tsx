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
import { mainNavigation } from '@/data/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import styles from './MobileMenu.module.css';

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

const navLabelKeys: Record<string, keyof ReturnType<typeof getDict>['nav']> = {
  Product: 'product',
  Workflows: 'workflows',
  'Use Cases': 'useCases',
  Developers: 'developers',
  Changelog: 'changelog',
};

export function MobileMenu({ items = mainNavigation }: { items?: readonly MenuItem[] }) {
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
          {items.map((item) => {
            const label = navLabelKeys[item.label as keyof typeof navLabelKeys]
              ? t.nav[navLabelKeys[item.label as keyof typeof navLabelKeys]]
              : item.label;
            return item.external ? (
              <a
                key={item.label}
                href={item.href}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                {label}
              </a>
            ) : (
              <DialogClose asChild key={item.label}>
                <Link href={item.href} className={styles.link}>
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


