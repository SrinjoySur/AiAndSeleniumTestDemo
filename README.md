# AiAndSeleniumTestDemo

A starter project combining Selenium UI automation with a simple AI helper.

Project structure:
- pom.xml: Maven config and dependencies (Selenium, WebDriverManager, JUnit)
- src/main/java/...: Application code (e.g., AIHelper)
- src/test/java/...: JUnit tests (e.g., SimpleSeleniumTest, AIHelperTest)
- .github/workflows/ci.yml: GitHub Actions CI for build and tests

How to run tests:
- Ensure Chrome is installed
- Run `mvn test`

Branches:
- master: stable base
- dev: integration branch
- feature/project-setup: project initialization
- feature/ai-helper: AI helper utility and tests
