import { test as base, expect, type Page } from '@playwright/test';
import { apiClearCart } from '@api';
import { HomePage, LoginPage } from '@pages';

type PageFixtures = {
  clearCart: () => Promise<void>;
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
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
