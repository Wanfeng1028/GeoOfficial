const r = require('./vitest-result.json');
console.log('Total:', r.numTotalTests);
console.log('Passed:', r.numPassedTests);
console.log('Failed:', r.numFailedTests);
console.log('Skipped:', r.numPendingTests);
if (r.testResults) {
  for (const t of r.testResults) {
    if (t.status !== 'passed') {
      console.log('NON-PASS:', t.name, t.status, JSON.stringify(t.message || '').slice(0, 300));
    }
  }
}
