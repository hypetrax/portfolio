import { memo } from 'react';
import { LiveSlider } from '../components/LiveSlider';

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
    description: "Een nieuwe, snelle website voor een lokaal autobedrijf.",
    challenge: "De oude website was traag, werkte niet goed op telefoons en was lastig aan te passen.",
    solution: "Ik heb de site vanaf de grond opgebouwd met React. De focus lag op snelheid en een helder overzicht van de occasions.",
    results: ["100/100 Lighthouse Performance score", "Werkt perfect op mobiel", "Betere vindbaarheid in Google"],
    oldUrl: "/archives/fluitmanautos/index.html",
    sliderBeforeUrl: "/archives/fluitmanautos/index.html",
    newUrl: "https://age.bartpullen.nl",
    tags: ["Full Rebuild", "React", "Performance"]
  },
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
  }
];

export const Web = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Bart Pullen — Portfolio</p>
          <h1>Websites die simpelweg <span className="italic">werken</span>.</h1>
          <p className="lead">
            Ik help bedrijven met het opschonen van hun online aanwezigheid. Geen overbodige poespas, maar snelle sites met een logische structuur en een fris design.
          </p>
        </div>
      </header>

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
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Klaar voor een modernisering?</h2>
          <p>Laten we bespreken hoe we jouw website naar het volgende niveau kunnen tillen. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <a href="https://www.linkedin.com/in/bartpullen/" target="_blank" rel="noopener noreferrer" className="btn-large">Connect op LinkedIn</a>
        </div>
      </section>
    </>
  );
});
