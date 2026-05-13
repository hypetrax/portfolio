import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const NotFound = memo(() => (
  <>
    <SEO
      title="Pagina niet gevonden"
      description="Deze pagina bestaat niet of is verplaatst."
      canonical="/404"
      noindex
    />
    <main className="case-study" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="case-study-content" style={{ maxWidth: '680px' }}>
          <p className="overline">404</p>
          <h1>Pagina niet gevonden.</h1>
          <p className="project-intro">
            De URL die je hebt geopend bestaat niet. Ga terug naar de homepage of kies een bestaande route.
          </p>
          <div className="project-actions">
            <Link to="/" className="btn-primary">
              Terug naar home
            </Link>
          </div>
        </div>
      </div>
    </main>
  </>
));
