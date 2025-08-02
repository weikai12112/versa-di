import { ILogger } from "../../services/logger/logger.interface";
import { IUserService } from "../../services/userService/userService.interface";
import { IHeaderBar, type HeaderAction } from "./headerbar.interface";
import { Emitter } from "../../base/emitter";

export class HeaderBar implements IHeaderBar {
    private _onChangeActions = new Emitter<HeaderAction[]>();
    public onChangeActions = this._onChangeActions.event;
    public actions: HeaderAction[] = [];
    constructor(
        @IUserService private userService: IUserService,
        @ILogger private logger: ILogger,
    ) {
        this.updateActions();
        console.log(`Service initial: HeaderBar created `);

    }

    private get loginLabel() {
        return this.userService.hasLogin ? 'Logout' : 'Login';
    }

    private updateActions() {
        this.actions = [
            {
                label: 'help',
                onClick: () => this.showHelpModal(),
            },
            {
                label: this.loginLabel,
                onClick: () => {
                    if (this.userService.hasLogin) {
                        this.logout();
                    } else {
                        this.login();
                    }
                },
            },
        ];
        this._onChangeActions.fire(this.actions);
    }

    showHelpModal() {
        this.logger.log('show help modal');
    }

    login() {
        this.userService.login();
        this.updateActions();
    }

    logout() {
        this.userService.logout();
        this.updateActions();
    }
}
