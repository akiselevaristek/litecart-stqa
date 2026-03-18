import { expect, type Locator, type Page } from '@playwright/test';
import { Footer, LoginForm, SearchBox as SidebarSearchBox, SidebarAccountBox, CartWrapper } from '@components';

export class ProductDetailsPage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountBox: SidebarAccountBox;
  readonly footer: Footer;
  readonly sidebarSearchBox: SidebarSearchBox;
  readonly cart: CartWrapper;
  readonly productBox: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  private readonly sidebar: Locator;

  constructor(private readonly page: Page) {
    this.sidebar = this.page.locator('#navigation');
    this.sidebarLoginForm = new LoginForm(this.sidebar);
    this.sidebarAccountBox = new SidebarAccountBox(this.page);
    this.footer = new Footer(this.page);
    this.sidebarSearchBox = new SidebarSearchBox(this.sidebar);
    this.cart = new CartWrapper(this.page);
    this.addToCartButton = this.page.locator('button[name="add_cart_product"]');
    this.productBox = this.page.locator('#box-product');
    this.quantityInput = this.productBox.locator('input[name="quantity"]');
  }

  async expectProductNameIs(name: string) {
    const title = this.productBox.locator(`xpath=.//h1[text()='${name}']`);
    await expect(title).toBeVisible();
  }

  async expectProductPriceIs(price: string) {
    const priceLocator = this.productBox.locator(`xpath=.//span[@class="price"][text()='${price}']`);
    await expect(priceLocator).toBeVisible();
  }

  async expectProductManufacturerIs(manufacturer: string) {
    const manufacturerLocator = this.productBox.locator(`xpath=.//div[@class="manufacturer"]//img[@title='${manufacturer}']`);
    await expect(manufacturerLocator).toBeVisible();
  }

  async expectProductLinkIs(link: string) {
    await this.page.waitForURL(link);
  }

  async expectProductDetailsAre(name: string, price: string, manufacturer: string, link: string) {
    await this.expectProductNameIs(name);
    await this.expectProductPriceIs(price);
    await this.expectProductManufacturerIs(manufacturer);
    await this.expectProductLinkIs(link);
  }

  async addToCart({ count }: { count: number }) {
    await this.quantityInput.fill(count.toString());
    await this.addToCartButton.click();
  }
}
