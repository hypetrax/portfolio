import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { viewportOnce } from '../lib/motion';

export const Footer = () => {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      className="editorial-footer"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p>&copy; {new Date().getFullYear()} Bart Pullen. Gebouwd met React & TypeScript.</p>
          </div>
          <div className="footer-labs">
            <nav className="labs-nav">
              <Link to="/security" className="labs-link">Security & Compliance</Link>
              <span className="divider">|</span>
              <Link to="/web" className="labs-link">Web Development</Link>
              <span className="divider">|</span>
              <Link to="/labs" className="labs-link">Labs & Research</Link>
              <span className="divider">|</span>
              <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="labs-link">LinkedIn</a>
            </nav>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
