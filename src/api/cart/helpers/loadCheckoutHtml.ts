import type { Page } from '@playwright/test';
import { URLS } from '@config';

export async function loadCheckoutHtml(page: Page): Promise<string> {
  const response = await page.context().request.get(URLS.CHECKOUT);

  if (!response.ok()) {
    throw new Error(`Failed to load checkout page. Response status: ${response.status()}.`);
  }

  return response.text();
}
