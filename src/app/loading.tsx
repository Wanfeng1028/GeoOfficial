import styles from './loading.module.css';

/**
 * 全局 loading.tsx — v2.5 plan Iteration 9
 *
 * Next.js App Router 在路由段级别自动用 Suspense 包裹页面。
 * 本组件在页面加载期间显示一个简洁的、品牌化的加载状态。
 *
 * 设计原则:
 * - 纯视觉,不依赖 locale(因为可能出现在任何路由段)
 * - 与 not-found.tsx / error.tsx 风格一致(居中、简洁)
 * - 不阻塞,不闪烁过快(避免加载完成前就跳走)
 */
export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-busy="true">
      <div className={styles.spinner} aria-hidden />
      <p className={styles.text}>Loading</p>
    </div>
  );
}
