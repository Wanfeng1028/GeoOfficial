const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..', '..');
const nextDir = path.join(root, '.next');
const out = [];
const log = (s) => out.push(s);

// BUILD_ID
const buildId = fs.existsSync(path.join(nextDir, 'BUILD_ID'))
  ? fs.readFileSync(path.join(nextDir, 'BUILD_ID'), 'utf8').trim()
  : 'MISSING';
log('BUILD_ID: ' + buildId);

// App paths manifest (routes)
const appManifest = path.join(nextDir, 'server', 'app-paths-manifest.json');
if (fs.existsSync(appManifest)) {
  const m = JSON.parse(fs.readFileSync(appManifest, 'utf8'));
  const keys = Object.keys(m);
  log('App routes (app-paths-manifest): ' + keys.length);
  log('All routes:');
  keys.forEach((k) => log('  ' + k + ' -> ' + m[k]));
} else {
  log('app-paths-manifest.json: NOT FOUND');
}

// Prerender manifest (static pages)
const prerender = path.join(nextDir, 'prerender-manifest.json');
if (fs.existsSync(prerender)) {
  const p = JSON.parse(fs.readFileSync(prerender, 'utf8'));
  const routes = Object.keys(p.routes || {});
  log('Prerendered routes: ' + routes.length);
} else {
  log('prerender-manifest.json: NOT FOUND');
}

fs.writeFileSync(path.join(__dirname, 'build-inspect.log'), out.join('\n'), 'utf8');
process.stdout.write(out.join('\n') + '\n');
