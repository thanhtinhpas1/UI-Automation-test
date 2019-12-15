const { describe, it, after, before } = require('mocha');
const Page = require('../lib/createUserPage');
const util = require('../utils/readData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function createUser() {
    try {
        describe('Create user automation chrome', async function () {
            this.timeout('500s');
            let driver, page;

            this.beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('http://localhost/mantisbt/login_password_page.php?reauthenticate=1&username=administrator&return=%252Fmantisbt%252Fmanage_user_page.php');
            })

            this.afterEach(async () => {
                // await page.quit();
            })

            it('Create user automation chrome', async () => {
                await page.driver.wait(async function () {
                    await page.createUserFromDataSet();
                }, 500000);
            })
        })
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
        await driver.quit();
    }
})();