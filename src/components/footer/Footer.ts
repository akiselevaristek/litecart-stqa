import { Locator, Page } from '@playwright/test';
import { byHrefPart } from '@utils';

const FOOTER_LINKS = {
  categories: ['rubber-ducks'],
  manufacturers: ['acme-corp'],
  account: [
    'customer-service',
    'regional_settings',
    'order_history',
    'edit_account',
    'logout',
    'login',
  ],
  information: [
    'about-us',
    'delivery-information',
    'privacy-policy',
    'terms-conditions',
  ],
} as const;

export type FooterSection = keyof typeof FOOTER_LINKS;
export type SectionLink<TSection extends FooterSection> =
  (typeof FOOTER_LINKS)[TSection][number];

export class Footer {
  private readonly footer: Locator;
  private readonly sectionLocators: Record<FooterSection, Locator>;

  constructor(page: Page) {
    this.footer = page.locator('#footer');
    this.sectionLocators = {
      categories: this.footer.locator('.categories'),
      manufacturers: this.footer.locator('.manufacturers'),
      account: this.footer.locator('.account'),
      information: this.footer.locator('.information'),
    };
  }

  async clickFooterLink<TSection extends FooterSection>({
    section,
    link,
  }: {
    section: TSection;
    link: SectionLink<TSection>;
  }) {
    await byHrefPart(this.sectionLocators[section], link).click();
  }
}
