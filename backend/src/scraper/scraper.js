const { Builder, By, until } = require("selenium-webdriver");
const parse5 = require("parse5");
const { addConsoleHandler } = require("selenium-webdriver/lib/logging");

async function getAllURLS(url) {
  const json = {data: []};
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(url);
    await driver.wait(until.elementsLocated(By.css('a[is="flipp-link"]')), 10000);
    const flippLinks = await driver.findElements(By.css('a[is="flipp-link"]'));

    if (flippLinks.length > 0) {
      for (let link of flippLinks) {
        const linkHref = await link.getAttribute('href');
        const newLink = "https://flipp.com/"+ linkHref;
        console.log(newLink);
        if(newLink.includes("item")){
        const ans = await scrapeAndParse(newLink);
        json.data.push(ans);
        await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log(json);
      }
    } else {
      console.log("No flipp links found.");
    }
  } catch (error) {
    console.error("All Error:", error);
  } finally {
    await driver.quit();
  }


  console.log(json);
  return json;
}

async function scrapeAndParse(url) {
  console.log(url);
  const json = {};
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    try {
      await driver.get(url);
      const priceElement = await driver.wait(
        until.elementLocated(By.css(".item-price-info")),
        1000
      );
      const priceText = await priceElement.getText();

      json["Price"] = priceText;
      console.log("Price Info:", priceText);
    } catch (e) {
      console.log(e);
    }

    try {
      const titleElement = await driver.wait(
        until.elementLocated(By.css('span[content-slot="title"]')),
        1000
      );
      const titleText = await titleElement.getText();
      json["Title"] = titleText;
      console.log("Title Text:", titleText);
    } catch (e) {
      console.log(e);
    }

    return json;
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await driver.quit();
  }
}

module.exports = { scrapeAndParse, getAllURLS };
