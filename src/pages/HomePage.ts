import { Page, Locator } from '@playwright/test';
import { Footer, LoginForm, SearchBox, SidebarAccountBox } from '@components';
import { URLS } from '@config';

export class HomePage {
  readonly sidebarLoginForm: LoginForm;
  readonly sidebarAccountBox: SidebarAccountBox;
  readonly footer: Footer;
  readonly sidebarSearchBox: SearchBox;
  private readonly sidebar: Locator;

  constructor(private readonly page: Page) {
    this.sidebar = this.page.locator('#navigation');
    this.sidebarLoginForm = new LoginForm(this.sidebar);
    this.sidebarAccountBox = new SidebarAccountBox(this.page);
    this.footer = new Footer(this.page);
    this.sidebarSearchBox = new SearchBox(this.sidebar);
  }

  async goto() {
    await this.page.goto(URLS.HOME);
  }

  async login(email: string, password: string) {
    await this.sidebarLoginForm.login(email, password);
  }

  async logout() {
    await this.sidebarAccountBox.logout();
  }
}
