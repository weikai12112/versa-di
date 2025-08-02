import { observable } from "mobx";
import { IHeaderBar } from "../../parts/headerbar/headerbar.interface";

export class HeaderStore {
    public actions = observable.array<IHeaderBar['actions'][number]>([]);
    constructor(@IHeaderBar private headerBar: IHeaderBar) {
        this.actions.replace(this.headerBar.actions);
        
        this.headerBar.onChangeActions((actions) => {
            this.actions.replace(actions);
        })

    }

    
}