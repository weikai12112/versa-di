import { createDecorator } from "../../base/createDecorator";

export interface WorkspaceInfo {
    workspaceId: number;
    workspaceName: string;
}
export interface IWorkspaceService {
    getWorkspacePath(): string;
    getWorkspaceInfo(): WorkspaceInfo;
    bootstrap(): Promise<null>;
}

export const IWorkspaceService = createDecorator<IWorkspaceService>('IWorkspaceService');