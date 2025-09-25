const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

  // Validate URL
  if (!page.url().includes('simple-form-demo')) {
    console.error('URL validation FAILED');
  } else {
    console.log('URL validation PASSED');
  }

  // Enter message
  const message = 'Welcome to LambdaTest';
  await page.fill('#user-message', message);

  // Click Show Message button
  await page.click('#showInput');

  // Check the display message
  const displayedMessage = await page.textContent('#message');
  if (displayedMessage.trim() === message) {
    console.log('Message validation PASSED');
  } else {
    console.error('Message validation FAILED');
  }

  await browser.close();
})();
