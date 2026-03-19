import { Page, Locator, expect } from '@playwright/test';
import { Footer, LoginForm, SearchBox, SidebarAccountBox } from '@components';
import { URLS } from '@config';

export type HomeSection = 'mostPopular' | 'campaigns' | 'latestProducts';

type ProductBase = {
  locator: Locator;
  name: string;
  manufacturer: string;
  link: string;
  price: string;
};

export type RegularProduct = ProductBase & {
  type: 'regular';
};

export type DiscountProduct = ProductBase & {
  type: 'discount';
  priceWithDiscount: string;
};

export type Product = RegularProduct | DiscountProduct;

export class HomePage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountBox: SidebarAccountBox;
  readonly footer: Footer;
  readonly sidebarSearchBox: SearchBox;
  private readonly sidebar: Locator;
  private readonly sectionLocators: Record<HomeSection, Locator>;

  constructor(private readonly page: Page) {
    this.sidebar = this.page.locator('#navigation');
    this.sidebarLoginForm = new LoginForm(this.sidebar);
    this.sidebarAccountBox = new SidebarAccountBox(this.page);
    this.footer = new Footer(this.page);
    this.sidebarSearchBox = new SearchBox(this.sidebar);
    this.sectionLocators = {
      mostPopular: this.page.locator('#box-most-popular'),
      campaigns: this.page.locator('#box-campaigns'),
      latestProducts: this.page.locator('#box-latest-products'),
    };
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }

  async isOpened() {
    await expect(this.sectionLocators['mostPopular']).toBeVisible();
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

  async getProductWithoutDiscount({ nth = 0 }: { nth?: number } = {}): Promise<RegularProduct> {
    const firstProductWithoutDiscount = this.page.locator('//li//a[.//span[@class="price"]]').nth(nth);

    await expect(firstProductWithoutDiscount).toBeVisible();

    const name = await firstProductWithoutDiscount.locator('.name').innerText();
    const manufacturer = await firstProductWithoutDiscount.locator('.manufacturer').innerText();
    const link = await firstProductWithoutDiscount.getAttribute('href');
    const price = await firstProductWithoutDiscount.locator('.price').innerText();

    if (!link) {
      throw new Error('Product without discount does not have href');
    }

    const product = {
      type: 'regular' as const,
      locator: firstProductWithoutDiscount,
      name,
      manufacturer,
      link,
      price,
    };
    return product;
  }

  async getProductWithDiscount({ nth = 0 }: { nth?: number } = {}): Promise<DiscountProduct> {
    const firstProductWithDiscount = this.page.locator('//li//a[.//*[@class="regular-price"]]').nth(nth);

    await expect(firstProductWithDiscount).toBeVisible();

    const name = await firstProductWithDiscount.locator('.name').innerText();
    const manufacturer = await firstProductWithDiscount.locator('.manufacturer').innerText();
    const link = await firstProductWithDiscount.getAttribute('href');
    const price = await firstProductWithDiscount.locator('.regular-price').innerText();
    const priceWithDiscount = await firstProductWithDiscount.locator('.campaign-price').innerText();

    if (!link) {
      throw new Error('Product with discount does not have href');
    }

    const product = {
      type: 'discount' as const,
      locator: firstProductWithDiscount,
      name,
      manufacturer,
      link,
      price,
      priceWithDiscount,
    };
    return product;
  }
}
