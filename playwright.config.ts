import { defineConfig } from '@playwright/test';
import { appConfig } from '@config';

const isHeaded = process.env.PW_HEADED === '1'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  workers: process.env.CI ? 1 : '75%',
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['line'],
    ['html', { open: 'never' }]
  ],
  use: {
    actionTimeout: 10_000,
    baseURL: appConfig.baseUrl,
    ignoreHTTPSErrors: true,
    navigationTimeout: 10_000,
    trace: process.env.CI ? 'retain-on-failure' : 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: !isHeaded,
        viewport: isHeaded ? null : { width: 1920, height: 1080 },
        launchOptions: isHeaded
          ? { args: ['--start-maximized'] }
          : undefined,
      },
    },
  ],
});
