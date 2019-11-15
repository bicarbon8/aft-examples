import { TestWrapperOptions, TestWrapper, using, Wait } from "aft-core";
import { ISessionGenerator, ContainerOptions } from "aft-ui";
import { HerokuLoginPage } from "./page-objects/heroku-login-page";
import 'aft-ui-selenium/dist/src/sessions/browserstack/browserstack-session-generator';
import 'aft-logging-awskinesis/dist/src/kinesis-logging-plugin';
import 'aft-testrail/dist/src/logging/testrail-logging-plugin';

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
                    await tw.logger.step('navigate to LoginPage');
                    await loginPage.navigateTo();
                });
                
                await tw.check('C2345', async () => {
                    await tw.logger.step('login');
                    await loginPage.login("tomsmith", "SuperSecretPassword!");
                });

                let message: string;
                await tw.check('C3456', async () => {
                    await tw.logger.step('wait for message to appear...')
                    await Wait.forCondition(() => loginPage.hasMessage(), 20000);
                    
                    await tw.logger.step('get message');
                    message = await loginPage.getMessage();
                    
                    if (!expect(message).toContain("You flogged into a secure area!")) {
                        throw new Error(`incorrect message found after login attempt: '${message}'`);
                    }
                });
            });
        });
    });
});