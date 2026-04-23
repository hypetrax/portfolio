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
import { Bar } from 'react-chartjs-2';

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

const simData = {
  bullish: {
    candles: [
      {x: '09:00', o: 105.0, h: 106.5, l: 102.0, c: 102.5},
      {x: '09:15', o: 102.5, h: 104.0, l: 101.5, c: 103.0},
      {x: '09:30', o: 103.0, h: 103.5, l: 100.0, c: 100.5},
      {x: '09:45', o: 100.5, h: 102.0, l: 99.0,  c: 101.5},
      {x: '10:00', o: 101.5, h: 101.5, l: 98.5,  c: 99.5}, 
      {x: '10:15', o: 99.5,  h: 100.5, l: 98.5,  c: 100.0}, 
      {x: '10:30', o: 100.0, h: 100.0, l: 95.0,  c: 96.5},  
      {x: '10:45', o: 96.5,  h: 104.5, l: 96.0,  c: 104.0}, 
      {x: '11:00', o: 104.0, h: 106.0, l: 103.5, c: 105.5}, 
      {x: '11:15', o: 105.5, h: 106.0, l: 100.0, c: 101.0}, 
      {x: '11:30', o: 101.0, h: 108.0, l: 100.5, c: 107.5}, 
      {x: '11:45', o: 107.5, h: 112.0, l: 107.0, c: 111.0}  
    ],
    steps: [
      { 
        endIdx: 6, 
        title: "1. Forming the Liquidity Pool", 
        desc: "Price drops and establishes a clear swing low around 98.50. Retail traders place their stop-loss orders (SSL) below this level.",
        levels: [{ val: 98.5, label: 'SSL', color: 'red' }]
      },
      { 
        endIdx: 8, 
        title: "2. The Sweep (Judas Swing)", 
        desc: "At 10:30, volatility hits. Price aggressively drops to 95.0, sweeping the SSL. Smart money absorbs this liquidity to build long positions.",
        levels: [{ val: 98.5, label: 'SSL', color: 'red' }, { val: 95.0, label: 'Sweep', color: 'orange' }]
      },
      { 
        endIdx: 10, 
        title: "3. Market Structure Shift (MSS)", 
        desc: "Immediately after the sweep, price violently reverses. By breaking the previous lower high at 104.0, we have a confirmed MSS.",
        levels: [{ val: 104.0, label: 'MSS', color: 'green' }]
      },
      { 
        endIdx: 11, 
        title: "4. The FVG Entry", 
        desc: "The energetic displacement leaves a Fair Value Gap. The pullback taps directly into this imbalance, offering the entry point.",
        levels: [{ val: 100.0, label: 'FVG', color: 'blue' }]
      },
      { 
        endIdx: 12, 
        title: "5. Expansion to Target", 
        desc: "Once institutional orders are mitigated, price expands towards opposing Buy Side Liquidity pools. Setup complete.",
        levels: []
      }
    ]
  },
  bearish: {
    candles: [
      {x: '09:00', o: 100.0, h: 102.0, l: 98.0,  c: 101.5},
      {x: '09:15', o: 101.5, h: 104.5, l: 101.0, c: 103.5},
      {x: '09:30', o: 103.5, h: 106.0, l: 102.5, c: 105.0},
      {x: '09:45', o: 105.0, h: 105.5, l: 103.0, c: 104.0},
      {x: '10:00', o: 104.0, h: 104.5, l: 102.0, c: 102.5}, 
      {x: '10:15', o: 102.5, h: 104.0, l: 101.5, c: 103.5}, 
      {x: '10:30', o: 103.5, h: 110.0, l: 103.0, c: 108.5},  
      {x: '10:45', o: 108.5, h: 109.0, l: 100.5, c: 101.0}, 
      {x: '11:00', o: 101.0, h: 102.0, l: 98.0,  c: 99.5}, 
      {x: '11:15', o: 99.5,  h: 106.0, l: 99.0,  c: 105.0}, 
      {x: '11:30', o: 105.0, h: 105.5, l: 96.0,  c: 97.5}, 
      {x: '11:45', o: 97.5,  h: 98.0,  l: 92.0,  c: 93.0}  
    ],
    steps: [
      { 
        endIdx: 6, 
        title: "1. Forming the Liquidity Pool", 
        desc: "Price rallies and establishes a clear swing high at 106.0. Retail traders place buy-stops (BSL) above this resistance.",
        levels: [{ val: 106.0, label: 'BSL', color: 'blue' }]
      },
      { 
        endIdx: 8, 
        title: "2. The Sweep (Judas Swing)", 
        desc: "Price surges to 110.0, sweeping the BSL. Smart money uses these buy orders to execute massive short positions.",
        levels: [{ val: 106.0, label: 'BSL', color: 'blue' }, { val: 110.0, label: 'Sweep', color: 'red' }]
      },
      { 
        endIdx: 10, 
        title: "3. Market Structure Shift (MSS)", 
        desc: "Following the sweep, price violently collapses. Breaking the recent higher low around 101.5 confirms a bearish MSS.",
        levels: [{ val: 101.5, label: 'MSS', color: 'red' }]
      },
      { 
        endIdx: 11, 
        title: "4. The Bearish FVG Entry", 
        desc: "The drop creates a Bearish FVG. Price retraces upwards, filling the gap. This is the institutional entry point.",
        levels: [{ val: 105.0, label: 'FVG', color: 'orange' }]
      },
      { 
        endIdx: 12, 
        title: "5. Downward Expansion", 
        desc: "After mitigating orders in the premium array, price rapidly dumps towards lower liquidity pools.",
        levels: []
      }
    ]
  }
};

