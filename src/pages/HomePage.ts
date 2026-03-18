import { Page } from '@playwright/test';
import { LoginForm } from '@components';
import { URLS } from '@config';

export class HomePage {
  private readonly page: Page;
  readonly loginForm: LoginForm;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = new LoginForm(
      this.page.locator('#box-account-login')
    );
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }
}
