import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/product',
  '/use-cases',
  '/download',
  '/changelog',
  '/about',
  '/privacy',
  '/terms',
];

for (const route of routes) {
  test(`${route} has no unexpected console errors`, async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto(route);
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
}
