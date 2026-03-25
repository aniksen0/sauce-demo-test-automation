class CartLocator {
  constructor(page) {
    this.page = page;
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get itemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get checkoutButton() {
    return this.page.locator('[id="checkout"]');
  }

  async removeButton(productName) {
    return this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`);
  }
}

module.exports = CartLocator;
