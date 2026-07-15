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

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, closes via Escape and navigates to product', async ({ page }) => {
    await page.goto('/');

    const trigger = page.getByRole('button', { name: '打开菜单' });
    await expect(trigger).toBeVisible();

    await trigger.click();

    const dialog = page.getByRole('dialog', { name: '导航' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Product' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await dialog.getByRole('link', { name: 'Product' }).click();
    await expect(page).toHaveURL(/\/product$/);
  });
});
