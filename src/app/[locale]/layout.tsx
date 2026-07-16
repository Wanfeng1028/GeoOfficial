import type { ReactNode } from 'react';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import type { Locale } from '@/i18n/locale';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = localeParam === 'en' ? 'en' : 'zh';

  return <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>;
}
