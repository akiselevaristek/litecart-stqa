import { Page, Locator, expect } from '@playwright/test';
import { Footer, LoginForm, SearchBox, SidebarAccountBox } from '@components';
import { URLS } from '@config';

export type HomeSection = 'mostPopular' | 'campaigns' | 'latestProducts';

export type Product = {
  locator: Locator;
  name: string;
  manufacturer: string;
  link: string;
  price: string;
}

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

  async login(email: string, password: string) {
    await this.sidebarLoginForm.login(email, password);
  }

  async logout() {
    await this.sidebarAccountBox.logout();
  }

  async getProductWithoutDiscount(): Promise<Product> {
    const firstProductWithoutDiscount = this.page.locator('(//li//a[.//span[@class="price"]])[1]');

    await expect(firstProductWithoutDiscount).toBeVisible();

    const name = await firstProductWithoutDiscount.locator('.name').innerText();
    const manufacturer = await firstProductWithoutDiscount.locator('.manufacturer').innerText();
    const link = await firstProductWithoutDiscount.getAttribute('href');
    const price = await firstProductWithoutDiscount.locator('.price').innerText();
    const product = {
      locator: firstProductWithoutDiscount,
      name,
      manufacturer,
      link,
      price,
    };
    return product as Product;
  }
}
