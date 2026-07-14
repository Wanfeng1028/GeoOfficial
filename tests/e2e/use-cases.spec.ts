import { expect, test } from '@playwright/test';

const slugs = ['urban-expansion', 'ndvi-series', 'research-report'];

for (const slug of slugs) {
  test(`use case ${slug} detail page renders MDX content`, async ({ page }) => {
    await page.goto(`/use-cases/${slug}`);

    // 页面只有一个 H1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);

    // MDX 正文出现（问题章节）
    await expect(page.getByRole('heading', { level: 2, name: '问题' })).toBeVisible();
    // 限制章节存在
    await expect(page.getByRole('heading', { level: 2, name: '限制' })).toBeVisible();

    // 案例图片成功加载
    const image = page.getByRole('img').first();
    const loaded = await image.evaluate((el) => {
      return (
        el instanceof HTMLImageElement &&
        el.complete &&
        el.naturalWidth > 0
      );
    });
    expect(loaded).toBe(true);
  });
}

test('use case list links back to detail pages', async ({ page }) => {
  await page.goto('/use-cases');
  await expect(page.getByRole('link', { name: '查看详情' }).first()).toBeVisible();
});

test('unknown use case slug returns 404', async ({ page }) => {
  const response = await page.goto('/use-cases/non-existent-slug');
  expect(response?.status()).toBe(404);
});
