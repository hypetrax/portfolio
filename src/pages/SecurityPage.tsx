import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { LiveSlider } from '../components/LiveSlider';
import { SEO } from '../components/SEO';
import { LinkedInIcon } from '../components/Icons';
import { viewportOnce, delayed } from '../lib/motion';

export const SecurityPage = memo(() => {
  const reduced = useReducedMotion();

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  return (
    <>
      <SEO
        title="Information Security & Compliance (ISO 27001 / CRA)"
        description="Senior Security Officer diensten: ISO 27001:2022 implementatie en Cyber Resilience Act compliance voor digitale producten."
        canonical="/security"
      />
      <header className="hero-header">
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/security.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)} style={{ color: '#1a202c' }}>
            Security & Compliance
          </motion.p>
          <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
            Security die de business <span style={{ color: 'var(--accent)' }}>versterkt</span>.
          </motion.h1>
          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)} style={{ color: '#1a202c' }}>
            In mijn rol als Security Officer richt ik me op het bouwen van een robuust en werkbaar
            security-fundament. Geen theoretische exercities, maar meetbare resultaten die de
            continuïteit en het vertrouwen van de organisatie waarborgen.
          </motion.p>
        </div>
      </header>

      <main>
        {/* CRA */}
        <motion.section
          className="case-study"
          initial={hi}
          whileInView={vp}
          viewport={viewportOnce}
          transition={reduced ? { duration: 0 } : { duration: 0.38, ease: 'easeOut', delay: 0.05 }}
        >
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <div className="project-meta">
                  <span className="project-number">01</span>
                  <div className="project-tags">
                    {['EU Legislation', 'Cybersecurity', 'Internal Impact'].map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={reduced ? {} : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <h2>Cyber Resilience Act <span style={{ color: 'var(--accent)' }}>(CRA)</span></h2>
                <p className="project-intro">
                  Hoe we onze productontwikkeling voorbereiden op de nieuwe EU-wetgeving voor digitale producten.
                </p>

                <div className="case-details">
                  <div className="detail-block">
                    <h3>De Focus</h3>
                    <p>Het vertaling van de CRA naar concrete eisen voor onze hardware en software engineering teams.</p>
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
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/security/cra" className="btn-primary">
                      Bekijk de analyse & aanpak
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="case-study-visual">
                <LiveSlider after="/security/cra" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ISO 27001 */}
        <motion.section
          className="case-study"
          initial={hi}
          whileInView={vp}
          viewport={viewportOnce}
          transition={reduced ? { duration: 0 } : { duration: 0.38, ease: 'easeOut', delay: 0.05 }}
        >
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <div className="project-meta">
                  <span className="project-number">02</span>
                  <div className="project-tags">
                    {['ISO 27001', 'ISMS', 'Strategy'].map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={reduced ? {} : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <h2><span style={{ color: 'var(--accent)' }}>ISO 27001</span> Implementatie</h2>
                <p className="project-intro">
                  De realisatie van een ISMS dat niet alleen voldoet aan de norm, maar ook de operationele efficiëntie verhoogt.
                </p>

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
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/security/iso27001" className="btn-primary">
                      Bekijk de implementatie-aanpak
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="case-study-visual">
                <LiveSlider after="/security/iso27001" />
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.section
        className="cta-section"
        initial={hi}
        whileInView={vp}
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>Verder <span style={{ color: 'var(--accent)' }}>praten</span>?</h2>
          <p>Vragen over de details van deze trajecten of zin om ervaringen uit te wisselen over werkbare security? Je vindt me op LinkedIn.</p>
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
