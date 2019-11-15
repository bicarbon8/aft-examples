import { TestWrapperOptions, TestWrapper, using, Wait } from "aft-core";
import { ISessionGenerator, ContainerOptions } from "aft-ui";
import { HerokuLoginPage } from "./page-objects/heroku-login-page";

describe('Functional Browser Tests using AFT-UI', () => {
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    });
  
    it('can access websites using AFT and Page Widgets and Facets', async () => {
        let opts: TestWrapperOptions = new TestWrapperOptions('can access websites using AFT and Page Widgets and Facets');
        opts.testCases.addRange('C1234', 'C2345', 'C3456');
        await using(new TestWrapper(opts), async (tw) => {
            await using(await ISessionGenerator.get(), async (session) => {
                let loginPage: HerokuLoginPage = new HerokuLoginPage(new ContainerOptions(session));
                await tw.check('C1234', async () => {
                    tw.logger.step('navigate to LoginPage');
                    await loginPage.navigateTo();
                });
                
                await tw.check('C2345', async () => {
                    tw.logger.step('login');
                    await loginPage.login("tomsmith", "SuperSecretPassword!");
                });

                await tw.check('C3456', async () => {
                    tw.logger.step('wait for message to appear...')
                    await Wait.forCondition(() => loginPage.hasMessage(), 20000);
                    
                    tw.logger.step('get message');
                    let message: string = await loginPage.getMessage();
                    
                    tw.logger.info("message of '" + message + "' found");
                    expect(message).toContain("You logged into a secure area!");
                });
            });
        });
    });
});