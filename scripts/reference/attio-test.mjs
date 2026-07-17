import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const log = (msg) => {
  console.log(msg);
  writeFileSync('scripts/reference/attio-test.log', msg + '\n', { flag: 'a' });
};

const dir = 'docs/reference/attio/screenshots/desktop-1440';
mkdirSync(dir, { recursive: true });

try {
  writeFileSync('scripts/reference/attio-test.log', '');
  log('1. start');
  const b = await chromium.launch({ headless: true, channel: 'msedge' });
  log('2. browser launched');
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  log('3. context created');
  const p = await ctx.newPage();
  log('4. page created');
  await p.goto('https://attio.com', { waitUntil: 'domcontentloaded', timeout: 20000 });
  log('5. navigation done, url: ' + p.url());
  const out = dir + '/home__desktop-1440__top__2026-07-17.png';
  await p.screenshot({
    path: out,
    fullPage: false,
    timeout: 15000,
    animations: 'disabled',
    caret: 'hide',
  });
  log('6. screenshot saved: ' + out);
  await b.close();
  log('7. browser closed');
  log('SUCCESS');
} catch (e) {
  log('ERROR: ' + e.message);
  log(e.stack || '');
  try {
    const b = await chromium.launch({ headless: true, channel: 'msedge' });
    await b.close();
  } catch {}
  process.exit(1);
}
