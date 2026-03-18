import { test } from '@fixtures';
import { LoginPage } from '@pages';

test.use({ storageState: { cookies: [], origins: [] } });

test('User can login from sidebar', { tag: ['@login'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginAsDefaultUser();
});
