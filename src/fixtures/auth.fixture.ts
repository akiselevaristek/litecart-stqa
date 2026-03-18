import type { Browser } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { authConfig, appConfig } from '@config';
import { isStoredSessionValid } from '@api';
import { HomePage } from '@pages';
import { Logger } from '@utils';

export type AuthFixtures = {
  storageState:
    | string
    | {
        cookies: {
          name: string;
          value: string;
          domain: string;
          path: string;
          expires: number;
          httpOnly: boolean;
          secure: boolean;
          sameSite: 'Strict' | 'Lax' | 'None';
        }[];
        origins: {
          origin: string;
          localStorage: {
            name: string;
            value: string;
          }[];
        }[];
      };
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
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.loginBox.login(
      appConfig.credentials.email,
      appConfig.credentials.password
    );

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
