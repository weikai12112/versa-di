import type { Barrier } from "./barrier";
import type { Container } from "./container";
import type { AbstractJob } from "./job";

type Class<T = any> = new (...args: any[]) => AbstractJob<T>;
type JobList<T extends string | symbol> = Record<T, [string, AbstractJob<T>][]>

export class JobScheduler<T extends string | symbol> {
    private jobs: JobList<T> = {} as JobList<T>;
    private phaseBarriers = new Map<T, Barrier[]>();
    private baseContainer: Container;

    constructor(baseContainer: Container) {
        this.baseContainer = baseContainer;
    }

    addJob(job: Class<T>, executeNode: T, barrierNode: T) {
        if (!this.jobs[executeNode]) {
            this.jobs[executeNode] = [];
        }

        this.baseContainer.registerSingleton(job, job, [executeNode, barrierNode]);
        const jobInstance = this.baseContainer.resolve<AbstractJob<T>>(job);
        this.jobs[executeNode].push([job.name, jobInstance]);
    }

    prepare(phase: T) {
        for (const job of this.jobs[phase] || []) {
            const jobInstance = job[1];
            const { barrier, barrierNode } = jobInstance.executeTask(phase) || {};
            if (barrier && barrierNode) {
                const prePhaseBarriers = this.phaseBarriers.get(barrierNode) || [];
                prePhaseBarriers.push(barrier);
                this.phaseBarriers.set(barrierNode,  prePhaseBarriers);
            }
        }
    }

    async wait(phase: T) {
        const barriers = this.phaseBarriers.get(phase) || [];
        
        await Promise.all(barriers.map(b => b.wait()));

        for (const job of this.jobs[phase] || []) {
            this.baseContainer.unregister(job);
        }
    }
}