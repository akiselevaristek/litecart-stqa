import { Locator, expect, Page } from '@playwright/test';

const ORDER_SUMMARY_COLUMNS = [
  'quantity',
  'item',
  'sku',
  'unit-cost',
  'tax',
  'sum',
] as const;

type OrderSummaryColumn = (typeof ORDER_SUMMARY_COLUMNS)[number];

export class CheckoutOrderSummarySection {
  readonly root: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    this.root = page.locator('#box-checkout-summary');
    this.table = this.root.locator('table');
  }

  private async getColumnIndex(column: OrderSummaryColumn): Promise<number> {
    const headers = this.table.locator('tr.header th');
    const headersCount = await headers.count();

    for (let index = 0; index < headersCount; index++) {
      const headerClass = await headers.nth(index).getAttribute('class');
      const classes = headerClass?.split(/\s+/) ?? [];

      if (classes.includes(column)) {
        return index;
      }
    }

    throw new Error(`Column "${column}" not found`);
  }

  private getProductRow(productName: string): Locator {
    return this.table.locator(`xpath=.//tr[td[contains(@class, "item") and normalize-space(.)="${productName}"]]`);
  }

  private async getProductCell(row: Locator, column: OrderSummaryColumn): Promise<Locator> {
    const columnIndex = await this.getColumnIndex(column);
    return row.locator('td').nth(columnIndex);
  }

  async expectTotalPriceForOneProduct(price: string, count: number) {
    const totalRow = this.table.locator('xpath=.//tr[contains(@class, "footer")]');
    const totalCell = totalRow.locator('td').last();
    const numericPrice = Number(price.replace(/[^0-9.]/g, ''));
    const expectedTotal = `$${(numericPrice * count).toFixed(2)}`;

    await expect(totalRow).toBeVisible();
    await expect(totalCell).toHaveText(expectedTotal);
  }

  async expectProductInTheTable(productName: string, quantity: number) {
    const row = this.getProductRow(productName);
    const quantityCell = await this.getProductCell(row, 'quantity');
    const productCell = await this.getProductCell(row, 'item');

    await expect(row).toBeVisible();
    await expect(productCell).toHaveText(productName);
    await expect(quantityCell).toHaveText(quantity.toString());
  }

  async expectProductUnitCostIs(productName: string, unitCost: string) {
    const row = this.getProductRow(productName);
    const unitCostCell = await this.getProductCell(row, 'unit-cost');

    await expect(row).toBeVisible();
    await expect(unitCostCell).toHaveText(unitCost);
  }
}
