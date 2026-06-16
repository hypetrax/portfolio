import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

const Web = lazy(() => import('./pages/Web').then((module) => ({ default: module.Web })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const LabsPage = lazy(() => import('./pages/LabsPage').then((module) => ({ default: module.LabsPage })));
const SPX = lazy(() => import('./pages/labs/SPX').then((module) => ({ default: module.SPX })));
const SqueezeSpreads = lazy(() => import('./pages/labs/SqueezeSpreads').then((module) => ({ default: module.SqueezeSpreads })));
const TurtleSoup = lazy(() => import('./pages/labs/TurtleSoup').then((module) => ({ default: module.TurtleSoup })));
const ICTConcepts = lazy(() => import('./pages/labs/ICTConcepts').then((module) => ({ default: module.ICTConcepts })));
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((module) => ({ default: module.SecurityPage })));
const CRA = lazy(() => import('./pages/security/CRA').then((module) => ({ default: module.CRA })));
const ISO27001 = lazy(() => import('./pages/security/ISO27001').then((module) => ({ default: module.ISO27001 })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="web" element={<Web />} />
          <Route path="contact" element={<Contact />} />
          <Route path="security">
            <Route index element={<SecurityPage />} />
            <Route path="cra" element={<CRA />} />
            <Route path="iso27001" element={<ISO27001 />} />
          </Route>
          <Route path="labs">
            <Route index element={<LabsPage />} />
            <Route path="spx" element={<SPX />} />
            <Route path="squeeze" element={<SqueezeSpreads />} />
            <Route path="turtlesoup" element={<TurtleSoup />} />
            <Route path="ict" element={<ICTConcepts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
