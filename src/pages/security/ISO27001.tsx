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
    title: "Plan: Context & Risico's",
    text: "Voordat we maatregelen implementeren, breng ik de context van de organisatie in kaart. Wie zijn de stakeholders? Wat zijn de kroonjuwelen? Vervolgens voer ik een grondige risicoanalyse uit.",
    list: ["Nulmeting uitvoeren", "Asset inventarisatie", "Risicobeoordeling", "Verklaring van Toepasselijkheid opstellen"]
  },
  do: {
    title: "Do: Implementatie & Awareness",
    text: "Dit is de uitvoerende fase. Gebaseerd op de VvT selecteren en implementeren we de benodigde beheersmaatregelen. Focus op techniek én de menselijke factor.",
    list: ["Uitrollen beleidsdocumenten", "Inrichten toegangsbeheer (IAM)", "Awareness sessies", "Incident Response plan inrichten"]
  },
  check: {
    title: "Check: Audits & Monitoring",
    text: "Meten is weten. Werken de geïmplementeerde maatregelen daadwerkelijk? We monitoren systemen, analyseren incidenten en voeren interne audits uit.",
    list: ["Uitvoeren interne audits", "Monitoren van KPI's", "Management review", "Begeleiden externe auditor"]
  },
  act: {
    title: "Act: Corrigeren & Verbeteren",
    text: "Op basis van de resultaten uit de 'Check' fase, ondernemen we actie. Dit omvat het oplossen van non-conformiteiten en het continu verbeteren van het ISMS.",
    list: ["Root-cause analyse", "CAPA acties uitvoeren", "Risicoanalyse herzien", "Continu verbeterproces borgen"]
  }
};

export const ISO27001 = memo(() => {
  const [activePhase, setActivePhase] = useState<keyof typeof pdcaData>('plan');
  const [maturityState, setMaturityState] = useState<'start' | 'end'>('end');

  const maturityLabels = ['Beleid & Org.', 'HR Security', 'Asset Mgt.', 'Toegang', 'Incident Mgt.', 'Fysieke Sec.'];
  const maturityDataStart = [1.5, 2.0, 1.2, 1.8, 1.0, 2.5];
  const maturityDataEnd = [4.0, 3.8, 3.5, 4.2, 3.9, 4.0];

  const radarData = {
    labels: maturityLabels,
    datasets: [{
      label: maturityState === 'start' ? 'Startmeting' : 'Na 1 Jaar',
      data: maturityState === 'start' ? maturityDataStart : maturityDataEnd,
      backgroundColor: maturityState === 'start' ? 'rgba(203, 213, 225, 0.4)' : 'rgba(51, 65, 85, 0.2)',
      borderColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(51, 65, 85, 1)',
      pointBackgroundColor: maturityState === 'start' ? 'rgba(148, 163, 184, 1)' : 'rgba(51, 65, 85, 1)',
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
        label: 'Openstaande Bevindingen',
        data: [20, 15, 8, 2],
        borderColor: '#334155',
        backgroundColor: '#334155',
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
          <p className="overline">Portfolio Case — Security Officer</p>
          <h1 style={{ color: '#1c1917' }}>ISO 27001: Van <span className="italic">Vinkje</span> naar Vertrouwen</h1>
          <p className="lead" style={{ color: '#57534e' }}>
            Hoe ik de theorie van ISO 27001 omzet in meetbare, praktische beveiliging. 
            Een strategische aanpak voor informatiebeveiliging.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Het Fundament: De CIA-Triade</h2>
                <p className="project-intro">
                  Informatiebeveiliging is het balanceren van drie kernprincipes. Elke maatregel wordt tegen dit licht gehouden.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginTop: '32px' }}>
                  {[
                    { l: 'C', t: 'Confidentiality', d: 'Alleen geautoriseerde toegang.' },
                    { l: 'I', t: 'Integrity', d: 'Juistheid en volledigheid van data.' },
                    { l: 'A', t: 'Availability', d: 'Toegankelijkheid wanneer nodig.' }
                  ].map(item => (
                    <div key={item.l} style={{ padding: '20px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#f5f5f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '12px' }}>{item.l}</div>
                      <h4 style={{ margin: '0 0 8px' }}>{item.t}</h4>
                      <p style={{ fontSize: '13px', color: '#78716c', margin: 0 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="case-study-visual" style={{ background: '#f5f5f4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ fontSize: '120px' }}>🛡️</span>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section" style={{ background: '#fff' }}>
          <div className="container">
            <h2 style={{ marginBottom: '32px' }}>Mijn Werkwijze: De PDCA-Cyclus</h2>
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
                      background: activePhase === phase ? '#334155' : '#fff',
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
            <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>Aantoonbare Resultaten</h2>
            <div className="case-study-grid">
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e7e5e4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h4 style={{ margin: 0 }}>Maturity Groei</h4>
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
                <h4 style={{ marginBottom: '24px' }}>Incident & Audit Verloop</h4>
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
