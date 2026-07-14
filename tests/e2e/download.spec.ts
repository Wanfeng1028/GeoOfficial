import { expect, test } from '@playwright/test';

test('download page shows fallback when no assets', async ({ page }) => {
  await page.goto('/download');
  await expect(
    page.getByRole('heading', { name: '开始使用 GeoWork。' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /GitHub Releases/ })).toBeVisible();
});

test('download page does not white-screen on API failure', async ({ page }) => {
  await page.route('**/api/**', (route) => route.abort());
  await page.goto('/download');
  await expect(page.getByRole('main')).toBeVisible();
});
