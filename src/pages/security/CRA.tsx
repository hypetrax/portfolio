import { memo, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
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

const products = [
  { id: 'iot', name: 'Smart Home & IoT', icon: '🏠', applies: true, info: 'Bijna alle verbonden apparaten vallen onder de basisvereisten.' },
  { id: 'software', name: 'Software & Apps', icon: '💻', applies: true, info: 'Zowel embedded software als losse applicaties moeten voldoen.' },
  { id: 'crit', name: 'Kritieke Producten', icon: '🔒', applies: true, critical: true, info: 'Operating systems en firewalls vallen in Klasse I of II (strengere controle).' },
  { id: 'med', name: 'Medische Apparaten', icon: '🩺', applies: false, info: 'Uitzondering: Valt reeds onder de MDR regelgeving.' },
  { id: 'car', name: 'Automotive', icon: '🚗', applies: false, info: 'Uitzondering: Heeft eigen specifieke EU-cybersecurity regels.' },
  { id: 'cloud', name: 'Puur SaaS', icon: '☁️', applies: false, note: 'Gedeeltelijk', info: 'SaaS valt vaak onder NIS2, tenzij er hardware/client componenten zijn.' }
];

export const CRA = memo(() => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const growthData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Aantal CVE\'s',
      data: [16500, 17300, 18400, 20100, 25000, 29000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
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
      <header className="hero-header" style={{ background: '#f8fafc' }}>
        <div className="container">
          <p className="overline">Expert Analyse — Security</p>
          <h1 style={{ color: '#0f172a' }}>De Cyber Resilience Act: <br /><span style={{ color: '#2563eb' }}>Impact voor Fabrikanten</span></h1>
          <p className="lead" style={{ color: '#475569' }}>
            De Europese Unie zet een nieuwe standaard voor cybersecurity. Ontdek hoe deze wetgeving de manier waarop we digitale producten bouwen en onderhouden voorgoed verandert.
          </p>
        </div>
      </header>

      <main>
        <section className="case-study">
          <div className="container">
            <div className="case-study-grid">
              <div className="case-study-content">
                <h2>Waarom deze wetgeving nu komt</h2>
                <p className="project-intro">
                  De economische schade door onveilige software en hardware is niet langer houdbaar. De CRA dwingt fabrikanten om verantwoordelijkheid te nemen voor de gehele levenscyclus van hun product.
                </p>
                
                <div className="case-details">
                  <div className="detail-block">
                    <h3>Marktfalen</h3>
                    <p>Beveiliging wordt vaak opgeofferd voor een snellere 'time-to-market'.</p>
                  </div>
                  <div className="detail-block">
                    <h3>Informatie-asymmetrie</h3>
                    <p>Gebruikers kunnen de veiligheid van een product niet eenvoudig beoordelen.</p>
                  </div>
                </div>
              </div>
              <div className="case-study-visual">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                  <div style={{ height: '300px' }}>
                    <Line 
                      data={growthData} 
                      options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { grid: { display: false } } }
                      }} 
                    />
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '16px' }}>
                    Groei in gerapporteerde kwetsbaarheden (CVE's) per jaar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section" style={{ background: '#0f172a', color: '#fff', padding: '100px 0' }}>
          <div className="container">
            <h2 style={{ color: '#fff', marginBottom: '16px' }}>Geldt de CRA voor jouw product?</h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', marginBottom: '48px' }}>
              Bijna elk product met 'digitale elementen' valt onder de wet. Klik op een categorie voor meer details.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {products.map(p => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  style={{ 
                    padding: '24px', 
                    background: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '12px', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderLeft: selectedProduct?.id === p.id ? '4px solid #3b82f6' : '1px solid #334155'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                  <h4 style={{ color: '#fff', margin: '0 0 8px' }}>{p.name}</h4>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Klik voor impact</p>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ fontSize: '48px' }}>{selectedProduct.icon}</div>
                  <div>
                    <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{selectedProduct.name}</h3>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>{selectedProduct.info}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2>De 4 Fasen van Compliance</h2>
              <p style={{ color: '#64748b' }}>Een stappenplan voor fabrikanten om markttoegang te behouden.</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
               {[
                 { title: '1. Security by Design & Default', text: 'Beveiliging is geen add-on meer. Het moet vanaf de eerste regel code en het eerste hardware-ontwerp centraal staan.' },
                 { title: '2. Kwetsbaarheidsbeheer', text: 'Fabrikanten zijn verplicht om een proces in te richten voor het rapporteren en patchen van beveiligingslekken. Een SBOM wordt standaard.' },
                 { title: '3. Transparantie', text: 'Duidelijke communicatie over de ondersteuningsperiode en beveiligingsinstructies voor de eindgebruiker.' },
                 { title: '4. Conformiteit & CE', text: 'Formele check voordat het product de markt op gaat. Voor kritieke producten is een externe audit verplicht.' }
               ].map((step, i) => (
                 <div key={i} style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2563eb' }}></div>
                     {i < 3 && <div style={{ width: '2px', flexGrow: 1, background: '#e2e8f0', margin: '8px 0' }}></div>}
                   </div>
                   <div style={{ paddingBottom: '20px' }}>
                     <h3 style={{ margin: '0 0 8px' }}>{step.title}</h3>
                     <p style={{ color: '#475569', fontSize: '15px' }}>{step.text}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section className="expertise-section" style={{ background: '#f8fafc' }}>
          <div className="container">
            <div className="case-study-grid">
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3>Financiële Risico's</h3>
                <div style={{ height: '250px', margin: '24px 0' }}>
                  <Doughnut 
                    data={finesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '70%',
                      plugins: { legend: { position: 'bottom' } }
                    }}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Niet-naleving eisen</span>
                    <span style={{ fontWeight: 700, color: '#2563eb' }}>€15M of 2.5% omzet</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Andere verplichtingen</span>
                    <span style={{ fontWeight: 700, color: '#2563eb' }}>€10M of 2% omzet</span>
                  </div>
                </div>
              </div>

              <div>
                <h2>De Tijdlijn</h2>
                <div style={{ marginTop: '32px' }}>
                  {[
                    { year: '24', label: 'Eind 2024', text: 'Definitieve publicatie en inwerkingtreding.' },
                    { year: '26', label: 'Medio 2026', text: 'Meldplicht voor incidenten wordt actief.' },
                    { year: '27', label: 'Eind 2027', text: 'Volledige handhaving van alle productvereisten.' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                      <div style={{ 
                        width: '48px', height: '48px', borderRadius: '50%', 
                        background: i === 2 ? '#2563eb' : '#e2e8f0',
                        color: i === 2 ? '#fff' : '#475569',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                      }}>{item.year}</div>
                      <div>
                        <h4 style={{ margin: 0 }}>{item.label}</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{item.text}</p>
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
