require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
message = "Hello! it is Test Message";

describe("UI Test with Selenium", () => {
  test("Login into Green API and send a message using sendMessage function", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://console.green-api.com/auth");

    await driver.wait(until.elementLocated(By.id("login")));

    await driver.findElement(By.id("login")).sendKeys(process.env.email);
    await driver.findElement(By.id("password")).sendKeys(process.env.password);

    await driver
      .findElement(
        By.xpath('//*[@id="root"]/main/div/div[2]/div/form/div[4]/button')
      )
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[@id="root"]/div/div/main/div[2]/div[1]/div[2]')
      ),
      2000
    );

    await driver
      .findElement(
        By.xpath('//*[@id="root"]/div/div/main/div[2]/div[1]/div[2]')
      )
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="root"]/div/div/main/div/div[5]/div[1]/div/div[2]/div/button[1]'
        )
      ),
      2000
    );
    await driver
      .findElement(
        By.xpath(
          '//*[@id="root"]/div/div/main/div/div[5]/div[1]/div/div[2]/div/button[1]'
        )
      )
      .click();

    await driver
      .findElement(By.xpath('//*[@id="chatId_0"]'))
      .sendKeys(process.env.receiver);

    await driver.findElement(By.xpath('//*[@id="message"]')).sendKeys(message);
    await driver.findElement(By.xpath('//*[@id="linkPreview"]')).click();

    await driver
      .findElement(
        By.xpath(
          '//*[@id="root"]/div/div/main/div/div[1]/div[1]/div[4]/form/div[5]/div/div/div/div/button'
        )
      )
      .click();

    await driver.sleep(1000);

    const response = await driver.wait(
      until.elementLocated(
        By.xpath('//*[@id="root"]/div/div/main/div/div[1]/div[2]/h2/span')
      )
    );

    await driver.wait(until.elementIsVisible(response));

    const httpAnswer = await response.getText().then((value) => {
      return value;
    });

    console.log(httpAnswer);

    expect(httpAnswer.trim()).toBe("HTTP Code 200");

    await driver.quit();
  }, 30000);
});
