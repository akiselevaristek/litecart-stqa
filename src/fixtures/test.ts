import { test as base, expect, type Page } from '@playwright/test';
import { HomePage, LoginPage } from '@pages';

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }: { page: Page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
