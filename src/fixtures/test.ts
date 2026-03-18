import { test as base, expect } from '@playwright/test';
import { authFixture, type AuthFixtures } from './auth.fixture';
import { flowsFixture, type FlowFixtures } from './flows.fixture';
import { pagesFixture, type PageFixtures } from './pages.fixture';

export const test = base
  .extend<AuthFixtures>(authFixture)
  .extend<PageFixtures>(pagesFixture)
  .extend<FlowFixtures>(flowsFixture);

export { expect };
