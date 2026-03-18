import { test } from '@fixtures';

test('User can login from sidebar', { tag: ['@2222'] }, async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginAsDefaultUser();
});
