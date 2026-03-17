import { defineConfig } from '@playwright/test';
import { appConfig, authConfig } from '@config';

const isHeaded = process.env.PW_HEADED === '1'

export default defineConfig({
  testDir: './tests',
  globalSetup: './src/setup/auth.setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : '75%',
  reporter: [
    ['line'],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: appConfig.baseUrl,
    storageState: authConfig.file,
    ignoreHTTPSErrors: true,
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
