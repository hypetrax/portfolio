import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Web } from './pages/Web';
import { Contact } from './pages/Contact';
import { LabsPage } from './pages/LabsPage';
import { SPX } from './pages/labs/SPX';
import { SqueezeSpreads } from './pages/labs/SqueezeSpreads';
import { TurtleSoup } from './pages/labs/TurtleSoup';
import { ICTConcepts } from './pages/labs/ICTConcepts';
import { SecurityPage } from './pages/SecurityPage';
import { CRA } from './pages/security/CRA';
import { ISO27001 } from './pages/security/ISO27001';
import { NotFound } from './pages/NotFound';

export function StaticAppRoutes() {
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
