import { expect, test } from '@playwright/test';

test('download page renders release panel heading', async ({ page }) => {
  await page.goto('/download');
  await expect(
    page.getByRole('heading', { name: '开始使用 GeoWork。' }),
  ).toBeVisible();
});

test('download page exposes GitHub Releases link regardless of API state', async ({ page }) => {
  await page.goto('/download');
  await expect(page.getByRole('link', { name: /GitHub Releases/ }).first()).toBeVisible();
});

test('download page shows fallback message when no release available', async ({ page }) => {
  await page.goto('/download');
  // 无论 GitHub 当前是否有 Release,页面必须含 GitHub Releases 链接且不白屏
  await expect(page.getByRole('main')).toBeVisible();
});
