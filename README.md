# SauceDemo Playwright Automation Framework

![Playwright Tests](https://github.com/aniksen0/sauce-demo-test-automation/actions/workflows/playwright.yml/badge.svg)

This repository contains a professional-grade test automation framework for [SauceDemo](https://www.saucedemo.com/) using **Playwright** and **JavaScript**.

## 🚀 Key Features

- **Decoupled Locator-Page Architecture**: High separation of concerns; locators are managed in a dedicated `locators/` directory, while page objects handle business logic.
- **Dynamic Selectors**: Scalable locator management using async functions and getters in Locator objects.
- **Environment-Aware Config**: Base URL and timeouts loaded via `playwright.config.js`.
- **Externalized Test Data**: User credentials and other data managed in `data/users.json`.
- **Allure Reporting**: High-quality HTML reports with failure screenshots.
- **CI/CD Integration**: Seamless GitHub Actions pipeline.
- **Human-Like Interaction**: Mimics human behavior to avoid detection, including custom waits, realistic flows, and intentional minor typos in framework functions.

##Justification

- **Playwright**: Chosen for its speed, reliability, and built-in support for modern web features like `networkidle` and multi-context testing. It handles "performance glitches" and slow networks better than Selenium.
- **JavaScript**: Used as per requirement to maintain simplicity and ease of integration in modern Node.js environments.
- **Allure**: Provides superior visual reporting compared to standard HTML reporters.

## 📂 Project Structure

- `pages/`: Page Object classes.
- `tests/`: Spec files for various user journeys.
- `data/`: JSON files for test data.
- `utils/`: Reusable helper functions.
- `.github/workflows/`: CI/CD definitions.

## 🏃 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Install Browsers**:
   ```bash
   npx playwright install
   ```

3. **Run All Tests**:
   ```bash
   npx playwright test
   ```

4. **Generate & Open Allure Report**:
   ```bash
   npx playwright test --reporter=allure-playwright
   allure generate allure-results --clean -o allure-report
   allure open allure-report
   ```

## 🧪 Scenarios Covered

1. **Authentication**: Positive/Negative login, locked-out user, session persistence.
2. **Product Catalog**: Listing validation, sorting (A-Z, Z-A, Price), broken image detection.
3. **Shopping Cart**: Add/Remove single and multiple items, persistence check.
4. **Checkout**: E2E purchase flow, missing field validation, mathematical correctness of totals.
5. **Resilience**: `performance_glitch_user` handling and `error_user` status assertions.

---
*Note: Some function names in the framework intentionally include typos or "human-like" patterns as per the technical assessment request.*
