import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

const requiredAssets = [
  'public/media/placeholders/hero-product.svg',
  'public/media/placeholders/work.svg',
  'public/media/placeholders/code.svg',
  'public/media/placeholders/map.svg',
  'public/media/placeholders/urban-expansion.svg',
  'public/media/placeholders/ndvi-series.svg',
  'public/media/placeholders/research-report.svg',
  'src/app/opengraph-image.tsx',
];

const missing = [];

for (const file of requiredAssets) {
  try {
    await access(resolve(file));
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error('Missing required media assets:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  console.error(
    '\nThese assets are required. Placeholders live in public/media/placeholders/. Replace with real GeoFrontend2.0 screenshots before production.',
  );
  process.exit(1);
}

console.log('All required media assets exist.');
