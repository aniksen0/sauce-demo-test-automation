const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const data = require('../data/users.json');

test.describe('Product Catalog Scenarios', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    console.log("catalog setup started");
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigteTo('/');
    await loginPage.login(data.users.standard_user.username, data.users.standard_user.password);
  });

  test('TC-008 Product listing loads correctly', async () => {
    console.log("checking product list");
    const count = await productsPage.getProducktCount();
    expect(count).toBe(6);
    const names = await productsPage.getProducktNames();
    expect(names.length).toBe(6);
    expect(names[0]).toBeTruthy();
    const prices = await productsPage.getProducktPrices();
    expect(prices.length).toBe(6);
    expect(prices[0]).toContain('$');
    console.log("inventory verified");
  });

  test('TC-009 Sorting by Name A-Z and Z-A', async () => {
    console.log("testing name sorting");
    let names = await productsPage.getProducktNames();
    let sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
    await productsPage.sortProdukts('za');
    names = await productsPage.getProducktNames();
    sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
    console.log("sorting verified");
  });

  test('TC-010 Sorting by Price Low-High and High-Low', async () => {
    console.log("testing price sorting");
    await productsPage.sortProdukts('lohi');
    const prices = await productsPage.getProducktPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      const current = parseFloat(prices[i].replace('$', ''));
      const next = parseFloat(prices[i+1].replace('$', ''));
      expect(current).toBeLessThanOrEqual(next);
    }
    
    await productsPage.sortProdukts('hilo');
    const pricesHighLow = await productsPage.getProducktPrices();
    for (let i = 0; i < pricesHighLow.length - 1; i++) {
      const current = parseFloat(pricesHighLow[i].replace('$', ''));
      const next = parseFloat(pricesHighLow[i+1].replace('$', ''));
      expect(current).toBeGreaterThanOrEqual(next);
    }
    console.log("price sorting verified");
  });

  test('TC-011 Problem user visual regression - Detect broken images', async ({ page }) => {
    console.log("visual test started");
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await loginPage.login(data.users.problem_user.username, data.users.problem_user.password);
    const allImagesOk = await productsPage.allImagesAreVisble();
    expect(allImagesOk).toBeFalsy();
    console.log("visual glitches detected");
  });
});
