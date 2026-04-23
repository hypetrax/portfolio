import { memo, useState } from 'react';
import { Radar, Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const pdcaData = {
  plan: {
    title: "Plan: Context & Leiderschap (Cl. 4-7)",
    text: "Het fundament van het ISMS. We bepalen de context (stakeholders, 'kroonjuwelen') en borgen leiderschap. Zonder commitment van de directie is informatiebeveiliging kansloos.",
    list: ["Nulmeting ISO 27001:2022", "Contextanalyse & Scope", "Risicobeoordeling (RA)", "Verklaring van Toepasselijkheid (VvT)"]
  },
  do: {
    title: "Do: Uitvoering & Support (Cl. 8)",
    text: "De implementatiefase. We rollen beheersmaatregelen uit op basis van de 4 nieuwe thema's (Annex A). Focus op zowel techniek als cultuurverandering.",
    list: ["Implementatie Annex A controls", "Awareness programma's", "Incident Response inrichting", "Asset Management borgen"]
  },
  check: {
    title: "Check: Performance Evaluatie (Cl. 9)",
    text: "Meten is weten. We monitoren de effectiviteit van de controls door middel van KPI's, interne audits en de management review.",
    list: ["Interne Audits uitvoeren", "Monitoring & Logging analyse", "Management Review opstellen", "Begeleiding externe audit"]
  },
  act: {
    title: "Act: Verbetering (Cl. 10)",
    text: "De cyclus sluiten. Op basis van afwijkingen en kansen sturen we bij. Informatiebeveiliging is geen project, maar een continu proces.",
    list: ["Root-cause analyses", "CAPA (Corrective Actions)", "ISMS optimalisatie", "Actualisatie Risicoanalyse"]
  }
};

export const ISO27001 = memo(() => {
  const [activePhase, setActivePhase] = useState<keyof typeof pdcaData>('plan');
  const [maturityState, setMaturityState] = useState<'start' | 'end'>('end');

  const maturityLabels = ['Organisatorisch', 'Mensen', 'Fysiek', 'Technologisch', 'Governance', 'Risico Mgt.'];
  const maturityDataStart = [1.5, 2.0, 1.2, 1.8, 1.0, 2.5];
  const maturityDataEnd = [4.2, 4.0, 3.8, 4.5, 4.0, 4.2];

  const radarData = {
    labels: maturityLabels,
    datasets: [{
      label: maturityState === 'start' ? 'Startmeting' : 'Na Implementatie (2022)',
      data: maturityState === 'start' ? maturityDataStart : maturityDataEnd,
      backgroundColor: maturityState === 'start' ? 'rgba(203, 213, 225, 0.4)' : 'rgba(15, 23, 42, 0.1)',
      borderColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(15, 23, 42, 1)',
      pointBackgroundColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(15, 23, 42, 1)',
      borderWidth: 2,
      fill: true
    }]
  };

  const incidentData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Incidenten',
        data: [15, 22, 12, 5],
        backgroundColor: 'rgba(148, 163, 184, 0.7)',
        borderRadius: 4
      },
      {
        type: 'line' as const,
        label: 'Maturity Score',
        data: [1.5, 2.2, 3.5, 4.2],
        borderColor: '#1e293b',
        backgroundColor: '#1e293b',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  return (
    <div className="iso-page">
      <header className="hero-header" style={{ background: '#fafaf9' }}>
        <div className="container">
          <p className="overline">Security Officer — Case Study</p>
          <h1 style={{ color: '#1c1917' }}>ISO 27001:2022 — Meer dan alleen vinkjes zetten</h1>
          <p className="lead" style={{ color: '#57534e' }}>
            Informatiebeveiliging wordt vaak gezien als een noodzakelijk kwaad. Ik laat zien hoe je een ISMS bouwt dat de business ondersteunt in plaats van in de weg zit.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Security als Fundament</h2>
                <p className="project-intro">
                  Een Security Officer moet geen 'nee-zegger' zijn, maar iemand die helpt om risico's begrijpelijk te maken. Mijn aanpak focust op praktische werkbaarheid en draagvlak binnen het hele team.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '32px' }}>
                  {[
                    { t: 'Werkbare Security', d: 'Beveiliging die innovatie helpt in plaats van blokkeert.' },
                    { t: 'Focus op Risico', d: 'Geen ellenlange lijsten, maar aandacht voor wat écht impact heeft.' },
                    { t: 'Gedeelde Verantwoordelijkheid', d: 'Security tussen de oren krijgen van elke medewerker.' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '24px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px' }}>
                      <h4 style={{ margin: '0 0 12px' }}>{item.t}</h4>
                      <p style={{ fontSize: '14px', color: '#78716c', margin: 0, lineHeight: 1.5 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                 <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
                   <p style={{ fontWeight: 600, color: '#44403c' }}>Van Controle naar Strategie</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>De 4 Thema's van ISO 27001:2022</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                { t: 'Organisatorisch', i: '📋', d: 'Beleid, asset management, cloud services en leveranciers.' },
                { t: 'Mensen', i: '👥', d: 'Screening, awareness, remote working en vertrouwelijkheid.' },
                { t: 'Fysiek', i: '🏢', d: 'Toegangsbeveiliging, monitoring en beveiliging van assets.' },
                { t: 'Technologisch', i: '💻', d: 'Encryptie, netwerkbeveiliging, secure coding en data leakage.' }
              ].map(item => (
                <div key={item.t} style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.i}</div>
                  <h4 style={{ marginBottom: '12px' }}>{item.t}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise-section" style={{ background: '#fff' }}>
          <div className="container">
            <h2 style={{ marginBottom: '32px' }}>Het ISMS Raamwerk: PDCA</h2>
            <div className="case-study-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(Object.keys(pdcaData) as Array<keyof typeof pdcaData>).map(phase => (
                  <button 
                    key={phase}
                    onClick={() => setActivePhase(phase)}
                    style={{ 
                      textAlign: 'left', 
                      padding: '16px 24px', 
                      borderRadius: '8px', 
                      border: '1px solid #e7e5e4',
                      background: activePhase === phase ? '#0f172a' : '#fff',
                      color: activePhase === phase ? '#fff' : '#44403c',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {phase.toUpperCase()} — {pdcaData[phase].title.split(': ')[1]}
                  </button>
                ))}
              </div>
              <div style={{ background: '#fafaf9', padding: '40px', borderRadius: '16px', border: '1px solid #e7e5e4' }}>
                 <h3>{pdcaData[activePhase].title}</h3>
                 <p style={{ color: '#57534e', lineHeight: 1.6 }}>{pdcaData[activePhase].text}</p>
                 <ul style={{ marginTop: '24px', paddingLeft: '20px', color: '#78716c' }}>
                   {pdcaData[activePhase].list.map(item => <li key={item} style={{ marginBottom: '8px' }}>{item}</li>)}
                 </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>Meetbare Impact</h2>
            <div className="case-study-grid">
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e7e5e4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h4 style={{ margin: 0 }}>Maturity Groei (ISO 27001:2022)</h4>
                  <div style={{ display: 'flex', gap: '8px', background: '#f5f5f4', padding: '4px', borderRadius: '8px' }}>
                    <button 
                      onClick={() => setMaturityState('start')}
                      style={{ padding: '4px 12px', borderRadius: '6px', border: 'none', background: maturityState === 'start' ? '#fff' : 'transparent', cursor: 'pointer', fontSize: '12px' }}
                    >Start</button>
                    <button 
                      onClick={() => setMaturityState('end')}
                      style={{ padding: '4px 12px', borderRadius: '6px', border: 'none', background: maturityState === 'end' ? '#fff' : 'transparent', cursor: 'pointer', fontSize: '12px' }}
                    >Na 1 Jaar</button>
                  </div>
                </div>
                <div style={{ height: '300px' }}>
                  <Radar 
                    data={radarData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { r: { ticks: { display: false }, min: 0, max: 5 } }
                    }}
                  />
                </div>
              </div>

              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e7e5e4' }}>
                <h4 style={{ marginBottom: '24px' }}>Incidenten vs. Maturity</h4>
                <div style={{ height: '300px' }}>
                  <Chart 
                    type="bar"
                    data={incidentData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true } }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
