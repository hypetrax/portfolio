import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="editorial-portfolio">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
