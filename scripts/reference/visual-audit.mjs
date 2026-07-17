/**
 * Lightweight visual audit — v2.5 plan Iteration 11
 *
 * Collects DOM metrics (no screenshots) for all key routes at desktop + mobile.
 * Writes results incrementally so partial data is preserved if it crashes.
 *
 * Usage: node scripts/reference/visual-audit.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const BASE = 'http://localhost:3456';
const OUT_DIR = resolve('docs/reference/attio/states');
mkdirSync(OUT_DIR, { recursive: true });
const REPORT_PATH = join(OUT_DIR, 'geowork-audit-latest.json');

const routes = [
  { path: '/zh', name: 'home' },
  { path: '/zh/platform', name: 'platform-index' },
  { path: '/zh/platform/assistant', name: 'platform-assistant' },
  { path: '/zh/platform/ai', name: 'platform-ai' },
  { path: '/zh/platform/data', name: 'platform-data' },
  { path: '/zh/platform/context', name: 'platform-context' },
  { path: '/zh/platform/workflows', name: 'platform-workflows' },
  { path: '/zh/platform/task-sequences', name: 'platform-task-sequences' },
  { path: '/zh/platform/research-intelligence', name: 'platform-research-intelligence' },
  { path: '/zh/platform/reporting', name: 'platform-reporting' },
  { path: '/zh/platform/developers', name: 'platform-developers' },
  { path: '/zh/ecosystem', name: 'ecosystem-index' },
  { path: '/zh/ecosystem/qgis', name: 'ecosystem-qgis' },
  { path: '/zh/ecosystem/gdal', name: 'ecosystem-gdal' },
  { path: '/zh/use-cases', name: 'use-cases-index' },
  { path: '/zh/use-cases/urban-expansion', name: 'use-case-urban-expansion' },
  { path: '/zh/resources', name: 'resources' },
  { path: '/zh/getting-started', name: 'getting-started' },
  { path: '/zh/help', name: 'help' },
  { path: '/zh/learn', name: 'learn' },
  { path: '/zh/docs', name: 'docs' },
  { path: '/zh/partners', name: 'partners' },
  { path: '/zh/blog', name: 'blog' },
  { path: '/zh/blog/why-local-first', name: 'blog-detail' },
  { path: '/zh/engineering', name: 'engineering' },
  { path: '/zh/engineering/go-runtime-internals', name: 'engineering-detail' },
  { path: '/zh/help/install', name: 'help-detail' },
  { path: '/zh/learn/your-first-map', name: 'learn-detail' },
  { path: '/zh/changelog', name: 'changelog' },
  { path: '/zh/changelog/v0-4-developer-preview', name: 'changelog-detail' },
  { path: '/zh/careers', name: 'careers' },
  { path: '/zh/contact', name: 'contact' },
  { path: '/zh/plans', name: 'plans' },
  { path: '/zh/manifesto', name: 'manifesto' },
  { path: '/zh/status', name: 'status' },
  { path: '/zh/trust', name: 'trust' },
  { path: '/zh/security', name: 'security' },
  { path: '/zh/about', name: 'about' },
  { path: '/zh/download', name: 'download' },
  { path: '/zh/privacy', name: 'privacy' },
  { path: '/zh/terms', name: 'terms' },
  { path: '/zh/community/experts', name: 'community-experts' },
  { path: '/zh/programs/education-research', name: 'programs-education-research' },
  { path: '/zh/product', name: 'product' },
  { path: '/zh/pricing', name: 'pricing' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

function loadExisting() {
  if (existsSync(REPORT_PATH)) {
    try {
      return JSON.parse(readFileSync(REPORT_PATH, 'utf8'));
    } catch {}
  }
  return { results: [], startedAt: new Date().toISOString() };
}

function save(data) {
  data.updatedAt = new Date().toISOString();
  writeFileSync(REPORT_PATH, JSON.stringify(data, null, 2));
}

async function auditRoute(context, route, vp) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Skip noisy dev-only warnings
      if (!text.includes('Download the React DevTools') && !text.includes('[Fast Refresh]')) {
        errors.push(`console: ${text.slice(0, 200)}`);
      }
    }
  });

  try {
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(800); // allow CSS + fonts

    const metrics = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const overflowEls = [];
      const all = document.querySelectorAll('div, section, main, header, footer, p, h1, h2, h3, span, a, img, ul, ol, li, table, pre, code');
      for (let i = 0; i < all.length && overflowEls.length < 3; i++) {
        const el = all[i];
        if (el.scrollWidth > el.clientWidth + 2 && el !== html && el !== body) {
          overflowEls.push({
            tag: el.tagName.toLowerCase(),
            cls: (typeof el.className === 'string' ? el.className : el.className?.toString?.() || '').slice(0, 80),
            sw: el.scrollWidth,
            cw: el.clientWidth,
          });
        }
      }
      const h1 = document.querySelector('h1');
      const h2s = Array.from(document.querySelectorAll('main h2')).slice(0, 8).map((h) => (h.textContent || '').trim().slice(0, 60));
      return {
        scrollH: html.scrollHeight,
        scrollW: html.scrollWidth,
        clientW: html.clientWidth,
        hOverflow: html.scrollWidth > html.clientWidth + 1,
        overflowEls,
        h1: (h1?.textContent || '').trim().slice(0, 120) || null,
        h2s,
        sections: document.querySelectorAll('main section, main > div > section').length,
      };
    });

    await page.close();
    return { status: 'ok', ...metrics, errors: errors.slice(0, 3) };
  } catch (e) {
    try { await page.close(); } catch {}
    return { status: 'error', error: e.message.slice(0, 200), errors: errors.slice(0, 3) };
  }
}

async function main() {
  console.log(`Visual audit: ${routes.length} routes × ${viewports.length} viewports`);
  const data = loadExisting();
  const browser = await chromium.launch({ headless: true });

  // Build a map of existing results by route name
  const existingMap = new Map();
  for (const r of data.results) existingMap.set(r.name, r);

  let count = 0;
  for (const route of routes) {
    count++;
    const existing = existingMap.get(route.name);
    const result = { route: route.path, name: route.name, desktop: existing?.desktop, mobile: existing?.mobile };

    for (const vp of viewports) {
      // Skip if already audited successfully
      if (result[vp.name]?.status === 'ok') {
        process.stdout.write(`[${count}/${routes.length}] ${route.name}.${vp.name}=cached `);
        continue;
      }
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      process.stdout.write(`[${count}/${routes.length}] ${route.name}.${vp.name}=... `);
      result[vp.name] = await auditRoute(context, route, vp);
      await context.close();
      const s = result[vp.name]?.status === 'ok' ? 'OK' : 'FAIL';
      const of = result[vp.name]?.hOverflow ? '+overflow' : '';
      process.stdout.write(`${s}${of} `);
    }
    console.log();

    // Update existing or add new
    const idx = data.results.findIndex((r) => r.name === route.name);
    if (idx >= 0) data.results[idx] = result;
    else data.results.push(result);
    save(data); // incremental save
  }

  await browser.close();

  // Summary
  const summary = {
    total: data.results.length,
    desktopOk: data.results.filter((r) => r.desktop?.status === 'ok').length,
    mobileOk: data.results.filter((r) => r.mobile?.status === 'ok').length,
    desktopOverflow: data.results.filter((r) => r.desktop?.hOverflow).length,
    mobileOverflow: data.results.filter((r) => r.mobile?.hOverflow).length,
    withErrors: data.results.filter((r) => (r.desktop?.errors?.length || 0) + (r.mobile?.errors?.length || 0) > 0).length,
    missingH1: data.results.filter((r) => !r.desktop?.h1 || !r.mobile?.h1).length,
  };
  console.log('\n=== Summary ===');
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
