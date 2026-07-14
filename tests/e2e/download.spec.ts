import { expect, test } from '@playwright/test';

test('download page shows fallback when no assets', async ({ page }) => {
  await page.goto('/download');
  await expect(
    page.getByRole('heading', { name: '开始使用 GeoWork。' }),
  ).toBeVisible();
  // fallback or GitHub link must be present
  await expect(page.getByRole('link', { name: /GitHub Releases/ })).toBeVisible();
});
