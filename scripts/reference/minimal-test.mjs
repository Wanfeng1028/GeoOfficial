import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const log = (msg) => {
  console.log(msg);
  writeFileSync('scripts/reference/minimal-test.log', msg + '\n', { flag: 'a' });
};

try {
  writeFileSync('scripts/reference/minimal-test.log', '');
  log('1. start');
  const b = await chromium.launch({ headless: true, channel: 'msedge' });
  log('2. browser launched');
  const ctx = await b.newContext({ viewport: { width: 800, height: 600 } });
  log('3. context created');
  const p = await ctx.newPage();
  log('4. page created');
  await p.goto('about:blank', { timeout: 5000 });
  log('5. navigated to about:blank');
  await p.screenshot({ path: 'scripts/reference/minimal-test.png', timeout: 5000 });
  log('6. screenshot taken');
  await b.close();
  log('7. browser closed');
  log('SUCCESS');
} catch (e) {
  log('ERROR: ' + e.message);
  log(e.stack || '');
  process.exit(1);
}
