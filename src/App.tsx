import './App.css'
import { Header } from './components/Header';
import { SiderBar } from './components/SiderBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ContainerHelper } from './schedulers/base';
import { lazyComponentLoadAtIdle } from './base-react';
import { HeaderStore } from './stores/header';
import { useEffect, useState } from 'react';


const Main = lazyComponentLoadAtIdle(() => import('./components/Main'));
const About = lazyComponentLoadAtIdle(() => import('./components/About'));

function App() {
  const [headerStore, setHeaderStore] = useState<HeaderStore>()

  useEffect(() => {
    setHeaderStore(ContainerHelper.getContainer().createInstance(HeaderStore))
  }, []);

  return (
    <Router>
      {headerStore ? <Header store={headerStore} /> : null}
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
