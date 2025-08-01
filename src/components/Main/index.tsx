import { ContainerHelper } from "../../schedulers/main";
import { ContainerHelper as BaseContainerHelper } from "../../schedulers/base";


ContainerHelper.createContainer(BaseContainerHelper.getContainer());
ContainerHelper.registerServices();
await ContainerHelper.runScheduler();

console.log('debugger===renderMain');

export default function Main() {
    return <div style={{ padding: 24 }}>Home Page</div>;
}