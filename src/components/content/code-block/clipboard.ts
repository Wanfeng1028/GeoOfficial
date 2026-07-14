/**
 * Clipboard 访问器。
 *
 * 抽到独立模块，便于单元测试通过 `vi.mock` 替换，
 * 而非在测试中覆写 jsdom 不实现的 `navigator.clipboard`。
 */
export async function copyToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
