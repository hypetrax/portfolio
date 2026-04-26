import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { LinkedInIcon } from '../components/Icons';
import { viewportOnce, delayed } from '../lib/motion';

export const Home = memo(() => {
  const [videoStarted, setVideoStarted] = useState(false);
  const reduced = useReducedMotion();

  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);
  const vp = { opacity: 1, y: 0 };
  const hi = reduced ? {} : { opacity: 0, y: 24 };

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
        title="Bart Pullen — Security, Web & Data Specialist"
        description="Senior Information Security Officer en Webdesigner. Expert in ISO 27001, Cyber Resilience Act en data-gedreven web development."
        canonical="/"
        schema={personSchema}
      />
      <header className="hero-header">
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.webp"
            onPlay={() => setVideoStarted(true)}
            className={videoStarted ? 'is-playing' : ''}
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="technical-metadata">
            <span className="metadata-item">SYS_READY</span>
            <span className="metadata-item">SEC_PROTOCOL_V2</span>
            <span className="metadata-item">DATA_SYNC_OK</span>
          </div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)}>
            Bart Pullen — Portfolio
          </motion.p>
          <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
            Ik regel <span style={{ color: 'var(--accent)' }}>security</span>, bouw{' '}
            <span style={{ color: 'var(--accent)' }}>websites</span> en analyseer{' '}
            <span style={{ color: 'var(--accent)' }}>data</span>.
          </motion.h1>
          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)}>
            Dit is mijn persoonlijke plek waar ik projecten en onderzoeken deel. Geen theoretische
            verhalen, maar tastbaar <span style={{ color: 'var(--accent)' }}>werk</span>: van
            diepgaande security-analyses tot het moderniseren van verouderde sites en trading modellen.
          </motion.p>
        </div>
      </header>

      <main>
        {/* 01 — Security */}
        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid">
              <motion.div
                className="case-study-content"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>01 — Security & Compliance</h3>
                  <h2>Security <span style={{ color: 'var(--accent)' }}>Officer</span>.</h2>
                </header>
                <p className="project-intro">
                  Informatiebeveiliging is meer dan alleen een certificaat aan de muur. Ik richt me op
                  werkbare security: van ISO 27001 implementaties tot impact-analyses van de Cyber
                  Resilience Act.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/security" className="btn-primary" aria-label="Bekijk security expertise">
                      Bekijk expertise
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="case-study-visual"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/security.webp"
                  alt="Cybersecurity en data encryptie concept"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>

        {/* 02 — Web */}
        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid" style={{ direction: 'rtl' }}>
              <motion.div
                className="case-study-content"
                style={{ direction: 'ltr' }}
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>02 — Design & Development</h3>
                  <h2>Websites & <span style={{ color: 'var(--accent)' }}>Code</span>.</h2>
                </header>
                <p className="project-intro">
                  Ik help bedrijven met het opschonen van hun digitale aanwezigheid. Geen zware thema's,
                  maar snelle, schone code en een design dat werkt op elk scherm.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">
                      Bekijk mijn werk
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="case-study-visual"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/web.webp"
                  alt="Modern web development en clean code"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>

        {/* 03 — Labs */}
        <section className="expertise-section">
          <div className="container">
            <article className="case-study-grid">
              <motion.div
                className="case-study-content"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>03 — Labs & Research</h3>
                  <h2>Labs & <span style={{ color: 'var(--accent)' }}>Onderzoek</span>.</h2>
                </header>
                <p className="project-intro">
                  Mijn speeltuin voor data. Hier onderzoek ik systematische trading-strategieën, bouw ik
                  modellen voor opties en test ik nieuwe technologieën.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">
                      Bekijk de labs
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="case-study-visual"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/labs.webp"
                  alt="Technical analysis trading charts"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>
      </main>

      <motion.section
        className="cta-section"
        initial={hi}
        whileInView={vp}
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>Meer weten over mijn <span style={{ color: 'var(--accent)' }}>werk</span>?</h2>
          <p>Ik vertel je graag meer over de achtergrond van deze projecten. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <motion.a
            href="https://www.linkedin.com/in/bartpullen/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-large linkedin-btn"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <LinkedInIcon />
            <span>Connect op LinkedIn</span>
          </motion.a>
        </div>
      </motion.section>
    </>
  );
});
