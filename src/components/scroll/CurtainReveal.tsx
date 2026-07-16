'use client';

import { useRef, type ReactNode } from 'react';
import { useScroll, useTransform, motion, type UseScrollOptions } from 'motion/react';
import styles from './CurtainReveal.module.css';

interface CurtainRevealProps {
  children: ReactNode;
  /** 黑幕后面的内容 */
  curtainContent: ReactNode;
  /** 外层滚动高度 */
  height?: string;
  className?: string;
}

/**
 * 黑幕滑出揭示效果：
 * - 外层 180–220vh 滚动区
 * - 底部白色内容层在 0%–35% 被黑幕覆盖
 * - 35%–100% 黑幕向上滑出 (translateY -100%)，揭示下方内容
 */
export function CurtainReveal({
  children,
  curtainContent,
  height = '200vh',
  className,
}: CurtainRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'] as UseScrollOptions['offset'],
  });

  const curtainY = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ['0%', '0%', '-100%'],
  );

  const curtainOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    [1, 0],
  );

  return (
    <section
      ref={ref}
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      style={{ minHeight: height }}
    >
      {/* 下方白色内容层 */}
      <div className={styles.revealLayer}>
        {children}
      </div>

      {/* 上方黑幕层 */}
      <motion.div
        className={styles.curtain}
        style={{ y: curtainY, opacity: curtainOpacity }}
      >
        {curtainContent}
      </motion.div>
    </section>
  );
}