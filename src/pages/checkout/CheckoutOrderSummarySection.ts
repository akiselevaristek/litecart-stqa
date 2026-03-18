import { Locator, expect, Page } from '@playwright/test';
import { formatCurrencyFixed, parseCurrency, type CurrencyInput } from '@utils';

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

  async totalPriceForProductIs({price, count}: {price: CurrencyInput, count: number}) {
    const totalRow = this.table.locator('xpath=.//tr[contains(@class, "footer")]');
    const totalCell = totalRow.locator('td').last();
    const numericPrice = parseCurrency(price);
    const expectedTotal = formatCurrencyFixed(numericPrice * count);

    await expect(totalRow).toBeVisible();
    await expect(totalCell).toHaveText(expectedTotal);
  }

  async containsProducts({name: name, quantity}: {name: string, quantity: number}) {
    const row = this.getProductRow(name);
    const quantityCell = await this.getProductCell(row, 'quantity');
    const productCell = await this.getProductCell(row, 'item');

    await expect(row).toBeVisible();
    await expect(productCell).toHaveText(name);
    await expect(quantityCell).toHaveText(quantity.toString());
  }

  async productCostIs({name, cost}: {name: string, cost: CurrencyInput}) {
    const row = this.getProductRow(name);
    const unitCostCell = await this.getProductCell(row, 'unit-cost');
    const expectedCost = formatCurrencyFixed(cost);

    await expect(row).toBeVisible();
    await expect(unitCostCell).toHaveText(expectedCost);
  }
}
