import { memo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
        desc: 'A three-candle pattern indicating an imbalance in price delivery. Price moved so fast in one direction that the other side was not offered fair trading opportunity.',
        action: 'Used as high-probability targets or entry points when price retraces.'
    },
    {
        id: 'mss',
        title: 'Market Structure Shift',
        icon: '🔄',
        desc: 'A distinct change in the trend direction, characterized by a forceful break of a key swing high or low. It is the first clue that Smart Money has reversed bias.',
        action: 'Wait for a liquidity sweep, followed immediately by an MSS.'
    },
    {
        id: 'killzones',
        title: 'Time & Killzones',
        icon: '🕒',
        desc: 'In ICT, time is as important as price. Killzones are specific windows of the day characterized by high volatility and institutional volume injections.',
        action: 'Only look for high-probability setups during these specific time windows.'
    }
];

export const ICTConcepts = memo(() => {
  const [activeConcept, setActiveConcept] = useState(concepts[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const paradigmData = {
    labels: ['Asian Session', 'London Open', 'Manipulation', 'Stop Hunt', 'True Direction', 'Expansion'],
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
    labels: ['Time', 'Liquidity', 'Structure', 'FVG'],
    datasets: [{
      data: [25, 30, 25, 20],
      backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
      borderWidth: 0,
    }]
  };

  const faqs = [
    {
        q: "Is the ICT Trading Strategy Really Profitable?",
        a: "The ICT strategy has been reported profitable by traders who execute it skillfully. However, success depends heavily on the trader's ability to apply the methodology correctly; no strategy is foolproof."
    },
    {
        q: "Are ICT and SMC the same?",
        a: "They are closely related. SMC (Smart Money Concepts) refers to the core concepts of institutional movement. ICT is the broader framework developed by Michael J. Huddleston that incorporates these concepts."
    },
    {
        q: "How can you learn ICT trading?",
        a: "Michael J. Huddleston provides extensive tutorials on YouTube. Building a foundational understanding through backtesting and joining trading communities is also recommended."
    }
  ];

  return (
    <div className="labs-page">
      <header className="hero-header">
        <div className="container">
          <p className="overline">Labs — Institutional Theory</p>
          <h1>Demystifying the <span className="text-blue-600 italic">ICT</span> Methodology</h1>
          <p className="lead">
            A comprehensive approach to analyzing financial market structure by identifying the footprints of institutional traders.
          </p>
        </div>
      </header>

      <main className="container py-12 space-y-32">
        <section id="paradigm">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2>The Smart Money Paradigm</h2>
            <p className="text-slate-600">How "Smart Money" manipulates price to tap into retail liquidity (stop losses) before moving the market in their intended direction.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-[400px]">
              <Line 
                data={paradigmData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { display: false, min: 90, max: 120 },
                    x: { grid: { display: false } }
                  }
                }}
              />
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center text-sm">
              <div className="p-6 bg-slate-50 rounded-xl">
                <span className="block text-2xl mb-2">👤</span>
                <strong className="block text-slate-800 mb-2">1. Retail Engineering</strong>
                <span className="text-slate-500">Price creates obvious support/resistance, inducing retail traders to enter early.</span>
              </div>
              <div className="p-6 bg-rose-50 rounded-xl">
                <span className="block text-2xl mb-2">🚨</span>
                <strong className="block text-rose-800 mb-2">2. Liquidity Sweep</strong>
                <span className="text-rose-600/80">Smart Money drives price through support to hit stops, accumulating orders.</span>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <span className="block text-2xl mb-2">🚀</span>
                <strong className="block text-blue-800 mb-2">3. Institutional Move</strong>
                <span className="text-blue-600/80">With sufficient liquidity grabbed, the true directional move begins.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="concepts" className="bg-slate-900 text-white rounded-3xl p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl -mr-32 -mt-32"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-white">Key ICT Concepts</h2>
            <p className="text-slate-400">Mastering ICT requires understanding specific mechanics of order flow.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 flex flex-col gap-2">
              {concepts.map(concept => (
                <button 
                  key={concept.id}
                  onClick={() => setActiveConcept(concept)}
                  className={`text-left px-8 py-5 rounded-xl font-bold transition-all border ${activeConcept.id === concept.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'}`}
                >
                  <span className="mr-3">{concept.icon}</span> {concept.title}
                </button>
              ))}
            </div>
            
            <div className="lg:col-span-8 bg-slate-800/50 rounded-2xl p-10 border border-slate-700/50 backdrop-blur-sm flex flex-col justify-center min-h-[350px]">
              <div className="text-5xl mb-8">{activeConcept.icon}</div>
              <h3 className="text-white text-3xl font-bold mb-4">{activeConcept.title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">{activeConcept.desc}</p>
              <div className="pt-8 border-t border-slate-700">
                <p className="text-blue-400 font-mono text-sm uppercase tracking-widest font-bold">Application</p>
                <p className="text-white mt-2">{activeConcept.action}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="analysis" className="grid md:grid-cols-2 gap-20">
          <div>
            <h3>Anatomy of a Setup</h3>
            <p className="text-slate-600 mb-12">The strategy is a confluence of time, price, and structural elements.</p>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-[300px]">
              <Doughnut 
                data={componentsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: {
                    legend: {
                      position: 'right' as const,
                      labels: { padding: 20, usePointStyle: true, font: { weight: 'bold' } }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="mb-12">Pros & Realities</h3>
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-6">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="text-emerald-900 font-bold mb-1">Institutional Alignment</h4>
                <p className="text-emerald-800/70 text-sm">Follows the footprints of banks and central institutions rather than retail indicators.</p>
              </div>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 flex gap-6">
              <span className="text-2xl">🧠</span>
              <div>
                <h4 className="text-amber-900 font-bold mb-1">Steep Learning Curve</h4>
                <p className="text-amber-800/70 text-sm">Requires significant study of complex terminology and hundreds of hours of backtesting.</p>
              </div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-6">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="text-emerald-900 font-bold mb-1">High Risk-to-Reward</h4>
                <p className="text-emerald-800/70 text-sm">Precision entries allow for tight stops and massive potential upside on expansions.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-8 py-6 font-bold text-slate-900 hover:bg-slate-50 flex justify-between items-center transition-colors"
                >
                  <span className="text-lg">{faq.q}</span>
                  <span className={`text-2xl text-slate-400 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 bg-white animate-in slide-in-from-top-2 duration-300">
                    <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-6">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
});
