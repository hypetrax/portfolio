import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LiveSlider } from '../components/LiveSlider';
import { SEO } from '../components/SEO';
import { LinkedInIcon } from '../components/Icons';
import { viewportOnce, delayed } from '../lib/motion';

interface Project {
  title: string;
  description: string;
  story: {
    label: string;
    text: string;
  }[];
  results: string[];
  techTransformation: {
    before: {
      title: string;
      text: string;
      tags: string[];
    };
    after: {
      title: string;
      text: string;
      tags: string[];
    };
  };
  oldUrl?: string;
  sliderBeforeUrl?: string;
  newUrl: string;
  tags: string[];
  pageSpeed?: {
    label: string;
    reportDate: string;
    sourceUrl: string;
    scores: {
      label: string;
      value: string;
      tone?: 'primary' | 'muted';
    }[];
    metrics: {
      label: string;
      value: string;
    }[];
  };
}

const projects: Project[] = [
  {
    title: "Badminton Hardenberg",
    description: "Een frisse site voor de lokale badmintonclub.",
    story: [
      {
        label: "Startpunt",
        text: "De oude website had veel losse informatie, maar weinig richting. Ik ben begonnen met de vraag wat een nieuw lid, ouder of bestaande speler direct moet kunnen vinden."
      },
      {
        label: "Aanpak",
        text: "Daarna heb ik de informatiearchitectuur opnieuw opgezet: routes voor lid worden, speeltijden, contact, downloads en clubinformatie. De technische basis is opgebouwd rond herbruikbare secties, centrale SEO-data en een mobiel menu."
      },
      {
        label: "Realisatie",
        text: "In de uitvoering heb ik het ontwerp sportiever gemaakt met meer visuele energie, maar de site tegelijk eenvoudiger gehouden. Performance, responsive gedrag en vindbaarheid zijn tijdens het bouwen meegenomen in plaats van achteraf toegevoegd."
      },
      {
        label: "Resultaat",
        text: "De nieuwe website voelt moderner, werkt beter op mobiel en brengt bezoekers sneller bij de informatie die voor de club belangrijk is."
      }
    ],
    results: ["Informatie is veel sneller te vinden", "Modern mobiel menu", "Eigentijdse uitstraling"],
    techTransformation: {
      before: {
        title: "Wix CMS-site",
        text: "De oude site draaide op Wix/Thunderbolt met Wix-rendering, Parastorage- en wixstatic-assets en beperkte controle over de technische structuur.",
        tags: ["Wix CMS", "Thunderbolt", "Parastorage"]
      },
      after: {
        title: "React/Vite-site op Vercel",
        text: "De nieuwe site is opgebouwd als snelle React/Vite frontend met statische SEO-meta, JSON-LD voor de vereniging, analytics en responsive componenten.",
        tags: ["React", "Vite", "Vercel", "JSON-LD", "Analytics"]
      }
    },
    oldUrl: "/archives/badmintonhardenberg/index.html",
    sliderBeforeUrl: "/archives/badmintonhardenberg/index.html",
    newUrl: "https://badmintonhardenberg.nl",
    tags: ["UX Design", "Modernisering", "Mobile First"]
  },
  {
    title: "Landhuis — Echt Duurzaam",
    description: "Een professionele website voor een specialist in duurzame installatietechniek.",
    story: [
      {
        label: "Startpunt",
        text: "Landhuis had nog geen eigen website. De online basis bestond vooral uit Google-bedrijfsinformatie en reviews: genoeg vertrouwen, maar geen plek om diensten en expertise goed uit te leggen."
      },
      {
        label: "Aanpak",
        text: "Ik heb die basis vertaald naar een lokale service-structuur: warmtepompen, airconditioning, regio, vakmanschap en contact. De content is opgezet voor duidelijke scanbaarheid en lokale SEO."
      },
      {
        label: "Realisatie",
        text: "De website is gebouwd als een rustige, professionele presentatie met duidelijke dienstblokken, sterke call-to-actions en een technische opzet die snel laadt en makkelijk uitbreidbaar blijft."
      },
      {
        label: "Resultaat",
        text: "Van alleen zichtbaar zijn in Google is Landhuis naar een eigen website gegaan die vertrouwen vasthoudt, diensten uitlegt en lokaal beter gevonden kan worden."
      }
    ],
    results: ["Goede lokale vindbaarheid", "Professionele uitstraling die vertrouwen wekt", "Duidelijke presentatie van diensten"],
    techTransformation: {
      before: {
        title: "Alleen Google-profiel",
        text: "Er was geen eigen website. De online aanwezigheid bestond uit Google-resultaten, Maps-informatie en enkele reviews als vertrouwen-signaal.",
        tags: ["Google Maps", "Reviews", "Geen website"]
      },
      after: {
        title: "Servicegerichte React-site",
        text: "De nieuwe website draait op Vercel met een Vite-bundle, eigen metadata, lokale dienstenstructuur en content voor warmtepompen, airco en elektra.",
        tags: ["React", "Vite", "Vercel", "Local SEO", "Metadata"]
      }
    },
    oldUrl: "https://www.google.com/search?q=Landhuis+Installatietechniek",
    sliderBeforeUrl: "/archives/landhuis-google/index.html",
    newUrl: "https://landhuis.bartpullen.nl/",
    tags: ["Brand Identity", "Duurzaamheid", "SEO"]
  },
  {
    title: "Fluitman Auto's",
    description: "Een nieuwe, snelle website voor een lokaal autobedrijf.",
    story: [
      {
        label: "Startpunt",
        text: "De bestaande website was traag, werkte matig op mobiel en was lastig te onderhouden. De inhoud draaide vooral om garagewerkzaamheden: onderhoud, reparatie, APK, camperonderhoud en aircoservice."
      },
      {
        label: "Aanpak",
        text: "Ik heb de site teruggebracht naar de kern: diensten, vertrouwen, contact en snelheid. De technische keuze viel op een nieuwe React-opbouw met minder ballast en een duidelijkere componentstructuur."
      },
      {
        label: "Realisatie",
        text: "Tijdens de bouw lag de focus op snelle rendering, responsive layout en een heldere presentatie van de werkplaatsdiensten. Oude technische afhankelijkheden zijn vervangen door een lichtere frontend."
      },
      {
        label: "Resultaat",
        text: "De nieuwe website is sneller, duidelijker op mobiel en beter voorbereid op vindbaarheid, met een 100/100 Lighthouse Performance-score als meetbaar resultaat."
      }
    ],
    results: ["100/100 Lighthouse Performance score", "Werkt perfect op mobiel", "Betere vindbaarheid in Google"],
    techTransformation: {
      before: {
        title: "WordPress + Avada",
        text: "De oude site gebruikte WordPress met Avada/Fusion Builder, Yoast SEO, MonsterInsights, jQuery en veel theme- en plugin-scripts.",
        tags: ["WordPress", "Avada", "Fusion Builder", "Yoast", "jQuery"]
      },
      after: {
        title: "Lichte React-frontend",
        text: "De nieuwe site is teruggebracht naar een snellere React/Vite frontend op Vercel, met analytics behouden en minder runtime-ballast in de interface.",
        tags: ["React", "Vite", "Vercel", "Analytics", "Performance"]
      }
    },
    oldUrl: "/archives/fluitmanautos/index.html",
    sliderBeforeUrl: "/archives/fluitmanautos/index.html",
    newUrl: "https://fluitmanautos.nl",
    tags: ["Full Rebuild", "React", "Performance"],
    pageSpeed: {
      label: "Google PageSpeed Insights",
      reportDate: "12 juni 2026, 10:04:53",
      sourceUrl: "https://pagespeed.web.dev/analysis/https-fluitmanautos-nl/97qyz9nkec?form_factor=desktop",
      scores: [
        { label: "Performance", value: "100/100", tone: "primary" },
        { label: "Form factor", value: "Desktop" },
        { label: "Velddata", value: "Geen CrUX-data" }
      ],
      metrics: [
        { label: "Focus", value: "Snelle rendering" },
        { label: "Basis", value: "Lichte React/Vite frontend" },
        { label: "Meetpunt", value: "Labdata uit Lighthouse" }
      ]
    }
  }
];

