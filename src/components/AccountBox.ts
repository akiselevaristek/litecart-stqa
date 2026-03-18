import { Locator, Page } from '@playwright/test';
import { byHrefPart } from '@utils';

export class AccountBox {
  readonly root: Locator;

  readonly customerServiceLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly editAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.root = page.locator('#box-account');
    this.customerServiceLink = byHrefPart(this.root, 'customer-service');
    this.orderHistoryLink = byHrefPart(this.root, 'order_history');
    this.editAccountLink = byHrefPart(this.root, 'edit_account');
    this.logoutLink = byHrefPart(this.root, 'logout');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
