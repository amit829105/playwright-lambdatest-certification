const { test, expect } = require('@playwright/test');

test('Simple Form Demo', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  
  // Click on Simple Form Demo using different locators
  await page.locator('text=Simple Form Demo').click();
  // OR await page.click('a[href*="simple-form-demo"]');
  
  await expect(page).toHaveURL(/.*simple-form-demo/);
  
  const message = 'Welcome to LambdaTest';
  
  // Using different locator strategies
  await page.locator('input[id="user-message"]').fill(message);
  // OR await page.fill('#user-message', message);
  
  await page.locator('button:has-text("Get Checked Value")').click();
  
  const displayedMessage = await page.locator('#message').textContent();
  expect(displayedMessage).toBe(message);
});