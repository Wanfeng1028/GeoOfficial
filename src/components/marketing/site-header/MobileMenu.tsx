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
import styles from './MobileMenu.module.css';

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

export function MobileMenu({ items = mainNavigation }: { items?: readonly MenuItem[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="quiet" size="sm" className={styles.trigger} aria-label="打开菜单">
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
        <DialogTitle className={styles.title}>导航</DialogTitle>
        <nav className={styles.nav} aria-label="移动端主导航">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <DialogClose asChild key={item.label}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </DialogClose>
            ),
          )}
        </nav>
        <DialogClose asChild>
          <Button variant="primary" size="md" className={styles.close}>
            关闭
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}


