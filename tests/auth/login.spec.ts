import { test } from '@fixtures';
import { appConfig } from '@config';

test('User can login from sidebar', async ({ homePage }) => {
  await homePage.goto();
  await homePage.loginBox.login(
    appConfig.credentials.email,
    appConfig.credentials.password
  );
});
