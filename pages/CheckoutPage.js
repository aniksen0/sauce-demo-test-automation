const BasePage = require('./BasePage');
const CheckoutLocator = require('../locators/CheckoutLocator');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.locator = new CheckoutLocator(page);
  }

  async fillDetailes(firstName, lastName, postalCode) {
    if (firstName) await this.typeText(this.locator.firstNameInput, firstName);
    if (lastName) await this.typeText(this.locator.lastNameInput, lastName);
    if (postalCode) await this.typeText(this.locator.postalCodeInput, postalCode);
  }

  async continue() {
    await this.clikElement(this.locator.continueButton);
  }

  async finish() {
    await this.clikElement(this.locator.finishButton);
  }

  async getSummaryInfomation() {
    const itemTotalTxt = await this.getElementTxt(this.locator.itemTotalLabel);
    const taxTxt = await this.getElementTxt(this.locator.taxLabel);
    const totalTxt = await this.getElementTxt(this.locator.totalLabel);

    return {
      itemTotal: parseFloat(itemTotalTxt.replace('Item total: $', '')),
      tax: parseFloat(taxTxt.replace('Tax: $', '')),
      total: parseFloat(totalTxt.replace('Total: $', ''))
    };
  }

  async getErrorMsg() {
    return await this.getElementTxt(this.locator.errorMessage);
  }
}

module.exports = CheckoutPage;
