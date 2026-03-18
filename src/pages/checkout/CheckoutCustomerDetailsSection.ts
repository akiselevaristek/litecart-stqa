import { type Locator, expect, type Page } from '@playwright/test';
import { CustomerDetailsGenerator } from '../../generators';

export type CustomerDetails = {
  taxId?: string;
  company?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  postcode: string;
  city: string;
  countryCode?: string;
  email: string;
  phone: string;
};

export class CheckoutCustomerDetailsSection {
  readonly root: Locator;
  readonly taxIdInput: Locator;
  readonly companyInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly countryCodeSelect: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.root = page.locator('#box-checkout-customer');
    this.taxIdInput = this.root.locator('[name="tax_id"]');
    this.companyInput = this.root.locator('[name="company"]');
    this.firstNameInput = this.root.locator('[name="firstname"]');
    this.lastNameInput = this.root.locator('[name="lastname"]');
    this.address1Input = this.root.locator('[name="address1"]');
    this.address2Input = this.root.locator('[name="address2"]');
    this.postcodeInput = this.root.locator('[name="postcode"]');
    this.cityInput = this.root.locator('[name="city"]');
    this.countryCodeSelect = this.root.locator('select[name="country_code"]');
    this.emailInput = this.root.locator('[name="email"]');
    this.phoneInput = this.root.locator('[name="phone"]');
    this.saveChangesButton = this.root.locator('.billing-address [name="set_addresses"]');
  }

  async fillCustomerDetails(details: CustomerDetails) {
    if (details.taxId !== undefined) {
      await this.taxIdInput.fill(details.taxId);
    }
    if (details.company !== undefined) {
      await this.companyInput.fill(details.company);
    }
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.address1Input.fill(details.address1);
    if (details.address2 !== undefined) {
      await this.address2Input.fill(details.address2);
    }
    await this.postcodeInput.fill(details.postcode);
    await this.cityInput.fill(details.city);
    if (details.countryCode !== undefined) {
      await this.countryCodeSelect.selectOption(details.countryCode);
    }
    const currentEmail = await this.emailInput.inputValue();
    const isReadonly = (await this.emailInput.getAttribute('readonly')) !== null;
    const isEditable = await this.emailInput.isEditable();

    if (!(currentEmail.trim() !== '' && (isReadonly || !isEditable))) {
      await this.emailInput.fill(details.email);
    }
    await this.phoneInput.fill(details.phone);
  }

  async saveChanges() {
    await this.saveChangesButton.click();
    await expect(this.saveChangesButton).toBeDisabled();
  }

  async fillDetailsWithRandomData(details?: CustomerDetails) {
    const randomDetails = new CustomerDetailsGenerator().generate();
    await this.fillCustomerDetails({
      ...randomDetails,
      ...details,
    });
    await this.saveChanges();
  }
}
