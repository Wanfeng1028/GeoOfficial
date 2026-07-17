import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const dir = 'docs/reference/attio/screenshots/desktop-1440';
await mkdir(dir, { recursive: true });

const out = dir + '/home__desktop-1440__full-page__2026-07-17.png';

try {
  const b = await chromium.launch({ headless: true, channel: 'msedge' });
  console.log('browser launched');
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  // Block heavy resources that keep network busy
  await ctx.route('**/*', (route) => {
    const t = route.request().resourceType();
    if (t === 'media' || t === 'font') {
      route.abort();
    } else {
      route.continue();
    }
  });
  const p = await ctx.newPage();
  console.log('navigating...');
  await p.goto('https://attio.com', { waitUntil: 'domcontentloaded', timeout: 20000 });
  console.log('page loaded, title:', await p.title());
  // Wait briefly for layout to settle, but don't wait for full network idle
  await p.waitForTimeout(1500);
  console.log('taking screenshot...');
  await p.screenshot({
    path: out,
    fullPage: false,
    timeout: 10000,
    animations: 'disabled',
    caret: 'hide',
  });
  console.log('viewport screenshot saved:', out);
  await b.close();
  console.log('done');
} catch (e) {
  console.error('ERROR:', e.message);
  process.exit(1);
}
