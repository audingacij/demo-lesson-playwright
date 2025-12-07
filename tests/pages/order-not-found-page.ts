import { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderNotFoundPage extends BasePage {
  readonly orderNotFoundTitle: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFoundTitle = page.getByTestId('orderNotFound-container')
  }
}
