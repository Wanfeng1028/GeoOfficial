'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/cn';

import { useLocale } from './LocaleProvider';
import type { Locale } from './locale';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/primitives/dialog/Dialog';
import { Button } from '@/components/ui/button/Button';

import { getDict } from './dict';

import styles from './LocaleSwitcher.module.css';

const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

type LocaleSwitcherVariant = 'control' | 'nav';

interface LocaleSwitcherProps {
  className?: string;
  variant?: LocaleSwitcherVariant;
}

export function LocaleSwitcher({
  className,
  variant = 'control',
}: LocaleSwitcherProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);

  const otherLocale: Locale =
    locale === 'zh' ? 'en' : 'zh';

  const t = getDict(locale);

  function doSwitch() {
    const segments = pathname.split('/');

    if (
      segments.length > 1 &&
      (segments[1] === 'zh' || segments[1] === 'en')
    ) {
      segments[1] = otherLocale;
    }

    const target = segments.join('/') || '/';
    sessionStorage.setItem('locale-switch-scroll', String(window.scrollY));
    router.replace(target);
  }

  function handleClick() {
    // 从英文切到中文时弹出挽留弹窗
    if (locale === 'en') {
      setDialogOpen(true);
    } else {
      doSwitch();
    }
  }

  return (
    <>
      <button
        type="button"
        className={cn(styles.switcher, className)}
        data-variant={variant}
        onClick={handleClick}
        aria-label={
          locale === 'zh'
            ? 'Switch to English'
            : '切换到中文'
        }
      >
        {localeLabels[otherLocale]}
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogTitle className={styles.dialogTitle}>
            {t.localeSwitchDialog.title}
          </DialogTitle>
          <DialogDescription className={styles.dialogDesc}>
            {t.localeSwitchDialog.description}
          </DialogDescription>
          <div className={styles.dialogActions}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDialogOpen(false)}
            >
              {t.localeSwitchDialog.stay}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setDialogOpen(false);
                doSwitch();
              }}
            >
              {t.localeSwitchDialog.switchAnyway}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
