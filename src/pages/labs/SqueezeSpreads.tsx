import { memo, useState, useMemo } from 'react';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dteData = {
  'daily': { 
    title: 'Daily Squeeze Deployment', 
    range: '24 DTE', 
    target: 'May 15, 2026',
    text: 'Example: SPX ~7122. Short 6950 / Long 6940. Positioned 134 points below the 21 EMA baseline (7084). Target Credit: $2.50.' 
  },
  '3day': { 
    title: '3-Day Squeeze Deployment', 
    range: '58 DTE', 
    target: 'June 18, 2026',
    text: 'Example: Short 6850 / Long 6840. Creates a massive 234-point moat beneath the 21 EMA. Insulated by 21, 50, and 100 EMAs.' 
  },
  'weekly': { 
    title: 'Weekly Squeeze Deployment', 
    range: '87 DTE', 
    target: 'July 17, 2026',
    text: 'The "Peace of Mind" setup. Short 6750. Positioned a staggering 334 points below the 21 EMA and beneath the 200-day EMA (6815).' 
  }
};

export const SqueezeSpreads = memo(() => {
  const [activeSection, setActiveSection] = useState('overview');
  const [chartLayers, setChartLayers] = useState({
    price: true,
    ema21: true,
    emastack: true,
    squeeze: true
  });
  const [selectedDte, setSelectedDte] = useState<'daily' | '3day' | 'weekly'>('daily');

  const chartData = useMemo(() => {
    const labels = Array.from({length: 40}, (_, i) => `Day ${i+1}`);
    const basePrice = labels.map((_, i) => {
        let p;
        if(i < 15) p = 5850 + Math.sin(i) * 20; 
        else if(i < 25) p = 5880 + Math.sin(i) * 10; 
        else p = 5880 + (i - 25) * 15 + Math.random() * 10;
        return p;
    });

    const ema21 = basePrice.map((_, i) => i < 20 ? 5830 : 5830 + (i-20)*8);
    const ema8 = basePrice.map((v) => v - 15);
    const ema34 = basePrice.map((_, i) => i < 20 ? 5810 : 5810 + (i-20)*6);
    const ema55 = basePrice.map((_, i) => 5780 + i*2);
    const ema89 = basePrice.map((_, i) => 5750 + i*1.5);

    const squeezeData = labels.map((_, i) => {
        if(i < 10) return -2 + Math.random();
        if(i < 24) return -0.5 + Math.random()*0.5;
        if(i < 32) return 1 + (i-24)*0.5;
        return 4 - (i-32)*0.2;
    });

    const squeezeColors = labels.map((_, i) => {
        if(i < 10) return 'rgba(239, 68, 68, 0.7)'; 
        if(i < 24) return 'rgba(234, 179, 8, 0.8)'; 
        if(i < 32) return 'rgba(56, 189, 248, 0.8)'; 
        return 'rgba(37, 99, 235, 0.7)'; 
    });

    return {
      labels,
      datasets: [
        {
          label: 'SPX Price',
          data: basePrice,
          borderColor: '#292524',
          borderWidth: 3,
          tension: 0.2,
          pointRadius: 2,
          hidden: !chartLayers.price
        },
        {
          label: '21 EMA',
          data: ema21,
          borderColor: '#10b981',
          borderWidth: 3,
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0,
          hidden: !chartLayers.ema21
        },
        {
          label: '8 EMA',
          data: ema8,
          borderColor: '#a7f3d0',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 0,
          hidden: !chartLayers.emastack
        },
        {
          label: '34 EMA',
          data: ema34,
          borderColor: '#34d399',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          hidden: !chartLayers.emastack
        },
        {
          label: '55 EMA',
          data: ema55,
          borderColor: '#059669',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          hidden: !chartLayers.emastack
        },
        {
          label: '89 EMA',
          data: ema89,
          borderColor: '#064e3b',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          hidden: !chartLayers.emastack
        },
        {
          type: 'bar' as const,
          label: 'Momentum',
          data: squeezeData,
          backgroundColor: squeezeColors,
          yAxisID: 'y1',
          hidden: !chartLayers.squeeze,
          barPercentage: 0.8
        }
      ]
    };
  }, [chartLayers]);

  return (
    <div className="labs-page min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Nav */}
      <nav className="w-full md:w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-auto md:h-screen md:sticky md:top-0">
        <div className="p-8 border-b border-slate-100">
           <p className="overline mb-2">System Playbook</p>
           <h2 className="text-2xl font-bold leading-tight">Stacked Probabilities</h2>
        </div>
        <div className="flex-1 py-8">
          <ul className="space-y-2">
            {[
              { id: 'overview', label: '1. Core Philosophy' },
              { id: 'setup', label: '2. Anatomy of Setup' },
              { id: 'execution', label: '3. Strategy & Execution' },
              { id: 'management', label: '4. Trade Management' }
            ].map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-8 py-4 transition-all border-l-4 ${activeSection === item.id ? 'bg-slate-50 border-blue-600 font-bold text-slate-900' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-1 p-8 md:p-16 max-w-6xl mx-auto">
        {activeSection === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-16">
              <h1 className="mb-4">Core Philosophy</h1>
              <p className="lead">Stacking probabilities for consistent growth and peace of mind.</p>
            </header>

            <div className="space-y-12">
              <p className="text-xl text-slate-600 leading-relaxed">
                This system is designed around finding high-probability moments in time where the odds are overwhelmingly in our favor. By combining market trend, market-leading stocks, and an options strategy that only requires the stock <i>not</i> to crash, we construct a scenario where the "path of least resistance" generates profit.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-blue-600 mb-6">The Goal: Stack the Odds</h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3"><span>✓</span> Trade with the overall market trend.</li>
                    <li className="flex gap-3"><span>✓</span> Focus on Big Money flowing into leading stocks.</li>
                    <li className="flex gap-3"><span>✓</span> Enter during a "squeeze" (growing probability).</li>
                    <li className="flex gap-3"><span>✓</span> Require only that structure holds, not a rally.</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-emerald-600 mb-6">Psychological Edge</h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3"><span>✓</span> <strong>Peace of Mind:</strong> No hesitation.</li>
                    <li className="flex gap-3"><span>✓</span> <strong>Less Stress:</strong> Spreads insulate from noise.</li>
                    <li className="flex gap-3"><span>✓</span> <strong>Health:</strong> Focus on 100 trades, not one.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 p-12 rounded-xl text-center">
                <p className="text-white text-xl italic font-serif">"Probabilities on probabilities. Over the course of 100+ trades... this mindset is what allows me to take trade after trade with no hesitation."</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'setup' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-16">
              <h1 className="mb-4">Anatomy of the Setup</h1>
              <p className="lead">Visualizing the Bullish Structure & The Launching Pad.</p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-12">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="m-0">Visual Setup Preview</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Structure: Bullish</span>
               </div>

               <div className="h-[400px] mb-8">
                  <Chart 
                    type="line"
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: 'index', intersect: false },
                      scales: {
                        y: { position: 'left', title: { display: true, text: 'Price ($)' }, grid: { color: '#f1f5f9' } },
                        y1: { display: false, min: -5, max: 15 },
                        x: { grid: { display: false } }
                      }
                    }}
                  />
               </div>

               <div className="flex flex-wrap gap-3 justify-center border-t border-slate-100 pt-8">
                  {[
                    { id: 'price', label: 'Price Action' },
                    { id: 'ema21', label: '21 EMA' },
                    { id: 'emastack', label: 'Stacked EMAs' },
                    { id: 'squeeze', label: 'Squeeze Histogram' }
                  ].map(layer => (
                    <button 
                      key={layer.id}
                      onClick={() => setChartLayers(p => ({ ...p, [layer.id]: !p[layer.id as keyof typeof p] }))}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${chartLayers[layer.id as keyof typeof chartLayers] ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {layer.label}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-xl">
                 <h4 className="font-bold mb-4">1. The Launching Pad</h4>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   Stock must be trading <b>at or just above the 21 EMA</b>. If extended (2+ ATR above), no entry. The 21 EMA acts as support.
                 </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-xl">
                 <h4 className="font-bold mb-4">2. Backbone & Momentum</h4>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   <b>EMAs (8, 21, 34, 55, 89)</b> must be stacked positively. <b>Squeeze Histogram</b> should show exhaustion of selling (Yellow) or release of momentum (Light Blue).
                 </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'execution' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-16">
              <h1 className="mb-4">Strategy & Execution</h1>
              <p className="lead">Deploying the Out-of-the-Money (OTM) Put Credit Spread.</p>
            </header>

            <div className="space-y-12">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="mb-8">Squeeze Timeframes & Expirations</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {(['daily', '3day', 'weekly'] as const).map(tf => (
                      <button 
                        key={tf}
                        onClick={() => setSelectedDte(tf)}
                        className={`py-4 px-6 border-2 rounded-xl text-sm font-bold transition-all ${selectedDte === tf ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {tf.toUpperCase()} SQUEEZE
                      </button>
                    ))}
                 </div>

                 <div className="bg-slate-50 p-12 rounded-xl text-center animate-in fade-in zoom-in-95 duration-300">
                    <h4 className="text-2xl font-bold mb-2">{dteData[selectedDte].title}</h4>
                    <p className="text-blue-600 font-bold mb-2">{dteData[selectedDte].target}</p>
                    <div className="text-5xl font-black mb-6">{dteData[selectedDte].range}</div>
                    <p className="text-slate-600 max-w-md mx-auto">{dteData[selectedDte].text}</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'management' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-16">
              <h1 className="mb-4">Trade Management</h1>
              <p className="lead">Protecting capital, taking profits, and ignoring noise.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-8">
                  <div className="bg-white p-8 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                    <h4 className="font-bold mb-4">Profit Taking</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Set a GTC order to buy back at <b>80% of max profit</b>. Don't be greedy; holding for the last 20% isn't worth the risk.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-xl border-l-4 border-blue-500 shadow-sm">
                    <h4 className="font-bold mb-4">Position Sizing</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Risk <b>5% to 15%</b> of account. Size depends on market conditions and setup quality.
                    </p>
                  </div>
               </div>

               <div className="bg-slate-900 text-white p-8 rounded-xl border-l-4 border-amber-500">
                  <h4 className="font-bold mb-6 text-amber-500 uppercase tracking-widest text-xs">Exits & Noise</h4>
                  <div className="bg-amber-500/10 p-4 rounded-lg text-amber-500 text-sm font-bold mb-6">
                    Rule: Only exit if the technical structure changes.
                  </div>
                  <ul className="space-y-6 text-slate-300 text-sm">
                    <li>Any price action above the 21 EMA is meaningless <b>"noise"</b>.</li>
                    <li>Do not get shaken out by intraday movements.</li>
                    <li>If the structure holds (still above 21), hang on tight!</li>
                  </ul>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
});
