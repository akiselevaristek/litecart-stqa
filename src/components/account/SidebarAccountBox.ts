import { Locator } from '@playwright/test';
import { byHrefPart } from '@utils';

export class SidebarAccountBox {
  private readonly accountBox: Locator;
  readonly customerServiceLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly editAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(root: Locator) {
    this.accountBox = root.locator('#box-account');
    this.customerServiceLink = byHrefPart(this.accountBox, 'customer-service');
    this.orderHistoryLink = byHrefPart(this.accountBox, 'order_history');
    this.editAccountLink = byHrefPart(this.accountBox, 'edit_account');
    this.logoutLink = byHrefPart(this.accountBox, 'logout');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
