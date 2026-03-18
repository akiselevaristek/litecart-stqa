import { expect, Locator, type Page } from '@playwright/test';
import { AccountBox, LoginBox } from '@components';
import { appConfig } from '@config';
import { HomePage } from '@pages';

export class LoginFlow {
  private readonly homePage: HomePage;
  private readonly loginBox: LoginBox;
  private readonly accountBox: AccountBox;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.homePage = new HomePage(page);
    this.loginBox = new LoginBox(page);
    this.accountBox = new AccountBox(page);
    this.successMessage = this.page.getByText('You are now logged in as');
  }

  async loginAsDefaultUser(): Promise<void> {
    await this.login(appConfig.credentials.email, appConfig.credentials.password);
  }

  private async login(email: string, password: string): Promise<void> {
    await this.homePage.goto();
    await this.loginBox.login(email, password);

    const successNotice = this.page.locator('#notices .notice.success');

    await expect(successNotice).toBeVisible();
    await expect(this.accountBox.root).toBeVisible();
    await expect(this.accountBox.logoutLink).toBeVisible();
  }
}
