import { Locator, Page } from '@playwright/test';

export class Navigation {
  readonly root: Locator;
  readonly searchForm: Locator;
  readonly searchInput: Locator;
  readonly categoryTree: Locator;
  readonly loginBox: Locator;
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.root = page.locator('#navigation');
    this.searchForm = this.root.locator('form[name="search_form"]');
    this.searchInput = this.root.locator('input[name="query"]');
    this.categoryTree = this.root.locator('#box-category-tree');
    this.loginBox = this.root.locator('#box-account-login');
    this.loginForm = this.root.locator('form[name="login_form"]');
    this.emailInput = this.root.locator('input[name="email"]');
    this.passwordInput = this.root.locator('input[name="password"]');
    this.rememberMeCheckbox = this.root.locator('input[name="remember_me"]');
    this.loginButton = this.root.locator('button[name="login"]');
  }
}
