import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { LiveSlider } from '../components/LiveSlider';
import { SEO } from '../components/SEO';
import { viewportOnce, delayed } from '../lib/motion';

interface Study {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  url: string;
  tags: string[];
}

const studies: Study[] = [
  {
    title: "SPX 40-80 DTE Study",
    description: "Een diepgaande kwantitatieve analyse naar het optimaliseren van SPX credit spreads met een focus op looptijden tussen 40 en 80 dagen.",
    challenge: "Het vinden van de 'sweet spot' tussen winstkans en rendement in de optiemarkt, rekening houdend met Theta decay en volatiliteit.",
    solution: "Middels uitgebreide backtesting en data-analyse zijn optimale entry- en exitregels gedefinieerd voor een consistent resultaat.",
    results: ["Duidelijke DTE optimalisatie matrix", "Interactieve strategie simulator", "Data-gedreven risk management regels"],
    url: "/labs/spx",
    tags: ["Quantitative Research", "Options Trading", "Data Analysis"]
  },
  {
    title: "Stacked Probabilities System",
    description: "Een systematische aanpak voor swing trading gebaseerd op het stapelen van technische en statistische kansen.",
    challenge: "Het elimineren van emotie bij trading door strikte technische regels en een herhaalbaar proces te creëren.",
    solution: "Een 'Playbook' benadering die EMAs, de Squeeze indicator en prijsactie combineert in een robuust framework.",
    results: ["Stap-voor-stap setup gids", "Vaste regels voor risk management", "Visuele breakdown van technische indicatoren"],
    url: "/labs/squeeze",
    tags: ["Trading System", "Technical Analysis", "Systematic Trading"]
  },
  {
    title: "ICT Turtle Soup Setup Masterclass",
    description: "Een modernisering van klassieke false-breakout strategieën, gericht op het identificeren van liquiditeits-sweeps en institutionele manipulatie.",
    challenge: "Het herkennen van de 'Judas Swing' en het vermijden van retail traps bij belangrijke prijsniveaus.",
    solution: "Een educatieve breakdown van BSL/SSL, MSS en FVG confluences met een interactieve candlestick simulator.",
    results: ["Interactieve prijsactie simulator", "Duidelijke breakdown van liquidity pools", "Stap-voor-stap executie framework"],
    url: "/labs/turtlesoup",
    tags: ["ICT Concepts", "Liquidity Analysis", "Market Structure"]
  },
  {
    title: "ICT Trading Strategy Masterclass",
    description: "Een uitgebreide gids over de Inner Circle Trader (ICT) methodologie, gericht op het begrijpen van institutionele orderflow en marktmanipulatie.",
    challenge: "Het begrijpen van de verschuiving van retail-paradigma's naar institutionele algoritmen en liquiditeits-gedreven markten.",
    solution: "Een interactieve masterclass die de kernconcepten zoals FVG, Order Blocks en Liquidity Sweeps vertaalt naar een visueel framework.",
    results: ["Interactieve concept glossary", "Visualisatie van retail vs smart money", "Diepgaande FAQ over marktmechanismen"],
    url: "/labs/ict",
    tags: ["Institutional Trading", "Order Flow", "Market Theory"]
  }
];

export const LabsPage = memo(() => {
  const reduced = useReducedMotion();

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  return (
    <>
      <SEO
        title="Quantitative Research & Trading Systems Lab"
        description="Exploratie van systematische trading strategieën, SPX optie backtests en institutionele orderflow analyse (ICT). Data-gedreven financiële inzichten."
        canonical="/labs"
      />
      <header className="hero-header">
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: 0.2 }}
          >
            <source src="/assets/trading.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="container">
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)} style={{ color: '#1a202c' }}>
            Labs & Quantitative Research
          </motion.p>
          <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
            Data-gedreven <span style={{ color: 'var(--accent)' }}>inzichten</span>.
          </motion.h1>
          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)} style={{ color: '#1a202c' }}>
            Naast webontwikkeling focus ik me op kwantitatief onderzoek naar de financiële markten.
            Hieronder vind je een selectie van mijn studies en systemen.
          </motion.p>
        </div>
      </header>

      <main>
        {studies.map((study, index) => (
          <motion.section
            key={study.title}
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
                    <span className="project-number">S{index + 1}</span>
                    <div className="project-tags">
                      {study.tags.map((tag, i) => (
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

                  <h2>
                    {study.title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span style={{ color: 'var(--accent)' }}>{study.title.split(' ').slice(-1)}</span>
                  </h2>
                  <p className="project-intro">{study.description}</p>

                  <div className="case-details">
                    <div className="detail-block">
                      <h3>De Focus</h3>
                      <p>{study.challenge}</p>
                    </div>
                    <div className="detail-block">
                      <h3>De Methode</h3>
                      <p>{study.solution}</p>
                    </div>
                  </div>

                  <div className="results-block">
                    <h3>Key Insights</h3>
                    <ul>
                      {study.results.map((result) => (
                        <li key={result}>{result}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-actions">
                    <motion.div
                      whileHover={reduced ? {} : { scale: 1.02 }}
                      whileTap={reduced ? {} : { scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      style={{ display: 'inline-block' }}
                    >
                      <Link
                        to={study.url}
                        className="btn-primary"
                        aria-label={`Open de volledige studie: ${study.title}`}
                      >
                        Open de volledige studie
                      </Link>
                    </motion.div>
                  </div>
                </div>

                <div className="case-study-visual">
                  <LiveSlider after={study.url} />
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </main>
    </>
  );
});
