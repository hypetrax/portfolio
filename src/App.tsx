import { useState, useRef, useEffect, useCallback, memo } from 'react'
import './App.css'

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
    title: "Fluitman Auto's",
    description: "Een complete digitale herstructurering voor een lokaal autobedrijf.",
    challenge: "De oude website was traag, niet mobielvriendelijk en maakte gebruik van een verouderd CMS dat de groei van de onderneming belemmerde.",
    solution: "Ik heb de site volledig herbouwd met React en TypeScript, met een focus op razendsnelle laadtijden en een intuïtieve interface voor klanten om diensten te bekijken.",
    results: ["100/100 Lighthouse Performance score", "Volledig responsive design", "Betere SEO vindbaarheid"],
    oldUrl: "/archives/fluitmanautos/index.html",
    sliderBeforeUrl: "/archives/fluitmanautos/index.html",
    newUrl: "https://age.bartpullen.nl",
    tags: ["Full Rebuild", "React", "Performance"]
  },
  {
    title: "Badminton Hardenberg",
    description: "Van een statisch archief naar een levendig verenigingsplatform.",
    challenge: "De vereniging had een website die fungeerde als een digitaal stoffig archief, lastig te navigeren voor nieuwe leden.",
    solution: "Door een moderne UX-strategie toe te passen, heb ik de informatiearchitectuur versimpeld en een fris, sportief ontwerp geïmplementeerd dat uitnodigt tot actie.",
    results: ["60% snellere toegang tot informatie", "Modern mobiel menu", "Eigentijdse uitstraling"],
    oldUrl: "/archives/badmintonhardenberg/index.html",
    sliderBeforeUrl: "/archives/badmintonhardenberg/index.html",
    newUrl: "https://badminton.bartpullen.nl",
    tags: ["UX Design", "Modernisering", "Mobile First"]
  },
  {
    title: "Landhuis — Echt Duurzaam",
    description: "Een krachtige online identiteit voor een specialist in duurzame installatietechniek.",
    challenge: "Dit installatiebedrijf in Hardenberg werkte zonder website, waardoor zij online onzichtbaar waren voor potentiële klanten die zochten naar warmtepompen en airco-oplossingen.",
    solution: "Ik heb 'Echt Duurzaam' op de digitale kaart gezet met een professionele, conversiegerichte website die hun expertise in warmtepompen, airconditioning en elektrotechniek benadrukt.",
    results: ["Lokaal marktleider in regio Hardenberg, Coevorden & Emmen", "Professionele uitstraling die vertrouwen wekt", "Duidelijke presentatie van duurzame diensten"],
    oldUrl: "https://www.google.com/search?q=Landhuis+Installatietechniek",
    sliderBeforeUrl: "/archives/landhuis-google/index.html",
    newUrl: "https://landhuis.bartpullen.nl/",
    tags: ["Brand Identity", "Duurzaamheid", "SEO"]
  }
];

const LiveSlider = memo(function LiveSlider({ before, after }: { before?: string, after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1440);
      }
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, 100);
    };

    updateScale();
    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setSliderPos(p => Math.min(100, p + 5));
  }, []);

  return (
    <div
      className="live-slider-container"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Voor/na vergelijking slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="live-frame after-frame">
        <iframe
          src={after}
          title="Nieuwe website"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="label after">Nieuw (Live)</div>
      </div>

      {before && (
        <div
          className="live-frame before-frame"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <iframe
            src={before}
            title="Oude website"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="label before">Oud (Archief)</div>
        </div>
      )}

      <div className="slider-handle" style={{ left: `${sliderPos}%` }}>
        <div className="handle-circle">
          <span>&#8592;</span>
          <span>&#8594;</span>
        </div>
      </div>

      <div className="slider-overlay"></div>
    </div>
  );
});

