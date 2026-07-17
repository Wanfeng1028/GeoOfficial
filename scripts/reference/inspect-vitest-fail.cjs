const r = require('./vitest-result.json');
const failed = (r.testResults || []).filter((t) => t.status !== 'passed');
for (const t of failed) {
  console.log('=== FILE:', t.name);
  console.log('STATUS:', t.status);
  console.log('MESSAGE:', JSON.stringify(t.message || '').slice(0, 500));
  console.log('ASSERTION COUNT:', (t.assertionResults || []).length);
  for (const a of t.assertionResults || []) {
    console.log('  -', a.status, a.fullName);
    if (a.status !== 'passed' && a.failureMessages) {
      for (const m of a.failureMessages) {
        console.log('    FAIL:', m.slice(0, 800));
      }
    }
  }
}
