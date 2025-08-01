import type { Barrier } from "./barrier";

export abstract class AbstractJob<T> {
    protected _barriers = new Map<T, Barrier>();

    protected _setBarrier(phase: T, barrier: Barrier) {
        this._barriers.set(phase, barrier);
    }

    getBarrier(phase: T): Barrier | undefined {
        return this._barriers.get(phase);
    }

    abstract name: string;
    abstract executeTask(phase: T): { barrier: Barrier, barrierNode: T } | undefined;
}