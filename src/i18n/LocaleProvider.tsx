'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale } from './locale';
import { defaultLocale } from './locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}