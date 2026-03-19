import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCartSection {
  readonly root: Locator;

  constructor(page: Page) {
    this.root = page.locator('#box-checkout-cart');
  }

  getCartRootByName = (name: string): Locator => {
    return this.root.locator(`//form[@name="cart_form"][.//*[text()='${name}']]`);
  };

  async expectProductNameIs(name: string) {
    const cartRoot = this.getCartRootByName(name);
    await expect(cartRoot).toBeVisible();
  }

  async expectProductPriceIs(name: string, price: string) {
    const cartRoot = this.getCartRootByName(name);
    await expect(cartRoot).toContainText(price);
  }

  async expectProductQuantityIs(name: string, quantity: string) {
    const cartRoot = this.getCartRootByName(name);
    const quantityLocator = cartRoot.locator('input[name="quantity"]');
    await expect(quantityLocator).toHaveValue(quantity);
  }

  async expectProductDetails({name, price, quantity}: {name: string, price: string, quantity: number}) {
    await this.expectProductNameIs(name);
    await this.expectProductPriceIs(name, price);
    await this.expectProductQuantityIs(name, quantity.toString());
  }
}
