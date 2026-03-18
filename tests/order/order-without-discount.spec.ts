import { test } from '@fixtures';
import { URLS } from '@config';

test.describe('Login', () => {
  test.only('Заказ одного товара без скидки', { tag: '@без-скидки' }, async ({
    authPage,
    homePage,
  }) => {
    await authPage.goto(URLS.HOME);
    const product = await homePage.getProductWithoutDiscount();
    await product.locator.click();
  });
});
