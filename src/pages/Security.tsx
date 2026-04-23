import { memo } from 'react';
import { Link } from 'react-router-dom';
import { LiveSlider } from '../components/LiveSlider';

export const Security = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Security & Compliance</p>
          <h1>Bescherming in een <span className="italic">digitale</span> wereld.</h1>
          <p className="lead">
            Ik help organisaties navigeren door het complexe landschap van cybersecurity en wetgeving. 
            Van strategisch advies tot praktische implementatie van beveiligingsstandaarden.
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
                    <span>Compliance</span>
                  </div>
                </div>
                
                <h2>Cyber Resilience Act (CRA)</h2>
                <p className="project-intro">Een diepgaande analyse van de nieuwe EU-wetgeving voor fabrikanten van digitale producten.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het begrijpen van de impact van de CRA op de levenscyclus van hardware en software.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Analyse van de verplichtingen, risico-classificaties en tijdlijnen voor compliance.</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Key Insights</h3>
                  <ul>
                    <li>Product Check framework</li>
                    <li>Overzicht van boetes en risico's</li>
                    <li>Stappenplan voor fabrikanten</li>
                  </ul>
                </div>

                <div className="project-actions">
                  <Link to="/security/cra" className="btn-primary">
                    Lees de volledige analyse
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
                    <span>Security Officer</span>
                  </div>
                </div>
                
                <h2>ISO 27001 Implementatie</h2>
                <p className="project-intro">Van 'vinkje' naar echt vertrouwen. Hoe ik organisaties help bij het opzetten van een robuust ISMS.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het bouwen van een Information Security Management System dat meegroeit met de organisatie.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Toepassing van de PDCA-cyclus en focus op de CIA-triade (Confidentiality, Integrity, Availability).</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Key Insights</h3>
                  <ul>
                    <li>Maturity groei visualisaties</li>
                    <li>PDCA-cyclus in de praktijk</li>
                    <li>Aantoonbare risico-reductie</li>
                  </ul>
                </div>

                <div className="project-actions">
                  <Link to="/security/iso27001" className="btn-primary">
                    Bekijk de case study
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
    </>
  );
});
