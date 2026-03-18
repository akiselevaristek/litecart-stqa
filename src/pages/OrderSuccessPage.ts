import { expect, type Locator, type Page } from '@playwright/test';
import { CartWrapper, Footer } from '@components';

export class OrderSuccessPage {
  readonly cart: CartWrapper;
  readonly footer: Footer;
  readonly successfulOrderMessage: Locator;

  constructor(private readonly page: Page) {
    this.cart = new CartWrapper(this.page);
    this.footer = new Footer(this.page);
    this.successfulOrderMessage = this.page.getByText('Your order is successfully completed!');
  }

  async expectSuccessfulOrderMessage() {
    await expect(this.successfulOrderMessage).toBeVisible();
  }
}
