import type { Page } from '@playwright/test';
import { LoginFlow } from '@flows';

export type FlowFixtures = {
  loginFlow: LoginFlow;
};

export const flowsFixture = {
  loginFlow: async (
    { page }: { page: Page },
    use: (loginFlow: LoginFlow) => Promise<void>
  ) => {
    await use(new LoginFlow(page));
  },
};
