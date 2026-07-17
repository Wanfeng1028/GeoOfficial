/**
 * Engineering MDX 静态 loader map — v2.5 plan Iteration 8
 *
 * 不使用任意字符串拼接 import,静态 Map 更适合构建分析与类型检查。
 * 新增文章时在此注册 slug → dynamic import。
 */
export const engineeringContentLoaders = {
  'go-runtime-internals': () => import('./go-runtime-internals.mdx'),
} as const;

export type EngineeringSlug = keyof typeof engineeringContentLoaders;

export function isEngineeringSlug(value: string): value is EngineeringSlug {
  return value in engineeringContentLoaders;
}
