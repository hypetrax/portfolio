import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const NAV_LINKS = [
  { to: '/security', label: 'Security' },
  { to: '/web',      label: 'Web' },
  { to: '/labs',     label: 'Labs' },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  return (
    <motion.nav
      className="main-nav"
      initial={reduced ? {} : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container">
        <motion.div
          whileHover={reduced ? {} : { scale: 1.03 }}
          transition={{ duration: 0.15 }}
        >
          <Link to="/" className="nav-logo">Bart Pullen</Link>
        </motion.div>

        <div className="nav-links">
          {NAV_LINKS.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={active ? 'active' : ''}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                {label}
                {active && !reduced && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--accent)',
                      borderRadius: 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
