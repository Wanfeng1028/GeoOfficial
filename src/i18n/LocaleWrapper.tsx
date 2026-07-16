'use client';

import { type ReactNode, useState } from 'react';
import { LocaleProvider } from './LocaleProvider';
import type { Locale } from './locale';
import { defaultLocale } from './locale';

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  const pathLocale = window.location.pathname.split('/')[1];
  if (pathLocale === 'en' || pathLocale === 'zh') return pathLocale;
  const cookieLocale = document.cookie
    .split('; ')
    .find((row) => row.startsWith('locale='))
    ?.split('=')[1];
  if (cookieLocale === 'en' || cookieLocale === 'zh') return cookieLocale;
  return defaultLocale;
}

export function LocaleWrapper({ children }: { children: ReactNode }) {
  const [locale] = useState<Locale>(readInitialLocale);

  return <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>;
}