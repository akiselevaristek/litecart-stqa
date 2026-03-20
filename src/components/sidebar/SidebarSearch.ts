import { Locator } from '@playwright/test';

export class SidebarSearch {
  readonly input: Locator;

  constructor(root: Locator) {
    this.input = root.locator('input[name="query"]');
  }

  async search(query: string) {
    await this.input.fill(query);
    await this.input.press('Enter');
  }
}
