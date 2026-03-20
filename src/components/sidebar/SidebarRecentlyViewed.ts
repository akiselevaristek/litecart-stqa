import { expect, type Locator } from '@playwright/test';

export class SidebarRecentlyViewed {
  readonly recentlyViewed: Locator;

  constructor(readonly root: Locator) {
    this.recentlyViewed = this.root.locator('#box-recently-viewed-products');
  }

  async notExists() {
    await expect(this.root).toBeVisible();
    await expect(this.recentlyViewed).not.toBeVisible();
  }

  async containsProductLink(link: string) {
    await expect(this.recentlyViewed.locator(`a[href="${link}"]`)).toBeVisible();
  }
}
