import { test } from '@fixtures';
import { appConfig } from '@config';

test.describe('Login', () => {
  test('User can login from login page', {}, async ({ 
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(appConfig.email, appConfig.password);
  });
});