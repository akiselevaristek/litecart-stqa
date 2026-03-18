import { Page } from '@playwright/test';
import { AccountNavigation, LoginForm, SearchBox } from '@components';
import { URLS } from '@config';

export class HomePage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountNav: AccountNavigation;
  readonly footerAccountNav: AccountNavigation;
  readonly sidebarSearchBox: SearchBox;

  constructor(private readonly page: Page) {
    this.sidebarLoginForm = new LoginForm(this.page.locator('#box-account-login'));
    this.sidebarAccountNav = new AccountNavigation(this.page.locator('#box-account'));
    this.footerAccountNav = new AccountNavigation(this.page.locator('#footer td.account'));
    this.sidebarSearchBox = new SearchBox(this.page.locator('form[name="search_form"]'));
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }

  async login(email: string, password: string) {
    await this.sidebarLoginForm.login(email, password);
  }

  async logout() {
    await this.sidebarAccountNav.logout();
  }
}
