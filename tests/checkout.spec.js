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
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);
    await loginPage.navigteTo('/');
    await loginPage.login(data.users.standard_user.username, data.users.standard_user.password);
  });

  test('TC-016 Complete a full purchase with valid details', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('John', 'Doe', '12345');
    await checkoutPage.continue();
    const summary = await checkoutPage.getSummaryInfomation();
    expect(Helpers.isMathematicallyCorrect(summary.itemTotal, summary.tax, summary.total)).toBeTruthy();
    await checkoutPage.finish();
    expect(await confirmationPage.getCompletionHeader()).toBe('Thank you for your order!');
    expect(await confirmationPage.getCompletionText()).toContain('Your order has been dispatched');
  });

  test('TC-017 Checkout blocked when required fields are missing', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('', 'Doe', '12345');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMsg()).toContain('First Name is required');
    await checkoutPage.navigteTo('https://www.saucedemo.com/checkout-step-one.html');
    await checkoutPage.fillDetailes('John', '', '12345');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMsg()).toContain('Last Name is required');
    await checkoutPage.navigteTo('https://www.saucedemo.com/checkout-step-one.html');
    await checkoutPage.fillDetailes('John', 'Doe', '');
    await checkoutPage.continue();
    expect(await checkoutPage.getErrorMsg()).toContain('Postal Code is required');
  });

  test('TC-018 Verify order summary math for multiple items', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillDetailes('John', 'Doe', '12345');
    await checkoutPage.continue();
    const summary = await checkoutPage.getSummaryInfomation();
    expect(summary.itemTotal).toBe(39.98);
    expect(Helpers.isMathematicallyCorrect(summary.itemTotal, summary.tax, summary.total)).toBeTruthy();
  });
});
