'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './ThemeObserver.module.css';

type Theme = 'light' | 'dark';

interface ThemeObserverProps {
  children: ReactNode;
  theme?: Theme;
  /** 滚动进度阈值，超过此值切换主题 */
  threshold?: number;
  className?: string;
}

/**
 * 当元素进入视口或滚动超过阈值时，将 data-page-theme 设置到 document.documentElement，
 * 配合 Header 和全局样式实现主题切换。
 */
export function ThemeObserver({
  children,
  theme = 'dark',
  className,
}: ThemeObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            document.documentElement.setAttribute('data-page-theme', theme);
          } else if (entry.boundingClientRect.top > 0) {
            // 元素在视口下方，还未进入
            document.documentElement.setAttribute('data-page-theme', 'light');
          }
          // 元素在视口上方时保持当前主题（由下一个 ThemeObserver 接管）
        }
      },
      {
        rootMargin: '-10% 0px -80% 0px',
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [theme]);

  return (
    <div ref={ref} className={`${styles.observer}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}