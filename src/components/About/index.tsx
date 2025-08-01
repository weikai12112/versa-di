import {ContainerHelper} from "../../schedulers/about";
ContainerHelper.createContainer();
ContainerHelper.registerServices();
await ContainerHelper.runScheduler();

console.log('debugger===renderAbout');

export default function About() {
  return <div style={{ padding: 24 }}>About Page</div>;
}