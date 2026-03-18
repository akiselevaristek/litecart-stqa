import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginBox } from '@components';
import { URLS } from '@config';

export class HomePage extends BasePage {
  readonly loginBox: LoginBox;

  constructor(page: Page) {
    super(page);
    this.loginBox = new LoginBox(page);
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }
}
