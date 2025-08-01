import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContainerHelper } from './schedulers/base/index.ts';

ContainerHelper.createContainer();
ContainerHelper.registerServices();
await ContainerHelper.runScheduler();

console.log('debugger===createRoot');

createRoot(document.getElementById('root')!).render(
  <App />
)
