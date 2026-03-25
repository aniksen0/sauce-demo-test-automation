class LoginLocator {
  constructor(page) {
    this.page = page;
  }

  get usernameInput() {
    return this.page.locator('[id="user-name"]');
  }

  get passwordInput() {
    return this.page.locator('[id="password"]');
  }

  get loginButton() {
    return this.page.locator('[id="login-button"]');
  }

  get errorMessage() {
    return this.page.locator("xpath=//*[@data-test='error']");
  }
}

module.exports = LoginLocator;
