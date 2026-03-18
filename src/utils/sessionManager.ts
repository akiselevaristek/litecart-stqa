import type { Page } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { authConfig, getAuthStatePath } from '@config';
import { Logger } from './logger';

export async function saveStoredSession(page: Page, email: string): Promise<void> {
  await mkdir(authConfig.dir, { recursive: true });
  await page.context().storageState({ path: getAuthStatePath(email) });
  Logger.info(`Session is saved for ${email}.`);
}
