import { Page, Locator, expect } from '@playwright/test';
import { LoginForm } from '@components';
import { appConfig, URLS } from '@config';

export class LoginPage {
  readonly loginForm: LoginForm;
  readonly successfulLoginMessage: Locator;

  constructor(private readonly page: Page) {
    this.successfulLoginMessage = this.page.getByText('You are now logged in');
    this.loginForm = new LoginForm(this.page.locator('#box-login'));
  }

  async goto() {
    await this.page.goto(URLS.LOGIN);
  }

  async loginAs(email: string, password: string) {
    await this.loginForm.login(email, password);
    await expect(this.successfulLoginMessage).toBeVisible();
  }

  async loginAsDefaultUser() {
    await this.loginAs(appConfig.credentials.email, appConfig.credentials.password);
  }
}
