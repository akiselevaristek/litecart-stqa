import { expect, test as base } from '@playwright/test';
import { HomePage } from '@pages';

export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
