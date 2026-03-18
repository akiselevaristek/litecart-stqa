import { test as base, expect } from '@playwright/test';
import { authFixture, type AuthFixtures } from './auth.fixture';
import { pagesFixture, type PageFixtures } from './pages.fixture';

export const test = base
  .extend<AuthFixtures>(authFixture)
  .extend<PageFixtures>(pagesFixture);

export { expect };
