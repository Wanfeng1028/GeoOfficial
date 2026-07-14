import { expect, test } from '@playwright/test';

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`home ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`home-${viewport.width}.png`, {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });
}
