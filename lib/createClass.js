let Page = require('./basePage');
const locate = require('../utils/locator');
const utils = require('../utils/readData');
const { until, By } = require('selenium-webdriver');

const usernameFieldName = locate.usernameFieldName;
const passwordFieldName = locate.passwordFieldName;
const fieldClassName = locate.fieldClassName;
const emailClassName = locate.fieldEmailName;

let usernameField, passwordField, loginButton, classesHref, buttonCreate, nameField, emailField, buttonFormCancel, nameClass,
    fieldInputFile, buttonSubmitModal, dropdownProgram, programOption, dropdownFilter, optionFilter;

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

    loginButton.click();
}

Page.prototype.accessCreateClasses = async function () {
    classesHref = await this.findByText("Classes");
}

Page.prototype.accessCreate = async function () {
    buttonCreate = await this.findByClass("btn-round");
}

Page.prototype.createSubmit = async function () {
    buttonSubmit = await this.findByText("Add");
}

Page.prototype.findFields = async function () {
    nameField = await this.findByName(fieldClassName);
    emailField = await this.findByName(emailClassName);
    console.log(nameField);
    console.log(emailField);
}

Page.prototype.findClass = async function (name) {
    nameClass = await this.findByText(name);
}

Page.prototype.checkFlowComponent = async function () {
    await this.findUsernamePasswordFields();
    var result = {};
    result.username = await usernameField.getAttribute("name");
    result.password = await passwordField.getAttribute("name");
    result.login = await loginButton.getAttribute("innerHTML");

    await this.write(usernameField, username);
    await this.write(passwordField, password);
    await loginButton.click();
    console.log("STEP: Login");

    await this.driver.wait(until.urlContains("/dashboard"));

    await this.accessCreateClasses();
    await classesHref.click();
    console.log("STEP: Access create classes page");

    await this.accessCreate();
    result.buttonCreate = await buttonCreate.getAttribute("innerHTML");
    buttonCreate.click();
    console.log("STEP: Open modal create class");

    this.driver.wait(until.elementLocated(By.name(emailClassName)));
    console.log(emailClassName);
    console.log(fieldClassName);
    await this.findFields();
    result.nameField = await nameField.isEnabled();
    result.emailField = await emailField.isEnabled();
    console.log("STEP: Check fields name and email");
    return result;
}

Page.prototype.findCancelButton = async function () {
    buttonFormCancel = await this.findByText("Cancel");
}


// CREATE CLASS
Page.prototype.loginFirst = async function () {

    await this.driver.wait(until.elementLocated(By.name("username")));
    await this.findUsernamePasswordFields();
    await this.write(usernameField, username);
    await this.write(passwordField, password);
    await loginButton.click();
    console.log("STEP: Login");

    // utils.readFileChrome().then(async users => {

    // }).catch(function (err) {
    //     console.log(err);
    // })
}

Page.prototype.accessCreateHref = async function () {
    await this.driver.wait(until.urlContains("/dashboard"));
    await this.accessCreateClasses();
    await classesHref.click();
    console.log("STEP: Access create classes href");
}

Page.prototype.openModal = async function () {
    await this.driver.wait(until.urlContains("/classes"));
    await this.accessCreate();
    await buttonCreate.click();
    console.log("STEP: Access create page");
}

Page.prototype.findFielsAndWriteData = async function (name) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    console.log(emailClassName);
    console.log(fieldClassName);
    await this.findFields();
    console.log(emailField);
    console.log(nameField);
    await this.write(nameField, name);
    console.log("STEP: Find fields and write data");
}

Page.prototype.closeModal = async function () {
    await this.findCancelButton();
    buttonFormCancel.click();
    console.log("STEP: Close modal");
}

Page.prototype.checkClass = async function () {
    console.log("STEP: Check class");
    await this.findClass("chemistry");
    return nameClass.getAttribute("innerHTML") | "";
}

Page.prototype.interruptCreateClass = async function (name) {

    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteData(name);
    await this.closeModal();
    try {
        const rs = await this.checkClass();
        return rs;
    } catch (error) {
        return undefined;
    }
}

Page.prototype.addFileList = async function () {
    fieldInputFile = await this.findByName("students");
    console.log(fieldInputFile);
    var filePath = __dirname.split("lib", 1)[0] + "datatest\\students.csv";
    console.log(filePath);
    await this.write(fieldInputFile, filePath);
    console.log("STEP: Add list file students");
}

Page.prototype.submitModal = async function () {
    buttonSubmitModal = await this.findByClass("btn-success");
    console.log(buttonSubmitModal);
    await buttonSubmitModal.click();
    console.log("Step: Submit modal");
}

Page.prototype.chooseProgram = async function (program) {
    dropdownProgram = await this.findByName("program");
    console.log(dropdownProgram);
    await dropdownProgram.click();
    
    programOption = await this.findByText(program);
    console.log(programOption);
    await programOption.click();
}

Page.prototype.findClass = async function (program) {
    dropdownFilter = await this.findByClass("ng-dirty");
    console.log(dropdownFilter);
    await dropdownFilter.click();
    optionFilter = await this.findByText(program);
    await optionFilter.click();
}

Page.prototype.addClassWithoutProgram = async function (name) {
    try {
        await this.loginFirst();
        await this.accessCreateHref();
        await this.openModal();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.findFielsAndWriteData(name);
        await this.addFileList();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.submitModal();
        await this.closeModal();
        const rs = await this.checkClass();
        return rs;
    } catch (error) {
        return undefined;
    }
}

Page.prototype.addClassWithoutEmail = async function (name, program) {
    try {
        await this.loginFirst();
        await this.accessCreateHref();
        await this.openModal();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.findFielsAndWriteData(name);
        await this.write(emailField, "");
        await this.addFileList();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.chooseProgram(program);
        await this.submitModal();
        await this.closeModal();
        const rs = await this.checkClass();
        return rs;
    } catch (error) {
        return undefined;
    }
}

Page.prototype.addWithFullInfo = async function (name, program) {
    try {
        await this.loginFirst();
        await this.accessCreateHref();
        await this.openModal();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.findFielsAndWriteData(name);
        await this.addFileList();
        await this.driver.manage().setTimeouts({ implicit: 2000 });
        await this.chooseProgram(program);
        await this.submitModal();
        await this.findClass();
        await this.closeModal(); // when fail
        const rs = await this.checkClass();
        return rs;
    } catch (error) {
        return undefined;
    }
}



module.exports = Page;