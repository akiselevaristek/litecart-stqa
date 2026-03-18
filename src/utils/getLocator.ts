import { Locator } from '@playwright/test';

export function byHrefPart(root: Locator, part: string): Locator {
  return root.locator(`.//a[contains(@href, "${part}")]`);
}