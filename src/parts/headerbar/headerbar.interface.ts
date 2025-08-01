import { createDecorator } from "../../base/createDecorator";

export interface HeaderAction {
    label: string;
    onClick: () => void;
}
export interface IHeaderBar {
    actions: HeaderAction[];
    login(): void;
    logout(): void;
    showHelpModal(): void;
}
export const IHeaderBar = createDecorator<IHeaderBar>('headerBar');