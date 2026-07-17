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
 * - 底部白色内容层在 0%–30% 被黑幕覆盖
 * - 30%–70% 黑幕向上滑出 (translateY -100%)，揭示下方内容
 * - 70% 后黑幕完全移出视口
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

  // 黑幕向上滑出：0%–30% 保持原位，30%–70% 向上滑出
  const curtainY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['0%', '0%', '-100%', '-100%'],
  );

  return (
    <section
      ref={ref}
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      style={{ minHeight: height }}
    >
      <div className={styles.viewport}>
        <div className={styles.revealLayer}>
          {children}
        </div>

        <motion.div
          className={styles.curtain}
          style={{ y: curtainY }}
        >
          {curtainContent}
        </motion.div>
      </div>
    </section>
  );
}