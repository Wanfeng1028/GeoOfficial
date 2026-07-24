/**
 * Motion 设计令牌 — 与 CSS Custom Properties 同步
 *
 * tokens.css 中定义：
 *   --duration-fast: 140ms
 *   --duration-normal: 260ms
 *   --duration-slow: 520ms
 *   --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)
 *
 * 在 motion/react 的 transition 中使用这些值，确保 JS 动画和 CSS 动画时长一致。
 */

export const motionTokens = {
  durationFast: 0.14,
  durationNormal: 0.26,
  durationSlow: 0.52,
  easeStandard: [0.2, 0.8, 0.2, 1] as const,
} as const;

export type MotionTokens = typeof motionTokens;
