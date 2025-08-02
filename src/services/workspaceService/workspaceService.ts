import { makeBarrierByPromise } from "../../base/barrier";
import { AbstractJob } from "../../base/job";
import { IUserService, type UserInfo } from "../userService/userService.interface";
import { IWorkspaceService, type WorkspaceInfo } from "./workspaceService.interface";

const fetchWorkspaceInfo = async (_: number) => {
    return new Promise<WorkspaceInfo>((resolve) => {
        setTimeout(() => {
            resolve({
                workspaceId: 1,
                workspaceName: 'my workspace',
            });
        }, 100);
    })
}

export class WorkspaceService implements IWorkspaceService {
    private userInfo!: UserInfo;
    private workspaceInfo: WorkspaceInfo | null = null;
    private isWorkspaceInfoReady = Promise.withResolvers<null>();

    constructor(@IUserService private userService: IUserService) {}

    public bootstrap() {
        this.userInfo = this.userService.getUserInfo();
        this.requestWorkspaceInfo();
        return this.isWorkspaceInfoReady.promise;
    }

    private requestWorkspaceInfo() {
        fetchWorkspaceInfo(this.userInfo.id).then(workspaceInfo => {
            this.workspaceInfo = workspaceInfo;
        }).catch(() => {
            this.workspaceInfo = {
                workspaceId: 0,
                workspaceName: 'Unknown Workspace',
            }
            console.error('Failed to fetch workspace info');
        }).finally(() => {
            this.isWorkspaceInfoReady.resolve(null);
        })
    }

    public getWorkspacePath(): string {
        return this.userInfo.id.toString();
    }

    public getWorkspaceInfo(): WorkspaceInfo {
        if (this.workspaceInfo === null) {
            throw new Error('WorkspaceInfo not ready, please ensure bootstrap is complete before use.');
        }
        return this.workspaceInfo;
    }
}

export class WorkspaceServiceBootstrapJob<T> extends AbstractJob<T> {
    name = 'WorkspaceServiceBootstrapJob';
    constructor(
        private readonly start: T,
        private readonly end: T,
        @IWorkspaceService private workspaceService: IWorkspaceService
    ) {
        super();
    }

    executeTask(phase: T) {
        if (phase === this.start) {
            const promise = this.workspaceService.bootstrap();
            const barrier = makeBarrierByPromise(promise);
            return {
                barrier,
                barrierNode: this.end,
            }
        }
    }
}