const { test, expect } = require('@playwright/test');

test('Input Form Submit Test Scenario', async ({ page }) => {
  console.log('=== Starting Test Scenario 3: Input Form Submit ===');
  
  await page.goto('https://www.lambdatest.com/selenium-playground', { waitUntil: 'networkidle', timeout: 60000 });
  
  await page.click('text=Input Form Submit');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('#name', { timeout: 10000 });

  await page.click('button:has-text("Submit")');
  await page.waitForTimeout(2000);

  const validationMessage = await page.$eval('#name', el => el.validationMessage);
  expect(validationMessage).toContain('Please fill out this field');

  await page.fill('#name', 'Amit Kumar');
  await page.fill('#inputEmail4', 'amit@example.com');
  await page.fill('#inputPassword4', 'Password123');
  await page.fill('#company', 'Hexaware');
  await page.fill('#websitename', 'https://example.com');
  await page.selectOption('select[name="country"]', { value: 'US' });
  await page.fill('#inputCity', 'New York');
  await page.fill('#inputAddress1', '123 Test Street');
  await page.fill('#inputAddress2', 'Suite 100');
  await page.fill('#inputState', 'New York');
  await page.fill('#inputZip', '10001');

  await page.click('button:has-text("Submit")');
  await page.waitForTimeout(3000);

  const selectors = [
    'p.success-msg', '.success-msg', '.message-success', '.alert-success', '.success',
    'p:has-text("Thanks for contacting")', 'div:has-text("Thanks for contacting")'
  ];

  let successFound = false;
  for (const selector of selectors) {
    const element = page.locator(selector);
    const count = await element.count();
    if (count > 0 && await element.isVisible()) {
      const message = await element.textContent();
      if (message && message.includes('Thanks for contacting us')) {
        console.log('✓ Form submission success validation PASSED');
        successFound = true;
        break;
      }
    }
  }

  expect(successFound).toBe(true);

  console.log('=== Test Scenario 3 Completed Successfully ===');
});
