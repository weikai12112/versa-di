
export type Class<T = any> = new (...args: any[]) => T;

export abstract class AbstractContainerHelper {
    static createContainer() {
    }
    static registerServices(): void {
    }
    static runScheduler() {
    }
    static getContainer() {
    }
}