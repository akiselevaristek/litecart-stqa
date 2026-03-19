import { type Locator, type Page } from '@playwright/test';
import {
  CheckoutCartSection,
  CheckoutCustomerDetailsSection,
  CheckoutOrderSummarySection,
} from '.';

export class CheckoutPage {
  readonly product: CheckoutCartSection;
  readonly customerDetails: CheckoutCustomerDetailsSection;
  readonly summaryTable: CheckoutOrderSummarySection;
  private readonly confirmOrderButton: Locator;

  constructor(private readonly page: Page) {
    this.product = new CheckoutCartSection(this.page);
    this.customerDetails = new CheckoutCustomerDetailsSection(this.page);
    this.summaryTable = new CheckoutOrderSummarySection(this.page);
    this.confirmOrderButton = this.page.locator('.confirm button');
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
