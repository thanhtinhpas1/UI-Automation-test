const { describe, it, after, before } = require('mocha');
const Page = require('../lib/createClass');
const util = require('../utils/readData');
const utils = require('../utils/readData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function changeRole() {
    try {
        var driver, page;

        describe('Test UI: automation create class', async function () {
            this.timeout('500s');


            this.beforeAll(async () => {
                page = new Page();
                driver = page.driver;
                // await page.visit("http://localhost:4200/login");
            })

            this.afterEach(async () => {
                // await page.quit();
            })

            // it('Test UI automation: Check flow', async () => {
            // const result = await page.checkFlowComponent();
            // console.log(result);
            // expect(result.username).to.include("username");
            // expect(result.password).to.include("password");
            // expect(result.login).to.include("Log in");
            // expect(result.buttonCreate).to.include(" Add");
            // expect(result.nameField).to.equal(true);
            // expect(result.emailField).to.equal(true);
            // })

            // it('TESTCASE 1: Interrup create class', async () => {
            //     await page.visit("http://localhost:4200/login");
            //     await utils.readListClass().then(async classes => {
            //         for (const item of classes) {
            //             var rs = await page.interruptCreateClass(item.name, item.program);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("http://localhost:4200/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //     })
            // });

            // it('TEST CASE 2: Create class without program', async () => {
            //     await page.visit("http://localhost:4200/login");
            //     await utils.readListClass().then(async classes => {
            //         for (const item of classes) {
            //             var rs = await page.addClassWithoutProgram(item.name, item.program);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("http://localhost:4200/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //     })
            // })

            // it('TEST CASE 3: Create class without email', async () => {
            //     await page.visit("http://localhost:4200/login");
            //     await utils.readListClass().then(async classes => {
            //         for (const item of classes) {
            //             var rs = await page.addClassWithoutEmail(item.name, item.program);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("http://localhost:4200/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //     })
            // })

            // it('TEST CASE 4: Create class without list student', async () => {
            //     await page.visit("http://localhost:4200/login");
            //     await utils.readListClass().then(async classes => {
            //         for (const item of classes) {
            //             console.log(item);
            //             var rs = await page.addClassWithoutStudents(item.name, item.program);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("http://localhost:4200/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //     })
            // })


            // it('TEST CASE 5: Create class with full of informations', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListClass().then(async classes => {
            //         for (const item of classes) {
            //             console.log(item);
            //             var rs = await page.addWithFullInfo(item.name, item.program);
            //             await expect(rs).to.equal(item.name);
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // })

        })
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
        await driver.quit();
    }
})();