const EMPTY_CART_MARKER = 'There are no items in your cart.';

export function isCartEmpty(html: string): boolean {
  return html.includes(EMPTY_CART_MARKER);
}
