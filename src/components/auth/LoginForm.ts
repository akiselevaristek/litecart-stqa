import { Locator } from '@playwright/test';

export class LoginForm {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(root: Locator) {
    this.email = root.locator('[name="email"]');
    this.password = root.locator('[name="password"]');
    this.loginButton = root.locator('[name="login"]');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
