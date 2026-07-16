'use client';

import type { ReactNode } from 'react';
import { PageThemeProvider } from './PageThemeProvider';

/**
 * 客户端包装器，使 PageThemeProvider 能在服务端 RootLayout 中使用。
 */
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return <PageThemeProvider>{children}</PageThemeProvider>;
}