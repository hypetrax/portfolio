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
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=3386348a28766100529944a3397984024b423f03&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="overline">Bart Pullen — Portfolio</p>
          <h1>Ik regel <span style={{ color: 'var(--accent)' }}>security</span>, bouw <span style={{ color: 'var(--accent)' }}>websites</span> en analyseer <span style={{ color: 'var(--accent)' }}>data</span>.</h1>
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
                  <h2>Security <span style={{ color: 'var(--accent)' }}>Officer</span>.</h2>
                </header>
                <p className="project-intro">
                  Informatiebeveiliging is meer dan alleen een certificaat aan de muur. Ik richt me op werkbare security: van ISO 27001 implementaties tot impact-analyses van de Cyber Resilience Act.
                </p>
                <div className="project-actions">
                  <Link to="/security" className="btn-primary" aria-label="Bekijk security expertise">Bekijk expertise</Link>
                </div>
              </div>
              <div className="case-study-visual">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                  alt="Cybersecurity en data encryptie concept" 
                  className="expertise-image"
                />
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
                  <h2>Websites & <span style={{ color: 'var(--accent)' }}>Code</span>.</h2>
                </header>
                <p className="project-intro">
                  Ik help bedrijven met het opschonen van hun digitale aanwezigheid. Geen zware thema's, maar snelle, schone code en een design dat werkt op elk scherm.
                </p>
                <div className="project-actions">
                  <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">Bekijk mijn werk</Link>
                </div>
              </div>
              <div className="case-study-visual">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" 
                  alt="Modern web development en clean code" 
                  className="expertise-image"
                />
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
                  <h2>Labs & <span style={{ color: 'var(--accent)' }}>Onderzoek</span>.</h2>
                </header>
                <p className="project-intro">
                  Mijn speeltuin voor data. Hier onderzoek ik systematische trading-strategieën, bouw ik modellen voor opties en test ik nieuwe technologieën.
                </p>
                <div className="project-actions">
                  <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">Bekijk de labs</Link>
                </div>
              </div>
              <div className="case-study-visual">
                <img 
                  src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800" 
                  alt="Technical analysis trading charts" 
                  className="expertise-image"
                />
              </div>
            </article>
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Meer weten over mijn <span style={{ color: 'var(--accent)' }}>werk</span>?</h2>
          <p>Ik vertel je graag meer over de achtergrond van deze projecten. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="btn-large">Connect op LinkedIn</a>
        </div>
      </section>
    </>
  );
});
