import { test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: true });

  test.only('Заказ одного товара без скидки', { tag: '@без-скидки' }, async ({
    homePage,
    productDetailsPage,
  }) => {
    await homePage.goto();
    const product = await homePage.getProductWithoutDiscount();
    await product.locator.click();
    await productDetailsPage.expectProductDetailsAre(product);
    await productDetailsPage.addToCart({ count: 3 });
  });
});
