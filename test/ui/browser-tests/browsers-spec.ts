import { TestWrapperOptions, TestWrapper, using, Wait, should } from "aft-core";
import { ISessionGenerator, ContainerOptions, SessionOptions, IFacet } from "aft-ui";
import { AbstractGridSession } from "aft-ui-selenium";
import { HerokuLoginPage } from "./page-objects/heroku-login-page";
import 'aft-ui-selenium/dist/src/sessions/browserstack/browserstack-session-generator';
import 'aft-logging-awskinesis/dist/src/kinesis-logging-plugin';
import 'aft-testrail/dist/src/logging/testrail-logging-plugin';
import { HerokuContentWidget } from "./page-objects/heroku-content-widget";

describe('Functional Browser Tests using AFT-UI', () => {
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    });
  
    it('can access websites using AFT and Page Widgets and Facets', async () => {
        let opts: TestWrapperOptions = new TestWrapperOptions('can access websites using AFT and Page Widgets and Facets');
        opts.testCases.addRange('C1234', 'C2345', 'C3456');
        await using(new TestWrapper(opts), async (tw) => {
            let sOpts: SessionOptions = new SessionOptions();
            sOpts.logger = tw.logger;
            sOpts.provider = 'BrowserStackSession';
            await using(await ISessionGenerator.get(sOpts), async (session) => {
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
                    
                    should(() => expect(message).toContain("You logged into a secure area!"))
                    .because(`we were supposed to be logged in: '${message}'`);
                });
            });
        });
    });

    it('can recover from StaleElementExceptions automatically', async () => {
        let opts: TestWrapperOptions = new TestWrapperOptions('can recover from StaleElementExceptions automatically');
        opts.testCases.addRange('C4567', 'C5678', 'C6789', 'C7890');
        await using(new TestWrapper(opts), async (tw) => {
            let sOpts: SessionOptions = new SessionOptions();
            sOpts.logger = tw.logger;
            sOpts.provider = 'BrowserStackSession';
            await using(await ISessionGenerator.get(sOpts), async (session) => {
                let loginPage: HerokuLoginPage = new HerokuLoginPage(new ContainerOptions(session));
                await tw.check('C4567', async () => {
                    await tw.logger.step('navigate to LoginPage');
                    await loginPage.navigateTo();
                });
                
                let button: IFacet;
                await tw.check('C5678', async () => {
                    await tw.logger.step('click login button');
                    button = await loginPage.content().then((c) => c.getLoginButton());
                    button.click();
                    await tw.logger.info('no exception thrown on click');
                });

                await tw.check('C6789', async () => {
                    await tw.logger.step('refresh page');
                    await session.refresh();
                    await tw.logger.info('page refreshed');
                });

                await tw.check('C7890', async () => {
                    await tw.logger.step('click login button');
                    await button.click();
                    await tw.logger.info('no exception thrown on click');
                });
            });
        });
    });
});