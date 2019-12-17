let Page = require('./basePage');
const locate = require('../utils/locator');
const utils = require('../utils/readData');
const { until, By } = require('selenium-webdriver');

const usernameFieldName = locate.usernameFieldName;
const passwordFieldName = locate.passwordFieldName;
const fieldClassName = locate.fieldClassName;
const emailClassName = locate.fieldEmailName;

let usernameField, passwordField, loginButton, classesHref, buttonCreate, nameField, emailField, buttonFormCancel, nameClass,
    fieldInputFile, buttonSubmitModal, dropdownProgram, programOption, dropdownFilter, optionFilter, successNotify, searchField;
let firstName, lastName, phoneField;
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
    classesHref = await this.findByText("Teachers");
}

Page.prototype.accessCreate = async function () {
    buttonCreate = await this.findByDataTarget();
    console.log(buttonCreate);
}

Page.prototype.createSubmit = async function () {
    buttonSubmit = await this.findByText("Add");
}

Page.prototype.findFields = async function () {
    firstName = await this.findByName("first_name");
    emailField = await this.findByName("email");
    lastName = await this.findByName("last_name");
    phoneField = await this.findByName("phone");
    console.log(firstName);
    console.log(emailField);
    console.log(lastName);
    console.log(phoneField);
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
    await this.driver.wait(until.urlContains("/teachers"));
    await this.accessCreate();
    await buttonCreate.click();
    console.log("STEP: Access create page");
}

Page.prototype.findFielsAndWriteData = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(emailField, entity.email);
    await this.write(firstName, entity.firstName);
    await this.write(lastName, entity.lastName);
    await this.write(phoneField, entity.phone);
    console.log("STEP: Find fields and write data");
}

Page.prototype.findFielsAndWriteDataWithoutFirstName = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(emailField, entity.email);
    await this.write(lastName, entity.lastName);
    await this.write(phoneField, entity.phone);
    console.log("STEP: Find fields and write data");
}

Page.prototype.findFielsAndWriteDataWithoutLastName = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(emailField, entity.email);
    await this.write(firstName, entity.firstName);
    await this.write(phoneField, entity.phone);
    console.log("STEP: Find fields and write data");
}

Page.prototype.findFielsAndWriteDataWithoutEmail = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(firstName, entity.firstName);
    await this.write(lastName, entity.lastName);
    await this.write(phoneField, entity.phone);
    console.log("STEP: Find fields and write data");
}

Page.prototype.findFielsAndWriteDataWithoutPhone = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(emailField, entity.email);
    await this.write(firstName, entity.firstName);
    await this.write(lastName, entity.lastName);
    console.log("STEP: Find fields and write data");
}

Page.prototype.findFielsAndWriteDataWithIncorrectMail = async function (entity) {
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFields();
    await this.write(emailField, "awdawdasd");
    await this.write(firstName, entity.firstName);
    await this.write(lastName, entity.lastName);
    await this.write(phoneField, entity.phone);
    console.log("STEP: Find fields and write data");
}

Page.prototype.addFileToImport = async function () {
    var filePath = __dirname.split("lib", 1)[0] + "datatest\\teachers.xlsx";
    let buttomImport = await this.findByText("Import");
    await buttomImport.click();
    let importField = await this.inputFindByAccept();
    await this.write(importField, filePath);
}

Page.prototype.closeModal = async function () {
    await this.findCancelButton();
    buttonFormCancel.click();
    console.log("STEP: Close modal");
}

Page.prototype.openFilter = async function (name, program) {
    searchField = await this.findByPlaceHolder('Search Class Name');
    console.log(searchField);
    await this.write(searchField, name);

    // optionFilter = await this.findByText(program);
    // console.log(optionFilter);
    // await optionFilter.click();
}

Page.prototype.findClass = async function (name) {
    // successNotify = this.findByText("Class Added Successfully");
    this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), "${name}")]`)));
    nameClass = await this.findByText(name);
    console.log(nameClass);
}

Page.prototype.checkClass = async function (entity) {

    // await this.findByText("Class's existed");
    // await this.findByText("Class Added Successfully");

    let search = await this.findByPlaceHolder('Search Teacher Name');
    await this.write(search, entity.firstName);

    let teacher = await this.findByText(entity.phone);
    console.log("STEP: Check class");
    return teacher.getAttribute("innerHTML");
}

Page.prototype.addFileList = async function () {
    fieldInputFile = await this.findByName("students");
    console.log(fieldInputFile);
    var filePath = __dirname.split("lib", 1)[0] + "datatest\\students.xlsx";
    console.log(filePath);
    await this.write(fieldInputFile, filePath);
    console.log("STEP: Add list file students");
}

Page.prototype.submitModal = async function () {
    buttonSubmitModal = await this.findByClass("btn btn-default btn-success");
    console.log(buttonSubmitModal);
    await buttonSubmitModal.click();
    console.log("Step: Submit modal");
}

Page.prototype.chooseProgram = async function (program) {
    dropdownProgram = await this.findByName("program");
    // console.log(dropdownProgram);
    await dropdownProgram.click();

    programOption = await this.findByText(program);
    // console.log(programOption);
    await programOption.click();
}

Page.prototype.interruptCreateClass = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteData(entity);
    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithoutFirstName = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteDataWithoutFirstName(entity);
    await this.submitModal();
    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithoutLastName = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteDataWithoutLastName(entity);
    await this.write(lastName, "");
    await this.submitModal();
    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithoutEmail = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteDataWithoutEmail(entity);
    await this.write(emailField, "");
    await this.submitModal();

    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithoutPhone = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteDataWithoutPhone(entity);
    await this.write(phoneField, "");
    await this.submitModal();
    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithIncorrectMail = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.openModal();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.findFielsAndWriteDataWithIncorrectMail(entity);
    await this.submitModal();
    await this.closeModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

Page.prototype.creatTeacherWithExcelFile = async function (entity) {
    await this.loginFirst();
    await this.accessCreateHref();
    await this.driver.manage().setTimeouts({ implicit: 2000 });
    await this.addFileToImport();
    await this.buttonSubmitModal();
    try {
        return await this.checkClass(entity);
    } catch (error) {
        return undefined;
    }
}

module.exports = Page;