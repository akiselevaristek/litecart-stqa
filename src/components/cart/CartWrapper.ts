import { Locator, Page } from '@playwright/test';

export class CartWrapper {
  readonly root: Locator;

  constructor(page: Page) {
    this.root = page.locator('#cart-wrapper');
  }
}
