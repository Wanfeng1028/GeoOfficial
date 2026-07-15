import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const requiredAssets = [
  'public/media/hero/geowork-workspace.webp',
  'public/media/modes/work.webp',
  'public/media/modes/code.webp',
  'public/media/modes/map.webp',
  'public/media/use-cases/urban-expansion/result.webp',
  'public/media/use-cases/ndvi-series/result.webp',
  'public/media/use-cases/research-report/result.webp',
];

const missing = [];

for (const file of requiredAssets) {
  try {
    await access(resolve(file));
  } catch {
    missing.push(file);
  }
}

const mediaSource = await readFile(resolve('src/data/media.ts'), 'utf8');
const containsPlaceholderStatus = mediaSource.includes("status: 'placeholder'");

if (missing.length > 0 || containsPlaceholderStatus) {
  console.error('Release asset verification failed.');

  if (missing.length > 0) {
    console.error('\nMissing final assets:');
    for (const file of missing) {
      console.error(`- ${file}`);
    }
  }

  if (containsPlaceholderStatus) {
    console.error(
      "\nsrc/data/media.ts still contains status: 'placeholder'.",
    );
  }

  console.error(
    '\nReplace placeholder SVGs with real GeoFrontend2.0 WebP screenshots before public release.',
  );
  process.exit(1);
}

console.log('All release media assets are final.');
