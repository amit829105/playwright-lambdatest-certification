// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'results/html-report' }],
    ['junit', { outputFile: 'results/junit-report.xml' }],
    ['json', { outputFile: 'results/json-report.json' }]
  ],
  use: {
    baseURL: 'https://www.lambdatest.com/selenium-playground',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium-win',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-linux',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});