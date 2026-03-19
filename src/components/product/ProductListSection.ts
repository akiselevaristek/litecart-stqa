import { expect, type Locator } from '@playwright/test';

export const PRODUCT_SECTION_SELECTOR = {
  mostPopular: '#box-most-popular',
  campaigns: '#box-campaigns',
  latestProducts: '#box-latest-products',
  alsoPurchased: '#box-also-purchased-products',
  similarProducts: '#box-similar-products',
} as const;

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

export class ProductListSection {
  constructor(readonly root: Locator) {}

  getProducts(): Locator {
    return this.root.locator('li.product');
  }

  getProductByName(name: string): Locator {
    return this.getProducts().filter({
      has: this.root.locator('.name', { hasText: name }),
    });
  }

  async clickProduct(name: string) {
    await this.getProductByName(name).click();
  }

  getProductPrice(name: string): Locator {
    return this.getProductByName(name).locator('.price, .campaign-price');
  }

  private async getRequiredAttribute(locator: Locator, attributeName: string): Promise<string> {
    await expect(locator).toHaveAttribute(attributeName, /.+/);
    const attributeValue = await locator.getAttribute(attributeName);

    if (!attributeValue) {
      throw new Error(`Element does not have required attribute "${attributeName}"`);
    }

    return attributeValue;
  }

  async getProductWithoutDiscount({ nth = 0 }: { nth?: number } = {}): Promise<RegularProduct> {
    const productLocator = this.root.locator('xpath=.//li//a[.//span[@class="price"]]').nth(nth);
    const nameLocator = productLocator.locator('.name');
    const manufacturerLocator = productLocator.locator('.manufacturer');
    const priceLocator = productLocator.locator('.price');

    await expect(productLocator).toBeVisible();
    await expect(nameLocator).toBeVisible();
    await expect(manufacturerLocator).toBeVisible();
    await expect(priceLocator).toBeVisible();

    const name = await nameLocator.innerText();
    const manufacturer = await manufacturerLocator.innerText();
    const link = await this.getRequiredAttribute(productLocator, 'href');
    const price = await priceLocator.innerText();

    return {
      type: 'regular',
      locator: productLocator,
      name,
      manufacturer,
      link,
      price,
    };
  }

  async getProductWithDiscount({ nth = 0 }: { nth?: number } = {}): Promise<DiscountProduct> {
    const productLocator = this.root.locator('xpath=.//li//a[.//*[@class="regular-price"]]').nth(nth);
    const nameLocator = productLocator.locator('.name');
    const manufacturerLocator = productLocator.locator('.manufacturer');
    const regularPriceLocator = productLocator.locator('.regular-price');
    const campaignPriceLocator = productLocator.locator('.campaign-price');

    await expect(productLocator).toBeVisible();
    await expect(nameLocator).toBeVisible();
    await expect(manufacturerLocator).toBeVisible();
    await expect(regularPriceLocator).toBeVisible();
    await expect(campaignPriceLocator).toBeVisible();

    const name = await nameLocator.innerText();
    const manufacturer = await manufacturerLocator.innerText();
    const link = await this.getRequiredAttribute(productLocator, 'href');
    const price = await regularPriceLocator.innerText();
    const priceWithDiscount = await campaignPriceLocator.innerText();

    return {
      type: 'discount',
      locator: productLocator,
      name,
      manufacturer,
      link,
      price,
      priceWithDiscount,
    };
  }
}
