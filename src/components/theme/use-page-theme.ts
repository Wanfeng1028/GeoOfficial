'use client';

import { useContext } from 'react';
import { ThemeContext, type PageTheme } from './theme-context';

/**
 * 获取当前页面主题的 Hook。
 * 返回当前生效的主题值，可用于 Header、Footer 等需要响应主题的组件。
 */
export function usePageTheme(): PageTheme {
  const { theme } = useContext(ThemeContext);
  return theme;
}