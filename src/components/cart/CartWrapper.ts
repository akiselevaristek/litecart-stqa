import { expect, Locator, Page } from '@playwright/test';
import { byHrefPart } from '@utils';

export class CartWrapper {
  readonly cartWrapper: Locator;
  readonly quantity: Locator;
  readonly formattedValue: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.cartWrapper = page.locator('#cart-wrapper');
    this.quantity = this.cartWrapper.locator('.quantity');
    this.formattedValue = this.cartWrapper.locator('.formatted_value');
    this.checkoutLink = this.cartWrapper.locator('a.link');
  }

  async expectQuantityIs(quantity: number) {
    await expect(this.quantity).toHaveText(quantity.toString());
  }

  async expectCartTotalIs(price: string) {
    await expect(this.formattedValue).toHaveText(price);
  }

  async clickCheckout() {
    await this.checkoutLink.click();
  }
}
