import { Container } from "../../base/container";
import { JobScheduler } from "../../base/jobScheduler";
import { HeaderBar } from "../../parts/headerbar/headerbar";
import { IHeaderBar } from "../../parts/headerbar/headerbar.interface";
import { driveJobScheduler, PageLifecycle } from "./scheduler";
import { Logger } from "../../services/logger/logger";
import { ILogger } from "../../services/logger/logger.interface";
import { UserService, UserServiceBootstrapJob } from "../../services/userService/userService";
import { IUserService } from "../../services/userService/userService.interface";
import { AbstractContainerHelper } from "../../base/type";


let container: Container = null as unknown as Container;



export class ContainerHelper extends AbstractContainerHelper {
    static createContainer() {
        container = new Container();
        return container
    }

    static registerServices() {
        container.registerSingleton(ILogger, Logger);
        container.registerSingleton(IUserService, UserService, ['default location']);
        container.registerSingleton(IHeaderBar, HeaderBar);
    }

    static async runScheduler() {
        if (container === null) {
            throw new Error("Container is not initialized. Call createContainer() first.");
        }

        const jobScheduler = new JobScheduler<PageLifecycle>(container);
        jobScheduler.addJob(UserServiceBootstrapJob, PageLifecycle.Open, PageLifecycle.Prepare);
        const lifecycle = {
            current: PageLifecycle.Open,
        };
        const lifecycleProxy = new Proxy(
            lifecycle,
            {
                get: (target, prop) => {
                    if (prop in target) {
                        return target[prop as keyof typeof target];
                    }
                    throw new Error(`Unknown lifecycle phase: ${String(prop)}`);
                },
                set: (target, prop, value) => {
                    if (prop in target) {
                        target[prop as keyof typeof target] = value;
                        return true;
                    }
                    throw new Error(`Cannot set unknown lifecycle phase: ${String(prop)}`);
                }
            }
        )
        const setLifecycle = (cycle: PageLifecycle) => {
            lifecycleProxy.current = cycle;
        }

        await driveJobScheduler(jobScheduler, setLifecycle);
    }

    static getContainer() {
        if (container === null) {
            throw new Error("Container is not initialized. Call createContainer() first.");
        }
        return container;
    }
}




