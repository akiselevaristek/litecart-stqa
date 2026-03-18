import { test, expect } from '@fixtures';

test.describe('Home page', () => {
  test('finds first product without discount', async ({ homePage, page }) => {
    await homePage.goto();

    const productCard = await homePage.getProductWithoutDiscount();

    await expect(productCard.locator('.campaign-price')).toHaveCount(0);
    await productCard.locator('a.link').click();
    await expect(page.locator('#box-product')).toBeVisible();
  });
});
