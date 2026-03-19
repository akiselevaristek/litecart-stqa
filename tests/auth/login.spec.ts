import { test } from '@fixtures';
import { appConfig } from '@config';

test.describe('Login', () => {
  test('Пользователь может залогиниться в систему', {}, async ({ 
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(appConfig.email, appConfig.password);
  });

  test('Попытка логина с некорректным паролем', {}, async ({ 
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.tryToLogin(
      appConfig.email, 
      'wrong-password', 
      'Wrong password or the account is disabled, or does not exist'
    );
  });
});