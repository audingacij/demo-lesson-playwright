import { expect, Locator, Page, test } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly privacyPolicyLink: Locator
  readonly TIMEOUT_VISIBILITY: number = 5000
  readonly cookiesPolicyPage: Locator
  readonly termsOfService: Locator

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiesPolicyPage = page.getByTestId('cookie-policy')
    this.termsOfService = page.getByTestId('terms-of-service')
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    // better test report with 'step'
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyLanguageSelector(): Promise<void> {
    await test.step('Verify language selector', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }
  async verifyPolicyLinksInFooter(): Promise<void> {
    await test.step('Verify policy links in the footer', async () => {
      await this.checkElementVisibility(this.privacyPolicyLink)
      await this.checkElementVisibility(this.termsOfService)
      await this.checkElementVisibility(this.cookiesPolicyPage)
    })
  }
}
