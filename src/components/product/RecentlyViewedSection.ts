import { expect, type Locator } from '@playwright/test';

export class RecentlyViewedSection {
  readonly recentlyViewedSection: Locator;

  constructor(readonly root: Locator) {
    this.recentlyViewedSection = this.root.locator('#box-recently-viewed-products');
  }

  async notExists() {
    await expect(this.root).toBeVisible();
    await expect(this.recentlyViewedSection).not.toBeVisible();
  }

  async containsProductLink(link: string) {
    await expect(this.recentlyViewedSection.locator(`a[href="${link}"]`)).toBeVisible();
  }
}
