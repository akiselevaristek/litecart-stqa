import { expect, test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: true });
  test.beforeEach(async ({ homePage, clearCart }) => {
    await homePage.goto();
    await clearCart();
  });

  test('Заказ одного товара без скидки', { tag: ['@без-скидки', '@авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {
    await test.step('Логин с тестовой учеткой. Логин прошел успешно', async () => {
      await expect(homePage.sidebarAccountBox.logoutLink).toBeVisible();
    });

    const product = await test.step('Выбираем один товар без скидки. Товар выбран', async () => {
      const selectedProduct = await homePage.getProductWithoutDiscount();
      await selectedProduct.locator.click();
      await productDetailsPage.expectProductDetailsAre(
        selectedProduct.name, selectedProduct.price, selectedProduct.manufacturer, selectedProduct.link
      );
      return selectedProduct;
    });

    await test.step('Добавляем в корзину 3шт выбранного товара. Товары были добавлены в корзину', async () => {
      await productDetailsPage.cart.expectQuantityIs(0);
      await productDetailsPage.addToCart({ count: 3 });
      await productDetailsPage.cart.expectQuantityIs(3);
    });

    await test.step('Осуществляем переход в корзину. Проверяем что кол-во продукта и цена соответствуют ожидаемому значению', async () => {
      await productDetailsPage.cart.clickCheckout();
      await checkoutPage.product.expectProductDetails(product.name, product.price, 3);
      await checkoutPage.summary.expectProductInTheTable(product.name, 3);
      await checkoutPage.summary.expectTotalPriceForOneProduct(product.price, 3);
    });

    await test.step('Подтверждение заказа. Заказ создан успешно', async () => {
      await checkoutPage.confirmOrder();
      await orderSuccessPage.expectSuccessfulOrderMessage();
    });
  });

  test('Заказ одного товара со скидкой', { tag: ['@со-скидкой', '@авторизованный'] }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
    orderSuccessPage,
  }) => {
    await test.step('Логин с тестовой учеткой. Логин прошел успешно', async () => {
      await expect(homePage.sidebarAccountBox.logoutLink).toBeVisible();
    });

    const product = await test.step('Выбираем один товар со скидкой. Товар выбран', async () => {
      const selectedProduct = await homePage.getProductWithDiscount();
      await selectedProduct.locator.click();
      await productDetailsPage.expectProductDetailsAre(
        selectedProduct.name, 
        selectedProduct.price, 
        selectedProduct.manufacturer, 
        selectedProduct.link, 
        selectedProduct.priceWithDiscount
      );
      return selectedProduct;
    });

    await test.step('Добавляем в корзину 2шт выбранного товара. Товары были добавлены в корзину', async () => {
      await productDetailsPage.cart.expectQuantityIs(0);
      await productDetailsPage.addToCart({ count: 2 });
      await productDetailsPage.cart.expectQuantityIs(2);
    });

    await test.step('Осуществляем переход в корзину. Проверяем что кол-во продукта и цена соответствуют ожидаемому значению с учетом скидки', async () => {
      await productDetailsPage.cart.clickCheckout();
      await checkoutPage.product.expectProductDetails(product.name, product.price, 2);
      await checkoutPage.summary.expectProductInTheTable(product.name, 2);
      await checkoutPage.summary.expectProductUnitCostIs(product.name, product.priceWithDiscount);
      await checkoutPage.summary.expectTotalPriceForOneProduct(product.price, 2);
    });

    await test.step('Подтверждение заказа. Заказ создан успешно', async () => {
      await checkoutPage.confirmOrder();
      await orderSuccessPage.expectSuccessfulOrderMessage();
    });
  });
});
