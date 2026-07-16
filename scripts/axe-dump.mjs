import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const paths = ['/', '/product', '/use-cases', '/download', '/changelog', '/about'];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const p of paths) {
  await page.goto('http://127.0.0.1:3000/zh' + (p === '/' ? '' : p));
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  );
  console.log('\n=== ' + p + ' ===');
  for (const v of serious) {
    console.log('rule:', v.id, '| impact:', v.impact);
    for (const node of v.nodes) {
      console.log('  html:', (node.html || '').slice(0, 150));
      console.log('  target:', JSON.stringify(node.target).slice(0, 220));
      console.log('  data:', JSON.stringify(node.data || {}).slice(0, 320));
    }
  }
}
await browser.close();