export const TurtleSoup = memo(() => {
  const [type, setType] = useState<'bullish' | 'bearish'>('bullish');
  const [stepIdx, setStepIdx] = useState(0);

  const data = simData[type];
  const currentStep = data.steps[stepIdx];
  const visibleCandles = data.candles.slice(0, currentStep.endIdx);

  const chartData = useMemo(() => {
    const labels = visibleCandles.map(c => c.x);
    const datasets: any[] = [
      {
        label: 'Wick',
        data: visibleCandles.map(c => [c.l, c.h]),
        backgroundColor: '#cbd5e1',
        barThickness: 2,
        order: 2
      },
      {
        label: 'Body',
        data: visibleCandles.map(c => [c.o, c.c]),
        backgroundColor: visibleCandles.map(c => c.c >= c.o ? '#10b981' : '#ef4444'),
        barThickness: 12,
        order: 1
      }
    ];

    // Add levels as line datasets
    currentStep.levels.forEach(level => {
      datasets.push({
        label: level.label,
        data: new Array(visibleCandles.length).fill(level.val),
        borderColor: level.color,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        type: 'line',
        fill: false,
        order: 0
      });
    });

    return { labels, datasets };
  }, [visibleCandles, currentStep]);

  return (
    <div className="labs-page">
      <header className="hero-header">
        <div className="container">
          <p className="overline">Labs — Price Action Theory</p>
          <h1>The ICT <span className="text-blue-600">Turtle Soup</span> Masterclass</h1>
          <p className="lead">
            A modernization of classic false-breakout strategies targeting engineered liquidity pools.
          </p>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 bg-slate-50 border-r border-slate-200 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <button onClick={() => { setType('bullish'); setStepIdx(0); }} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${type === 'bullish' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>Bullish</button>
                  <button onClick={() => { setType('bearish'); setStepIdx(0); }} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${type === 'bearish' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>Bearish</button>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {stepIdx + 1}/5</span>
              </div>

              <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-8">{currentStep.desc}</p>

              <div className="space-y-4 mb-12">
                {['Identify Old Low/High', 'Wait for Sweep', 'Market Structure Shift', 'FVG Entry'].map((task, i) => (
                  <div key={task} className={`flex items-center gap-3 text-sm transition-all ${i <= stepIdx ? 'text-slate-900 opacity-100' : 'text-slate-300 opacity-50'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${i <= stepIdx ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}>
                      {i <= stepIdx ? '✓' : ''}
                    </div>
                    {task}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStepIdx(0)} className="btn-secondary flex-1 py-3 text-sm">Reset</button>
              <button 
                onClick={() => setStepIdx(s => Math.min(s + 1, 4))} 
                disabled={stepIdx === 4}
                className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 p-8 flex items-center justify-center bg-white min-h-[500px]">
            <Bar 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { 
                    display: true, 
                    position: 'top',
                    labels: { boxWidth: 10, font: { size: 10 } }
                  },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#f1f5f9' }, min: 90, max: 115 }
                }
              }}
            />
          </div>
        </div>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose prose-slate max-w-none">
            <h3>High-Probability Confluences</h3>
            <p className="lead">A Turtle Soup pattern alone is not enough. The highest probability setups occur when the sweep aligns with time and higher timeframe narratives.</p>
            
            <div className="bg-slate-900 p-8 rounded-xl text-white not-prose mt-8">
              <h4 className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-4">Killzones (NY Time)</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><b className="text-white">London Open:</b> 2:00 AM - 5:00 AM</li>
                <li><b className="text-white">NY AM Session:</b> 8:30 AM - 11:00 AM</li>
                <li><b className="text-white">NY PM Session:</b> 1:30 PM - 4:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="mb-6">Anatomy of the Setup</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">1. Liquidity Pools</h4>
                <p className="text-sm text-slate-600">Areas where resting stop-loss orders accumulate (BSL above highs, SSL below lows).</p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">2. The Sweep</h4>
                <p className="text-sm text-slate-600">The "Judas Swing" designed to trap retail and trigger stops before the real move.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2">3. Displacement & MSS</h4>
                <p className="text-sm text-slate-600">Aggressive reversal confirming institutional participation and shifting trend bias.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
