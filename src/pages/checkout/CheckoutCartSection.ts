import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCartSection {
  readonly root: Locator;

  constructor(page: Page) {
    this.root = page.locator('#box-checkout-cart');
  }

  async expectProductNameIs(name: string) {
    const productName = this.root.locator(`xpath=.//li[contains(@class, "item")]//strong[text()='${name}']`);
    await expect(productName).toBeVisible();
  }

  async expectProductPriceIs(price: string) {
    const productPrice = this.root.locator(`xpath=.//li[contains(@class, "item")][.//*[text()='${price}']]`);
    await expect(productPrice).toBeVisible();
  }

  async expectProductQuantityIs(quantity: string) {
    const quantityInput = this.root.locator(`xpath=.//li[contains(@class, "item")]//input[@name="quantity" and @value='${quantity}']`);
    await expect(quantityInput).toBeVisible();
  }

  async expectProductDetails({name, price, quantity}: {name: string, price: string, quantity: number}) {
    await this.expectProductNameIs(name);
    await this.expectProductPriceIs(price);
    await this.expectProductQuantityIs(quantity.toString());
  }
}
