import { HomePage } from '@pages';
import type { Page } from '@playwright/test';

export type PageFixtures = {
  homePage: HomePage;
};

export const pagesFixture = {
  homePage: async (
    { page }: { page: Page },
    use: (homePage: HomePage) => Promise<void>
  ) => {
    await use(new HomePage(page));
  },
};
