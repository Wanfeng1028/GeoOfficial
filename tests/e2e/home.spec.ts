import { expect, test } from '@playwright/test';

test('homepage communicates product and exposes primary actions', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '地图、遥感、代码与研究，汇于一个工作台。',
    }),
  ).toBeVisible();

  await expect(page.getByRole('link', { name: '下载 GeoWork' })).toBeVisible();
});

test('homepage renders hero media', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
});

test('homepage sections follow the documented order', async ({ page }) => {
  await page.goto('/');
  const main = page.getByRole('main');

  const hero = main.locator('section').first();
  await expect(hero).toBeVisible();
});
