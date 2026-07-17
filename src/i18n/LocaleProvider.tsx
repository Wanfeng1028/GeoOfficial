'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
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

function applyLocaleToDocument(next: Locale) {
  document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // 挂载时同步 html lang 与 cookie，确保 SSR 后客户端立即应用对应语言排版
  useEffect(() => {
    applyLocaleToDocument(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyLocaleToDocument(next);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}