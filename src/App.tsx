import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Web } from './pages/Web';
import { Labs } from './pages/Labs';
import { SPX } from './pages/labs/SPX';
import { SqueezeSpreads } from './pages/labs/SqueezeSpreads';
import { TurtleSoup } from './pages/labs/TurtleSoup';
import { ICTConcepts } from './pages/labs/ICTConcepts';
import { Security } from './pages/Security';
import { CRA } from './pages/security/CRA';
import { ISO27001 } from './pages/security/ISO27001';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="web" element={<Web />} />
          <Route path="security">
            <Route index element={<Security />} />
            <Route path="cra" element={<CRA />} />
            <Route path="iso27001" element={<ISO27001 />} />
          </Route>
          <Route path="labs">
            <Route index element={<Labs />} />
            <Route path="spx" element={<SPX />} />
            <Route path="squeeze" element={<SqueezeSpreads />} />
            <Route path="turtlesoup" element={<TurtleSoup />} />
            <Route path="ict" element={<ICTConcepts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
