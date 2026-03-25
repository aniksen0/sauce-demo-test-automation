const BasePage = require('./BasePage');
const CartLocator = require('../locators/CartLocator');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.locator = new CartLocator(page);
  }

  async getCartItemsCount() {
    return await this.locator.cartItems.count();
  }

  async getCartItemNames() {
    return await this.locator.itemNames.allInnerTexts();
  }

  async removeProductFromCart(productName) {
    const btn = await this.locator.removeButton(productName);
    await this.clikElement(btn);
  }

  async clickCheckout() {
    await this.clikElement(this.locator.checkoutButton);
  }
}

module.exports = CartPage;
