class CheckoutLocator {
  constructor(page) {
    this.page = page;
  }

  get firstNameInput() {
    return this.page.locator('[id="first-name"]');
  }

  get lastNameInput() {
    return this.page.locator('[id="last-name"]');
  }

  get postalCodeInput() {
    return this.page.locator('[id="postal-code"]');
  }

  get continueButton() {
    return this.page.locator('[id="continue"]');
  }

  get finishButton() {
    return this.page.locator('[id="finish"]');
  }

  get itemTotalLabel() {
    return this.page.locator('.summary_subtotal_label');
  }

  get taxLabel() {
    return this.page.locator('.summary_tax_label');
  }

  get totalLabel() {
    return this.page.locator('.summary_total_label');
  }

  get errorMessage() {
    return this.page.locator("xpath=//*[@data-test='error']");
  }
}

module.exports = CheckoutLocator;
