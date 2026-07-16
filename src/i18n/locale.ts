export type Locale = 'zh' | 'en';

export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  if (seg === 'en') return 'en';
  return 'zh';
}

export function localizePath(pathname: string, locale: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'zh' || parts[0] === 'en') {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }
  return '/' + parts.join('/');
}