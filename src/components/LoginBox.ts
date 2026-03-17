import { expect, Locator, Page } from '@playwright/test';

export class LoginBox {
  readonly root: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('#navigation');
    this.email = this.root.locator('//input[@name="email"]');
    this.password = this.root.locator('//input[@name="password"]');
    this.loginButton = this.root.locator('//button[@name="login"]');
    this.logoutLink = this.root.locator('//a[text()="Logout"]');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await expect(this.logoutLink).toBeVisible();
  }
}
