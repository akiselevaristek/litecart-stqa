import type { Browser, PlaywrightTestOptions } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { authConfig, appConfig } from '@config';
import { isStoredSessionValid } from '@api';
import { LoginPage } from '@pages';
import { Logger } from '@utils';

export type AuthFixtures = {
  storageState: PlaywrightTestOptions['storageState'];
};

async function ensureAuthState(browser: Browser): Promise<string> {
  await mkdir(authConfig.dir, { recursive: true });

  const isValid = await isStoredSessionValid(authConfig.file);
  if (isValid) {
    Logger.info(`Reusing auth state: ${authConfig.file}`);
    return authConfig.file;
  }

  Logger.info(`Refreshing auth state: ${authConfig.file}`);
  const context = await browser.newContext({
    baseURL: appConfig.baseUrl,
    ignoreHTTPSErrors: true,
  });

  try {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAsDefaultUser();

    await context.storageState({ path: authConfig.file });
    Logger.info(`Saved auth state: ${authConfig.file}`);
    return authConfig.file;
  } finally {
    await context.close();
  }
}

export const authFixture = {
  storageState: async (
    { browser }: { browser: Browser },
    use: (storageStatePath: string) => Promise<void>
  ) => {
    const storageStatePath = await ensureAuthState(browser);
    await use(storageStatePath);
  },
};
