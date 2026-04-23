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

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter' } }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  const maturityLabels = ['Organisatorisch', 'Mensen', 'Fysiek', 'Technologisch', 'Governance', 'Risico Mgt.'];
  const maturityDataStart = [1.5, 2.0, 1.2, 1.8, 1.0, 2.5];
  const maturityDataEnd = [4.2, 4.0, 3.8, 4.5, 4.0, 4.2];

  const radarData = {
    labels: maturityLabels,
    datasets: [{
      label: maturityState === 'start' ? 'Startmeting' : 'Na Implementatie (2022)',
      data: maturityState === 'start' ? maturityDataStart : maturityDataEnd,
      backgroundColor: maturityState === 'start' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(59, 130, 246, 0.2)',
      borderColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(59, 130, 246, 1)',
      pointBackgroundColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(59, 130, 246, 1)',
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
        backgroundColor: 'rgba(148, 163, 184, 0.5)',
        borderRadius: 4
      },
      {
        type: 'line' as const,
        label: 'Maturity Score',
        data: [1.5, 2.2, 3.5, 4.2],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  return (
    <div className="iso-page">
      <header className="hero-header">
        <div className="container">
          <p className="overline">Security Officer — Impact</p>
          <h1><span style={{ color: 'var(--accent)' }}>ISO 27001:2022</span> — Strategische Waarde voor de Organisatie</h1>
          <p className="lead">
            Informatiebeveiliging is geen 'vinkje op de muur', maar een essentieel onderdeel van onze bedrijfsvoering. 
            Ik leid de transitie naar een ISMS dat de business versterkt en risico's proactief beheerst.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Onze Security Visie</h2>
                <p className="project-intro">
                  In mijn rol streef ik naar een balans tussen strikte beveiliging en operationele slagkracht. 
                  Door security onderdeel te maken van onze cultuur, bouwen we aan een duurzaam veilige organisatie.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '32px' }}>
                  {[
                    { t: 'Security by Design', d: 'Beveiliging als integraal onderdeel van onze projecten en processen.' },
                    { t: 'Risico-gebaseerd', d: 'Prioriteit geven aan wat écht impact heeft op onze continuïteit.' },
                    { t: 'Continue Verbetering', d: 'Elke dag een stap zetten in onze volwassenheid op security-vlak.' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                      <h4 style={{ margin: '0 0 12px', color: 'var(--text-main)' }}>{item.t}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="case-study-visual" style={{ background: 'var(--surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', border: '1px solid var(--border)' }}>
                 <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
                   <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Van Controle naar Strategie</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 0', background: 'var(--bg-color)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>De 4 Thema's van ISO 27001:2022</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                { t: 'Organisatorisch', i: '📋', d: 'Beleid, asset management, cloud services en leveranciers.' },
                { t: 'Mensen', i: '👥', d: 'Screening, awareness, remote working en vertrouwelijkheid.' },
                { t: 'Fysiek', i: '🏢', d: 'Toegangsbeveiliging, monitoring en beveiliging van assets.' },
                { t: 'Technologisch', i: '💻', d: 'Encryptie, netwerkbeveiliging, secure coding en data leakage.' }
              ].map(item => (
                <div key={item.t} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.i}</div>
                  <h4 style={{ marginBottom: '12px', color: 'var(--text-main)' }}>{item.t}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise-section">
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
                      border: '1px solid var(--border)',
                      background: activePhase === phase ? 'var(--accent)' : 'var(--surface)',
                      color: activePhase === phase ? '#fff' : 'var(--text-muted)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {phase.toUpperCase()} — {pdcaData[phase].title.split(': ')[1]}
                  </button>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                 <h3 style={{ color: 'var(--text-main)', textTransform: 'none', letterSpacing: 'normal', fontSize: '20px', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>{pdcaData[activePhase].title}</h3>
                 <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{pdcaData[activePhase].text}</p>
                 <ul style={{ marginTop: '24px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                   {pdcaData[activePhase].list.map(item => <li key={item} style={{ marginBottom: '8px' }}>{item}</li>)}
                 </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>Meetbare Impact</h2>
            <div className="case-study-grid">
              <div style={{ background: 'var(--bg-color)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Maturity Groei</h4>
                  <div style={{ display: 'flex', gap: '4px', background: 'var(--surface)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <button 
                      onClick={() => setMaturityState('start')}
                      style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: maturityState === 'start' ? 'var(--accent)' : 'transparent', color: maturityState === 'start' ? '#fff' : 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}
                    >Start</button>
                    <button 
                      onClick={() => setMaturityState('end')}
                      style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: maturityState === 'end' ? 'var(--accent)' : 'transparent', color: maturityState === 'end' ? '#fff' : 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}
                    >Na 1 Jaar</button>
                  </div>
                </div>
                <div style={{ height: '300px' }}>
                  <Radar 
                    data={radarData}
                    options={{
                      ...commonOptions,
                      scales: { 
                        r: { 
                          ticks: { display: false }, 
                          min: 0, 
                          max: 5,
                          grid: { color: 'rgba(255, 255, 255, 0.05)' },
                          angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                          pointLabels: { color: '#94a3b8', font: { size: 10 } }
                        } 
                      }
                    }}
                  />
                </div>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '32px', color: 'var(--text-main)' }}>Incidenten vs. Maturity</h4>
                <div style={{ height: '300px' }}>
                  <Chart 
                    type="bar"
                    data={incidentData}
                    options={{
                      ...commonOptions,
                      scales: { 
                        y: { 
                          beginAtZero: true,
                          grid: { color: 'rgba(255, 255, 255, 0.05)' },
                          ticks: { color: '#64748b' }
                        },
                        x: {
                          grid: { display: false },
                          ticks: { color: '#64748b' }
                        }
                      }
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
