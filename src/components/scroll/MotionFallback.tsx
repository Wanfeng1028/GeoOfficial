'use client';

import { type ReactNode } from 'react';

interface MotionFallbackProps {
  children: ReactNode;
  /** 当 prefers-reduced-motion 时显示的静态替代内容 */
  fallback: ReactNode;
}

/**
 * 在 Reduced Motion 模式下提供静态替代内容。
 * 通过 CSS media query 自动切换，无需 JS 检测。
 */
export function MotionFallback({ children, fallback }: MotionFallbackProps) {
  return (
    <>
      <span className="motion-only" aria-hidden="true">
        {children}
      </span>
      <span className="static-only" aria-hidden="true">
        {fallback}
      </span>
      <style>{`
        .motion-only { display: contents; }
        .static-only { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .motion-only { display: none; }
          .static-only { display: contents; }
        }
      `}</style>
    </>
  );
}