import { memo } from 'react';
import { Link } from 'react-router-dom';

export const Home = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Expert Hub</p>
          <h1>De brug tussen <span className="italic">design, data</span> en <span className="italic">beveiliging</span>.</h1>
          <p className="lead">
            In een steeds complexere digitale wereld help ik organisaties met een holistische aanpak. 
            Van razendsnelle websites tot robuuste cybersecurity en kwantitatieve inzichten.
          </p>
        </div>
      </header>

      <main>
        <section className="expertise-section">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h3>01 — Design & Development</h3>
                <h2>Websites die converteren.</h2>
                <p className="project-intro">
                  Ik herstructureer verouderde platformen naar moderne, performante web-ervaringen. 
                  Focus op UX, snelheid en resultaat.
                </p>
                <div className="project-actions">
                  <Link to="/web" className="btn-primary">Bekijk Portfolio</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }}>🌐</span>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <div className="case-study-grid" style={{ direction: 'rtl' }}>
              <div className="case-study-content" style={{ direction: 'ltr' }}>
                <h3>02 — Security & Compliance</h3>
                <h2>Digitale weerbaarheid.</h2>
                <p className="project-intro">
                  Gespecialiseerd in ISO 27001 implementaties en strategisch advies over EU-wetgeving zoals de Cyber Resilience Act.
                </p>
                <div className="project-actions">
                  <Link to="/security" className="btn-primary">Expertise Bekijken</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }}>🛡️</span>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h3>03 — Labs & Research</h3>
                <h2>Data-gedreven trading.</h2>
                <p className="project-intro">
                  Kwantitatief onderzoek naar financiële markten, optimalisatie van optiestrategieën en systemische trading frameworks.
                </p>
                <div className="project-actions">
                  <Link to="/labs" className="btn-primary">Bekijk Studies</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }}>📈</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Klaar om te bouwen of te beveiligen?</h2>
          <p>Laten we bespreken hoe ik jouw organisatie naar het volgende niveau kan tillen.</p>
          <a href="mailto:info@bartpullen.nl" className="btn-large">Neem contact op</a>
        </div>
      </section>
    </>
  );
});
