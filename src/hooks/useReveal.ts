import { useEffect, useRef, type RefObject } from 'react';

export interface UseRevealOptions {
  /** 元素出现后是否停止观察（默认 true） */
  once?: boolean;
  /** 元素离开视口后是否重新隐藏（默认 false） */
  repeat?: boolean;
  /** IntersectionObserver threshold（默认 0.1） */
  threshold?: number;
  /** IntersectionObserver rootMargin（默认 '0px 0px -40px 0px'） */
  rootMargin?: string;
}

/**
 * 为容器内所有 `.reveal` 元素提供滚动入场动画。
 *
 * 使用方式：
 * 1. 在容器上调用 `const containerRef = useReveal()`；
 * 2. 把 `containerRef` 绑定到包裹元素上；
 * 3. 在需要动画的子元素上加 `className="reveal"`；
 * 4. 用 `data-reveal-delay="100ms"` 控制 stagger 延迟。
 *
 * CSS 中 `.reveal` 初始为透明 + 下移，`.reveal.visible` 恢复原位。
 * 延迟通过 CSS 自定义属性 `--reveal-delay` 控制。
 */
export function useReveal(options: UseRevealOptions = {}): RefObject<HTMLElement | null> {
  const {
    once = true,
    repeat = false,
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 尊重用户的减少动画偏好
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReducedMotion = () => {
      if (motionQuery.matches) {
        container.querySelectorAll('.reveal').forEach((el) => {
          el.classList.add('visible');
        });
        return true;
      }
      return false;
    };

    if (applyReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('visible');
            if (once) observer.unobserve(el);
          } else if (repeat) {
            el.classList.remove('visible');
          }
        });
      },
      { threshold, rootMargin },
    );

    // 观察当前所有 .reveal 元素
    const reveals = container.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    // 监听 DOM 变化，动态添加的 .reveal 元素也能被观察
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const reveals = node.matches('.reveal')
              ? [node]
              : node.querySelectorAll('.reveal');
            reveals.forEach((el) => observer.observe(el));
          }
        });
      });
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    // 监听系统动画偏好变化
    const handleMotionChange = () => {
      if (applyReducedMotion()) {
        observer.disconnect();
        mutationObserver.disconnect();
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [once, repeat, threshold, rootMargin]);

  return containerRef;
}
