let Page = require('./basePage');
const locate = require('../utils/locator');
const utils = require('../utils/readData');
const { until, By } = require('selenium-webdriver');

const usernameFieldName = locate.usernameFieldName;
const passwordFieldName = locate.passwordFieldName;

let usernameField, passwordField, loginButton;

const username = "ntmphuc", password = 'ntmphuc';

Page.prototype.findUsernamePasswordFields = async function () {
    usernameField = await this.findByName(usernameFieldName);
    passwordField = await this.findByName(passwordFieldName);

    loginButton = await this.findByText("Log in");
}

Page.prototype.login = async function () {
    await this.findUsernamePasswordFields();
    await this.write(usernameField, username);
    await this.write(passwordField, password);

    await loginButton.click();
}

// CREATE CLASS
Page.prototype.createClasses = async function () {

    this.driver.wait(until.elementLocated(By.name("username")));
    console.log("STEP 1: LOGIN");
    this.login();


    // utils.readFileChrome().then(async users => {

    // }).catch(function (err) {
    //     console.log(err);
    // })
}

module.exports = Page;