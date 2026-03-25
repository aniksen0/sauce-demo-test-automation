const BasePage = require('./BasePage');
const ConfirmationLocator = require('../locators/ConfirmationLocator');

class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    this.locator = new ConfirmationLocator(page);
  }

  async getCompletionHeader() {
    return await this.getElementTxt(this.locator.completeHeader);
  }

  async getCompletionText() {
    return await this.getElementTxt(this.locator.completeText);
  }
}

module.exports = ConfirmationPage;
