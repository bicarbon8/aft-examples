import { AbstractPage, ContainerOptions, ISession } from 'aft-ui';
import { HerokuContentWidget } from './heroku-content-widget';
import { HerokuMessagesWidget } from './heroku-messages-widget';

export class HerokuLoginPage extends AbstractPage {
    /* begin: widgets */
    async content(): Promise<HerokuContentWidget> {
        return await this.getWidget(HerokuContentWidget);
    }
    async messages(): Promise<HerokuMessagesWidget> {
        let wo: ContainerOptions = new ContainerOptions(this.parent);
        wo.maxWaitMs = 20000;
        return await this.getWidget(HerokuMessagesWidget, wo);
    }
    /* end: widgets */

    async navigateTo(): Promise<void> {
        try {
            let session: ISession = this.parent as ISession;
            await session.goTo('https://the-internet.herokuapp.com/login');
            return await this.waitUntilDoneLoading();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async isDoneLoading(): Promise<boolean> {
        return await this.content().then((c) => c.isDoneLoading());
    }

    /* begin: page actions */
    async login(username: string, password: string): Promise<void> {
        let hc: HerokuContentWidget = await this.content();
        return hc.login(username, password);
    }

    async hasMessage(): Promise<boolean> {
        let hm: HerokuMessagesWidget = await this.messages();
        return hm.hasMessage();
    }

    async getMessage(): Promise<string> {
        let hm: HerokuMessagesWidget = await this.messages();
        return hm.getMessage();
    }
    /* end: page actions */
}