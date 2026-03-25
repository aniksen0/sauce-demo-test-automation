const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const data = require('../data/users.json');

test.describe('Performance & Resilience Scenarios', () => {
  let loginPage, productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigteTo('/');
  });

  test('TC-019 Performance glitch user - Login with smart wait', async ({ page }) => {
    const user = data.users.performance_glitch_user;
    const startTime = Date.now();
    await loginPage.login(user.username, user.password);
    await productsPage.waitforNetworkIdl();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`Login took ${duration} seconds`);
    await expect(page).toHaveURL(/inventory.html/);
    expect(await productsPage.getProducktCount()).toBe(6);
  });

  test('TC-020 Error user - Verify failing actions', async ({ page }) => {
    const user = data.users.error_user;
    await loginPage.login(user.username, user.password);
    await productsPage.sortProdukts('lohi');
    const prices = await productsPage.getProducktPrices();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const badge = await productsPage.getCartBadgeCount();
    console.log(`Cart badge after adding: ${badge}`);
  });
});
