'use client';

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import styles from './DragViewport.module.css';

interface DragViewportProps {
  children: ReactNode;
  label: string;
  className?: string;
  /** 是否启用拖拽，默认在 768–1365px 启用 */
  enabled?: boolean;
}

/**
 * 小屏幕桌面（768–1365px）支持鼠标拖拽、触控、滚轮、键盘的产品画布容器。
 * 当画布内容宽于可视区域时，允许用户横向拖动查看。
 */
export function DragViewport({
  children,
  label,
  className,
  enabled,
}: DragViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // 检测是否需要拖拽（画布宽度 > 视口宽度）
  useEffect(() => {
    const check = () => {
      if (enabled !== undefined) {
        setIsDraggable(enabled);
        return;
      }
      const vw = window.innerWidth;
      // 768–1365px 范围启用拖拽
      setIsDraggable(vw >= 768 && vw <= 1365);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [enabled]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggable || !viewportRef.current) return;
      setIsDragging(true);
      startXRef.current = e.clientX;
      scrollLeftRef.current = viewportRef.current.scrollLeft;
      viewportRef.current.setPointerCapture(e.pointerId);
    },
    [isDraggable],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !viewportRef.current) return;
      const dx = e.clientX - startXRef.current;
      viewportRef.current.scrollLeft = scrollLeftRef.current - dx;
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (viewportRef.current) {
        viewportRef.current.releasePointerCapture(e.pointerId);
      }
    },
    [isDragging],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!viewportRef.current || !isDraggable) return;
      const scrollAmount = 200;
      if (e.key === 'ArrowLeft') {
        viewportRef.current.scrollLeft -= scrollAmount;
      } else if (e.key === 'ArrowRight') {
        viewportRef.current.scrollLeft += scrollAmount;
      }
    },
    [isDraggable],
  );

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`${styles.viewport}${isDragging ? ` ${styles.dragging}` : ''}${className ? ` ${className}` : ''}`}
      data-draggable={isDraggable}
      data-dragging={isDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.canvas}>
        {children}
      </div>
    </div>
  );
}