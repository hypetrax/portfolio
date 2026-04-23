import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <nav className="main-nav">
      <div className="container">
        <Link to="/" className="nav-logo">Bart Pullen</Link>
        <div className="nav-links">
          <Link to="/web" className={isActive('/web')}>Web</Link>
          <Link to="/security" className={isActive('/security')}>Security</Link>
          <Link to="/labs" className={isActive('/labs')}>Labs</Link>
        </div>
      </div>
    </nav>
  );
};
