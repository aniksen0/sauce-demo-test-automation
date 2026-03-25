const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const data = require('../data/users.json');

test.describe('Authentication Scenarios', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigteTo('/');
  });

  test('TC-001 Successful login with valid credentials', async ({ page }) => {
    const user = data.users.standard_user;
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL(/inventory.html/);
    const count = await productsPage.getProducktCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-002 Login failure with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    const error = await loginPage.getErrormessage();
    expect(error).toContain('Username and password do not match any user in this service');
  });

  test('TC-003 Login failure with empty fields', async () => {
    await loginPage.login('', '');
    const error = await loginPage.getErrormessage();
    expect(error).toContain('Username is required');
  });

  test('TC-004 Login failure with SQL injection attempt', async () => {
    await loginPage.login("' OR '1'='1", "' OR '1'='1");
    const error = await loginPage.getErrormessage();
    expect(error).toContain('Username and password do not match any user in this service');
  });

  test('TC-005 Locked-out user behaviour', async () => {
    const user = data.users.locked_out_user;
    await loginPage.login(user.username, user.password);
    const error = await loginPage.getErrormessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('TC-006 Logout behaviour', async ({ page }) => {
    const user = data.users.standard_user;
    await loginPage.login(user.username, user.password);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    const isLoggedOut = await loginPage.isLogedout();
    expect(isLoggedOut).toBeTruthy();
  });

  test('TC-007 Session persistence check', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const lp1 = new LoginPage(page1);
    const user = data.users.standard_user;
    await lp1.navigteTo('/');
    await lp1.login(user.username, user.password);
    await expect(page1).toHaveURL(/inventory.html/);
    const page2 = await context.newPage();
    await page2.goto('https://www.saucedemo.com/inventory.html');
    await expect(page2).toHaveURL(/inventory.html/);
    await context.close();
  });
});
