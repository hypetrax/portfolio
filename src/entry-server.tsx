import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { StaticAppRoutes } from './StaticAppRoutes';

export function render(pathname: string) {
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={pathname}>
        <StaticAppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  );
}
