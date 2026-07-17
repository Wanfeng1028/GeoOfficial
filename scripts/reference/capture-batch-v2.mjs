/**
 * Batch screenshot capture v2 - with retry and error recovery.
 *
 * Fixes from v1:
 *   - Retry logic (2 retries per URL)
 *   - Close and recreate page after navigation failure
 *   - Delay between targets
 *   - Better error isolation (one failure doesn't cascade)
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';

const ROOT = 'E:/code/javascript/project/GeoOfficial';
const PLAN_PATH = `${ROOT}/docs/reference/attio/manifest/capture-plan.json`;
const LOG_PATH = `${ROOT}/scripts/reference/capture-batch-v2.log`;
const SS_ROOT = `${ROOT}/docs/reference/attio/screenshots`;
const DATE = '2026-07-17';

const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : 0;
const RESUME = args.includes('--resume');

const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG_PATH, line + '\n');
};

const ensureDirs = () => {
  ['desktop-1440', 'mobile-390'].forEach((d) => {
    mkdirSync(`${SS_ROOT}/${d}`, { recursive: true });
  });
};

const sanitizeRouteId = (id) => id.replace(/[^a-z0-9-]/gi, '-');

const screenshotPath = (routeId, viewport, state) =>
  `${SS_ROOT}/${viewport}/${sanitizeRouteId(routeId)}__${viewport}__${state}__${DATE}.png`;

const alreadyCaptured = (routeId) => {
  const top1440 = screenshotPath(routeId, 'desktop-1440', 'top');
  const top390 = screenshotPath(routeId, 'mobile-390', 'top');
  return existsSync(top1440) && existsSync(top390);
};

const dedupeTargets = (targets) => {
  const seen = new Set();
  const out = [];
  for (const t of targets) {
    const url = t.url.replace(/\/$/, '');
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(t);
  }
  return out;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Try to navigate to a URL with retries.
 * Closes and recreates the page on failure to prevent cascade.
 */
const navigateWithRetry = async (browser, url, maxRetries = 2) => {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    let page;
    try {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      return { page, ctx };
    } catch (e) {
      lastError = e;
      log(`  attempt ${attempt + 1} failed: ${e.message.split('\n')[0]}`);
      if (page) {
        try { await page.close(); } catch {}
      }
      try { if (ctx) await ctx.close(); } catch {}
      // Wait before retry
      if (attempt < maxRetries) {
        await sleep(3000);
      }
    }
  }
  throw lastError;
};

const captureTarget = async (browser, target) => {
  const { routeId, url } = target;
  const results = { routeId, url, shots: [], errors: [] };

  let page, ctx;
  try {
    const nav = await navigateWithRetry(browser, url);
    page = nav.page;
    ctx = nav.ctx;
    await sleep(1500); // Let page settle
  } catch (e) {
    results.errors.push(`nav: ${e.message.split('\n')[0]}`);
    return results;
  }

  // Capture at 1440
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await sleep(600);
    const p1 = screenshotPath(routeId, 'desktop-1440', 'top');
    await page.screenshot({ path: p1, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
    results.shots.push(p1);

    const height1440 = await page.evaluate(() => document.body.scrollHeight);
    if (height1440 > 1800) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
      await sleep(500);
      const p2 = screenshotPath(routeId, 'desktop-1440', 'middle');
      await page.screenshot({ path: p2, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
      results.shots.push(p2);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9));
      await sleep(500);
      const p3 = screenshotPath(routeId, 'desktop-1440', 'bottom');
      await page.screenshot({ path: p3, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
      results.shots.push(p3);
    }
  } catch (e) {
    results.errors.push(`1440: ${e.message.split('\n')[0]}`);
  }

  // Capture at 390
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await sleep(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    const p4 = screenshotPath(routeId, 'mobile-390', 'top');
    await page.screenshot({ path: p4, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
    results.shots.push(p4);

    const height390 = await page.evaluate(() => document.body.scrollHeight);
    if (height390 > 1700) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
      await sleep(500);
      const p5 = screenshotPath(routeId, 'mobile-390', 'middle');
      await page.screenshot({ path: p5, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
      results.shots.push(p5);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9));
      await sleep(500);
      const p6 = screenshotPath(routeId, 'mobile-390', 'bottom');
      await page.screenshot({ path: p6, fullPage: false, timeout: 20000, animations: 'disabled', caret: 'hide' });
      results.shots.push(p6);
    }
  } catch (e) {
    results.errors.push(`390: ${e.message.split('\n')[0]}`);
  }

  // Clean up page
  try { await page.close(); } catch {}
  try { await ctx.close(); } catch {}

  return results;
};

const main = async () => {
  writeFileSync(LOG_PATH, '');
  log('=== Batch Capture v2 Start ===');
  ensureDirs();

  const plan = JSON.parse(readFileSync(PLAN_PATH, 'utf8'));
  let targets = dedupeTargets(plan.targets);
  log(`plan targets: ${plan.targets.length}, deduped: ${targets.length}`);

  if (RESUME) {
    const before = targets.length;
    targets = targets.filter((t) => !alreadyCaptured(t.routeId));
    log(`resume: skipping ${before - targets.length} already-captured targets`);
  }

  if (LIMIT > 0) {
    targets = targets.slice(0, LIMIT);
    log(`limit: capturing only first ${LIMIT}`);
  }

  log(`total to capture: ${targets.length}`);

  let browser;
  const summary = { ok: 0, fail: 0, shots: 0, errors: [] };

  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
    log('browser launched');

    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      const idx = `[${i + 1}/${targets.length}]`;
      log(`${idx} ${t.routeId} <- ${t.url}`);

      try {
        const r = await captureTarget(browser, t);
        if (r.errors.length === 0) {
          summary.ok++;
          log(`  ok: ${r.shots.length} shots`);
        } else if (r.shots.length > 0) {
          summary.ok++;
          log(`  partial: ${r.shots.length} shots, ${r.errors.length} errors`);
          r.errors.forEach((e) => log(`    err: ${e}`));
        } else {
          summary.fail++;
          summary.errors.push(`${t.routeId}: ${r.errors.join('; ')}`);
          r.errors.forEach((e) => log(`    err: ${e}`));
        }
        summary.shots += r.shots.length;
      } catch (e) {
        summary.fail++;
        summary.errors.push(`${t.routeId}: ${e.message}`);
        log(`  FATAL: ${e.message.split('\n')[0]}`);
      }

      // Delay between targets to avoid rate limiting
      await sleep(2000);

      if ((i + 1) % 5 === 0) {
        log(`checkpoint: ${summary.ok} ok, ${summary.fail} fail, ${summary.shots} shots`);
      }
    }

    log('closing browser...');
    await browser.close();
    log('browser closed');
  } catch (e) {
    log(`FATAL: ${e.message}`);
    log(e.stack || '');
    if (browser) {
      try { await browser.close(); } catch {}
    }
  }

  log('=== Batch Capture v2 Done ===');
  log(`ok: ${summary.ok}, fail: ${summary.fail}, shots: ${summary.shots}`);
  if (summary.errors.length > 0) {
    log('errors:');
    summary.errors.forEach((e) => log(`  - ${e}`));
  }
  writeFileSync(`${ROOT}/docs/reference/attio/manifest/capture-summary-v2.json`, JSON.stringify({
    completedAt: new Date().toISOString(),
    ok: summary.ok,
    fail: summary.fail,
    shots: summary.shots,
    errors: summary.errors,
  }, null, 2));
};

main().catch((e) => {
  log(`UNCAUGHT: ${e.message}`);
  log(e.stack || '');
  process.exit(1);
});
