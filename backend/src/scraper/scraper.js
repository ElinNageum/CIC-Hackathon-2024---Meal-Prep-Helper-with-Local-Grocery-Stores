const { Builder, By } = require('selenium-webdriver');
const parse5 = require('parse5');

async function scrapeAndParse(url) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        const pageSource = await driver.getPageSource();
        const document = parse5.parse(pageSource);
        console.log(document); 
    } finally {
        await driver.quit();
    }
}

module.exports = {scrapeAndParse};