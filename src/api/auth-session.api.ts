import { request } from '@playwright/test';
import { readFile } from 'fs/promises';
import { appConfig, URLS } from '@config';

function isSessionHtmlValid(html: string): boolean {
  const hasAccountBox = html.includes('id="box-account"');
  const hasLogout = html.includes('/logout');

  return hasAccountBox && hasLogout;
}

export async function isStoredSessionValid(storageStatePath: string): Promise<boolean> {
  try {
    const rawState = await readFile(storageStatePath, 'utf8');
    const storageState = JSON.parse(rawState) as {
      cookies?: Array<{
        name: string;
        value: string;
        domain: string;
      }>;
    };
    const cookies = storageState.cookies?.filter((cookie) => cookie.domain.includes('litecart.stqa.ru'));

    if (!cookies?.length) {
      return false;
    }

    const apiContext = await request.newContext({
      baseURL: appConfig.baseUrl,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Cookie: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
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
