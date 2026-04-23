import { memo, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { SEO } from '../../components/SEO';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const riskClasses = [
  { id: 'default', name: 'Regulier (Default)', icon: '📦', applies: true, info: 'Beperkt risico (bijv. meeste consumenten-IoT en apps). Route: Zelfbeoordeling (Module A). Voor ~90% van de producten.' },
  { id: 'class1', name: 'Belangrijk Klasse I', icon: '🛡️', applies: true, info: 'Producten met cybersecurity-functies (bijv. password managers, browsers). Route: Geharmoniseerde normen of notified body.' },
  { id: 'class2', name: 'Belangrijk Klasse II', icon: '🚧', applies: true, info: 'Hoger risicoprofiel (bijv. firewalls, hypervisors, tamper-resistant microchips). Route: Verplichte beoordeling door notified body.' },
  { id: 'critical', name: 'Kritiek', icon: '⚡', applies: true, critical: true, info: 'Zeer hoog risico (bijv. vitale infrastructuur, smartcards). Route: Verplichte externe certificering.' },
  { id: 'exempt', name: 'Uitgezonderd', icon: '🚫', applies: false, info: 'Medische hulpmiddelen (MDR), Automotive (UNECE) en gecertificeerde luchtvaart vallen onder eigen kaders.' }
];

export const CRA = memo(() => {
  const [selectedClass, setSelectedClass] = useState<typeof riskClasses[0] | null>(null);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter' }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' }
      }
    }
  };

  const growthData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Aantal CVE\'s',
      data: [16500, 17300, 18400, 20100, 25000, 29000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#3b82f6',
      fill: true,
      tension: 0.4
    }]
  };

  const finesData = {
    labels: ['Essentieel', 'Procesmatig', 'Informatief'],
    datasets: [{
      data: [15, 10, 5],
      backgroundColor: ['#1d4ed8', '#3b82f6', '#93c5fd'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  return (
    <div className="cra-page">
      <SEO 
        title="Cyber Resilience Act (CRA) Impact Analyse" 
        description="Diepgaande analyse van de Cyber Resilience Act voor digitale producten. SBOM beheer, kwetsbaarheidsrapportage en compliance strategie."
        canonical="/security/cra"
      />
      <header className="hero-header">
        <div className="container">
          <p className="overline">Security — Diepgang</p>
          <h1>Onze Voorbereiding op de <br /><span className="italic">Cyber Resilience Act</span> <span style={{ color: 'var(--accent)' }}>(CRA)</span></h1>
          <p className="lead">
            De CRA stelt nieuwe eisen aan de cybersecurity van onze digitale producten. 
            Ik leid de transitie om compliance te verweven in onze volledige productlevenscyclus, van ontwerp tot support.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Compliance als Kwaliteitskeurmerk</h2>
                <p className="project-intro">
                  Voor onze organisatie is de CRA meer dan een wettelijke verplichting; het is een kans om onze toewijding aan veilige producten te bewijzen. 
                  We integreren security-eisen direct in onze ontwikkelprocessen.
                </p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>Focus op de keten</h3>
                    <p>We maken beveiliging een integraal onderdeel van onze sprint-doelen, niet een add-on achteraf.</p>
                  </div>
                  <div className="detail-block">
                    <h3>Radicale Transparantie</h3>
                    <p>We bereiden ons voor op het leveren van volledige transparantie over de veiligheid en ondersteuning van onze producten.</p>
                  </div>
                </div>
              </div>
              <div className="case-study-visual">
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                  <div style={{ height: '300px' }}>
                    <Line 
                      data={growthData} 
                      options={{ 
                        ...commonOptions,
                        plugins: { ...commonOptions.plugins, legend: { display: false } },
                        scales: { ...commonOptions.scales, x: { ...commonOptions.scales.x, grid: { display: false } } }
                      }} 
                    />
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px', fontFamily: 'var(--font-mono)' }}>
                    Groei in gerapporteerde kwetsbaarheden (CVE's) per jaar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section" style={{ background: 'var(--bg-color)', padding: '100px 0' }}>
          <div className="container">
            <h2 style={{ marginBottom: '16px' }}>De Risicogebaseerde Categorieën</h2>
            <p style={{ color: '#cbd5e1', maxWidth: '600px', marginBottom: '48px' }}>
              De intensiteit van de conformiteitsbeoordeling hangt af van de risicoklasse. Klik op een categorie voor de specifieke route naar CE-markering.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
              {riskClasses.map(p => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedClass(p)}
                  style={{ 
                    padding: '24px', 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '12px', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderLeft: selectedClass?.id === p.id ? '4px solid var(--accent)' : '1px solid var(--border)'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                  <h4 style={{ color: 'var(--text-main)', margin: '0 0 8px' }}>{p.name}</h4>
                  <p style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Klik voor details</p>
                </div>
              ))}
            </div>

            {selectedClass && (
              <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ fontSize: '48px' }}>{selectedClass.icon}</div>
                  <div>
                    <h3 style={{ color: 'var(--accent)', margin: '0 0 8px' }}>{selectedClass.name}</h3>
                    <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{selectedClass.info}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="case-study" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2>Incidentrapportage: De Onverbiddelijke Klok</h2>
              <p style={{ color: '#cbd5e1', maxWidth: '700px', margin: '0 auto' }}>
                Vanaf september 2026 gelden er strikte deadlines voor het melden van actief uitgebuite kwetsbaarheden en ernstige incidenten via het Single Reporting Platform (SRP).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { time: 'Binnen 24 uur', label: 'Vroege Waarschuwing', text: 'Eerste melding van het incident; focus op detectie en of het een kwaadwillige actie betreft.' },
                { time: 'Binnen 72 uur', label: 'Volledige Notificatie', text: 'Gedetailleerde informatie over de aard, initiële impactanalyse en mogelijke verspreiding.' },
                { time: '14 dagen na patch', label: 'Eindrapport (Kwetsbaarheid)', text: 'Gedetailleerde beschrijving van de oplossing en de wijze waarop de kwetsbaarheid is weggenomen.' },
                { time: 'Binnen 1 maand', label: 'Eindrapport (Incident)', text: 'Analyse van de bronoorzaak, de ernst van de schade en genomen mitigatiemaatregelen.' }
              ].map((step, i) => (
                <div key={i} style={{ background: 'var(--bg-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '20px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>{step.time}</div>
                  <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-main)' }}>{step.label}</h4>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', lineHeight: 1.5 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Software Bill of Materials (SBOM)</h2>
                <p className="project-intro">
                  De nieuwe norm voor transparantie. De CRA dwingt fabrikanten tot een actieve vorm van supply chain management door het verplicht stellen van een machinaal leesbare SBOM (bijv. CycloneDX of SPDX).
                </p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>Vereiste Velden</h3>
                    <ul style={{ paddingLeft: '20px', margin: 0, color: '#cbd5e1' }}>
                      <li>Component-identificatie</li>
                      <li>Versie-informatie</li>
                      <li>Traceerbaarheid van oorsprong</li>
                      <li>Dependency mapping</li>
                      <li>Cryptografische hashes</li>
                    </ul>
                  </div>
                  <div className="detail-block">
                    <h3>Operationele Waarde</h3>
                    <p>Snelle lokalisatie van kwetsbare modules bij nieuwe CVE-meldingen en inzicht in transitieve risico's.</p>
                  </div>
                </div>
              </div>
              <div className="case-study-visual" style={{ background: 'var(--surface)', borderRadius: '16px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '80px' }} role="img" aria-label="SBOM icoon">📄</span>
                  <h3 style={{ marginTop: '24px', color: 'var(--text-main)' }}>Transparantie in de Keten</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ color: 'var(--text-main)' }}>Strategische Aanbevelingen voor Transitie</h2>
              <p style={{ color: '#cbd5e1' }}>Een gestructureerd programma voor compliance opzetten.</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
               {[
                 { title: 'Stap 1: Inventarisatie en Classificatie', text: 'Beoordeel elk product op basis van connectiviteit en kernfuncties. Bepaal of samenwerking met een notified body noodzakelijk is.' },
                 { title: 'Stap 2: Implementatie van Security SDLC', text: '"Shift left" in het ontwikkelingsproces. Automatiseer threat modeling, kwetsbaarheidsscans en SBOM-generatie in de build-pijplijn.' },
                 { title: 'Stap 3: Governance voor Kwetsbaarheidsrapportage', text: 'Definieer duidelijke triggers for "ernstige incidenten" en richt communicatielijnen in voor de 24-uurs deadline via het SRP.' },
                 { title: 'Stap 4: Herziening van Toeleverancierscontracten', text: 'Pas inkoopvoorwaarden aan: eis dat componenten CRA-conform zijn en vraag garanties voor beveiligingsupdates.' }
               ].map((step, i) => (
                 <div key={i} style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{i + 1}</div>
                     {i < 3 && <div style={{ width: '2px', flexGrow: 1, background: 'var(--border)', margin: '8px 0' }}></div>}
                   </div>
                   <div style={{ paddingBottom: '20px' }}>
                     <h3 style={{ margin: '0 0 8px', color: 'var(--text-main)' }}>{step.title}</h3>
                     <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6 }}>{step.text}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section className="expertise-section">
          <div className="container">
            <div className="case-study-grid">
              <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <h3 style={{ color: 'var(--text-main)' }}>Financiële Risico's & Boetes</h3>
                <div style={{ height: '250px', margin: '32px 0' }}>
                  <Doughnut 
                    data={finesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '75%',
                      plugins: { 
                        legend: { 
                          position: 'bottom',
                          labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
                        } 
                      }
                    }}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span>Essentiële eisen (Annex I)</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>€15M of 2.5% omzet</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span>Overige verplichtingen</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>€10M of 2% omzet</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Misleidende informatie</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>€5M of 1% omzet</span>
                  </div>
                </div>
              </div>

              <div>
                <h2>Het Tijdspad van Compliance</h2>
                <p style={{ color: '#cbd5e1', marginBottom: '32px' }}>De volledige toepasbaarheid is eind 2027, maar kritieke rapportage-eisen starten al in 2026.</p>
                <div style={{ marginTop: '32px' }}>
                  {[
                    { date: '10 Dec 2024', label: 'Inwerkingtreding CRA', text: 'Start van de 36-maanden durende transitieperiode.' },
                    { date: '11 Jun 2026', label: 'Toezicht Notified Bodies', text: 'Regels voor aanmelding en toezicht op instanties actief.' },
                    { date: '11 Sep 2026', label: 'Start Meldplicht', text: 'Actief uitgebuite kwetsbaarheden en ernstige incidenten melden.' },
                    { date: '11 Dec 2027', label: 'Volledige Toepasbaarheid', text: 'Alle producten moeten voldoen aan de eisen, inclusief CE-markering.' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '32px' }}>
                      <div style={{ 
                        padding: '10px 14px', borderRadius: '8px', 
                        background: i === 2 || i === 3 ? 'var(--accent)' : 'var(--surface)',
                        color: i === 2 || i === 3 ? '#fff' : '#cbd5e1',
                        fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap', minWidth: '100px', textAlign: 'center',
                        fontFamily: 'var(--font-mono)', border: '1px solid var(--border)'
                      }}>{item.date}</div>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)' }}>{item.label}</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
