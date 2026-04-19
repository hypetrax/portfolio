import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Project {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  oldUrl?: string;
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
    newUrl: "https://badminton.bartpullen.nl",
    tags: ["UX Design", "Modernisering", "Mobile First"]
  },
  {
    title: "Landhuis — Echt Duurzaam",
    description: "Een krachtige online identiteit voor een specialist in duurzame installatietechniek.",
    challenge: "Dit installatiebedrijf in Hardenberg werkte zonder website, waardoor zij online onzichtbaar waren voor potentiële klanten die zochten naar warmtepompen en airco-oplossingen.",
    solution: "Ik heb 'Echt Duurzaam' op de digitale kaart gezet met een professionele, conversiegerichte website die hun expertise in warmtepompen, airconditioning en elektrotechniek benadrukt.",
    results: ["Lokaal marktleider in regio Hardenberg, Coevorden & Emmen", "Professionele uitstraling die vertrouwen wekt", "Duidelijke presentatie van duurzame diensten"],
    oldUrl: "/archives/landhuis-google/index.html",
    newUrl: "https://landhuis.bartpullen.nl/",
    tags: ["Brand Identity", "Duurzaamheid", "SEO"]
  }
];

function LiveSlider({ before, after }: { before?: string, after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1440); // 1440 is de virtuele breedte van het iframe
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      className="live-slider-container" 
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
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
        <div className="handle-line"></div>
        <div className="handle-circle">
          <span>&#8592;</span>
          <span>&#8594;</span>
        </div>
      </div>
      
      <div className="slider-overlay"></div>
    </div>
  );
}

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

      <main>
        {projects.map((project, index) => (
          <section key={index} className="case-study">
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
                      {project.results.map((result, rIndex) => (
                        <li key={rIndex}>{result}</li>
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
                   <LiveSlider before={project.oldUrl} after={project.newUrl} />
                </div>
              </div>
            </div>
          </section>
        ))}
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
