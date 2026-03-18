import { test } from '@fixtures';

test.describe('Login', () => {
  test.use({ useStorageState: true });
  test.beforeEach(async ({ homePage, clearCart }) => {
    await homePage.goto();
    await clearCart();
  });

  test.only('Заказ одного товара без скидки', { tag: '@без-скидки' }, async ({
    homePage,
    productDetailsPage,
    checkoutPage,
  }) => {
    const product = await homePage.getProductWithoutDiscount();
    await product.locator.click();
    await productDetailsPage.expectProductDetailsAre(
      product.name, product.price, product.manufacturer, product.link
    );
    
    await productDetailsPage.cart.expectQuantityIs(0);
    await productDetailsPage.addToCart({ count: 3 });
    await productDetailsPage.cart.expectQuantityIs(3);
    await productDetailsPage.cart.clickCheckout();

    await checkoutPage.product.expectProductDetails(product.name, product.price, 3);
    await checkoutPage.summary.expectProductInTheTable(product.name, 3);
    await checkoutPage.summary.expectTotalPriceForOneProduct(product.price, 3);
    await checkoutPage.confirmOrder();
  });
});
