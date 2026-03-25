class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigteTo(path) {
    await this.page.goto(path);
  }

  async clikElement(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async typeText(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async getElementTxt(locator) {
    await locator.waitFor({ state: 'visible' });
    return await locator.innerText();
  }

  async isElementVisble(locator) {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async waitforNetworkIdl() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = BasePage;
