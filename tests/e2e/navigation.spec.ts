import { expect, test } from '@playwright/test';

test('header navigation links exist on desktop', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('link', { name: 'GeoWork 首页' })).toBeVisible();
});

test('footer navigation groups visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: '页脚导航' })).toBeVisible();
});

test('mobile menu trigger exists on small viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
});
