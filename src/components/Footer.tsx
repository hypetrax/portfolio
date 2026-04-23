import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p>&copy; {new Date().getFullYear()} Bart Pullen. Gebouwd met React & TypeScript.</p>
          </div>
          <div className="footer-labs">
            <nav className="labs-nav">
              <Link to="/web" className="labs-link">Web Development</Link>
              <span className="divider">|</span>
              <Link to="/security" className="labs-link">Security & Compliance</Link>
              <span className="divider">|</span>
              <Link to="/labs" className="labs-link">Labs & Research</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
