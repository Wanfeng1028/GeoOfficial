const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

function fetch(pathname, host, port) {
  return new Promise((resolve) => {
    const req = http.get(
      { host, port, path: pathname, timeout: 15000 },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, data, len: data.length, headers: res.headers }));
      },
    );
    req.on('error', (e) => resolve({ error: e.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ error: 'timeout' });
    });
  });
}

(async () => {
  const out = [];
  // Fetch homepage and inspect link format
  const r = await fetch('/zh', '127.0.0.1', 3458);
  out.push('Homepage /zh status: ' + r.status + ' len: ' + r.len);
  // Extract first 30 href values
  const hrefs = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(r.data)) !== null) {
    hrefs.push(m[1]);
  }
  out.push('Total href values: ' + hrefs.length);
  // Unique internal (starting with /)
  const internal = [...new Set(hrefs.filter((h) => h.startsWith('/') && !h.startsWith('/_next')))];
  out.push('Unique internal (non-_next): ' + internal.length);
  out.push('First 30 internal links:');
  internal.slice(0, 30).forEach((h) => out.push('  ' + h));

  fs.writeFileSync(path.join(__dirname, 'link-format.log'), out.join('\n'), 'utf8');
  process.stdout.write(out.join('\n') + '\n');
})();
