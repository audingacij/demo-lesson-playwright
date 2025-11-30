import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.userNameField).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeVisible()
  await expect(orderCreationPage.mainPageLink).toBeVisible()
})

test('login and create order', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(2))
  await orderCreationPage.phoneNumber.fill(faker.lorem.word(6))
  await orderCreationPage.orderButton.click()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login and logout', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('login and verify order can not be created with empty Name field', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.userNameField.fill('')
  await orderCreationPage.phoneNumber.fill(faker.lorem.word(6))
  await expect(orderCreationPage.orderButton).toBeDisabled()
  await expect(page.getByText('The field must be filled in.')).toBeVisible()
})

test('login and verify order can not be created with one symbol in the Name field', async ({
  page,
}) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.phoneNumber.fill(faker.lorem.word(6))
  await expect(orderCreationPage.orderButton).toBeDisabled()
  await expect(page.getByText('The field must contain at least of characters: 2')).toBeVisible()
})

test('login and verify order can not be created with 5 symbols in the Phone field', async ({
  page,
}) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(2))
  await orderCreationPage.phoneNumber.fill(faker.lorem.word(5))
  await expect(orderCreationPage.orderButton).toBeDisabled()
  await expect(page.getByText('The field must contain at least of characters: 6')).toBeVisible()
})
