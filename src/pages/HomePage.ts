import { Page } from '@playwright/test';
import { BasePage } from '@pages';
import { Navigation } from '@components';
import { URLS } from '@config';

export class HomePage extends BasePage {
  readonly navigation: Navigation;

  constructor(page: Page) {
    super(page);
    this.navigation = new Navigation(page);
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }
}
