// tests/tests/test-helpers.js

// Login helper
async function login(page, email = 'test@task.com', password = 'task@123', expectSuccess = true) {
    await page.goto('/login');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    if (expectSuccess) {
      await page.waitForURL('/todos');
    }
}
  
  // Add todo helper
  async function addTodo(page, todoText) {
    await page.fill('input[placeholder="Enter a task..."]', todoText);
    await page.keyboard.press('Enter');
    await page.locator('ul').waitFor({ state: 'visible' });
  }
  
  // Get todo item helper
  async function getTodoItem(page, todoText) {
    return page.locator(`li:has-text("${todoText}")`);
  }
  
  module.exports = { login, addTodo, getTodoItem };