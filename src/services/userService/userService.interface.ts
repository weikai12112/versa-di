import { createDecorator } from "../../base/createDecorator";

export interface UserInfo {
    name: string;
    id: number;
}
export interface IUserService {
    hasLogin: boolean;
    login(): void;
    logout(): void;
    getUserInfo(): UserInfo;
    whenUserInfoReady(): Promise<null>;
    bootstrap(): Promise<null>;
}

export const IUserService = createDecorator<IUserService>('userService');