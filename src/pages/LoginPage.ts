import { Page, Locator, expect } from '@playwright/test';
import { LoginForm } from '@components';
import { appConfig, URLS } from '@config';
import { applyStoredSession, isSessionValidByUsername, Logger, saveStoredSession } from '@utils';

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

  async applySessionAsDefaultUser() {
    const username = appConfig.email;

    if (await isSessionValidByUsername(username)) {
      await applyStoredSession(this.page, username);
      await this.page.goto(URLS.HOME);
      return;
    }

    await this.goto();
    await this.loginAs(username, appConfig.password);
    await saveStoredSession(this.page, username);
  }
}
