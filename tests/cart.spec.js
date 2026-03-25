const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const data = require('../data/users.json');

test.describe('Shopping Cart Scenarios', () => {
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigteTo('/');
    await loginPage.login(data.users.standard_user.username, data.users.standard_user.password);
  });

  test('TC-012 Add a single item and verify cart badge updates', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe('1');
  });

  test('TC-013 Add multiple items and verify all appear in cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    expect(await productsPage.getCartBadgeCount()).toBe('3');
    await productsPage.goToCart();
    const items = await cartPage.getCartItemNames();
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
    expect(items).toContain('Sauce Labs Bolt T-Shirt');
  });

  test('TC-014 Remove an item from the cart and verify cart state', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.removeProductFromCart('Sauce Labs Backpack');
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
  });

  test('TC-015 Cart persists across page navigation', async ({ page }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    expect(await productsPage.getCartBadgeCount()).toBe('1');
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
    expect(await productsPage.getCartBadgeCount()).toBe('1');
    await page.goto('https://www.google.com'); 
    await page.goto('https://www.saucedemo.com/cart.html');
    const items = await cartPage.getCartItemNames();
    expect(items).toContain('Sauce Labs Backpack');
  });
});
