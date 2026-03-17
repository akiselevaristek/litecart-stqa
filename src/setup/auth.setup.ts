import { chromium, type FullConfig } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { authConfig } from '../config/auth';
import { appConfig } from '../config/app-config';
import { HomePage } from '../pages/HomePage';

async function globalSetup(config: FullConfig) {
  await mkdir(authConfig.dir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: config.projects[0]?.use?.baseURL,
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.loginBox.login(
    appConfig.credentials.email,
    appConfig.credentials.password
  );

  await page.locator('#box-account a[href*="/logout"]').waitFor({ state: 'visible' });
  await context.storageState({ path: authConfig.file });
  await browser.close();
}

export default globalSetup;
