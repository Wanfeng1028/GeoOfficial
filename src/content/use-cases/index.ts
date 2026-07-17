/**
 * Use Case MDX 静态 loader map。
 *
 * 不使用任意字符串拼接 import，静态 Map 更适合构建分析与类型检查。
 * 新增案例时在此注册 slug → dynamic import。
 *
 * v2.5 Iteration 7：slug 与 routes.ts 对齐（ndvi-time-series）。
 */
export const useCaseContentLoaders = {
  'urban-expansion': () => import('./urban-expansion.mdx'),
  'ndvi-time-series': () => import('./ndvi-time-series.mdx'),
  'research-report': () => import('./research-report.mdx'),
} as const;

export type UseCaseSlug = keyof typeof useCaseContentLoaders;

export function isUseCaseSlug(value: string): value is UseCaseSlug {
  return value in useCaseContentLoaders;
}
