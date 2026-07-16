'use client';

import { useContext, useEffect, useId, useRef, type ReactNode } from 'react';
import { ThemeContext, type PageTheme } from './theme-context';

interface ThemeSectionProps {
  children: ReactNode;
  /** 此 Section 要求的主题 */
  theme?: PageTheme;
  className?: string;
}

/**
 * 主题 Section — 只上报进入/离开，不直接写 DOM。
 *
 * 使用 IntersectionObserver，当 Section 中心线进入视口中间
 * 40% 区域时激活主题，离开后恢复前一个 Section 的主题。
 */
export function ThemeSection({
  children,
  theme = 'dark',
  className,
}: ThemeSectionProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection, unregisterSection, updateSectionVisibility } =
    useContext(ThemeContext);

  useEffect(() => {
    registerSection(id, theme);
    return () => unregisterSection(id);
  }, [id, theme, registerSection, unregisterSection]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          updateSectionVisibility(id, entry.isIntersecting);
        }
      },
      {
        // Section 中心线进入视口中间 40% 区域后才激活
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, updateSectionVisibility]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}