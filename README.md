# AI Selenium Test Demo

This repository contains automated Selenium tests. The `feature/selenium-js-signup` branch adds a JavaScript Selenium test that replicates the SignUp.feature scenario on automationexercise.com.

## How to run locally

1. Ensure you have Node.js v18+ installed.
2. Install dependencies:
   npm install
3. Run the test:
   npm test

The test runs headless Chrome by default. To see the browser UI, edit `tests/selenium-js/signup.test.js` and comment out the `--headless=new` line.

## Test Outline
- Navigate to signup/login page
- Enter name and email
- Submit signup
- Select gender title (Mr or Mrs)
- Enter password
- Enter DOB
- Fill remaining address details (firstname, lastname, company, address, country, state, city, zip, mobileNumber)
- Validate account created confirmation
