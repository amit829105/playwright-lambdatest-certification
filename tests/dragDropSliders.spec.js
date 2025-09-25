const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');

  // Wait for slider input
  const slider = await page.waitForSelector('input.sp__range');

  // Focus the slider for keyboard interaction
  await slider.focus();

  // Get current slider value
  let value = await slider.evaluate(el => el.value);

  // Press ArrowRight until slider value reaches 95 (or max 100)
  while (parseInt(value) < 95) {
    await slider.press('ArrowRight');
    value = await slider.evaluate(el => el.value);
  }

  // Validate slider value displayed on page
  const sliderValue = await page.locator('#range').textContent();
  if (sliderValue.trim() === '95') {
    console.log('Slider value validation PASSED');
  } else {
    console.error('Slider value validation FAILED with value: ' + sliderValue);
  }

  await browser.close();
})();
