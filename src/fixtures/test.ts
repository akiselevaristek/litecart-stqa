import { test as base, expect, type Browser, type Page } from '@playwright/test';
import { apiClearCart, isStoredSessionValid } from '@api';
import { appConfig, getAuthStatePath } from '@config';
import { HomePage, LoginPage } from '@pages';
import { Logger, saveStoredSession } from '@utils';

type PageFixtures = {
  authPage: Page;
  clearCart: () => Promise<void>;
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  authPage: async ({ browser }: { browser: Browser }, use) => {
    const email = appConfig.email;
    const storageStatePath = getAuthStatePath(email);

    if (!(await isStoredSessionValid(storageStatePath))) {
      Logger.info('No valid stored session found. Performing login to create a new session...');
      const setupContext = await browser.newContext({
        baseURL: appConfig.baseUrl,
        ignoreHTTPSErrors: true,
      });
      const setupPage = await setupContext.newPage();
      const loginPage = new LoginPage(setupPage);

      await loginPage.goto();
      await loginPage.loginAs(email, appConfig.password);
      await saveStoredSession(setupPage, email);
      await setupContext.close();
      Logger.info('New session created and stored successfully.');
    }

    const authContext = await browser.newContext({
      baseURL: appConfig.baseUrl,
      ignoreHTTPSErrors: true,
      storageState: storageStatePath,
    });
    Logger.info('Stored session is applied.');
    const authPage = await authContext.newPage();
    await apiClearCart(authPage);
    await use(authPage);
    await authContext.close();
  },
  clearCart: async ({ page }: { page: Page }, use) => {
    await use(() => apiClearCart(page));
  },
  homePage: async ({ page }: { page: Page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
