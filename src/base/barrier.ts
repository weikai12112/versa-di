
export class Barrier {
    private _isOpen = false;
    private _promise: Promise<void>;
    private _resolve!: () => void;

    constructor() {
        this._promise = new Promise<void>(resolve => {
            this._resolve = resolve;
        });
    }

    open() {
        if (!this._isOpen) {
            this._isOpen = true;
            this._resolve();
        }
    }

    wait() {
        return this._promise;
    }
}

// 工具函数：用 promise 创建 barrier
export function makeBarrierByPromise(promise: Promise<any>): Barrier {
    const barrier = new Barrier();
    promise.then(() => barrier.open());
    return barrier;
}