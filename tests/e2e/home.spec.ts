import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('homepage communicates product and exposes primary actions', async ({
  page,
}) => {
  /*
   * 首页同时存在两个名为 "Explore GeoWork" 的链接：
   * 1. 顶部导航栏 CTA
   * 2. Hero 区域 CTA
   *
   * 必须限定在 #hero 内，不能使用全页面查询，也不要使用 .first()。
   */
  const hero = page.locator('#hero');

  await expect(hero).toBeVisible();

  await expect(
    hero.getByRole('heading', {
      level: 1,
      name: /完整的地理空间工作/,
    }),
  ).toBeVisible();

  const primaryAction = hero.getByRole('link', {
    name: 'Explore GeoWork',
    exact: true,
  });

  await expect(primaryAction).toHaveCount(1);
  await expect(primaryAction).toBeVisible();
  await expect(primaryAction).toHaveAttribute('href', '/product');
});

test('homepage hero stage renders', async ({ page }) => {
  /*
   * 首页一共有三个 ProductStage，且当前 aria-label 相同。
   * 必须将范围限定到 Hero，避免 Playwright strict mode 匹配三个元素。
   */
  const hero = page.locator('#hero');

  await expect(hero).toBeVisible();

  const stage = hero.getByRole('img', {
    name: 'GeoWork 桌面工作台产品界面',
    exact: true,
  });

  await expect(stage).toHaveCount(1);
  await expect(stage).toBeVisible();
});

test('homepage sections follow the documented order', async ({ page }) => {
  const ids = await page
    .locator('main section[id]')
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
