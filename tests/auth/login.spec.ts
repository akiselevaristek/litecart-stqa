import { test } from '@fixtures';
import { appConfig } from '@config';

test.use({ storageState: { cookies: [], origins: [] } });

test('User can login from sidebar', { tag: ['@login'] }, async ({ homePage }) => {
  await homePage.goto();
  await homePage.loginBox.login(
    appConfig.credentials.email,
    appConfig.credentials.password
  );
});
