// Wrapper to run vitest and capture results reliably.
// Usage: node scripts/reference/run-vitest.cjs
const { spawnSync } = require('node:child_process');
const { resolve } = require('node:path');
const fs = require('node:fs');

const root = resolve(__dirname, '..', '..');
const vitestBin = resolve(root, 'node_modules', 'vitest', 'vitest.mjs');
const outFile = resolve(__dirname, 'vitest-result.json');
const logFile = resolve(__dirname, 'vitest-full.log');

const args = [
  vitestBin,
  'run',
  `--outputFile=${outFile}`,
  '--reporter=json',
];

console.log('[run-vitest] cwd:', root);
console.log('[run-vitest] bin:', vitestBin);
console.log('[run-vitest] args:', args.join(' '));

const result = spawnSync('node', args, {
  cwd: root,
  encoding: 'utf8',
  // Let vitest inherit stdio but also capture
  maxBuffer: 1024 * 1024 * 64,
});

const log = [
  '=== STDOUT ===',
  result.stdout || '',
  '=== STDERR ===',
  result.stderr || '',
  `=== EXIT CODE: ${result.status} ===`,
].join('\n');

fs.writeFileSync(logFile, log, 'utf8');
console.log('[run-vitest] exit:', result.status);
console.log('[run-vitest] log:', logFile);

if (fs.existsSync(outFile)) {
  console.log('[run-vitest] result JSON:', outFile);
} else {
  console.log('[run-vitest] result JSON: NOT FOUND');
}

process.exit(result.status ?? 1);
