import type { Page } from '@playwright/test';
import { mkdir, readFile } from 'fs/promises';
import { isStoredSessionValid } from '@api';
import { authConfig, getAuthStatePath } from '@config';
import { Logger } from './logger';

type StoredSession = {
  cookies: Array<{
    name: string;
    value: string;
    domain: string;
  }>;
};

async function readStoredSession(username: string): Promise<StoredSession> {
  const rawState = await readFile(getAuthStatePath(username), 'utf8');
  return JSON.parse(rawState) as StoredSession;
}

export async function isSessionValidByUsername(username: string): Promise<boolean> {
  return isStoredSessionValid(getAuthStatePath(username));
}

export async function applyStoredSession(page: Page, username: string): Promise<void> {
  const storageState = await readStoredSession(username);

  if (storageState.cookies.length > 0) {
    await page.context().addCookies(storageState.cookies);
    Logger.info(`Valid session is applied for ${username}.`);
  }
}

export async function saveStoredSession(page: Page, username: string): Promise<void> {
  await mkdir(authConfig.dir, { recursive: true });
  await page.context().storageState({ path: getAuthStatePath(username) });
  Logger.info(`Session is saved for ${username}.`);
}
