import type { JobScheduler } from "../../base/jobScheduler";


export enum PageLifecycle {
    Open = 'open',
    Prepare = 'prepare',
    Ready = 'ready',
    Complete = 'complete',
    Idle = 'idle',
}

function startLifecycleOpen() {
    console.log("Base Lifecycle: Starting Open Base Lifecycle");
}
function endLifecycleOpen() {
    console.log("Base Lifecycle: Ending Open Base Lifecycle");    
}
function startLifecyclePrepare() {  
    // 开始 prepare 生命周期
    console.log("Base Lifecycle: Starting Prepare Base Lifecycle");
}
function endLifecyclePrepare() {
    // 结束 prepare 生命周期
    console.log("Base Lifecycle: Ending Prepare Base Lifecycle");
}
function startLifecycleReady() {
    // 开始 ready 生命周期
    console.log("Base Lifecycle: Starting Ready Base Lifecycle");
}
function endLifecycleReady() {
    // 结束 ready 生命周期
    console.log("Base Lifecycle: Ending Ready Base Lifecycle");
}
function startLifecycleComplete() {
    // 开始 complete 生命周期
    console.log("Base Lifecycle: Starting Complete Base Lifecycle");
}
function endLifecycleComplete() {
    // 结束 complete 生命周期
    console.log("Base Lifecycle: Ending Complete Base Lifecycle");
}
function startLifecycleIdle() {
    // 开始 idle 生命周期
    console.log("Base Lifecycle: Starting Idle Base Lifecycle");
}
function endLifecycleIdle() {
    // 结束 idle 生命周期
    console.log("Base Lifecycle: Ending Idle Base Lifecycle");
}


export async function driveJobScheduler(
    jobScheduler: JobScheduler<PageLifecycle>,
    setLifecycle: (cycle: PageLifecycle) => void,
) {
    startLifecycleOpen();
    jobScheduler.prepare(PageLifecycle.Open)
    await jobScheduler.wait(PageLifecycle.Open);
    setLifecycle(PageLifecycle.Open);
    endLifecycleOpen();

    startLifecyclePrepare();
    jobScheduler.prepare(PageLifecycle.Prepare);
    await jobScheduler.wait(PageLifecycle.Prepare);
    setLifecycle(PageLifecycle.Prepare);
    endLifecyclePrepare();

    startLifecycleReady();
    jobScheduler.prepare(PageLifecycle.Ready);
    await jobScheduler.wait(PageLifecycle.Ready);
    setLifecycle(PageLifecycle.Ready);
    endLifecycleReady();

    startLifecycleComplete();
    jobScheduler.prepare(PageLifecycle.Complete);
    await jobScheduler.wait(PageLifecycle.Complete);
    setLifecycle(PageLifecycle.Complete);
    endLifecycleComplete();

    startLifecycleIdle();
    jobScheduler.prepare(PageLifecycle.Idle);
    await jobScheduler.wait(PageLifecycle.Idle);
    setLifecycle(PageLifecycle.Idle);
    endLifecycleIdle();

}