import './App.css'
import { Header } from './components/Header';
import { SiderBar } from './components/SiderBar';
import React, { Suspense } from 'react';

// 闲时加载组件
function lazyComponentLoadAtIdle<T extends React.ComponentType<any>>(importer: () => Promise<{ default: T }>) {
  let loaded: Promise<{ default: T }> | null = null;
  const load = () => loaded || (loaded = importer());
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(load);
  } else {
    setTimeout(load);
  }
  return React.lazy(() => load());
}

import { IHeaderBar } from './parts/headerbar/headerbar.interface';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ContainerHelper } from './schedulers/base';


const Main = lazyComponentLoadAtIdle(() => import('./components/Main'));
const About = lazyComponentLoadAtIdle(() => import('./components/About'));

function App() {

  return (
      <Router>
        <Header service={ContainerHelper.getContainer().getService(IHeaderBar)} />
        <div style={{ display: 'flex' }}>
          <SiderBar />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<div style={{padding: 24}}>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
  );
}

export default App;
