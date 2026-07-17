const fs = require('node:fs');
const path = require('node:path');
const resultPath = path.join(__dirname, 'vitest-result2.json');
if (!fs.existsSync(resultPath)) {
  fs.writeFileSync(path.join(__dirname, 'vitest2-summary.log'), 'RESULT FILE NOT FOUND', 'utf8');
  process.exit(1);
}
const r = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
const out = [];
out.push('Total: ' + r.numTotalTests);
out.push('Passed: ' + r.numPassedTests);
out.push('Failed: ' + r.numFailedTests);
out.push('Skipped: ' + r.numPendingTests);
if (r.testResults) {
  for (const t of r.testResults) {
    if (t.status !== 'passed') {
      out.push('NON-PASS: ' + t.name + ' ' + t.status);
      for (const a of t.assertionResults || []) {
        if (a.status !== 'passed') {
          out.push('  - ' + a.status + ' ' + a.fullName);
          if (a.failureMessages) {
            for (const m of a.failureMessages) out.push('    ' + m.slice(0, 500));
          }
        }
      }
    }
  }
}
fs.writeFileSync(path.join(__dirname, 'vitest2-summary.log'), out.join('\n'), 'utf8');
