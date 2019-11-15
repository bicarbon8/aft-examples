import { Page, ContainerOptions } from 'aft-ui';
import { HerokuContentWidget } from './heroku-content-widget';
import { HerokuMessagesWidget } from './heroku-messages-widget';

export class HerokuLoginPage extends Page {
    /* begin: widgets */
    private async content(): Promise<HerokuContentWidget> {
        return await this.getWidget(HerokuContentWidget);
    }
    private async messages(): Promise<HerokuMessagesWidget> {
        let wo: ContainerOptions = new ContainerOptions(this.session);
        wo.maxWaitMs = 20000;
        return await this.getWidget(HerokuMessagesWidget, wo);
    }
    /* end: widgets */

    async navigateTo(): Promise<void> {
        await this.session.goTo('https://the-internet.herokuapp.com/login');
        return await this.waitUntilDoneLoading();
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