import { Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  // readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  // add more locators here

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.signInButton = page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    // continue with the rest of the implementation below
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    await this.fillElement(this.usernameField, username)
    await this.fillElement(this.passwordField, password)
    await this.clickElement(this.signInButton)
    return new OrderPage(this.page)
  }
  // continue with the rest of the implementation below
}
