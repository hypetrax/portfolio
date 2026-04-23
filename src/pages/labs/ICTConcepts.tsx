import { memo, useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

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
      borderColor: '#1e293b',
      backgroundColor: 'rgba(30, 41, 59, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: ['#94a3b8', '#94a3b8', '#ef4444', '#ef4444', '#22c55e', '#22c55e'],
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

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', color: '#1e293b', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>📈</span>
            <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.025em', color: '#0f172a' }}>ICT Mastery</span>
          </div>
          <div style={{ display: 'none' }} className="md:flex space-x-8 items-center">
            {['overview', 'paradigm', 'concepts', 'analysis', 'faq'].map(section => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{ 
                  color: activeNav === section ? '#2563eb' : '#475569', 
                  borderBottom: activeNav === section ? '2px solid #2563eb' : '2px solid transparent',
                  padding: '8px 0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <section id="overview" style={{ paddingTop: '32px', paddingBottom: '48px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '12px', fontWeight: 600, letterSpacing: '0.025em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Trading Strategy Report
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '24px' }}>
                ICT Trading — <span style={{ color: '#2563eb' }}>De Kern Uitgelegd</span>
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', marginBottom: '24px', lineHeight: 1.6 }}>
                De Inner Circle Trader (ICT) methode kijkt naar hoe grote instellingen de markt bewegen. Geen vage indicatoren, maar een focus op liquiditeit en marktstructuur om 'retail traps' te vermijden.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#concepts" style={{ backgroundColor: '#2563eb', color: 'white', fontWeight: 600, padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}>Explore Concepts</a>
                <a href="#faq" style={{ backgroundColor: 'white', color: '#334155', fontWeight: 600, padding: '12px 24px', borderRadius: '8px', border: '1px solid #d1d5db', textDecoration: 'none', transition: 'background 0.2s' }}>Read FAQs</a>
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '-32px', marginTop: '-32px', fontSize: '120px', opacity: 0.05 }}>🏛️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>Core Objective</h3>
              <p style={{ color: '#475569', marginBottom: '24px' }}>
                "In the financial market, large players and market makers often accumulate large order blocks before making significant price moves. ICT aims to identify these footprints."
              </p>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '8px' }}>✔</span> Emulates Smart Money Behavior
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ color: '#10b981', marginRight: '8px' }}>✔</span> Sidesteps Retail Traps
              </div>
            </div>
          </div>
        </section>

        <section id="paradigm">
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>The Smart Money Paradigm</h2>
            <p style={{ color: '#475569', fontSize: '18px' }}>
              How "Smart Money" manipulates price to tap into retail liquidity (stop losses) before moving the market in their intended direction.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '350px', position: 'relative' }}>
              <Line 
                data={paradigmData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const labels = [
                            'Asian Session',
                            'London Open',
                            'Retail induced to buy (Breakout)',
                            'SM drives price down to hit stops',
                            'SM accumulates orders & drives up',
                            'Expansion'
                          ];
                          return labels[context.dataIndex] || '';
                        }
                      }
                    }
                  },
                  scales: { y: { display: false, min: 90, max: 120 }, x: { grid: { display: false } } }
                }}
              />
            </div>
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'center', fontSize: '14px' }}>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }}>👤</span>
                <strong style={{ display: 'block', color: '#1e293b' }}>1. Retail Engineering</strong>
                <span style={{ color: '#64748b' }}>Price creates obvious support/resistance.</span>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }}>🚨</span>
                <strong style={{ display: 'block', color: '#991b1b' }}>2. Liquidity Sweep</strong>
                <span style={{ color: '#b91c1c' }}>SM drives price through support to hit stops.</span>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }}>🚀</span>
                <strong style={{ display: 'block', color: '#1e40af' }}>3. Institutional Move</strong>
                <span style={{ color: '#1d4ed8' }}>True directional move begins.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="concepts" style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Key ICT Concepts</h2>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>Click the concepts below to explore the framework.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {concepts.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setActiveConcept(c)}
                  style={{ 
                    textAlign: 'left', padding: '16px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    border: '1px solid #334155',
                    backgroundColor: activeConcept.id === c.id ? '#2563eb' : '#1e293b',
                    color: activeConcept.id === c.id ? 'white' : '#cbd5e1'
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{c.icon}</span> {c.title}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px', color: '#60a5fa' }}>{activeConcept.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{activeConcept.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>{activeConcept.desc}</p>
              <div style={{ paddingTop: '24px', borderTop: '1px solid #334155' }}>
                <p style={{ color: '#93c5fd', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Application</p>
                <p style={{ color: 'white', margin: 0 }}>{activeConcept.action}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="analysis">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Anatomy of an ICT Setup</h2>
              <p style={{ color: '#475569', marginBottom: '32px' }}>A confluence of time, price, and structural elements.</p>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', height: '300px' }}>
                <Doughnut 
                  data={componentsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: { position: 'right', labels: { padding: 20, usePointStyle: true, font: { family: 'Inter', size: 13 } } }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '0' }}>Benefits & Limitations</h2>
              {[
                { i: '📈', c: 'green', t: 'Follows Institutional Money', d: 'Logical framework based on how large players actually move prices.' },
                { i: '🧠', c: 'orange', t: 'Steep Learning Curve', d: 'Requires significant study and backtesting to apply correctly.' },
                { i: '🎯', c: 'green', t: 'High Risk-to-Reward', d: 'Precision entries allow for tight stops and massive potential upside.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: item.c === 'green' ? '#f0fdf4' : '#fff7ed', border: `1px solid ${item.c === 'green' ? '#dcfce7' : '#ffedd5'}`, borderRadius: '16px' }}>
                  <div style={{ fontSize: '24px' }}>{item.i}</div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '4px', color: item.c === 'green' ? '#14532d' : '#7c2d12' }}>{item.t}</h4>
                    <p style={{ fontSize: '14px', color: item.c === 'green' ? '#166534' : '#9a3412', margin: 0 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" style={{ maxWidth: '896px', margin: '0 auto', paddingBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>❓</span>
            <h2 style={{ fontSize: '30px', fontWeight: 700 }}>Frequently Asked Questions</h2>
            <p style={{ color: '#475569', marginTop: '8px' }}>Direct answers from the source report.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 24px', fontWeight: 700, color: '#1e293b', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '18px' }}>{faq.q}</span>
                  <span style={{ fontSize: '24px', color: '#94a3b8', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out', backgroundColor: '#f8fafc', borderTop: openFaq === i ? '1px solid #f1f5f9' : 'none' }}>
                  <p style={{ padding: '20px 24px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '32px 0', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
        <p style={{ margin: 0 }}>Interactive Analysis based on "ICT Trading Strategy Report"</p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>Educational Purposes Only. Not Financial Advice.</p>
      </footer>
    </div>
  );
});
