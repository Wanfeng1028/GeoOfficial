import type { PlatformRule } from '@/data/platforms';

/**
 * 判断一个 Release 资产名是否属于指定平台。
 *
 * 匹配规则：
 * 1. `exclude` 命中任一 → false（先排除 linux/macos 误命中 windows 等）
 * 2. `includeAll` 全部命中 → 继续；否则 false
 * 3. `includeAny` 命中任一 → true；否则 false
 */
export function matchAssetToPlatform(
  assetName: string,
  rule: PlatformRule,
): boolean {
  const excludeHit = rule.exclude?.some((pattern) => pattern.test(assetName)) ?? false;
  if (excludeHit) return false;

  const includeAllHit =
    rule.includeAll?.every((pattern) => pattern.test(assetName)) ?? true;
  if (!includeAllHit) return false;

  const includeAnyHit =
    rule.includeAny?.some((pattern) => pattern.test(assetName)) ?? true;
  return includeAnyHit;
}
