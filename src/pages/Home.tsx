import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Home = memo(() => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bart Pullen",
    "url": "https://bartpullen.nl",
    "jobTitle": "Freelance Webdesigner & Information Security Officer",
    "sameAs": [
      "https://www.linkedin.com/in/bartpullen", // Aanpassen indien nodig
      "https://github.com/hypetrax"
    ],
    "description": "Bart Pullen is een expert in webdesign, cybersecurity (ISO 27001) en kwantitatieve analyse."
  };

  return (
    <>
      <SEO 
        title="Webdesign & Security Expert" 
        description="Bart Pullen transformeert verouderde websites naar moderne ervaringen en adviseert over cybersecurity en compliance (CRA/ISO 27001)."
        canonical="/"
        schema={personSchema}
      />
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Expert Hub</p>
          <h1>De brug tussen <span className="italic">webdesign</span>, <span className="italic">data</span> en <span className="italic">security</span>.</h1>
          <p className="lead">
            Freelance webdesigner en security officer. Ik help organisaties met een holistische aanpak: van razendsnelle websites tot robuuste cybersecurity en kwantitatieve inzichten.
          </p>
        </div>
      </header>

      <main>
        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid">
              <div className="case-study-content">
                <header>
                  <h3>01 — Design & Development</h3>
                  <h2>Freelance Webdesigner & Developer.</h2>
                </header>
                <p className="project-intro">
                  Ik herstructureer verouderde platformen naar moderne, performante web-ervaringen. Focus op UX, snelheid (Core Web Vitals) en resultaat.
                </p>
                <div className="project-actions">
                  <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">Bekijk Portfolio</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }} role="img" aria-label="Webdesign icoon">🌐</span>
              </div>
            </article>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid" style={{ direction: 'rtl' }}>
              <div className="case-study-content" style={{ direction: 'ltr' }}>
                <header>
                  <h3>02 — Security & Compliance</h3>
                  <h2>Information Security Officer (ISO 27001).</h2>
                </header>
                <p className="project-intro">
                  Gespecialiseerd in ISO 27001 implementaties en strategisch advies over EU-wetgeving zoals de Cyber Resilience Act (CRA).
                </p>
                <div className="project-actions">
                  <Link to="/security" className="btn-primary" aria-label="Bekijk security expertise">Expertise Bekijken</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }} role="img" aria-label="Security icoon">🛡️</span>
              </div>
            </article>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid">
              <div className="case-study-content">
                <header>
                  <h3>03 — Labs & Research</h3>
                  <h2>Quantitative Analyst & Trader.</h2>
                </header>
                <p className="project-intro">
                  Kwantitatief onderzoek naar financiële markten, optimalisatie van optiestrategieën en systemische trading frameworks.
                </p>
                <div className="project-actions">
                  <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">Bekijk Studies</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f5', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }} role="img" aria-label="Grafiek icoon">📈</span>
              </div>
            </article>
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Klaar om te bouwen of te beveiligen?</h2>
          <p>Laten we bespreken hoe ik jouw organisatie naar het volgende niveau kan tillen als freelancer.</p>
          <a href="mailto:info@bartpullen.nl" className="btn-large">Neem contact op</a>
        </div>
      </section>
    </>
  );
});
