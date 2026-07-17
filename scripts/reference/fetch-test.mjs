import { writeFileSync, mkdirSync } from 'node:fs';

const log = (msg) => {
  console.log(msg);
  writeFileSync('scripts/reference/fetch-test.log', msg + '\n', { flag: 'a' });
};

try {
  writeFileSync('scripts/reference/fetch-test.log', '');
  log('1. start fetch');
  const start = Date.now();
  const res = await fetch('https://attio.com', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    signal: AbortSignal.timeout(15000),
  });
  log('2. status: ' + res.status);
  const html = await res.text();
  log('3. html length: ' + html.length);
  log('4. elapsed: ' + (Date.now() - start) + 'ms');
  mkdirSync('docs/reference/attio/html', { recursive: true });
  writeFileSync('docs/reference/attio/html/home.html', html);
  log('5. saved to docs/reference/attio/html/home.html');
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  log('6. title: ' + (titleMatch ? titleMatch[1] : 'N/A'));
  // Count sections
  const sections = html.match(/<section/gi);
  log('7. sections: ' + (sections ? sections.length : 0));
  const headers = html.match(/<h[1-6]/gi);
  log('8. headers: ' + (headers ? headers.length : 0));
  log('SUCCESS');
} catch (e) {
  log('ERROR: ' + e.message);
  log(e.stack || '');
  process.exit(1);
}
