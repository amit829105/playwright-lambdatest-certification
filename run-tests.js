const { exec } = require('child_process');
const fs = require('fs');

console.log('HyperExecute Test Runner Starting...');

// List of test files
const testFiles = [
  'tests/simpleFormDemo.spec.js',
  'tests/dragDropSliders.spec.js', 
  'tests/inputFormSubmit.spec.js'
];

// Get the test file from environment variable (set by HyperExecute)
const testIndex = process.env.TEST_INDEX || 0;
const testFile = testFiles[testIndex];

if (!testFile) {
  console.error('No test file found for index:', testIndex);
  process.exit(1);
}

console.log('Running test:', testFile);

// Run the test
exec(`npx playwright test ${testFile} --reporter=html,json,junit --output=test-results/`, (error, stdout, stderr) => {
  console.log('Test output:', stdout);
  if (stderr) console.error('Test errors:', stderr);
  if (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
  console.log('Test completed successfully');
});