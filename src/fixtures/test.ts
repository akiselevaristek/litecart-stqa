import { test as base, expect } from '@playwright/test';
import { apiClearCart, isStoredSessionValid } from '@api';
import { appConfig, getAuthStatePath } from '@config';
import { HomePage, LoginPage, ProductDetailsPage } from '@pages';
import { Logger, saveStoredSession } from '@utils';

type TestOptions = {
  useStorageState: boolean;
};

type PageFixtures = {
  clearCart: () => Promise<void>;
  homePage: HomePage;
  loginPage: LoginPage;
  productDetailsPage: ProductDetailsPage;
};

export const test = base.extend<PageFixtures & TestOptions>({
  useStorageState: [false, { option: true }],
  storageState: async ({ browser, useStorageState }, use) => {
    if (!useStorageState) {
      await use(undefined);
      return;
    }

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

    Logger.info('Stored session is applied.');
    await use(storageStatePath);
  },
  clearCart: async ({ page }, use) => {
    await use(() => apiClearCart(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
});

export { expect };
