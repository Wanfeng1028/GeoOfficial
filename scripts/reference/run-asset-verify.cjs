// Run verify:assets and capture output to file
const { spawnSync } = require('node:child_process');
const { resolve } = require('node:path');
const fs = require('node:fs');

const root = resolve(__dirname, '..', '..');
const scriptPath = resolve(root, 'scripts', 'verify-assets.mjs');

const result = spawnSync('node', [scriptPath], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 1024 * 1024 * 32,
});

const log = [
  '=== STDOUT ===',
  result.stdout || '',
  '=== STDERR ===',
  result.stderr || '',
  '=== EXIT CODE: ' + result.status + ' ===',
].join('\n');

fs.writeFileSync(resolve(__dirname, 'asset-verify.log'), log, 'utf8');
process.stdout.write(log + '\n');
process.exit(result.status ?? 1);
