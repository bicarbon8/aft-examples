import { AbstractWidget, FacetLocator, IFacet } from 'aft-ui';

export class HerokuContentWidget extends AbstractWidget {
    locator: FacetLocator = FacetLocator.id("content");

    private async usernameInput(): Promise<IFacet> {
        return this.findFirst(FacetLocator.id("username"));
    }
    private async passwordInput(): Promise<IFacet> {
        return this.findFirst(FacetLocator.id("password"));
    }
    private async loginButton(): Promise<IFacet> {
        return this.findFirst(FacetLocator.css("button.radius"));
    }
    
    async isDoneLoading(): Promise<boolean> {
        let ui: IFacet = await this.usernameInput();
        let pi: IFacet = await this.passwordInput();
        let lb: IFacet = await this.loginButton();
        let uiDisplayed: boolean = await ui.displayed();
        let piDisplayed: boolean = await pi.displayed();
        let lbDisplayed: boolean = await lb.displayed();
        
        if (uiDisplayed && piDisplayed && lbDisplayed) {
            return Promise.resolve(true);
        }

        return Promise.reject("uiDisplayed: '" + uiDisplayed + "'; piDisplayed: '" + piDisplayed + "'; lbDisplayed: '" + lbDisplayed + "'");
    }

    async login(username: string, password: string): Promise<void> {
        /* TODO: add logging */
        let ui: IFacet = await this.usernameInput();
        await ui.text(username);
        let pi: IFacet = await this.passwordInput();
        await pi.text(password);
        return this.clickSearchButton();
    }

    async clickSearchButton(): Promise<void> {
        /* TODO: add logging */
        let lb: IFacet = await this.loginButton();
        return lb.click();
    }
}