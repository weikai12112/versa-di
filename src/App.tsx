import './App.css'
import { Header } from './components/Header';
import { SiderBar } from './components/SiderBar';
import { IHeaderBar } from './parts/headerbar/headerbar.interface';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ContainerHelper } from './schedulers/base';
import { lazyComponentLoadAtIdle } from './base-react';


const Main = lazyComponentLoadAtIdle(() => import('./components/Main'));
const About = lazyComponentLoadAtIdle(() => import('./components/About'));

function App() {

  return (
    <Router>
      <Header service={ContainerHelper.getContainer().getService(IHeaderBar)} />
      <div style={{ display: 'flex' }}>
        <SiderBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
