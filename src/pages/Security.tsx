import { memo } from 'react';
import { Link } from 'react-router-dom';
import { LiveSlider } from '../components/LiveSlider';

export const Security = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Security & Compliance</p>
          <h1>Security die de business <span className="italic">versterkt</span>.</h1>
          <p className="lead">
            In mijn rol als Security Officer richt ik me op het bouwen van een robuust en werkbaar security-fundament. 
            Geen theoretische exercities, maar meetbare resultaten die de continuïteit en het vertrouwen van de organisatie waarborgen.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <div className="project-meta">
                  <span className="project-number">01</span>
                  <div className="project-tags">
                    <span>EU Legislation</span>
                    <span>Cybersecurity</span>
                    <span>Internal Impact</span>
                  </div>
                </div>
                
                <h2>Cyber Resilience Act (CRA)</h2>
                <p className="project-intro">Hoe we onze productontwikkeling voorbereiden op de nieuwe EU-wetgeving voor digitale producten.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het vertalen van de CRA naar concrete eisen voor onze hardware en software engineering teams.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Een diepgaande gap-analyse en het inrichten van processen voor SBOM-beheer en incidentrapportage.</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Behaalde Resultaten</h3>
                  <ul>
                    <li>Product Compliance framework</li>
                    <li>Geautomatiseerde SBOM-generatie</li>
                    <li>Governance voor kwetsbaarheidsbeheer</li>
                  </ul>
                </div>

                <div className="project-actions">
                  <Link to="/security/cra" className="btn-primary">
                    Bekijk de analyse & aanpak
                  </Link>
                </div>
              </div>
              
              <div className="case-study-visual">
                 <LiveSlider after="/security/cra" />
              </div>
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <div className="project-meta">
                  <span className="project-number">02</span>
                  <div className="project-tags">
                    <span>ISO 27001</span>
                    <span>ISMS</span>
                    <span>Strategy</span>
                  </div>
                </div>
                
                <h2>ISO 27001 Implementatie</h2>
                <p className="project-intro">De realisatie van een ISMS dat niet alleen voldoet aan de norm, maar ook de operationele efficiëntie verhoogt.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het verankeren van informatiebeveiliging in de dagelijkse workflow van de organisatie.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Een pragmatische implementatie van de ISO 27001:2022 norm met sterke focus op risicomanagement en cultuur.</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Behaalde Resultaten</h3>
                  <ul>
                    <li>ISO 27001:2022 certificering</li>
                    <li>Significante stijging in security awareness</li>
                    <li>Meetbare reductie in operationele risico's</li>
                  </ul>
                </div>

                <div className="project-actions">
                  <Link to="/security/iso27001" className="btn-primary">
                    Bekijk de implementatie-aanpak
                  </Link>
                </div>
              </div>
              
              <div className="case-study-visual">
                 <LiveSlider after="/security/iso27001" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Verder praten?</h2>
          <p>Vragen over de details van deze trajecten of zin om ervaringen uit te wisselen over werkbare security? Je vindt me op LinkedIn.</p>
          <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="btn-large">Connect op LinkedIn</a>
        </div>
      </section>
    </>
  );
});
