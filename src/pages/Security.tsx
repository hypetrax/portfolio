import { memo } from 'react';
import { Link } from 'react-router-dom';
import { LiveSlider } from '../components/LiveSlider';

export const Security = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Security & Compliance</p>
          <h1>Security die de business <span className="italic">ondersteunt</span>.</h1>
          <p className="lead">
            Ik help organisaties om grip te krijgen op informatiebeveiliging en wetgeving. 
            Geen dikke rapporten voor in de lade, maar praktische plannen die écht werken.
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
                <p className="project-intro">Wat fabrikanten moeten weten over de nieuwe EU-wetgeving voor digitale producten.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>De impact van de CRA op hoe we hardware en software bouwen en onderhouden.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Een heldere analyse van de verplichtingen, risico's en tijdlijnen.</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Key Insights</h3>
                  <ul>
                    <li>Product Check framework</li>
                    <li>Overzicht van risico's</li>
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
                <p className="project-intro">Meer dan alleen een certificaat aan de muur. Hoe je een ISMS bouwt waar de organisatie écht iets aan heeft.</p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het opzetten van een ISMS dat risico's beheersbaar maakt zonder de boel te vertragen.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Methode</h3>
                    <p>Praktische toepassing van de ISO-norm met focus op draagvlak en werkbaarheid.</p>
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

      <section className="cta-section">
        <div className="container">
          <h2>Vragen over Security of Compliance?</h2>
          <p>Laten we bespreken hoe we jouw organisatie veiliger kunnen maken. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="btn-large">Connect op LinkedIn</a>
        </div>
      </section>
    </>
  );
});
