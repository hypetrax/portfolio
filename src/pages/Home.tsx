import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Home = memo(() => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bart Pullen",
    "url": "https://bartpullen.nl",
    "jobTitle": "Webdesigner & Information Security Officer",
    "sameAs": [
      "https://www.linkedin.com/in/bartpullen/",
      "https://github.com/hypetrax"
    ],
    "description": "Het persoonlijke portfolio van Bart Pullen, met focus op webdesign, cybersecurity en kwantitatieve analyse."
  };

  return (
    <>
      <SEO 
        title="Bart Pullen — Portfolio" 
        description="Het werk van Bart Pullen: van ISO 27001 security en compliance tot webdesign en kwantitatieve data-analyse."
        canonical="/"
        schema={personSchema}
      />
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Portfolio</p>
          <h1>Ik regel <span className="italic">security</span>, bouw <span className="italic">websites</span> en analyseer <span className="italic">data</span>.</h1>
          <p className="lead">
            Dit is mijn persoonlijke plek waar ik projecten en onderzoeken deel. Geen theoretische verhalen, maar tastbaar werk: van diepgaande security-analyses tot het moderniseren van verouderde sites en trading modellen.
          </p>
        </div>
      </header>

      <main>
        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid">
              <div className="case-study-content">
                <header>
                  <h3>01 — Security & Compliance</h3>
                  <h2>Security Officer.</h2>
                </header>
                <p className="project-intro">
                  Informatiebeveiliging is meer dan alleen een certificaat aan de muur. Ik richt me op werkbare security: van ISO 27001 implementaties tot impact-analyses van de Cyber Resilience Act.
                </p>
                <div className="project-actions">
                  <Link to="/security" className="btn-primary" aria-label="Bekijk security expertise">Bekijk expertise</Link>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f4', borderRadius: '4px', padding: '40px', textAlign: 'center' }}>
                <span style={{ fontSize: '80px' }} role="img" aria-label="Security icoon">🛡️</span>
              </div>
            </article>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid" style={{ direction: 'rtl' }}>
              <div className="case-study-content" style={{ direction: 'ltr' }}>
                <header>
                  <h3>02 — Design & Development</h3>
                  <h2>Websites & Code.</h2>
                </header>
                <p className="project-intro">
                  Ik help bedrijven met het opschonen van hun digitale aanwezigheid. Geen zware thema's, maar snelle, schone code en een design dat werkt op elk scherm.
                </p>
                <div className="project-actions">
                  <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">Bekijk mijn werk</Link>
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
            <article className="case-study-grid">
              <div className="case-study-content">
                <header>
                  <h3>03 — Labs & Research</h3>
                  <h2>Labs & Onderzoek.</h2>
                </header>
                <p className="project-intro">
                  Mijn speeltuin voor data. Hier onderzoek ik systematische trading-strategieën, bouw ik modellen voor opties en test ik nieuwe technologieën.
                </p>
                <div className="project-actions">
                  <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">Bekijk de labs</Link>
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
          <h2>Meer weten over mijn werk?</h2>
          <p>Ik vertel je graag meer over de achtergrond van deze projecten. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="btn-large">Connect op LinkedIn</a>
        </div>
      </section>
    </>
  );
});
