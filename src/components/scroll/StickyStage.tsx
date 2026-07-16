'use client';

import { useRef, type ReactNode } from 'react';
import { useScroll, useTransform, motion, type UseScrollOptions } from 'motion/react';
import styles from './StickyStage.module.css';

interface StickyStageProps {
  children: ReactNode;
  /** sticky 时 top 偏移，默认 var(--header-height, 0px) */
  top?: string;
  className?: string;
  /** 滚动进度范围对应的缩放 */
  scaleRange?: [number, number, number, number];
  progressRange?: [number, number, number, number];
}

export function StickyStage({
  children,
  top = 'var(--header-height, 0px)',
  className,
  scaleRange = [0, 0.25, 0.7, 1],
  progressRange = [0.92, 1, 1, 0.96],
}: StickyStageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'] as UseScrollOptions['offset'],
  });

  const scale = useTransform(scrollYProgress, scaleRange, progressRange);

  return (
    <div
      ref={ref}
      className={`${styles.stage}${className ? ` ${className}` : ''}`}
      style={{ top }}
    >
      <motion.div className={styles.inner} style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
}