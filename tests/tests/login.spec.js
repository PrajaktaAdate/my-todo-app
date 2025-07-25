import { test, expect } from '@playwright/test';
const { login } = require('../tests/test-helper');

// UI automation for Login Page
// Covers: valid login and invalid login scenarios

test.describe('Login Page', () => {
  const validEmail = 'test@task.com';
  const validPassword = 'task@123';
  const invalidEmail = 'wrong@example.com';
  const invalidPassword = 'wrongpass';

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Login with valid credentials redirects to todos', async ({ page }) => {
    await login(page, validEmail, validPassword, true);
    await expect(page).toHaveURL('/todos');
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    await login(page, invalidEmail, invalidPassword, false);
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
