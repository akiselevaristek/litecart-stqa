import { request } from '@playwright/test';
import { readFile } from 'fs/promises';
import { appConfig } from '@config';
import { URLS } from '@config';

type StorageCookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
};

type StorageState = {
  cookies?: StorageCookie[];
};

function buildCookieHeader(cookies: StorageCookie[]): string {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}

function isSessionHtmlValid(html: string): boolean {
  const hasAccountBox = html.includes('id="box-account"');
  const hasLogout = html.includes('/logout');

  return hasAccountBox && hasLogout;
}

export async function isStoredSessionValid(storageStatePath: string): Promise<boolean> {
  try {
    const rawState = await readFile(storageStatePath, 'utf8');
    const storageState = JSON.parse(rawState) as StorageState;
    const cookies = storageState.cookies?.filter((cookie) =>
      cookie.domain.includes('litecart.stqa.ru')
    );

    if (!cookies?.length) {
      return false;
    }

    const cookieHeader = buildCookieHeader(cookies);
    const apiContext = await request.newContext({
      baseURL: appConfig.baseUrl,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Cookie: cookieHeader,
      },
    });

    try {
      const response = await apiContext.get(URLS.HOME);
      if (!response.ok()) {
        return false;
      }

      const html = await response.text();
      return isSessionHtmlValid(html);
    } finally {
      await apiContext.dispose();
    }
  } catch {
    return false;
  }
}