const featuredProjects = [
  ...projects.filter((project) => project.title === "Fluitman Auto's"),
  ...projects.filter((project) => project.title !== "Fluitman Auto's")
];

export const Web = memo(() => {
  const reduced = useReducedMotion();

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  return (
    <>
      <SEO
        title="Websites die simpelweg werken"
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
        {featuredProjects.map((project, index) => (
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

                  <div className="case-story">
                    <h3>Van startpunt naar realisatie</h3>
                    <ol>
                      {project.story.map((step) => (
                        <li key={step.label}>
                          <strong>{step.label}</strong>
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ol>
                    <h3>Concreet opgeleverd</h3>
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

                <div className="case-study-visual web-case-visual">
                  <LiveSlider before={project.sliderBeforeUrl} after={project.newUrl} />
                  <div className="tech-transform">
                    <h3>Technische transformatie</h3>
                    <div className="tech-transform-grid">
                      <div>
                        <span className="tech-transform-label">Voorheen</span>
                        <strong>{project.techTransformation.before.title}</strong>
                        <p>{project.techTransformation.before.text}</p>
                        <div className="tech-tags">
                          {project.techTransformation.before.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="tech-transform-label">Nu</span>
                        <strong>{project.techTransformation.after.title}</strong>
                        <p>{project.techTransformation.after.text}</p>
                        <div className="tech-tags">
                          {project.techTransformation.after.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {project.pageSpeed && (
                    <div className="pagespeed-card">
                      <div className="pagespeed-card-header">
                        <div>
                          <span className="tech-transform-label">{project.pageSpeed.label}</span>
                          <strong>Desktop performance audit</strong>
                        </div>
                        <a
                          href={project.pageSpeed.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Bekijk rapport
                        </a>
                      </div>
                      <div className="pagespeed-score-grid">
                        {project.pageSpeed.scores.map((score) => (
                          <div
                            key={score.label}
                            className={score.tone === 'primary' ? 'pagespeed-score is-primary' : 'pagespeed-score'}
                          >
                            <span>{score.label}</span>
                            <strong>{score.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="pagespeed-metrics">
                        {project.pageSpeed.metrics.map((metric) => (
                          <div key={metric.label}>
                            <span>{metric.label}</span>
                            <strong>{metric.value}</strong>
                          </div>
                        ))}
                      </div>
                      <p>Rapport gegenereerd op {project.pageSpeed.reportDate}. De PageSpeed-pagina meldt dat er voor deze URL geen voldoende Chrome UX Report-velddata beschikbaar is.</p>
                    </div>
                  )}
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
