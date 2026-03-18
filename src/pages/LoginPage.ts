import { Page } from '@playwright/test';
import { LoginForm } from '@components';
import { appConfig, URLS } from '@config';

export class LoginPage {
  readonly loginForm: LoginForm;

  constructor(private readonly page: Page) {
    this.loginForm = new LoginForm(this.page.locator('#box-login'));
  }

  async goto() {
    await this.page.goto(URLS.LOGIN);
  }

  async login(email: string, password: string) {
    await this.loginForm.login(email, password);
  }

  async loginAsDefaultUser() {
    await this.login(appConfig.credentials.email, appConfig.credentials.password);
  }
}
