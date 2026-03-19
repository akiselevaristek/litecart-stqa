import { expect, test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: true });
  test.beforeEach(async ({ homePage, clearCart }) => {
    await clearCart();
    await homePage.goto();
  });
  test.afterEach(async ({ clearCart }) => {
    await clearCart();
  });

  test('Заказ одного товара без скидки', { tag: ['@без-скидки', '@авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {
    await test.step('Логин с тестовой учеткой. Логин прошел успешно', async () => {
      await homePage.userIsLoggedIn();
    });

    const product = await test.step('Выбираем один товар без скидки. Товар выбран', async () => {
      const selectedProduct = await homePage.mostPopular.getProductWithoutDiscount();
      await selectedProduct.locator.click();
      await productDetailsPage.expectProductDetailsAre(selectedProduct);
      return selectedProduct;
    });

    await test.step('Добавляем в корзину 3шт выбранного товара. Товары были добавлены в корзину', async () => {
      await productDetailsPage.cart.expectQuantityIs(0);
      await productDetailsPage.addToCart({ count: 3 });
      await productDetailsPage.cart.expectQuantityIs(3);
    });

    await test.step('Осуществляем переход в корзину. Проверяем что кол-во продукта и цена соответствуют ожидаемому значению', async () => {
      await productDetailsPage.cart.clickCheckout();
      await checkoutPage.product.expectProductDetails({name: product.name, price: product.price, quantity: 3});
      await checkoutPage.summaryTable.containsProducts({name: product.name, quantity: 3});
      await checkoutPage.summaryTable.productCostIs({name: product.name, cost: product.price});
      await checkoutPage.summaryTable.totalPriceForProductIs({price: product.price, count: 3});
    });

    await test.step('Подтверждение заказа. Заказ создан успешно', async () => {
      await checkoutPage.confirmOrder();
      await orderSuccessPage.expectSuccessfulOrderMessage();
      await orderSuccessPage.cart.expectQuantityIs(0);
    });
  });

  test('Заказ одного товара со скидкой', { tag: ['@со-скидкой', '@авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {
    await test.step('Логин с тестовой учеткой. Логин прошел успешно', async () => {
      await homePage.userIsLoggedIn();
    });

    const product = await test.step('Выбираем один товар со скидкой. Товар выбран', async () => {
      const selectedProduct = await homePage.campaigns.getProductWithDiscount();
      await selectedProduct.locator.click();
      await productDetailsPage.expectProductDetailsAre(selectedProduct);
      return selectedProduct;
    });

    await test.step('Добавляем в корзину 2шт выбранного товара. Товары были добавлены в корзину', async () => {
      await productDetailsPage.cart.expectQuantityIs(0);
      await productDetailsPage.addToCart({ count: 2 });
      await productDetailsPage.cart.expectQuantityIs(2);
    });

    await test.step('Осуществляем переход в корзину. Проверяем что кол-во продукта и цена соответствуют ожидаемому значению с учетом скидки', async () => {
      await productDetailsPage.cart.clickCheckout();
      await checkoutPage.product.expectProductDetails({name: product.name, price: product.priceWithDiscount, quantity: 2});
      await checkoutPage.summaryTable.containsProducts({name: product.name, quantity: 2});
      await checkoutPage.summaryTable.productCostIs({name: product.name, cost: product.priceWithDiscount});
      await checkoutPage.summaryTable.totalPriceForProductIs({price: product.priceWithDiscount, count: 2});
    });

    await test.step('Подтверждение заказа. Заказ создан успешно', async () => {
      await checkoutPage.confirmOrder();
      await orderSuccessPage.expectSuccessfulOrderMessage();
      await orderSuccessPage.cart.expectQuantityIs(0);
    });
  });
});
