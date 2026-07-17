/**
 * Help MDX 静态 loader map — v2.5 plan Iteration 8
 *
 * 不使用任意字符串拼接 import,静态 Map 更适合构建分析与类型检查。
 * 新增文章时在此注册 slug → dynamic import。
 */
export const helpContentLoaders = {
  install: () => import('./install.mdx'),
} as const;

export type HelpSlug = keyof typeof helpContentLoaders;

export function isHelpSlug(value: string): value is HelpSlug {
  return value in helpContentLoaders;
}
