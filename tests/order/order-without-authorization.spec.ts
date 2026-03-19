import { expect, test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: false });
  test.beforeEach(async ({ homePage, clearCart }) => {
    await homePage.goto();
    await homePage.isOpened();
  });

  test.only('Заказ товара без логина', { tag: ['@несколько-товаров', '@не-авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {

    const { firstProduct, secondProduct } = await test.step('Выбираем два разных товара и добавляем в корзину', async () => {
        const firstProduct = await homePage.getProductWithoutDiscount({ nth: 0 });
        const secondProduct = await homePage.getProductWithoutDiscount({ nth: 1 });
        expect(firstProduct.name).not.toBe(secondProduct.name);

        await productDetailsPage.openProductByLink(firstProduct.link);
        await productDetailsPage.addToCart({ count: 1 });
        await productDetailsPage.cart.expectQuantityIs(1);

        await productDetailsPage.openProductByLink(secondProduct.link);
        await productDetailsPage.addToCart({ count: 1 });
        await productDetailsPage.cart.expectQuantityIs(2);
        
        return { firstProduct, secondProduct };
    });

    await test.step('Переходим в корзину и проверяем наличие товаров в ней', async () => {
      await productDetailsPage.cart.clickCheckout();
      await checkoutPage.product.expectProductDetails({name: firstProduct.name, price: firstProduct.price, quantity: 1});
      await checkoutPage.product.expectProductDetails({name: secondProduct.name, price: secondProduct.price, quantity: 1});
    });

    await test.step('Проверяем что данные по пользователю пустые', async () => {
      await checkoutPage.customerDetails.expectUserDataIsEmpty();
    });
  });
});
