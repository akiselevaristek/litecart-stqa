import { test } from '@fixtures';
import { appConfig } from '@config';
import { ErrorMessages } from '@pages/LoginPage';

test.describe('Login', () => {
  test('Пользователь может залогиниться в систему', { tag: ['@позитивный', '@логин'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(appConfig.email, appConfig.password);
  });

  test.only('Попытка логина с некорректным паролем', { tag: ['@негативный', '@логин'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.tryToLogin(appConfig.email, 'wrong-password', ErrorMessages.invalidPasswordEmailDeactivate);
  });
});
