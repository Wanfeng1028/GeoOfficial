'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface ScrollProgressProps {
  progress: MotionValue<number>;
  steps?: string[];
  className?: string;
}

export function ScrollProgress({ progress, steps, className }: ScrollProgressProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={className} role="progressbar" aria-valuemin={0} aria-valuemax={100}>
      {steps.map((label, i) => (
        <StepIndicator key={label} progress={progress} index={i} total={steps.length} label={label} />
      ))}
    </div>
  );
}

function StepIndicator({
  progress,
  index,
  total,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  label: string;
}) {
  const stepSize = 1 / total;
  const opacity = useTransform(
    progress,
    [
      index * stepSize - 0.05,
      index * stepSize,
      (index + 1) * stepSize - 0.05,
      (index + 1) * stepSize,
    ],
    [0, 1, 1, 0],
  );

  return (
    <motion.span style={{ opacity }}>
      {label}
    </motion.span>
  );
}