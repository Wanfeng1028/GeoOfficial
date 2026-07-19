import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { siteConfig } from '@/lib/site';
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
  icons: {
    icon: [
      {
        url: '/GeoWork_Logo_Kit_v1.0/02_Web/Favicon/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/GeoWork_Logo_Kit_v1.0/02_Web/Favicon/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: '/GeoWork_Logo_Kit_v1.0/02_Web/Favicon/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}