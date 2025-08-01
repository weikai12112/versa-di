import { makeAutoObservable, observable } from "mobx";
import { ILogger } from "../../services/logger/logger.interface";
import { IUserService } from "../../services/userService/userService.interface";
import { IHeaderBar, type HeaderAction } from "./headerbar.interface";

export class HeaderBar implements IHeaderBar {
    public actions: HeaderAction[] = observable.array([{
        label: 'help',
        onClick: () => this.showHelpModal(),
    }])
    constructor(
        @IUserService private userService: IUserService,
        @ILogger private logger: ILogger,
    ) {
        this.doInitialize();
        console.log(`Service initial: HeaderBar created `);
        makeAutoObservable(this)

    }

    @observable
    private get loginLabel() {
        return this.userService.hasLogin ? 'Logout' : 'Login';
    }

    private async doInitialize() {
        const self = this;
        this.actions.push({
            label: this.loginLabel,
            onClick: () => {
                if (this.userService.hasLogin) {
                    this.logout();
                } else {
                    this.login();
                }
            },
        });
    }

    showHelpModal() {
        this.logger.log('show help modal');
    }

    login() {
        this.userService.login();
    }

    logout() {
        this.userService.logout();
    }
}
