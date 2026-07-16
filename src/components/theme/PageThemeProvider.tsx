'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ThemeContext, type PageTheme } from './theme-context';

interface SectionEntry {
  theme: PageTheme;
  visible: boolean;
}

/**
 * 全局唯一主题控制器。
 *
 * 规则：
 * 1. 只有一个 Provider，包裹在 RootLayout 中。
 * 2. ThemeSection 只上报进入/离开，不直接写 DOM。
 * 3. 默认主题为 light。
 * 4. 路由变化时重置为 light。
 * 5. 页面卸载时强制恢复 light。
 */
export function PageThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<PageTheme>('light');
  const sectionsRef = useRef<Map<string, SectionEntry>>(new Map());
  const themeRef = useRef<PageTheme>('light');

  // 同步 ref 和 state
  themeRef.current = theme;

  const applyTheme = useCallback((next: PageTheme) => {
    if (themeRef.current === next) return;
    themeRef.current = next;
    document.documentElement.setAttribute('data-page-theme', next);
    setTheme(next);
  }, []);

  const computeActiveTheme = useCallback(() => {
    const sections = sectionsRef.current;
    // 找到第一个可见的 Section，使用其主题
    for (const [, entry] of sections) {
      if (entry.visible) {
        return entry.theme;
      }
    }
    // 没有可见 Section 时回退到 light
    return 'light' as PageTheme;
  }, []);

  const registerSection = useCallback((id: string, sectionTheme: PageTheme) => {
    const sections = sectionsRef.current;
    if (!sections.has(id)) {
      sections.set(id, { theme: sectionTheme, visible: false });
    }
  }, []);

  const unregisterSection = useCallback((id: string) => {
    const sections = sectionsRef.current;
    sections.delete(id);
    // 重新计算主题
    const next = computeActiveTheme();
    applyTheme(next);
  }, [computeActiveTheme, applyTheme]);

  const updateSectionVisibility = useCallback(
    (id: string, isVisible: boolean) => {
      const sections = sectionsRef.current;
      const entry = sections.get(id);
      if (!entry) return;
      entry.visible = isVisible;
      const next = computeActiveTheme();
      applyTheme(next);
    },
    [computeActiveTheme, applyTheme],
  );

  // 路由变化时重置主题
  useEffect(() => {
    // 组件挂载时确保 light 主题
    applyTheme('light');

    return () => {
      // 卸载时强制恢复 light
      applyTheme('light');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 监听路由变化 (popstate)
  useEffect(() => {
    const handleRouteChange = () => {
      sectionsRef.current.clear();
      applyTheme('light');
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, registerSection, unregisterSection, updateSectionVisibility }}
    >
      {children}
    </ThemeContext.Provider>
  );
}