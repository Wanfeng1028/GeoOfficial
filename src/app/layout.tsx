import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { siteConfig } from '@/lib/site';
import { LocaleWrapper } from '@/i18n/LocaleWrapper';
import { ThemeProviderWrapper } from '@/components/theme/ThemeProviderWrapper';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProviderWrapper>
          <LocaleWrapper>{children}</LocaleWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}