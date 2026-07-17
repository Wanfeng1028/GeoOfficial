const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Try dev server on 3457 first, then 3458 (production start)
const candidates = [
  { host: '[::1]', port: 3457, label: 'dev:3457' },
  { host: '[::1]', port: 3458, label: 'prod:3458' },
  { host: '127.0.0.1', port: 3000, label: 'default:3000' },
];

function fetchSitemap(host, port, label) {
  return new Promise((resolve) => {
    const req = http.get(
      { host, port, path: '/sitemap.xml', timeout: 8000 },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          resolve({ label, status: res.statusCode, data, len: data.length });
        });
      },
    );
    req.on('error', (e) => resolve({ label, error: e.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ label, error: 'timeout' });
    });
  });
}

(async () => {
  const out = [];
  for (const c of candidates) {
    const r = await fetchSitemap(c.host, c.port, c.label);
    if (r.error) {
      out.push(`[${c.label}] ERROR: ${r.error}`);
    } else {
      out.push(`[${c.label}] STATUS: ${r.status}, LEN: ${r.len}`);
      if (r.status === 200 && r.data) {
        // Count <url> entries
        const urlCount = (r.data.match(/<url>/g) || []).length;
        const locCount = (r.data.match(/<loc>/g) || []).length;
        out.push(`  <url> entries: ${urlCount}`);
        out.push(`  <loc> entries: ${locCount}`);
        // Extract first 5 and last 3 URLs
        const urls = [];
        const re = /<loc>([^<]+)<\/loc>/g;
        let m;
        while ((m = re.exec(r.data)) !== null) urls.push(m[1]);
        out.push('  First 5 URLs:');
        urls.slice(0, 5).forEach((u) => out.push('    ' + u));
        out.push('  Last 3 URLs:');
        urls.slice(-3).forEach((u) => out.push('    ' + u));
        // Check for both locales
        const zhCount = urls.filter((u) => u.includes('/zh')).length;
        const enCount = urls.filter((u) => u.includes('/en')).length;
        out.push(`  zh URLs: ${zhCount}, en URLs: ${enCount}`);
        fs.writeFileSync(path.join(__dirname, 'sitemap-sample.xml'), r.data, 'utf8');
        break;
      }
    }
  }
  fs.writeFileSync(path.join(__dirname, 'sitemap-check.log'), out.join('\n'), 'utf8');
  process.stdout.write(out.join('\n') + '\n');
})();
