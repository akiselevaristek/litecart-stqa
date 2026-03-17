import { test } from '@fixtures';

test('Open home page', async ({ homePage }) => {
  await homePage.goto();
});
