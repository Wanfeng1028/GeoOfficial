import { readFileSync } from 'node:fs';
const p = JSON.parse(readFileSync('docs/reference/attio/manifest/capture-plan.json', 'utf8'));
console.log('targets:', p.targets.length);
console.log('totalShots:', p.totalShots);
console.log('\nALL targets:');
p.targets.forEach((t, i) => console.log((i+1).toString().padStart(2,' ') + '. [' + t.routeId + '] ' + t.url));
console.log('\nkeys:', Object.keys(p));
