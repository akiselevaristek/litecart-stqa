import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { URLS } from '@config';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
  }

  async goto() {
    await this.page.goto(URLS.HOME)
  }
}
