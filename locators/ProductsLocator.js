class ProductsLocator {
  constructor(page) {
    this.page = page;
  }

  get inventoryItems() {
    return this.page.locator('.inventory_item');
  }

  get itemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get itemPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get sortContainer() {
    return this.page.locator('.product_sort_container');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  get itemImages() {
    return this.page.locator('.inventory_item_img');
  }

  async addToCartButton(productName) {
    return this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`);
  }
}

module.exports = ProductsLocator;
