import { type Locator, type Page } from '@playwright/test';
import { LoginForm } from '@components/auth';
import { SidebarAccount } from './SidebarAccount';
import { SidebarRecentlyViewed } from './SidebarRecentlyViewed';
import { SidebarSearch } from './SidebarSearch';

export class Sidebar {
  readonly root: Locator;
  readonly loginForm: LoginForm;
  readonly account: SidebarAccount;
  readonly recentlyViewed: SidebarRecentlyViewed;
  readonly search: SidebarSearch;

  constructor(page: Page) {
    this.root = page.locator('#navigation');
    this.loginForm = new LoginForm(this.root);
    this.account = new SidebarAccount(this.root);
    this.recentlyViewed = new SidebarRecentlyViewed(this.root);
    this.search = new SidebarSearch(this.root);
  }
}
