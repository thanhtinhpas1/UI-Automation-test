const { describe, it, after, before } = require('mocha');
const Page = require('../lib/createClass');
const util = require('../utils/readData');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function changeRole() {
    try {
        describe('Change role user automation firefox', async function () {
            this.timeout('500s');

            let driver, page;

            this.beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit("http://localhost:4200/login");
            })

            this.afterEach(async () => {
                // await page.quit();   
            })

            it('Test UI automation: Tạo lớp học mới', async () => {
                // await page.driver.wait(async () => {
                await page.createClasses();
                // })
            })
        })
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
        await driver.quit();
    }
})();