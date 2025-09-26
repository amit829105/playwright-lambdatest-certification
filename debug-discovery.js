const { exec } = require('child_process');

console.log('Testing discovery command...');

exec('npx playwright test --list --reporter=json', (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    if (stderr) {
        console.error('Stderr:', stderr);
        return;
    }
    
    console.log('Raw JSON output:');
    console.log(stdout);
    
    try {
        const data = JSON.parse(stdout);
        console.log('\nParsed suites:');
        data.suites.forEach(suite => {
            console.log(`- ${suite.file}: ${suite.specs.length} specs`);
        });
    } catch (parseError) {
        console.error('JSON parse error:', parseError);
    }
});