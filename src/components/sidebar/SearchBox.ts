import { Locator, Page } from '@playwright/test';

export class SearchBox {
  readonly root: Locator;
  readonly input: Locator;

  constructor(page: Page) {
    this.root = page.locator('form[name="search_form"]');
    this.input = this.root.locator('input[name="query"]');
  }

  async search(query: string) {
    await this.input.fill(query);
    await this.input.press('Enter');
  }
}