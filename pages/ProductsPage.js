const BasePage = require('./BasePage');
const ProductsLocator = require('../locators/ProductsLocator');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locator = new ProductsLocator(page);
  }

  async getProducktCount() {
    return await this.locator.inventoryItems.count();
  }

  async getProducktNames() {
    return await this.locator.itemNames.allInnerTexts();
  }

  async getProducktPrices() {
    return await this.locator.itemPrices.allInnerTexts();
  }

  async sortProdukts(option) {
    await this.locator.sortContainer.selectOption(option);
  }

  async addProductToCart(productName) {
    const btn = await this.locator.addToCartButton(productName);
    await this.clikElement(btn);
  }

  async getCartBadgeCount() {
    if (await this.isElementVisble(this.locator.cartBadge)) {
      return await this.getElementTxt(this.locator.cartBadge);
    }
    else {
      return 0;
    }
  }

  async goToCart() {
    await this.clikElement(this.locator.cartLink);
  }

  async allImagesAreVisble() {
    const images = await this.locator.itemImages.all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src || src.includes('sl-404')) {
        return false;
      }
    }
    return true;
  }
}

module.exports = ProductsPage;
