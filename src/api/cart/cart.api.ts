import type { Page } from '@playwright/test';
import { URLS } from '@config';
import { extractCartRemovePayload } from './helpers/extractCartRemovePayload';
import { isCartEmpty } from './helpers/isCartEmpty';
import { loadCheckoutHtml } from './helpers/loadCheckoutHtml';
import { Logger } from '@utils';

export async function apiClearCart(page: Page): Promise<void> {
  while (true) {
    const checkoutHtml = await loadCheckoutHtml(page);
    if (isCartEmpty(checkoutHtml)) {
      Logger.info('Cart is empty.');
      return;
    }

    const payload = extractCartRemovePayload(checkoutHtml);
    const response = await page.context().request.post(URLS.CHECKOUT_CART_AJAX, {
      form: {
        token: payload.token,
        key: payload.key,
        quantity: payload.quantity,
        remove_cart_item: 'Remove',
      },
      headers: {
        Referer: URLS.CHECKOUT,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to remove cart item. Response status: ${response.status()}.`);
    }
    
    Logger.info('A cart item is removed via API. Checking if cart is empty...');
    const cartHtml = await response.text();
    if (isCartEmpty(cartHtml)) {
      Logger.info('Cart is empty.');
      return;
    }
  }
}
