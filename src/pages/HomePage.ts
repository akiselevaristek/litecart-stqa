import { Page, Locator, expect } from '@playwright/test';
import { Footer, LoginForm, ProductListSection, SearchBox, SidebarAccountBox, RecentlyViewedSection } from '@components';
import { PRODUCT_SECTION_SELECTOR } from '@components/product/ProductListSection';
import { URLS } from '@config';
export type { DiscountProduct, Product, RegularProduct } from '@components';

export class HomePage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountBox: SidebarAccountBox;
  readonly sidebarRecentlyViewed: RecentlyViewedSection;
  readonly footer: Footer;
  readonly sidebarSearchBox: SearchBox;
  readonly mostPopular: ProductListSection;
  readonly campaigns: ProductListSection;
  readonly latestProducts: ProductListSection;
  private readonly sidebar: Locator;

  constructor(private readonly page: Page) {
    this.sidebar = this.page.locator('#navigation');
    this.sidebarLoginForm = new LoginForm(this.sidebar);
    this.sidebarAccountBox = new SidebarAccountBox(this.sidebar);
    this.footer = new Footer(this.page);
    this.sidebarSearchBox = new SearchBox(this.sidebar);
    this.sidebarRecentlyViewed = new RecentlyViewedSection(this.sidebar);
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
    await expect(this.sidebarAccountBox.logoutLink).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.sidebarLoginForm.login(email, password);
  }

  async logout() {
    await this.sidebarAccountBox.logout();
  }
}
