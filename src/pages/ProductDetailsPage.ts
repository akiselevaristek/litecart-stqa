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

  private async isProductWithDiscount(): Promise<boolean> {
    const price = this.productBox.locator('.price');
    const regularPrice = this.productBox.locator('.regular-price');
    await expect(price.or(regularPrice)).toBeVisible();
    const isDiscount = (await regularPrice.count()) > 0;
    return isDiscount;
  }

  private async getPriceLocator(): Promise<Locator> {
    return this.productBox.locator(`.price`).or(this.productBox.locator(`.regular-price`));
  }

  private async getPriceWithDiscountLocator(): Promise<Locator> {
    return this.productBox.locator(`.price`).or(this.productBox.locator(`.regular-price`));
  }

  async expectProductPriceIs(expectedPrice: string) {
    const price = await this.getPriceLocator();
    await expect(price).toBeVisible();
    await expect(price).toHaveText(expectedPrice);
  }

  async expectProductPriceWithDiscountIs(expectedPrice: string) {
    const priceWithDiscount = await this.getPriceWithDiscountLocator();
    await expect(priceWithDiscount).toBeVisible();
    await expect(priceWithDiscount).toHaveText(expectedPrice);
  }

  async expectProductManufacturerIs(manufacturer: string) {
    const manufacturerLocator = this.productBox.locator(`xpath=.//div[@class="manufacturer"]//img[@title='${manufacturer}']`);
    await expect(manufacturerLocator).toBeVisible();
  }

  async expectProductLinkIs(link: string) {
    await this.page.waitForURL(link);
  }

  async expectProductDetailsAre(name: string, price: string, manufacturer: string, link: string, priceWithDiscount?: string) {
    await this.expectProductNameIs(name);
    await this.expectProductManufacturerIs(manufacturer);
    await this.expectProductLinkIs(link);
    await this.expectProductPriceIs(price);
    if (await this.isProductWithDiscount() && priceWithDiscount) {
      await this.expectProductPriceWithDiscountIs(priceWithDiscount);
    }
  }

  async addToCart({ count }: { count: number }) {
    await this.quantityInput.fill(count.toString());
    await this.addToCartButton.click();
  }
}
