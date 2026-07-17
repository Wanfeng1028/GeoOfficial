/**
 * Learn MDX 静态 loader map — v2.5 plan Iteration 8
 *
 * 不使用任意字符串拼接 import,静态 Map 更适合构建分析与类型检查。
 * 新增文章时在此注册 slug → dynamic import。
 */
export const learnContentLoaders = {
  'your-first-map': () => import('./your-first-map.mdx'),
} as const;

export type LearnSlug = keyof typeof learnContentLoaders;

export function isLearnSlug(value: string): value is LearnSlug {
  return value in learnContentLoaders;
}
