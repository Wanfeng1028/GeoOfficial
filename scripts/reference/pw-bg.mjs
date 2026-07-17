import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const log = (msg) => {
  writeFileSync('scripts/reference/pw-bg.log', msg + '\n', { flag: 'a' });
};

const dir = 'docs/reference/attio/screenshots/desktop-1440';
mkdirSync(dir, { recursive: true });

try {
  writeFileSync('scripts/reference/pw-bg.log', '');
  log('START ' + new Date().toISOString());
  const b = await chromium.launch({ headless: true, channel: 'msedge' });
  log('BROWSER_LAUNCHED');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  log('CONTEXT_CREATED');
  const p = await ctx.newPage();
  log('PAGE_CREATED');
  await p.goto('https://attio.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
  log('NAV_DONE ' + p.url());
  const out = dir + '/home__desktop-1440__top__2026-07-17.png';
  await p.screenshot({ path: out, fullPage: false, timeout: 30000, animations: 'disabled', caret: 'hide' });
  log('SCREENSHOT_SAVED ' + out);
  await b.close();
  log('BROWSER_CLOSED');
  log('SUCCESS ' + new Date().toISOString());
} catch (e) {
  log('ERROR ' + e.message);
  log(e.stack || '');
  process.exit(1);
}
