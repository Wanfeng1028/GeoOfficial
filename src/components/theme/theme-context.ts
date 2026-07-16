'use client';

import { createContext } from 'react';

export type PageTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** 当前生效的主题 */
  theme: PageTheme;
  /** 注册一个 ThemeSection */
  registerSection: (id: string, theme: PageTheme) => void;
  /** 注销一个 ThemeSection */
  unregisterSection: (id: string) => void;
  /** 标记 Section 进入/离开视口 */
  updateSectionVisibility: (id: string, isVisible: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  registerSection: () => {},
  unregisterSection: () => {},
  updateSectionVisibility: () => {},
});