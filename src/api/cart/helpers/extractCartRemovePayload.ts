import { load } from 'cheerio';
import type { CartRemovePayload } from './cart.types';

export function extractCartRemovePayload(html: string): CartRemovePayload {
  const $ = load(html);
  const form = $('form[name="cart_form"]').first();

  if (form.length === 0) {
    throw new Error('Could not find cart form in checkout HTML.');
  }

  const token = form.find('input[name="token"]').attr('value');
  const key = form.find('input[name="key"]').attr('value');
  const quantity = form.find('input[name="quantity"]').attr('value');

  if (!token) {
    throw new Error('Could not extract cart token from checkout HTML.');
  }

  if (!key) {
    throw new Error('Could not extract cart key from checkout HTML.');
  }

  if (!quantity) {
    throw new Error('Could not extract cart quantity from checkout HTML.');
  }

  return { token, key, quantity };
}
