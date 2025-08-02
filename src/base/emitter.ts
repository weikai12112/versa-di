type Disposable = { dispose(): void };
type Listener<T> = (e: T) => void;

export class Emitter<T> {
    private listeners: Listener<T>[] = [];
    private disposed = false;

    // 订阅事件
    get event(): (listener: Listener<T>) => Disposable {
        return (listener: Listener<T>) => {
            if (this.disposed) return { dispose() {} };
            this.listeners.push(listener);
            return {
                dispose: () => {
                    const idx = this.listeners.indexOf(listener);
                    if (idx >= 0) this.listeners.splice(idx, 1);
                }
            };
        };
    }

    // 触发事件
    fire(e: T): void {
        if (this.disposed) return;
        for (const listener of this.listeners) {
            try {
                listener(e);
            } catch (err) {
                // 可加错误处理
            }
        }
    }

    // 释放资源
    dispose(): void {
        this.disposed = true;
        this.listeners = [];
    }

    // 是否有监听器
    hasListeners(): boolean {
        return this.listeners.length > 0;
    }
}