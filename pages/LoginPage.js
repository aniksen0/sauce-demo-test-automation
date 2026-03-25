const BasePage = require('./BasePage');
const LoginLocator = require('../locators/LoginLocator');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locator = new LoginLocator(page);
  }

  async login(username, password) {
    await this.typeText(this.locator.usernameInput, username);
    await this.typeText(this.locator.passwordInput, password);
    await this.clikElement(this.locator.loginButton);
  }

  async getErrormessage() {
    return await this.getElementTxt(this.locator.errorMessage);
  }

  async isLogedout() {
    return await this.isElementVisble(this.locator.usernameInput);
  }
}

module.exports = LoginPage;
