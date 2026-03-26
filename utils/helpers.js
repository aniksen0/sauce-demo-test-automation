class Helpers {
  static isMathematicallyCorrect(itemTotal, tax, total) {
    const calculatedTotal = parseFloat((itemTotal + tax).toFixed(2));
    return calculatedTotal === total;
  }

  static async checkBrokenImages(page, selector) {
    const allImages = await page.locator(selector).all();

    const brokenImageNames = [];

    for (let i = 0; i < allImages.length; i++) {
      const currentImage = allImages[i];

      const imageSource = await currentImage.getAttribute('src');

      const hasNoSource = !imageSource;
      const isNotFoundImage = imageSource && imageSource.includes('sl-404');

      if (hasNoSource || isNotFoundImage) {
        const imageName = await currentImage.getAttribute('alt');

        if (imageName) {
          brokenImageNames.push(imageName);
        } else {
          brokenImageNames.push('Unknown item');
        }
      }
    }

    return brokenImageNames;
  }
}

module.exports = Helpers;
