import { test } from '@fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test('User can login from sidebar', { tag: ['@login'] }, async ({ loginFlow }) => {
  await loginFlow.loginAsDefaultUser();
});
