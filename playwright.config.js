const { defineConfig, devices } = require('@playwright/test');

// Check if we're running on HyperExecute/LambdaTest
const isLambdaTest = process.env.LT_USERNAME && process.env.LT_ACCESS_KEY;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'https://www.lambdatest.com/selenium-playground',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },

  projects: isLambdaTest ? [
    // LambdaTest configurations for HyperExecute
    {
      name: 'lambda-chrome',
      use: {
        ...devices['Desktop Chrome'],
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright HyperExecute Build',
              name: 'Chrome on Windows 10',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              video: true,
              console: true
            }
          }))}`
        }
      },
    },
    {
      name: 'lambda-firefox',
      use: {
        ...devices['Desktop Firefox'],
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Firefox',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright HyperExecute Build',
              name: 'Firefox on Windows 10',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              video: true,
              console: true
            }
          }))}`
        }
      },
    }
  ] : [
    // Local configurations for testing
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});