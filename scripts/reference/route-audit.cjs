/**
 * Temporary route audit script — Iteration 11
 * Checks all static routes for HTTP 200 + H1 presence.
 * Safe to delete after Iteration 12.
 */
const http = require('http');

const BASE = 'http://[::1]:3457';

const routes = [
  '',
  '/platform',
  '/resources',
  '/use-cases',
  '/plans',
  '/product',
  '/platform/assistant',
  '/platform/ai',
  '/platform/data',
  '/platform/context',
  '/platform/workflows',
  '/platform/task-sequences',
  '/platform/research-intelligence',
  '/platform/reporting',
  '/platform/developers',
  '/ecosystem',
  '/ecosystem/qgis',
  '/ecosystem/gdal',
  '/ecosystem/python',
  '/ecosystem/postgis',
  '/ecosystem/google-earth-engine',
  '/ecosystem/mcp',
  '/ecosystem/skills',
  '/ecosystem/plugins',
  '/getting-started',
  '/community/experts',
  '/programs/education-research',
  '/contact',
  '/help',
  '/learn',
  '/docs',
  '/partners',
  '/blog',
  '/engineering',
  '/careers',
  '/changelog',
  '/use-cases/urban-expansion',
  '/use-cases/ndvi-time-series',
  '/use-cases/research-report',
  '/about',
  '/manifesto',
  '/download',
  '/status',
  '/trust',
  '/security',
  '/privacy',
  '/terms',
  '/developers',
];

function checkRoute(locale, path) {
  return new Promise((resolve) => {
    const url = `${BASE}/${locale}${path}`;
    const req = http.get(url, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => {
        const h1Match = d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : null;
        const h2Count = (d.match(/<h2/g) || []).length;
        const overflow = d.includes('overflow-x') ? 'has-overflow-css' : '';
        resolve({
          url: `/${locale}${path}`,
          status: r.statusCode,
          h1: h1 ? h1.slice(0, 60) : 'MISSING',
          h2Count,
          htmlLen: d.length,
        });
      });
    });
    req.on('error', (e) => {
      resolve({ url: `/${locale}${path}`, status: 'ERR', h1: e.message, h2Count: 0, htmlLen: 0 });
    });
    req.setTimeout(20000, () => {
      resolve({ url: `/${locale}${path}`, status: 'TIMEOUT', h1: '-', h2Count: 0, htmlLen: 0 });
      req.destroy();
    });
  });
}

async function main() {
  const fs = require('fs');
  console.log(`Auditing ${routes.length} routes x 2 locales = ${routes.length * 2} requests\n`);
  const results = [];
  // Check zh routes
  for (const path of routes) {
    const r = await checkRoute('zh', path);
    results.push(r);
    process.stdout.write('.');
  }
  // Check en routes
  for (const path of routes) {
    const r = await checkRoute('en', path);
    results.push(r);
    process.stdout.write('.');
  }
  console.log('\n');

  // Write results to file
  const reportLines = [];
  const ok = results.filter((r) => r.status === 200 && r.h1 !== 'MISSING');
  const fail = results.filter((r) => r.status !== 200);
  const noH1 = results.filter((r) => r.status === 200 && r.h1 === 'MISSING');

  reportLines.push('=== SUMMARY ===');
  reportLines.push(`Total: ${results.length}`);
  reportLines.push(`OK (200 + H1): ${ok.length}`);
  reportLines.push(`Non-200: ${fail.length}`);
  reportLines.push(`200 but no H1: ${noH1.length}`);

  if (fail.length > 0) {
    reportLines.push('\n--- NON-200 ROUTES ---');
    fail.forEach((r) => reportLines.push(`  ${r.status} ${r.url}  (h1: ${r.h1})`));
  }

  if (noH1.length > 0) {
    reportLines.push('\n--- 200 BUT NO H1 ---');
    noH1.forEach((r) => reportLines.push(`  ${r.url}  (htmlLen: ${r.htmlLen})`));
  }

  reportLines.push('\n--- ALL RESULTS ---');
  results.forEach((r) => {
    const flag = r.status === 200 && r.h1 !== 'MISSING' ? 'OK' : 'XX';
    reportLines.push(`  [${flag}] ${r.status} ${r.url}  H1="${r.h1}"  H2=${r.h2Count}  len=${r.htmlLen}`);
  });

  const report = reportLines.join('\n');
  fs.writeFileSync('scripts/reference/audit-report.txt', report);
  console.log(report);
  console.log('\nReport written to scripts/reference/audit-report.txt');
}

main().then(() => {
  // Also write results to file for reliable retrieval
  const fs = require('fs');
  const all = [];
  console.log('\nDONE');
}).catch(console.error);
