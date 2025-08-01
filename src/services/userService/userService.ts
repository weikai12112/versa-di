import { makeBarrierByPromise } from "../../base/barrier";
import { AbstractJob } from "../../base/job";
import { ILogger } from "../logger/logger.interface";
import { IUserService, type UserInfo } from "./userService.interface";

const fetchUserInfo = async () => {
    return new Promise<UserInfo>((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'John Doe',
            });
        }, 100);
    })
}

export class UserService implements IUserService {
    private location: string;
    private isLogin: boolean = false;
    private isUserInfoReady = Promise.withResolvers<null>();
    private userInfo: UserInfo | null = null;

    constructor(
        location: string,
        @ILogger private logger: ILogger,
    ) {
        this.location = location;
        console.log(`Service initial: UserService created `);

    }

    /** 业务不要用 */
    public bootstrap() {
        fetchUserInfo().then(userInfo => {
            this.userInfo = userInfo;
        }).catch(() => {
            this.userInfo = {
                id: 0,
                name: 'Unknown User',
            }
        }).finally(() => {
            this.isUserInfoReady.resolve(null);
        })
        return this.isUserInfoReady.promise;
    }

    /** 
     * 正常讲业务需要判断初始化逻辑是否完成，但是在flow流程中有卡点，让业务使用时必然已完成
     * 减少对业务代码的侵入
    */
    whenUserInfoReady() {
        return this.isUserInfoReady.promise;
    }

    get hasLogin() {
        return this.isLogin;
    }

    login() {
        if (this.isLogin) {
            this.logger.log('Already logged in');
            return;
        }
        this.logger.log(`Hello DI!:  ${this.location}`);
        this.isLogin = true;
    }
    logout() {
        if (!this.isLogin) {
            this.logger.log('Already logged out');
            return;
        }
        this.logger.log('Goodbye DI!');
        this.isLogin = false;
    }
    getUserInfo() {
        if (this.userInfo === null) {
            throw new Error('UserInfo not ready, please ensure bootstrap is complete before use.');
        }
        return this.userInfo;
    }
}

export class UserServiceBootstrapJob<T> extends AbstractJob<T> {
    name = 'UserServiceBootstrapJob';
    constructor(
        private readonly start: T,
        private readonly end: T,
        @IUserService private userService: IUserService
    ) {
        super();
    }

    executeTask(phase: T) {
        if (phase === this.start) {
            const promise = this.userService.bootstrap();
            const barrier = makeBarrierByPromise(promise);
            return {
                barrier,
                barrierNode: this.end,
            }
        }
    }
}









