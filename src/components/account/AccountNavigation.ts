import { Locator } from '@playwright/test';
import { byHrefPart } from '@utils';

export class AccountNavigation {
  readonly logoutLink: Locator;
  readonly customerServiceLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly editAccountLink: Locator;

  constructor(root: Locator) {
    this.customerServiceLink = byHrefPart(root, 'customer-service');
    this.orderHistoryLink = byHrefPart(root, 'order_history');
    this.editAccountLink = byHrefPart(root, 'edit_account');
    this.logoutLink = byHrefPart(root, 'logout');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
