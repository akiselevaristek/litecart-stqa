import { Page, expect } from '@playwright/test';
import { Footer, ProductListSection, Sidebar } from '@components';
import { PRODUCT_SECTION_SELECTOR } from '@components/product/ProductListSection';
import { URLS } from '@config';
export type { DiscountProduct, Product, RegularProduct } from '@components';

export class HomePage {
  readonly sidebar: Sidebar;
  readonly footer: Footer;
  readonly mostPopular: ProductListSection;
  readonly campaigns: ProductListSection;
  readonly latestProducts: ProductListSection;

  constructor(private readonly page: Page) {
    this.sidebar = new Sidebar(this.page);
    this.footer = new Footer(this.page);
    this.mostPopular = new ProductListSection(this.page.locator(PRODUCT_SECTION_SELECTOR.mostPopular));
    this.campaigns = new ProductListSection(this.page.locator(PRODUCT_SECTION_SELECTOR.campaigns));
    this.latestProducts = new ProductListSection(this.page.locator(PRODUCT_SECTION_SELECTOR.latestProducts));
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }

  async isOpened() {
    await expect(this.mostPopular.root).toBeVisible();
  }

  async userIsLoggedIn() {
    await expect(this.sidebar.account.logoutLink).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.sidebar.loginForm.login(email, password);
  }

  async logout() {
    await this.sidebar.account.logout();
  }
}
