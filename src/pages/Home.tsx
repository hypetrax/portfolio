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
        title="Persoonlijk Portfolio" 
        description="Bekijk het werk van Bart Pullen op het gebied van webdesign, cybersecurity (ISO 27001) en kwantitatieve analyse."
        canonical="/"
        schema={personSchema}
      />
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Showcase</p>
          <h1>Een verzameling van <span className="italic">design</span>, <span className="italic">data</span> en <span className="italic">security</span>.</h1>
          <p className="lead">
            Dit is mijn persoonlijke plek waar ik mijn projecten en onderzoeken deel. Van het moderniseren van websites tot diepgaande cybersecurity analyses en kwantitatieve modellen.
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
                  <h2>Webdesign & Development.</h2>
                </header>
                <p className="project-intro">
                  Een selectie van webprojecten waarbij ik focus op het transformeren van verouderde platformen naar moderne, performante ervaringen.
                </p>
                <div className="project-actions">
                  <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">Projecten Bekijken</Link>
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
                  <h2>Security Officer Expertise.</h2>
                </header>
                <p className="project-intro">
                  Mijn werk op het gebied van informatiebeveiliging, variërend van ISO 27001 implementaties tot analyses over de Cyber Resilience Act (CRA).
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
                  <h2>Quantitative Research & Data.</h2>
                </header>
                <p className="project-intro">
                  Onderzoek en modellen gericht op financiële markten, optiestrategieën en systematische trading frameworks.
                </p>
                <div className="project-actions">
                  <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">Studies Bekijken</Link>
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
