import { Locator } from '@playwright/test';
import { byHrefPart } from '@utils';

export class SidebarAccount {
  private readonly account: Locator;
  readonly customerServiceLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly editAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(root: Locator) {
    this.account = root.locator('#box-account');
    this.customerServiceLink = byHrefPart(this.account, 'customer-service');
    this.orderHistoryLink = byHrefPart(this.account, 'order_history');
    this.editAccountLink = byHrefPart(this.account, 'edit_account');
    this.logoutLink = byHrefPart(this.account, 'logout');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
