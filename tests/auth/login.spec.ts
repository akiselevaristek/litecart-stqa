import { test } from '@fixtures';

test('User can login from sidebar', { tag: ['@2222'] }, async ({ 
  loginPage,
  clearCart,
}) => {
  await loginPage.goto();
  await loginPage.applySessionAsDefaultUser();
  await clearCart();
});
