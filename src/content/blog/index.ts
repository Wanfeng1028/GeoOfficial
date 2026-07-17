/**
 * Blog MDX 静态 loader map — v2.5 plan Iteration 8
 *
 * 不使用任意字符串拼接 import,静态 Map 更适合构建分析与类型检查。
 * 新增文章时在此注册 slug → dynamic import。
 */
export const blogContentLoaders = {
  'why-local-first': () => import('./why-local-first.mdx'),
} as const;

export type BlogSlug = keyof typeof blogContentLoaders;

export function isBlogSlug(value: string): value is BlogSlug {
  return value in blogContentLoaders;
}
