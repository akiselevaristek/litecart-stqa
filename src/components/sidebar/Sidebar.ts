import { type Locator, type Page } from '@playwright/test';
import { SidebarAccountBox } from '@components/account';
import { LoginForm } from '@components/auth';
import { RecentlyViewedSection } from '@components/product';
import { SearchBox } from '@components/search';

export class Sidebar {
  readonly root: Locator;
  readonly loginForm: LoginForm;
  readonly accountBox: SidebarAccountBox;
  readonly recentlyViewed: RecentlyViewedSection;
  readonly searchBox: SearchBox;

  constructor(page: Page) {
    this.root = page.locator('#navigation');
    this.loginForm = new LoginForm(this.root);
    this.accountBox = new SidebarAccountBox(this.root);
    this.recentlyViewed = new RecentlyViewedSection(this.root);
    this.searchBox = new SearchBox(this.root);
  }
}