function App() {
  return (
    <div className="editorial-portfolio">
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Portfolio</p>
          <h1>Websites die <span className="italic">werken</span> in 2026.</h1>
          <p className="lead">
            Ik transformeer verouderde websites naar moderne, snelle en doelgerichte web-ervaringen. 
            Geen gimmicks, maar pure performance en doordacht design.
          </p>
        </div>
      </header>

      <section className="expertise-section">
        <div className="container">
          <p className="expertise-lead">
            Ik werk samen met een team van specialisten: <strong>SEO & Performance Specialist</strong>, 
            <strong> UX/UI Designer</strong> en een <strong>Frontend Developer</strong>. 
            Mijn taak is om de klantvraag te vertalen naar techniek.
          </p>
        </div>
      </section>

      <main>
        {projects.map((project, index) => (
          <section key={project.title} className="case-study">
            <div className="container">
              <div className="case-study-grid">
                <div className="case-study-content">
                  <div className="project-meta">
                    <span className="project-number">0{index + 1}</span>
                    <div className="project-tags">
                      {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  
                  <h2>{project.title}</h2>
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
                    <a href={project.newUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Bekijk de nieuwe site
                    </a>
                    {project.oldUrl && (
                      <a href={project.oldUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        Bekijk oude versie
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="case-study-visual">
                   <LiveSlider before={project.sliderBeforeUrl} after={project.newUrl} />
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="case-study spx-study-section">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <div className="project-meta">
                  <span className="project-number">RESEARCH</span>
                  <div className="project-tags">
                    <span>Quantitative Analysis</span>
                    <span>Options Trading</span>
                    <span>Backtesting</span>
                  </div>
                </div>
                
                <h2>SPX Credit Spreads: 40-80 DTE Optimization</h2>
                <p className="project-intro">
                  Een uitgebreide kwantitatieve studie naar de Volatility Risk Premium en de mathematische "sweet spot" voor SPX opties.
                </p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>Het Fenomeen</h3>
                    <p>Het structurele verschil tussen impliciete en gerealiseerde volatiliteit creëert een positieve verwachtingswaarde voor verkopers van SPX spreads.</p>
                  </div>
                  <div className="detail-block">
                    <h3>De Strategie</h3>
                    <p>Door te focussen op de 40-80 DTE window maximaliseren we theta decay terwijl we catastrofale gamma-risico's vermijden.</p>
                  </div>
                </div>

                <div className="results-block">
                  <h3>Kernbevindingen</h3>
                  <ul>
                    <li>Win Rate van ~92.9% bij mechanisch beheer</li>
                    <li>Optimaal beheer: sluiten op 50% van de maximale winst</li>
                    <li>Superieur risico-gecorrigeerd rendement t.o.v. 0DTE strategieën</li>
                  </ul>
                </div>

                <div className="project-actions">
                  <a href="/spx.html" className="btn-primary">
                    Bekijk volledige research rapport
                  </a>
                </div>
              </div>
              
              <div className="case-study-visual">
                 <div className="spx-preview-card" style={{ background: '#1e293b', padding: '40px', borderRadius: '4px', color: 'white', display: 'flex', flexDirection: 'column', gap: '20px', aspectRatio: '16/11' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8' }}>&Delta; Delta Neutral</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexGrow: 1 }}>
                       <div style={{ height: '40%', width: '15%', background: 'rgba(129, 140, 248, 0.3)' }}></div>
                       <div style={{ height: '70%', width: '15%', background: 'rgba(129, 140, 248, 0.5)' }}></div>
                       <div style={{ height: '100%', width: '15%', background: '#818cf8' }}></div>
                       <div style={{ height: '60%', width: '15%', background: 'rgba(129, 140, 248, 0.7)' }}></div>
                       <div style={{ height: '30%', width: '15%', background: 'rgba(129, 140, 248, 0.2)' }}></div>
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7, fontFamily: 'monospace' }}>
                       HISTORICAL BACKTEST: SPX_45DTE_16D<br/>
                       REALIZED EDGE: +$1.06 / spread<br/>
                       WIN RATE: 92.9%
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Klaar voor een modernisering?</h2>
          <p>Laten we bespreken hoe we jouw website naar het volgende niveau kunnen tillen.</p>
          <a href="mailto:info@bartpullen.nl" className="btn-large">Start een project</a>
        </div>
      </section>

      <footer className="editorial-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Bart Pullen. Gebouwd met React & TypeScript.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
