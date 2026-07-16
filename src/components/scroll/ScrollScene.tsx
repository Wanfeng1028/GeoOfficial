'use client';

import { useRef, type ReactNode } from 'react';
import { useScroll, type UseScrollOptions } from 'motion/react';
import styles from './ScrollScene.module.css';

interface ScrollSceneProps {
  children: ReactNode;
  /** 外层滚动区高度，默认 200vh */
  height?: string;
  /** 是否启用 sticky 内部容器 */
  sticky?: boolean;
  /** sticky 时的 top 偏移 */
  stickyTop?: string;
  className?: string;
  /** 暴露 MotionValue 给父组件 */
  onScrollProgress?: (progress: ReturnType<typeof useScroll>['scrollYProgress']) => void;
}

export function ScrollScene({
  children,
  height = '200vh',
  sticky = true,
  stickyTop = '0px',
  className,
  onScrollProgress,
}: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'] as UseScrollOptions['offset'],
  });

  // 暴露进度给父组件
  if (onScrollProgress) {
    onScrollProgress(scrollYProgress);
  }

  return (
    <section
      ref={ref}
      className={`${styles.scene}${className ? ` ${className}` : ''}`}
      style={{ minHeight: height }}
    >
      <div
        className={sticky ? styles.sticky : styles.flow}
        style={sticky ? { top: stickyTop } : undefined}
      >
        {children}
      </div>
    </section>
  );
}