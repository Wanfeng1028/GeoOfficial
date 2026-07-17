// Broken link check v2: collect all internal links from seed pages, verify 2xx/3xx.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const HOST = '127.0.0.1';
const PORT = 3458;
const seedPages = [
  '/zh', '/en', '/zh/platform', '/zh/ecosystem', '/zh/resources', '/zh/use-cases',
  '/zh/blog', '/zh/help', '/zh/learn', '/zh/about', '/zh/contact', '/zh/engineering',
  '/zh/developers', '/zh/trust', '/zh/manifesto', '/zh/plans', '/zh/product',
];

function fetch(pathname) {
  return new Promise((resolve) => {
    const req = http.get(
      { host: HOST, port: PORT, path: pathname, timeout: 15000 },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, data, len: data.length }));
      },
    );
    req.on('error', (e) => resolve({ error: e.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ error: 'timeout' });
    });
  });
}

function extractInternalLinks(html) {
  const links = new Set();
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (!href) continue;
    if (!href.startsWith('/')) continue;
    if (href.startsWith('/_next')) continue;
    // Strip hash and query
    const clean = href.split('#')[0].split('?')[0];
    if (clean === '/' || clean === '') continue; // homepage, skip
    links.add(clean);
  }
  return [...links];
}

(async () => {
  const out = [];
  const allLinks = new Set();
  let seedOk = 0;
  let seedFail = 0;

  for (const p of seedPages) {
    const r = await fetch(p);
    if (r.error) {
      out.push(`[SEED] ${p} ERROR: ${r.error}`);
      seedFail++;
      continue;
    }
    out.push(`[SEED] ${p} STATUS: ${r.status} LEN: ${r.len}`);
    if (r.status >= 200 && r.status < 400) {
      seedOk++;
      const links = extractInternalLinks(r.data);
      links.forEach((l) => allLinks.add(l));
    } else {
      seedFail++;
    }
  }

  out.push('');
  out.push(`Seeds: OK=${seedOk} FAIL=${seedFail}`);
  out.push(`Total unique internal links collected: ${allLinks.size}`);
  out.push('Checking all links...');

  let ok = 0;
  let broken = 0;
  const brokenList = [];
  const sortedLinks = [...allLinks].sort();
  for (const link of sortedLinks) {
    const r = await fetch(link);
    if (r.error) {
      broken++;
      brokenList.push(`${link} -> ERROR: ${r.error}`);
    } else if (r.status >= 200 && r.status < 400) {
      ok++;
    } else {
      broken++;
      brokenList.push(`${link} -> STATUS: ${r.status}`);
    }
  }

  out.push(`Links: OK=${ok} BROKEN=${broken}`);
  if (brokenList.length > 0) {
    out.push('--- BROKEN LINKS ---');
    brokenList.forEach((l) => out.push('  ' + l));
  } else {
    out.push('No broken links found.');
  }

  fs.writeFileSync(path.join(__dirname, 'broken-link-check.log'), out.join('\n'), 'utf8');
  process.stdout.write(out.join('\n') + '\n');
})();
