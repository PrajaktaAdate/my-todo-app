import { test, expect } from '@playwright/test';
const { login, addTodo, getTodoItem } = require('../tests/test-helper');

test.describe('Todo actions', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Create a new todo item', async ({ page }) => {
    const todoText = 'Buy milk';
    await addTodo(page, todoText);
    await expect(page.locator('ul')).toContainText(todoText);
  });

  test('Edit an existing todo item', async ({ page }) => {
    const originalTodo = 'Buy milk';
    const updatedTodo = 'Buy almond milk';
    await addTodo(page, originalTodo);
    await page.click(`button[aria-label="Edit ${originalTodo}"]`);
    await page.fill('input[aria-label="Edit todo"]', updatedTodo);
    await page.keyboard.press('Enter');
    await expect(page.locator('ul')).toContainText(updatedTodo);
    await expect(page.locator('ul')).not.toContainText(originalTodo);
  });

  test('Delete a todo item', async ({ page }) => {
    const todoText = 'Temporary Task';
    await addTodo(page, todoText);
    const item = await getTodoItem(page, todoText);
    await expect(item).toBeVisible();
    await item.locator('button.delete').click();
    await expect(page.locator('p.empty')).toBeVisible();
  });


});
