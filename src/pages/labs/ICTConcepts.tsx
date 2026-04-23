import { memo, useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { SEO } from '../../components/SEO';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const concepts = [
  {
    id: 'liquidity',
    title: 'Liquidity Pools',
    icon: '💧',
    desc: 'Areas on a chart where retail traders typically place their stop-loss orders. ICT theory suggests Smart Money algorithms actively seek out these pools to fill their large orders.',
    action: 'Look for obvious swing highs/lows where masses of stops are resting.'
  },
  {
    id: 'orderblock',
    title: 'Order Blocks (OB)',
    icon: '🏛️',
    desc: 'Specific price candles where financial institutions have accumulated substantial positions. When price returns to these zones, strong reactions are expected as institutions defend their entries.',
    action: 'Identify the last down-candle before an explosive up-move (Bullish OB).'
  },
  {
    id: 'fvg',
    title: 'Fair Value Gap (FVG)',
    icon: '📏',
    desc: 'A three-candle pattern indicating an imbalance in price delivery (inefficiency). Price moved so fast in one direction that the other side was not offered fair trading opportunity. Price often returns to fill these gaps.',
    action: 'Used as high-probability targets or entry points when price retraces.'
  },
  {
    id: 'mss',
    title: 'Market Structure Shift (MSS)',
    icon: '🔄',
    desc: 'A distinct change in the trend direction, characterized by a forceful break of a key swing high or low. It is the first clue that Smart Money has reversed its directional bias.',
    action: 'Wait for a liquidity sweep, followed immediately by an MSS.'
  },
  {
    id: 'killzones',
    title: 'Time & Killzones',
    icon: '🕒',
    desc: 'In ICT, time is as important as price. Killzones are specific windows of the day (e.g., London Open, NY Session Open) characterized by high volatility and institutional volume injections.',
    action: 'Only look for high-probability setups during these specific time windows.'
  }
];

const faqs = [
  {
    q: "Is the ICT Trading Strategy Really Profitable?",
    a: "The ICT trading strategy has been reported to be profitable by traders who have embraced its concepts and executed it skillfully. However, the report stresses that no trading strategy is foolproof, and success is not guaranteed in every trade. It depends heavily on the trader's ability to understand and apply the methodology correctly."
  },
  {
    q: "Are ICT and SMC (Smart Money Concepts) the same?",
    a: "No, they are not the same, but closely related. SMC refers specifically to the concepts associated with understanding Smart Money's movements. ICT, developed by Michael J. Huddleston, is the broader, overarching framework and methodology that incorporates these Smart Money Concepts to emulate their behavior."
  },
  {
    q: "How can you learn ICT trading?",
    a: "You can start by accessing the wealth of educational resources provided by Michael J. Huddleston, particularly his tutorials available on YouTube. Additionally, joining online trading communities or forums where ICT traders share insights is highly recommended to build foundational understanding."
  }
];

export const ICTConcepts = memo(() => {
  const [activeConcept, setActiveConcept] = useState(concepts[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'paradigm', 'concepts', 'analysis', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveNav(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paradigmData = {
    labels: ['Asian Session', 'London Open', 'Manipulation (Judas)', 'Stop Hunt', 'True Direction', 'Expansion'],
    datasets: [{
      label: 'Price Action',
      data: [100, 102, 105, 95, 110, 115],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: ['#94a3b8', '#94a3b8', '#ef4444', '#ef4444', '#10b981', '#10b981'],
      pointRadius: 6,
      tension: 0.4,
      fill: true
    }]
  };

  const componentsData = {
    labels: ['Time (Killzones)', 'Liquidity (Stops)', 'Structure', 'Inefficiency (FVG)'],
    datasets: [{
      data: [25, 30, 25, 20],
      backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { display: false, min: 90, max: 120 },
      x: { 
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  const ictSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ICT Trading Strategy & Smart Money Concepts Masterclass",
    "description": "Diepgaande gids over de Inner Circle Trader (ICT) methodologie. Leer over Liquidity Pools, Order Blocks, Fair Value Gaps en institutional orderflow.",
    "author": {
      "@type": "Person",
      "name": "Bart Pullen"
    },
    "datePublished": "2024-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "Bart Pullen Portfolio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bartpullen.nl/portfolio.png"
      }
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <SEO 
        title="ICT Trading Strategy & Smart Money Concepts Masterclass" 
        description="Diepgaande gids over de Inner Circle Trader (ICT) methodologie. Leer over Liquidity Pools, Order Blocks, Fair Value Gaps en institutional orderflow."
        canonical="/labs/ict"
        schema={ictSchema}
      />
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>📈</span>
            <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.025em', color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>ICT Mastery</span>
          </div>
          <div style={{ display: 'none' }} className="md:flex space-x-8 items-center">
            {['overview', 'paradigm', 'concepts', 'analysis', 'faq'].map(section => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{ 
                  color: activeNav === section ? 'var(--accent)' : 'var(--text-muted)', 
                  borderBottom: activeNav === section ? '2px solid var(--accent)' : '2px solid transparent',
                  padding: '8px 0', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.05em'
                }}
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <section id="overview" style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '4px', backgroundColor: 'var(--accent-glow)', color: 'var(--accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', border: '1px solid var(--accent-glow)' }}>
                Trading Strategy Report
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>
                Demystifying the <span style={{ color: 'var(--accent)' }}>ICT</span> Paradigm
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
                The Inner Circle Trader (ICT) methodology is a comprehensive framework for institutional order flow analysis. It equips traders to identify the footprints of large-scale market participants.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#concepts" style={{ backgroundColor: 'var(--accent)', color: 'white', fontWeight: 600, padding: '14px 28px', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s', fontSize: '14px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>Explore Concepts</a>
                <a href="#faq" style={{ backgroundColor: 'transparent', color: 'var(--text-main)', fontWeight: 600, padding: '14px 28px', borderRadius: '6px', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s', fontSize: '14px' }}>Read FAQs</a>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '-32px', marginTop: '-32px', fontSize: '120px', opacity: 0.03 }}>🏛️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>Core Objective</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
                "In the financial market, large players and market makers often accumulate large order blocks before making significant price moves. ICT aims to identify these footprints."
              </p>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--success)', marginRight: '10px' }}>✔</span> Institutional Order Flow Tracking
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)', display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ color: 'var(--success)', marginRight: '10px' }}>✔</span> Retail Liquidity Trap Mitigation
              </div>
            </div>
          </div>
        </section>

        <section id="paradigm">
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>The <span style={{ color: 'var(--accent)' }}>Smart Money</span> Paradigm</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
              Price manipulation to tap into retail liquidity before institutional expansion.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ height: '350px', position: 'relative' }}>
              <Line 
                data={paradigmData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      backgroundColor: '#1e293b',
                      padding: 12,
                      titleFont: { size: 14, weight: 'bold' },
                      bodyFont: { size: 13 },
                      callbacks: {
                        label: (context) => {
                          const labels = [
                            'Asian Session: Range bound',
                            'London Open: Initial push',
                            'Judas Swing: Fake move',
                            'Stop Hunt: Hit retail stops',
                            'Institutional Buy/Sell',
                            'Expansion: True direction'
                          ];
                          return labels[context.dataIndex] || '';
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center', fontSize: '14px' }}>
              <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>👤</span>
                <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '4px' }}>1. Retail Engineering</strong>
                <span style={{ color: 'var(--text-muted)' }}>Obvious support/resistance levels.</span>
              </div>
              <div style={{ padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>🚨</span>
                <strong style={{ display: 'block', color: '#ef4444', marginBottom: '4px' }}>2. Liquidity Sweep</strong>
                <span style={{ color: 'rgba(239, 68, 68, 0.8)' }}>Triggering resting retail stops.</span>
              </div>
              <div style={{ padding: '20px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>🚀</span>
                <strong style={{ display: 'block', color: '#10b981', marginBottom: '4px' }}>3. Institutional Move</strong>
                <span style={{ color: 'rgba(16, 185, 129, 0.8)' }}>True directional expansion begins.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="concepts" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)', borderRadius: '24px', padding: '48px', border: '1px solid var(--border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Key <span style={{ color: 'var(--accent)' }}>Framework</span> Components</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Select a concept to explore the technical logic.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {concepts.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setActiveConcept(c)}
                  style={{ 
                    textAlign: 'left', padding: '18px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    border: '1px solid var(--border)',
                    backgroundColor: activeConcept.id === c.id ? 'var(--accent)' : 'var(--bg-color)',
                    color: activeConcept.id === c.id ? 'white' : 'var(--text-muted)',
                    fontSize: '15px'
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>{c.icon}</span> {c.title}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '320px' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px', color: 'var(--accent)' }}>{activeConcept.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>{activeConcept.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.6, marginBottom: '28px' }}>{activeConcept.desc}</p>
              <div style={{ paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px', fontFamily: 'var(--font-mono)' }}>Tactical Application</p>
                <p style={{ color: 'var(--text-main)', margin: 0, fontSize: '15px' }}>{activeConcept.action}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="analysis">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Setup Anatomy</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>A confluence of time, price, and institutional footprints.</p>
              <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', height: '320px' }}>
                <Doughnut 
                  data={componentsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                      legend: { 
                        position: 'right', 
                        labels: { 
                          padding: 20, 
                          usePointStyle: true, 
                          color: '#94a3b8',
                          font: { family: 'var(--font-sans)', size: 12, weight: 500 } 
                        } 
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Risk & Reward Profile</h2>
              {[
                { i: '📈', c: 'blue', t: 'Institutional Alignment', d: 'Logical framework based on actual massive volume injections.' },
                { i: '🧠', c: 'orange', t: 'Conceptual Density', d: 'Requires significant study to master algorithmic behavior.' },
                { i: '🎯', c: 'green', t: 'Precision Execution', d: 'High risk-to-reward via tight stops in FVG entry zones.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px', padding: '24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '24px' }}>{item.i}</div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)', fontSize: '16px' }}>{item.t}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" style={{ maxWidth: '896px', margin: '0 auto', paddingBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>❓</span>
            <h2 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>Strategic <span style={{ color: 'var(--accent)' }}>FAQ</span></h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Direct insights into the methodology application.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '24px', fontWeight: 700, color: 'var(--text-main)', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '17px' }}>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: 'var(--accent)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <p style={{ padding: '0 24px 24px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, fontSize: '15px' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '48px 0', textAlign: 'center', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <p style={{ margin: 0 }}>Institutional Intelligence & Algorithmic Analysis Lab</p>
        <p style={{ marginTop: '10px', opacity: 0.6 }}>Educational Context Only • No Financial Guarantee</p>
      </footer>
    </div>
  );
});
