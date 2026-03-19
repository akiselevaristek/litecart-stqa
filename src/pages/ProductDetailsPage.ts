import { expect, type Locator, type Page } from '@playwright/test';
import { 
  Footer, 
  LoginForm, 
  SearchBox as SidebarSearchBox, 
  SidebarAccountBox, 
  CartWrapper, 
  ProductListSection, 
  RecentlyViewedSection
} from '@components';
import { PRODUCT_SECTION_SELECTOR } from '@components/product/ProductListSection';
import type { Product } from '@components';

export type Size = 'Small' | 'Medium' | 'Large';

export class ProductDetailsPage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountBox: SidebarAccountBox;
  readonly sidebarRecentlyViewed: RecentlyViewedSection;
  readonly sidebarSearchBox: SidebarSearchBox;
  readonly footer: Footer;
  readonly cart: CartWrapper;
  readonly alsoPurchased: ProductListSection;
  readonly similarProducts: ProductListSection;
  readonly recentlyViewed: RecentlyViewedSection;
  readonly productBox: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly sizeSelect: Locator;
  private readonly sidebar: Locator;

  constructor(private readonly page: Page) {
    this.sidebar = this.page.locator('#navigation');
    this.sidebarLoginForm = new LoginForm(this.sidebar);
    this.recentlyViewed = new RecentlyViewedSection(this.sidebar);
    this.sidebarAccountBox = new SidebarAccountBox(this.sidebar);
    this.sidebarSearchBox = new SidebarSearchBox(this.sidebar);
    this.sidebarRecentlyViewed = new RecentlyViewedSection(this.sidebar);
    this.footer = new Footer(this.page);
    this.cart = new CartWrapper(this.page);
    this.alsoPurchased = new ProductListSection(this.page.locator(PRODUCT_SECTION_SELECTOR.alsoPurchased));
    this.similarProducts = new ProductListSection(this.page.locator(PRODUCT_SECTION_SELECTOR.similarProducts));
    this.addToCartButton = this.page.locator('button[name="add_cart_product"]');
    this.productBox = this.page.locator('#box-product');
    this.quantityInput = this.productBox.locator('input[name="quantity"]');
    this.sizeSelect = this.productBox.locator('select[name="options[Size]"]');
  }

  async expectProductNameIs(name: string) {
    const title = this.productBox.locator(`xpath=.//h1[text()='${name}']`);
    await expect(title).toBeVisible();
  }

  private async getPriceLocator(): Promise<Locator> {
    return this.productBox.locator(`.price`).or(this.productBox.locator(`.regular-price`));
  }

  private async getPriceWithDiscountLocator(): Promise<Locator> {
    return this.productBox.locator(`.campaign-price`);
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
    await expect(this.page).toHaveURL(link);
  }

  async expectProductDetailsAre(product: Product) {
    await this.expectProductNameIs(product.name);
    await this.expectProductManufacturerIs(product.manufacturer);
    await this.expectProductLinkIs(product.link);
    await this.expectProductPriceIs(product.price);

    if (product.type === 'discount') {
      await this.expectProductPriceWithDiscountIs(product.priceWithDiscount);
    }
  }

  async addToCart({ count, size = 'Small' }: { count: number; size?: Size }) {
    await this.quantityInput.fill(count.toString());

    if (await this.sizeSelect.count()) {
      await this.sizeSelect.selectOption(size);
    }

    await this.addToCartButton.click();
  }

  async openProductByLink(link: string) {
    await this.page.goto(link);
    await this.expectProductLinkIs(link);
    await expect(this.productBox).toBeVisible();
  }
}
