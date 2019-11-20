import { AbstractWidget, FacetLocator, IFacet } from "aft-ui";

export class HerokuMessagesWidget extends AbstractWidget {
    locator: FacetLocator = FacetLocator.id("flash-messages");

    private async message(): Promise<IFacet> {
        return this.findFirst(FacetLocator.id("flash"));
    }
    
    async isDoneLoading(): Promise<boolean> {
        return this.hasMessage();
    }

    async hasMessage(): Promise<boolean> {
        try {
            let el: IFacet = await this.message();
            return Promise.resolve(el !== undefined);
        } catch (e) {
            return Promise.resolve(false);
        }
    }

    async getMessage(): Promise<string> {
        let exists: boolean = await this.hasMessage();
        if (exists) {
            let el: IFacet = await this.message();
            return el.text();
        }
        return Promise.reject("no message could be found");
    }
}