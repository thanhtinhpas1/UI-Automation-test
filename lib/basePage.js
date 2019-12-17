const { Builder, By, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
// o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
// o.addArguments('--lang=es');
o.setUserPreferences({ credential_enable_service: false });

var Page = function () {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function (theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function () {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function (id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function (name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    // find by class
    this.findByClass = async function (name) {
        await this.driver.wait(until.elementLocated(By.className(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.className(name));
    }

    this.findByPlaceHolder = async function (name) {
        await this.driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Username']")), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath("//input[@placeholder='Username']"));
    };

    // wait and find a specific element with it's class name
    this.findSubmitInput = async function () {
        await this.driver.wait(until.elementLocated(By.xpath("//input[@type=submit]")), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath("//input[@type=submit]"));
    }

    this.findInputBySubmit = async function () {
        await this.driver.wait(until.elementLocated(By.xpath(`//input[@type='submit']`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`//input[@type='submit']`));
    }

    // wait and find a input element with it's vaue
    this.findInputByValue = async function (value) {
        await this.driver.wait(until.elementLocated(By.xpath(`//input[@value='${value}']`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`//input[@value='${value}']`));
    }

    this.findByText = async function (value) {
        await this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${value}')]`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`//*[contains(text(), '${value}')]`));
    }

    this.findHrefByValue = async function (value) {
        await this.driver.wait(until.elementLocated(By.partialLinkText("Classes")), 15000, 'Looking for element');
        return await this.driver.findElement(By.partialLinkText("Classes"));
    }

    this.findOptionByValue = async function (value) {
        await this.driver.wait(until.elementLocated(By.xpath(`//option[@value='${value}']`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`//option[@value='${value}']`));
    }

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    // find button unique in page
    this.findButtonUnique = async function () {
        await this.driver.wait(until.elementLocated(By.tagName("button")), 15000, 'Looking for element');
        return await this.driver.findElement(By.tagName("button"));
    }

    // find by ng-reflect-router-link
    this.findByNgReflect = async function (value) {
        await this.driver.wait(until.elementLocated(By.xpath(`//a[@ng-reflect-router-link='${value}']`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`//a[@ng-reflect-router-link='${value}']`));
    }

    // find tag a inside tag li
    this.findHrefInsideLi = async function (value) {
        await this.driver.wait(until.elementLocated(By.xpath(`..//a[@href='${value}']`)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(`..//a[@href='${value}']`));
    }

    // find dropdown toggle
    this.findDropdownToggle = async function() {
        
    }
};

module.exports = Page;