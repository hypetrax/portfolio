import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LiveSlider } from '../components/LiveSlider';
import { SEO } from '../components/SEO';
import { LinkedInIcon } from '../components/Icons';
import { viewportOnce, delayed } from '../lib/motion';

interface Project {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  oldUrl?: string;
  sliderBeforeUrl?: string;
  newUrl: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Badminton Hardenberg",
    description: "Een frisse site voor de lokale badmintonclub.",
    challenge: "De oude site was onoverzichtelijk en het was voor nieuwe leden lastig om de juiste informatie te vinden.",
    solution: "Ik heb de structuur versimpeld en een sportief ontwerp gemaakt dat duidelijk laat zien waar de club voor staat.",
    results: ["Informatie is veel sneller te vinden", "Modern mobiel menu", "Eigentijdse uitstraling"],
    oldUrl: "/archives/badmintonhardenberg/index.html",
    sliderBeforeUrl: "/archives/badmintonhardenberg/index.html",
    newUrl: "https://badminton.bartpullen.nl",
    tags: ["UX Design", "Modernisering", "Mobile First"]
  },
  {
    title: "Landhuis — Echt Duurzaam",
    description: "Een professionele website voor een specialist in duurzame installatietechniek.",
    challenge: "Dit installatiebedrijf werkte zonder website, waardoor ze online onzichtbaar waren voor mensen die zochten naar warmtepompen.",
    solution: "Ik heb een website gebouwd die hun expertise in warmtepompen en airconditioning duidelijk presenteert aan de regio.",
    results: ["Goede lokale vindbaarheid", "Professionele uitstraling die vertrouwen wekt", "Duidelijke presentatie van diensten"],
    oldUrl: "https://www.google.com/search?q=Landhuis+Installatietechniek",
    sliderBeforeUrl: "/archives/landhuis-google/index.html",
    newUrl: "https://landhuis.bartpullen.nl/",
    tags: ["Brand Identity", "Duurzaamheid", "SEO"]
  },
  {
    title: "Fluitman Auto's",
    description: "Een nieuwe, snelle website voor een lokaal autobedrijf.",
    challenge: "De oude website was traag, werkte niet goed op telefoons en was lastig aan te passen.",
    solution: "Ik heb de site vanaf de grond opgebouwd met React. De focus lag op snelheid en een helder overzicht van de occasions.",
    results: ["100/100 Lighthouse Performance score", "Werkt perfect op mobiel", "Betere vindbaarheid in Google"],
    oldUrl: "/archives/fluitmanautos/index.html",
    sliderBeforeUrl: "/archives/fluitmanautos/index.html",
    newUrl: "https://age.bartpullen.nl",
    tags: ["Full Rebuild", "React", "Performance"]
  }
];

export const Web = memo(() => {
  const reduced = useReducedMotion();

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  return (
    <>
      <SEO
        title="High-Performance Web Design & React Development"
        description="Moderne, snelle websites zonder overbodige ballast. Expert in React, Vite en performance optimalisatie voor MKB."
        canonical="/web"
      />
      <header className="hero-header">
        <div className="video-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: 1 }}
          >
            <source src="/assets/webdesign.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)} style={{ color: '#1a202c' }}>
            Bart Pullen — Portfolio
          </motion.p>
          <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
            Websites die simpelweg <span style={{ color: 'var(--accent)' }}>werken</span>.
          </motion.h1>
          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)} style={{ color: '#1a202c' }}>
            Ik help bedrijven met het opschonen van hun online aanwezigheid. Geen overbodige poespas,
            maar snelle sites met een logische structuur en een fris design.
          </motion.p>
        </div>
      </header>

      <main>
        {projects.map((project, index) => (
          <motion.section
            key={project.title}
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
                    <span className="project-number">0{index + 1}</span>
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
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
                    {project.title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span style={{ color: 'var(--accent)' }}>{project.title.split(' ').slice(-1)}</span>
                  </h2>
                  <p className="project-intro">{project.description}</p>

                  <div className="case-details">
                    <div className="detail-block">
                      <h3>De Uitdaging</h3>
                      <p>{project.challenge}</p>
                    </div>
                    <div className="detail-block">
                      <h3>De Oplossing</h3>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  <div className="results-block">
                    <h3>Resultaat</h3>
                    <ul>
                      {project.results.map((result) => (
                        <li key={result}>{result}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-actions">
                    <motion.a
                      href={project.newUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      aria-label={`Bekijk de nieuwe site van ${project.title}`}
                      whileHover={reduced ? {} : { scale: 1.02 }}
                      whileTap={reduced ? {} : { scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      Bekijk de nieuwe site
                    </motion.a>
                    {project.oldUrl && (
                      <motion.a
                        href={project.oldUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        aria-label={`Bekijk de oude versie van ${project.title}`}
                        whileHover={reduced ? {} : { scale: 1.02 }}
                        whileTap={reduced ? {} : { scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                      >
                        Bekijk oude versie
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="case-study-visual">
                  <LiveSlider before={project.sliderBeforeUrl} after={project.newUrl} />
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </main>

      <motion.section
        className="cta-section"
        initial={hi}
        whileInView={vp}
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>Website <span style={{ color: 'var(--accent)' }}>vernieuwen</span>?</h2>
          <p>Benieuwd naar de techniek achter deze projecten of hulp nodig bij het opschonen van een bestaande site? Contact via LinkedIn.</p>
          <motion.a
            href="https://www.linkedin.com/in/bartpullen/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-large linkedin-btn"
            aria-label="Connect op LinkedIn voor webdesign projecten"
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
