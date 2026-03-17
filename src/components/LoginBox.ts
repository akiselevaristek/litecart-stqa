import { Locator, Page } from '@playwright/test';

export class LoginBox {
  readonly root: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('#box-account-login');
    this.email = this.root.locator('input[name="email"]');
    this.password = this.root.locator('input[name="password"]');
    this.loginButton = this.root.locator('button[name="login"]');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
