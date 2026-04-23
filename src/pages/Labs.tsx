import { memo } from 'react';
import { Link } from 'react-router-dom';
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
    description: "Mijn onderzoek naar het optimaliseren van SPX credit spreads, specifiek voor looptijden tussen 40 en 80 dagen.",
    challenge: "Het vinden van de juiste balans tussen winstkans en rendement, zonder dat de risico's uit de hand lopen.",
    solution: "Door duizenden trades te simuleren heb ik een matrix ontwikkeld die laat zien welke instellingen het meest stabiel zijn.",
    results: ["Optimalisatie matrix voor looptijden", "Interactieve simulator", "Praktische regels voor risicobeheer"],
    url: "/labs/spx",
    tags: ["Quantitative Research", "Options Trading", "Data Analysis"]
  },
  {
    title: "Stacked Probabilities System",
    description: "Een systeem voor swing trading dat verschillende technische signalen combineert voor een hogere slaagkans.",
    challenge: "Een trading-proces bouwen dat niet afhankelijk is van emoties of onderbuikgevoel, maar van vaste regels.",
    solution: "Een 'Playbook' dat kijkt naar markttrends, voortschrijdende gemiddelden en de Squeeze indicator.",
    results: ["Duidelijk stappenplan voor trades", "Vaste regels voor in- en uitstappen", "Uitleg van de gebruikte indicatoren"],
    url: "/labs/squeeze",
    tags: ["Trading System", "Technical Analysis", "Systematic Trading"]
  },
  {
    title: "ICT Turtle Soup Masterclass",
    description: "Hoe je valse uitbraken in de markt herkent en deze gebruikt om liquiditeit te vinden.",
    challenge: "Het herkennen van momenten waarop de markt 'vallen' zet voor particuliere beleggers.",
    solution: "Een visuele uitleg van marktstructuur en liquiditeit, inclusief een simulator om bar-voor-bar te oefenen.",
    results: ["Interactieve prijsactie simulator", "Uitleg over liquidity pools", "Stappenplan voor uitvoering"],
    url: "/labs/turtlesoup",
    tags: ["ICT Concepts", "Liquidity Analysis", "Market Structure"]
  },
  {
    title: "ICT Trading Strategie",
    description: "Een gids over de Inner Circle Trader (ICT) methode en het begrijpen van hoe grote spelers de markt bewegen.",
    challenge: "De verschuiving begrijpen van standaard grafiekpatronen naar institutionele orderflow.",
    solution: "De kernconcepten zoals Order Blocks en Fair Value Gaps vertaald naar een duidelijke, visuele uitleg.",
    results: ["Interactieve begrippenlijst", "Verschil tussen retail en 'smart money'", "Veelgestelde vragen over marktmechanismen"],
    url: "/labs/ict",
    tags: ["Institutional Trading", "Order Flow", "Market Theory"]
  }
];

export const Labs = memo(() => {
  return (
    <>
      <header className="hero-header">
        <div className="container">
          <p className="overline">Labs & Quantitative Research</p>
          <h1>Mijn onderzoek naar de <span className="italic">markten</span>.</h1>
          <p className="lead">
            Naast webontwikkeling duik ik diep in de cijfers van financiële markten. 
            Hieronder vind je een selectie van mijn studies naar opties en trading-systemen.
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
                    <Link to={study.url} className="btn-primary">
                      Open de volledige studie
                    </Link>
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
