import { test, expect } from '@playwright/test'

test.describe('Chat primary flow', () => {
  test('loads chat page with empty state', async ({ page }) => {
    await page.goto('/chat')
    await expect(
      page.getByRole('heading', { name: /ask me anything/i })
    ).toBeVisible()
  })

  test('shows example prompt buttons on empty state', async ({ page }) => {
    await page.goto('/chat')
    const buttons = page.getByRole('button')
    await expect(buttons.first()).toBeVisible()
  })

  test('clicking example fills input', async ({ page }) => {
    await page.goto('/chat')
    const exampleButtons = page.locator('button').filter({
      hasText: /tell me about|what is|show me|what version/i
    })
    const firstExample = exampleButtons.first()
    const exampleText = await firstExample.textContent()
    await firstExample.click()
    const textarea = page.getByPlaceholder(/ask something/i)
    await expect(textarea).toHaveValue(exampleText ?? '')
  })

  test('send button is disabled when input is empty', async ({ page }) => {
    await page.goto('/chat')
    const sendButton = page.getByRole('button', { name: /send/i })
    await expect(sendButton).toBeDisabled()
  })

  test('send button enables when input has text', async ({ page }) => {
    await page.goto('/chat')
    const textarea = page.getByPlaceholder(/ask something/i)
    await textarea.fill('Hello')
    const sendButton = page.getByRole('button', { name: /send/i })
    await expect(sendButton).toBeEnabled()
  })

  test('clear chat button exists', async ({ page }) => {
    await page.goto('/chat')
    await expect(
      page.getByRole('button', { name: /clear chat/i })
    ).toBeVisible()
  })
})
