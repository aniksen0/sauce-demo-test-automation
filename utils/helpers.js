class Helpers {
  static isMathematicallyCorrect(itemTotal, tax, total) {
    const calculatedTotal = parseFloat((itemTotal + tax).toFixed(2));
    return calculatedTotal === total;
  }

  static async checkBrokenImages(page, selector) {
    const images = await page.locator(selector).all();
    const broken = [];
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src || src.includes('sl-404')) {
        broken.push(await img.getAttribute('alt') || 'Unknown item');
      }
    }
    return broken;
  }
}

module.exports = Helpers;
