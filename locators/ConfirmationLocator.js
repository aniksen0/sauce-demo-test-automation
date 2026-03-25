class ConfirmationLocator {
  constructor(page) {
    this.page = page;
  }

  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  get completeText() {
    return this.page.locator('.complete-text');
  }
}

module.exports = ConfirmationLocator;
