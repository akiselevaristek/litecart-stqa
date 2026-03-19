import { Page, Locator, expect } from '@playwright/test';
import { LoginForm } from '@components';
import { appConfig, URLS } from '@config';
import { e } from '@faker-js/faker/dist/airline-Dz1uGqgJ';

export const ErrorMessages = {
  invalidPasswordEmailDeactivate: 'Wrong password or the account is disabled, or does not exist'
};

export type ErrorMessages = (typeof ErrorMessages)[keyof typeof ErrorMessages];

export class LoginPage {
  readonly loginForm: LoginForm;
  readonly error: Locator;
  readonly successfulLoginMessage: Locator;

  constructor(private readonly page: Page) {
    this.successfulLoginMessage = this.page.locator('.notice.success');
    this.error = this.page.locator('.notice.errors');
    this.loginForm = new LoginForm(this.page.locator('#box-login'));
  }

  async goto() {
    await this.page.goto(URLS.LOGIN);
  }

  async loginAs(email: string, password: string) {
    await this.loginForm.login(email, password);
    await expect(this.successfulLoginMessage).toBeVisible();
  }

  async tryToLogin(email: string, password: string, message: ErrorMessages) {
    await this.loginForm.login(email, password);
    await expect(this.error).toContainText(message);
  }

  async loginAsDefaultUser() {
    await this.loginAs(appConfig.email, appConfig.password);
  }
}
