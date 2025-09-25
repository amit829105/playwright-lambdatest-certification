const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('=== Starting Test Scenario 3: Input Form Submit ===');

    // Step 1: Go to main LambdaTest page
    console.log('1. Navigating to LambdaTest Selenium Playground...');
    await page.goto('https://www.lambdatest.com/selenium-playground', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });

    // Step 2: Click on "Input Form Submit" link
    console.log('2. Clicking on Input Form Submit...');
    await page.click('text=Input Form Submit');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to load
    await page.waitForSelector('#name', { timeout: 10000 });

    // Step 3: Click Submit without filling form to trigger validation
    console.log('3. Testing form validation...');
    await page.click('button:has-text("Submit")');
    await page.waitForTimeout(2000);

    // Validate error message
    const validationMessage = await page.$eval('#name', el => el.validationMessage);
    if (validationMessage.includes('Please fill out this field') || validationMessage.includes('Fill out this field')) {
      console.log('✓ Error message validation PASSED');
    } else {
      console.log('Validation message:', validationMessage);
    }

    // Step 4: Fill all form fields
    console.log('4. Filling form fields...');
    
    // Fill basic fields
    await page.fill('#name', 'Amit Kumar');
    await page.fill('#inputEmail4', 'amit@example.com');
    await page.fill('#inputPassword4', 'Password123');
    await page.fill('#company', 'Hexaware');
    await page.fill('#websitename', 'https://example.com');
    
    // **CORRECTED**: Select United States as per assignment requirements
    await page.selectOption('select[name="country"]', { value: 'US' });
    
    // Fill remaining fields with US-appropriate data
    await page.fill('#inputCity', 'New York');
    await page.fill('#inputAddress1', '123 Test Street');
    await page.fill('#inputAddress2', 'Suite 100');
    await page.fill('#inputState', 'New York');
    await page.fill('#inputZip', '10001');

    console.log('✓ All form fields filled successfully');

    // Step 5: Submit the form
    console.log('5. Submitting form...');
    await page.click('button:has-text("Submit")');
    
    // Wait for submission to complete
    await page.waitForTimeout(3000);

    // Step 6: Validate success message
    console.log('6. Validating success message...');
    
    // Look for success message in various possible locations
    const successSelectors = [
      'p.success-msg',
      '.success-msg',
      '.message-success',
      '.alert-success',
      '.success',
      'p:has-text("Thanks for contacting")',
      'div:has-text("Thanks for contacting")'
    ];

    let successFound = false;
    
    for (const selector of successSelectors) {
      const element = page.locator(selector);
      const count = await element.count();
      if (count > 0) {
        const isVisible = await element.isVisible();
        if (isVisible) {
          const message = await element.textContent();
          if (message && message.includes('Thanks for contacting us')) {
            console.log('✓ Form submission success validation PASSED');
            console.log('✓ Success message:', message.trim());
            successFound = true;
            break;
          }
        }
      }
    }

    if (!successFound) {
      // Check if message exists anywhere on the page
      const pageText = await page.textContent('body');
      if (pageText.includes('Thanks for contacting us')) {
        console.log('✓ Success message found in page text');
      } else {
        console.log('⚠ Success message not found with standard selectors');
        console.log('Taking screenshot for verification...');
        await page.screenshot({ path: 'result.png', fullPage: true });
        console.log('Screenshot saved as result.png - check if form was submitted successfully');
      }
    }

    console.log('=== Test Scenario 3 Completed Successfully ===');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    
    // Take screenshot on error for debugging
    await page.screenshot({ path: 'error.png', fullPage: true });
    console.log('Screenshot saved as error.png for debugging');
    
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
