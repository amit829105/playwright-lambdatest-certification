const { test, expect } = require('@playwright/test');

test('Drag & Drop Sliders Test Scenario', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground');

    // Click on Drag & Drop Sliders using different locators
    await page.locator('text=Drag & Drop Sliders').click();
    
    // Wait for the page to load
    await page.waitForURL(/.*drag-drop-range-sliders-demo/);
    
    // Select the slider "Default value 15" - using different locator strategies
    const slider = page.locator('input[value="15"]').first();
    // Alternative locators:
    // const slider = page.locator('input.sp__range').first();
    // const slider = page.locator('input[type="range"]').nth(2); // if there are multiple sliders
    
    // Get the current value
    const initialValue = await slider.inputValue();
    console.log('Initial slider value:', initialValue);
    
    // Drag the slider to make it 95
    // Method 1: Using keyboard (more reliable)
    await slider.focus();
    let currentValue = parseInt(initialValue);
    
    while (currentValue < 95) {
        await slider.press('ArrowRight');
        currentValue = parseInt(await slider.inputValue());
        if (currentValue >= 95) break;
    }
    
    // Method 2: Using mouse drag (alternative approach)
    // const sliderBox = await slider.boundingBox();
    // await page.mouse.move(sliderBox.x + sliderBox.width / 2, sliderBox.y + sliderBox.height / 2);
    // await page.mouse.down();
    // await page.mouse.move(sliderBox.x + sliderBox.width * 0.95, sliderBox.y + sliderBox.height / 2);
    // await page.mouse.up();
    
    // Validate whether the range value shows 95
    const finalValue = await slider.inputValue();
    expect(parseInt(finalValue)).toBe(95);
    
    // Also check if there's a display element showing the value
    const displayedValue = await page.locator('#rangeSuccess').textContent();
    if (displayedValue) {
        expect(displayedValue.trim()).toContain('95');
    }
});