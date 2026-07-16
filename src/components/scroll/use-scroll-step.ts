import { useMotionValueEvent, type MotionValue } from 'motion/react';
import { useState } from 'react';

/**
 * 根据 scrollYProgress (0–1) 和阈值数组，返回当前激活的步骤索引。
 * 阈值数组含义：当进度超过 thresholds[i] 时激活步骤 i。
 */
export function useScrollStep(
  scrollYProgress: MotionValue<number>,
  thresholds: number[],
): number {
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => {
    let step = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (latest >= thresholds[i]) {
        step = i;
      }
    }
    setActiveStep(step);
  });

  return activeStep;
}