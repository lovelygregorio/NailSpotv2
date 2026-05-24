// This is an example test using Playwright to verify that a user can log in successfully.
// The test navigates to the login page, fills in the email and password fields, submits the form, and checks that the user is redirected to the dashboard.
const { test, expect } = require('@playwright/test');

test('user can login', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.click('text=Login');

  await page.fill('input[name="email"]', 'publicuser1@gmail.com');

  await page.fill('input[name="password"]', '123456');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/public-salons/);

});