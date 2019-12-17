const { describe, it, after, before } = require('mocha');
const Page = require('../lib/createTeacher');
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

        describe('Test UI: automation create teacher', async function () {
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
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.interruptCreateClass(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //     })
            // });


            // it('TESTCASE 2: Create teacher without first name', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.creatTeacherWithoutFirstName(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // });

            // it('TESTCASE 3: Create teacher without last name', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.creatTeacherWithoutLastName(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // });


            // it('TESTCASE 4: Create teacher without email', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.creatTeacherWithoutEmail(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // });

            // it('TESTCASE 5: Create teacher without phone', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.creatTeacherWithoutPhone(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // });

            // it('TESTCASE 6: Create teacher with incorrect mail', async () => {
            //     await page.visit("https://nhoma.herokuapp.com/login");
            //     await utils.readListTeachers().then(async teachers => {
            //         console.log(teachers);
            //         for (const item of teachers) {
            //             var rs = await page.creatTeacherWithIncorrectMail(item);
            //             await expect(rs).to.be.undefined;
            //             await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
            //         }
            //     }).catch(function (err) {
            //         console.log(new Error(err));
            //         throw err;
            //     })
            // });

            it('TESTCASE 7: Create teacher with excel file', async () => {
                await page.visit("https://nhoma.herokuapp.com/login");
                await utils.readListTeachers().then(async teachers => {
                    console.log(teachers);
                    for (const item of teachers) {
                        var rs = await page.creatTeacherWithExcelFile(item);
                        await expect(rs).to.be.undefined;
                        await (await page.driver).navigate().to("https://nhoma.herokuapp.com/logout");
                    }
                }).catch(function (err) {
                    console.log(new Error(err));
                    throw err;
                })
            });


        })
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
        await driver.quit();
    }
})();