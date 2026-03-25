const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const Helpers = require('../utils/helpers');
const data = require('../data/users.json');

test.describe('Checkout Flow Scenarios', () => {
  let loginPage, productsPage, cartPage, checkoutPage, confirmationPage;

  test.beforeEach(async ({ page }) => {
    console.log("checkout setup started");
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);
    await loginPage.navigteTo('/');
    await loginPage.login(data.users.standard_user.username, data.users.standard_user.password);
  });

  test('TC-016 Complete a full purchase with valid details', async () => {
    console.log("starting full purchase");
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('John', 'Doe', '12345');
    await checkoutPage.continue();
    const summary = await checkoutPage.getSummaryInfomation();
    expect(Helpers.isMathematicallyCorrect(summary.itemTotal, summary.tax, summary.total)).toBeTruthy();
    await checkoutPage.finish();
    expect(await confirmationPage.getCompletionHeader()).toBe('Thank you for your order!');
    console.log("checkout finished");
  });

  test('TC-017 Checkout blocked when required fields are missing', async () => {
    console.log("testing missing fields");
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('', 'Doe', '12345');
    await checkoutPage.continue();
    console.log("checking first name validation");
    expect(await checkoutPage.getErrorMsg()).toContain('First Name is required');
    await checkoutPage.navigteTo('https://www.saucedemo.com/checkout-step-one.html');
    await checkoutPage.fillDetailes('John', '', '12345');
    await checkoutPage.continue();
    console.log("checking last name validation");
    expect(await checkoutPage.getErrorMsg()).toContain('Last Name is required');
    await checkoutPage.navigteTo('https://www.saucedemo.com/checkout-step-one.html');
    await checkoutPage.fillDetailes('John', 'Doe', '');
    await checkoutPage.continue();
    console.log("checking zip validation");
    expect(await checkoutPage.getErrorMsg()).toContain('Postal Code is required');
  });

  test('TC-018 Verify order summary math for multiple items', async () => {
    console.log("verifying summary math");
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('John', 'Doe', '12345');
    await checkoutPage.continue();
    const summary = await checkoutPage.getSummaryInfomation();
    expect(summary.itemTotal).toBe(39.98);
    expect(Helpers.isMathematicallyCorrect(summary.itemTotal, summary.tax, summary.total)).toBeTruthy();
    console.log("math verified");
  });
});
