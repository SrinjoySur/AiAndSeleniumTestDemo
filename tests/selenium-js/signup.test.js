const {Builder, By, Key, until, Select} = require('selenium-webdriver');
const assert = require('assert');

// Helper: generate random user data
function randomString(prefix = 'User') {
  return `${prefix}_${Math.random().toString(36).substring(2, 8)}`;
}
function randomEmail() {
  return `test_${Math.random().toString(36).substring(2, 10)}@example.com`;
}

async function buildDriver() {
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  // run headless in CI; change to non-headless by commenting following line
  options.addArguments('--headless=new');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1920,1080');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  return await new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

// Main SignUp scenario test replicating SignUp.feature
describe('AutomationExercise SignUp.feature - JavaScript Selenium', function() {
  this.timeout(150000);
  let driver;

  before(async () => {
    driver = await buildDriver();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should create account successfully', async () => {
    const name = randomString('QAUser');
    const email = randomEmail();

    // 1) Navigate to signup/login page
    await driver.get('https://automationexercise.com');
    await driver.wait(until.titleContains('Automation'), 20000);

    // Click Signup / Login from navbar
    await driver.findElement(By.css('a[href="/login"]')).click();
    await driver.wait(until.elementLocated(By.css('input[data-qa="signup-name"]')), 20000);

    // 2) Enter name and email
    await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys(name);
    await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(email);

    // 3) Submit signup
    await driver.findElement(By.css('button[data-qa="signup-button"]')).click();
    await driver.wait(until.elementLocated(By.css('input#id_gender1, input#id_gender2')), 20000);

    // 4) Select gender title (Mr or Mrs)
    const genderMr = await driver.findElements(By.css('input#id_gender1'));
    if (genderMr.length) {
      await genderMr[0].click();
    } else {
      const genderMrs = await driver.findElement(By.css('input#id_gender2'));
      await genderMrs.click();
    }

    // Verify name prefilled
    const nameFieldVal = await driver.findElement(By.css('input#name')).getAttribute('value');
    assert.ok(nameFieldVal.includes(name));

    // 5) Enter password
    await driver.findElement(By.css('input#password')).sendKeys('SecurePass!123');

    // 6) Enter DOB
    const daysSelect = await driver.findElement(By.css('select#days'));
    const monthsSelect = await driver.findElement(By.css('select#months'));
    const yearsSelect = await driver.findElement(By.css('select#years'));

    await daysSelect.sendKeys('10');
    await monthsSelect.sendKeys('May');
    await yearsSelect.sendKeys('1995');

    // Optional: newsletters and special offers
    const newsletterChk = await driver.findElement(By.css('input#newsletter'));
    const optinChk = await driver.findElement(By.css('input#optin'));
    if (await newsletterChk.isDisplayed()) await newsletterChk.click();
    if (await optinChk.isDisplayed()) await optinChk.click();

    // 7) Fill remaining address details
    await driver.findElement(By.css('input#first_name')).sendKeys('John');
    await driver.findElement(By.css('input#last_name')).sendKeys('Doe');
    await driver.findElement(By.css('input#company')).sendKeys('Example Corp');
    await driver.findElement(By.css('input#address1')).sendKeys('123 Test Street');
    await driver.findElement(By.css('input#address2')).sendKeys('Suite 456');

    // Country select
    const countrySelect = await driver.findElement(By.css('select#country'));
    await countrySelect.sendKeys('United States');

    await driver.findElement(By.css('input#state')).sendKeys('California');
    await driver.findElement(By.css('input#city')).sendKeys('San Francisco');
    await driver.findElement(By.css('input#zipcode')).sendKeys('94105');
    await driver.findElement(By.css('input#mobile_number')).sendKeys('+14155552671');

    // Create account button
    await driver.findElement(By.css('button[data-qa="create-account"]')).click();

    // 8) Validate account created confirmation
    const successHeader = await driver.wait(
      until.elementLocated(By.css('h2[data-qa="account-created"]')),
      20000
    );
    const text = await successHeader.getText();
    assert.strictEqual(text.trim(), 'ACCOUNT CREATED!');

    // Continue button
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click();

    // Validate logged in as username in navbar
    await driver.wait(until.elementLocated(By.xpath("//a[contains(., 'Logged in as')]")), 20000);
    const loggedInText = await driver.findElement(By.xpath("//a[contains(., 'Logged in as')]")) .getText();
    assert.ok(loggedInText.includes(name));
  });
});
