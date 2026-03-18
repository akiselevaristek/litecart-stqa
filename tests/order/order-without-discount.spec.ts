import { test, expect } from '@fixtures';
import { URLS } from '@config';

test.describe('Login', () => {
  test.only('Заказ одного товара без скидки', { tag: '@без-скидки' }, async ({
    authPage,
  }) => {
    await authPage.goto(URLS.HOME);
    await expect(authPage.locator('#box-account')).toBeVisible();
  });
});
