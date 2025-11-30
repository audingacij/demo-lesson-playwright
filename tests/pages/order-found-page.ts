import { BasePage } from './base-page'
import type { Locator, Page } from '@playwright/test'

export class OrderFound extends BasePage {
  readonly statusListItem: Locator

  constructor(page: Page) {
    super(page)
    this.statusListItem = page.getByTestId('status-item-0')
  }
}
