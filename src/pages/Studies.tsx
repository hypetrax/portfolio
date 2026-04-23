import { memo } from 'react';
import { LiveSlider } from '../components/LiveSlider';

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
    url: "/spx.html",
    tags: ["Quantitative Research", "Options Trading", "Data Analysis"]
  },
  {
    title: "Stacked Probabilities System",
    description: "Een systematische aanpak voor swing trading gebaseerd op het stapelen van technische en statistische kansen.",
    challenge: "Het elimineren van emotie bij trading door strikte technische regels en een herhaalbaar proces te creëren.",
    solution: "Een 'Playbook' benadering die EMAs, de Squeeze indicator en prijsactie combineert in een robuust framework.",
    results: ["Stap-voor-stap setup gids", "Vaste regels voor risk management", "Visuele breakdown van technische indicatoren"],
    url: "/squeezespreads.html",
    tags: ["Trading System", "Technical Analysis", "Systematic Trading"]
  },
  {
    title: "ICT Turtle Soup Setup Masterclass",
    description: "Een modernisering van klassieke false-breakout strategieën, gericht op het identificeren van liquiditeits-sweeps en institutionele manipulatie.",
    challenge: "Het herkennen van de 'Judas Swing' en het vermijden van retail traps bij belangrijke prijsniveaus.",
    solution: "Een educatieve breakdown van BSL/SSL, MSS en FVG confluences met een interactieve candlestick simulator.",
    results: ["Interactieve prijsactie simulator", "Duidelijke breakdown van liquidity pools", "Stap-voor-stap executie framework"],
    url: "/turtlesoup.html",
    tags: ["ICT Concepts", "Liquidity Analysis", "Market Structure"]
  },
  {
    title: "ICT Trading Strategy Masterclass",
    description: "Een uitgebreide gids over de Inner Circle Trader (ICT) methodologie, gericht op het begrijpen van institutionele orderflow en marktmanipulatie.",
    challenge: "Het begrijpen van de verschuiving van retail-paradigma's naar institutionele algoritmen en liquiditeits-gedreven markten.",
    solution: "Een interactieve masterclass die de kernconcepten zoals FVG, Order Blocks en Liquidity Sweeps vertaalt naar een visueel framework.",
    results: ["Interactieve concept glossary", "Visualisatie van retail vs smart money", "Diepgaande FAQ over marktmechanismen"],
    url: "/ictconcepts.html",
    tags: ["Institutional Trading", "Order Flow", "Market Theory"]
  },
  {
    title: "Cyber Resilience Act (CRA) Impact Analyse",
    description: "Een diepgaande analyse van de Europese Cyber Resilience Act en de gevolgen hiervan voor hardware- en softwarefabrikanten.",
    challenge: "Het navigeren door complexe EU-wetgeving en het begrijpen van de technische compliance-eisen voor digitale producten.",
    solution: "Een modulaire analyse die fabrikanten helpt hun productcategorie te bepalen en de bijbehorende beveiligingsverplichtingen in kaart te brengen.",
    results: ["Interactieve product-checker", "Visuele tijdlijn van handhaving", "Overzicht van compliance-risico's en boetes"],
    url: "/CRA.html",
    tags: ["Cybersecurity", "EU Legislation", "Compliance"]
  }
];

export const Studies = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Labs & Quantitative Research</p>
          <h1>Data-gedreven <span className="italic">inzichten</span>.</h1>
          <p className="lead">
            Naast webontwikkeling focus ik me op kwantitatief onderzoek naar de financiële markten. 
            Hieronder vind je een selectie van mijn studies en systemen.
          </p>
        </div>
      </header>

      <main>
        {studies.map((study, index) => (
          <section key={study.title} className="case-study">
            <div className="container">
              <div className="case-study-grid">
                <div className="case-study-content">
                  <div className="project-meta">
                    <span className="project-number">S{index + 1}</span>
                    <div className="project-tags">
                      {study.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  
                  <h2>{study.title}</h2>
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
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Open de volledige studie
                    </a>
                  </div>
                </div>
                
                <div className="case-study-visual">
                   <LiveSlider after={study.url} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
});
