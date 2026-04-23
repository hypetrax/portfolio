import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Studies } from './pages/Studies';

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
      <div className="editorial-portfolio">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studies" element={<Studies />} />
        </Routes>

        <footer className="editorial-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-main">
                <p>&copy; {new Date().getFullYear()} Bart Pullen. Gebouwd met React & TypeScript.</p>
              </div>
              <div className="footer-labs">
                <span className="labs-title">Labs & Quantitative Research:</span>
                <nav className="labs-nav">
                  <Link to="/" className="labs-link">Web Development</Link>
                  <span className="divider">|</span>
                  <Link to="/studies" className="labs-link">Trading Studies</Link>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
