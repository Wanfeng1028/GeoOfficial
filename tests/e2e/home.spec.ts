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

test('homepage hero image loads successfully', async ({ page }) => {
  await page.goto('/');

  const image = page.getByRole('img', {
    name: /GeoWork 桌面工作台/,
  });

  await expect(image).toBeVisible();

  const loaded = await image.evaluate((element) => {
    return (
      element instanceof HTMLImageElement &&
      element.complete &&
      element.naturalWidth > 0
    );
  });

  expect(loaded).toBe(true);
});

test('homepage sections follow the documented order', async ({ page }) => {
  await page.goto('/');

  const ids = await page
    .locator('main > section, main section')
    .evaluateAll((sections) =>
      sections.map((section) => section.id).filter(Boolean),
    );

  expect(ids).toEqual([
    'hero',
    'principles',
    'workflow',
    'modes',
    'use-cases',
    'product-details',
    'architecture',
    'open-development',
    'download',
  ]);
});
