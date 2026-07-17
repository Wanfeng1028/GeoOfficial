import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const ROOT = 'E:/code/javascript/project/GeoOfficial';
const data = JSON.parse(readFileSync(`${ROOT}/docs/reference/attio/manifest/routes.json`, 'utf8'));

console.log('keys:', Object.keys(data));
console.log('summary:', JSON.stringify(data.summary, null, 2));
console.log('total routes:', data.routes.length);
console.log('failed:', data.failed ? data.failed.length : 0);

// Count by pageType
const byType = {};
for (const r of data.routes) {
  const pt = r.pageType || 'unknown';
  if (!byType[pt]) byType[pt] = [];
  byType[pt].push(r);
}
console.log('\n=== Page type counts ===');
for (const [pt, list] of Object.entries(byType).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`  ${pt}: ${list.length}`);
}

// Show sample route structure
console.log('\n=== Sample route ===');
console.log(JSON.stringify(data.routes[0], null, 2));

// Show first 3 routes of each main type
console.log('\n=== Key page type samples ===');
const keyTypes = ['home', 'platform-detail', 'pricing', 'customers-listing', 'customer-detail', 'apps-listing', 'blog-listing', 'blog-detail', 'changelog-listing', 'help', 'legal', 'solutions-detail'];
for (const pt of keyTypes) {
  if (byType[pt]) {
    console.log(`\n${pt} (${byType[pt].length}):`);
    byType[pt].slice(0, 3).forEach(r => console.log(`  ${r.url}`));
  }
}
