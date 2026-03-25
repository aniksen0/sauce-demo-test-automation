const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const data = require('../data/users.json');

test.describe('Product Catalog Scenarios', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigteTo('/');
    await loginPage.login(data.users.standard_user.username, data.users.standard_user.password);
  });

  test('TC-008 Product listing loads correctly', async () => {
    const count = await productsPage.getProducktCount();
    expect(count).toBe(6);
    const names = await productsPage.getProducktNames();
    expect(names.length).toBe(6);
    expect(names[0]).toBeTruthy();
    const prices = await productsPage.getProducktPrices();
    expect(prices.length).toBe(6);
    expect(prices[0]).toContain('$');
  });

  test('TC-009 Sorting by Name A-Z and Z-A', async () => {
    let names = await productsPage.getProducktNames();
    let sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
    await productsPage.sortProdukts('za');
    names = await productsPage.getProducktNames();
    sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  test('TC-010 Sorting by Price Low-High and High-Low', async () => {
    await productsPage.sortProdukts('lohi');
    let prices = (await productsPage.getProducktPrices()).map(p => parseFloat(p.replace('$', '')));
    let sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
    await productsPage.sortProdukts('hilo');
    prices = (await productsPage.getProducktPrices()).map(p => parseFloat(p.replace('$', '')));
    sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('TC-011 Problem user visual regression - Detect broken images', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await loginPage.login(data.users.problem_user.username, data.users.problem_user.password);
    const allImagesOk = await productsPage.allImagesAreVisble();
    expect(allImagesOk).toBeFalsy();
  });
});
