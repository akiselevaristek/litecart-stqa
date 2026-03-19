import { expect, test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: false });
  test.beforeEach(async ({ homePage, clearCart }) => {
    await homePage.goto();
    await homePage.isOpened();
    await clearCart();
  });

  test('Заказ товара без логина', { tag: ['@без-скидки', '@авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {
    
    await test.step('Выбираем два разных товара и добавляем в корзину', async () => {
        const firstProduct = await homePage.getProductWithoutDiscount({ nth: 0 });
        const secondProduct = await homePage.getProductWithoutDiscount({ nth: 1 });
        expect(firstProduct.name).not.toBe(secondProduct.name);

        await productDetailsPage.openProductByLink(firstProduct.link);
        await productDetailsPage.addToCart({ count: 1 });
        await productDetailsPage.cart.expectQuantityIs(1);

        await productDetailsPage.openProductByLink(secondProduct.link);
        await productDetailsPage.addToCart({ count: 1 });
        await productDetailsPage.cart.expectQuantityIs(2);
    });
  });
});
