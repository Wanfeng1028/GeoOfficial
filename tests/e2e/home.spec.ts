import { expect, test } from '@playwright/test';

test('homepage communicates product and exposes primary actions', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /完整的地理空间工作/,
    }),
  ).toBeVisible();

  await expect(page.getByRole('link', { name: 'Explore GeoWork' })).toBeVisible();
});

test('homepage hero stage renders', async ({ page }) => {
  await page.goto('/');

  const stage = page.getByRole('img', {
    name: /GeoWork 桌面工作台/,
  });

  await expect(stage).toBeVisible();
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
    'product-objects',
    'workflow',
    'modes',
    'use-cases',
    'context',
    'ecosystem',
    'open-development',
    'changelog',
    'final-cta',
  ]);
});
