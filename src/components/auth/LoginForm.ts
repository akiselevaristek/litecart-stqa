import { Locator } from '@playwright/test';

export class LoginForm {
  readonly root: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.email = this.root.locator('[name="email"]');
    this.password = this.root.locator('[name="password"]');
    this.loginButton = this.root.locator('[name="login"]');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
