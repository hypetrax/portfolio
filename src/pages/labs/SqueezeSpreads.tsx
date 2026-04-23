import { useState, useMemo, memo } from 'react';
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
    const [chartStates, setChartStates] = useState({
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

        const squeezeColors = labels.map((_, i) => {
            if(i < 10) return 'rgba(239, 68, 68, 0.7)'; 
            if(i < 24) return 'rgba(234, 179, 8, 0.8)'; 
            if(i < 32) return 'rgba(56, 189, 248, 0.8)'; 
            return 'rgba(37, 99, 235, 0.7)'; 
        });
        const squeezeValues = labels.map((_, i) => {
            if(i < 10) return -2 + Math.random();
            if(i < 24) return -0.5 + Math.random()*0.5;
            if(i < 32) return 1 + (i-24)*0.5;
            return 4 - (i-32)*0.2;
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
                    hidden: !chartStates.price
                },
                {
                    label: '21 EMA',
                    data: ema21,
                    borderColor: '#10b981',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.ema21
                },
                {
                    label: '8 EMA',
                    data: ema8,
                    borderColor: '#a7f3d0',
                    borderWidth: 1,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    label: '34 EMA',
                    data: ema34,
                    borderColor: '#34d399',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    label: '55 EMA',
                    data: ema55,
                    borderColor: '#059669',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    label: '89 EMA',
                    data: ema89,
                    borderColor: '#064e3b',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    type: 'bar' as const,
                    label: 'Momentum',
                    data: squeezeValues,
                    backgroundColor: squeezeColors,
                    yAxisID: 'y1',
                    hidden: !chartStates.squeeze,
                    barPercentage: 0.8
                }
            ]
        };
    }, [chartStates]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index' as const, intersect: false },
        plugins: {
            legend: { position: 'top' as const, labels: { boxWidth: 12, usePointStyle: true } },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: { display: true, text: 'Price ($)' },
                beginAtZero: false,
                grid: { color: '#f5f5f4' }
            },
            y1: {
                type: 'linear' as const,
                display: false,
                min: -5,
                max: 15
            },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="lab-page" style={{ flexDirection: 'row' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .chart-container { position: relative; width: 100%; max-width: 900px; margin-left: auto; margin-right: auto; height: 45vh; max-height: 500px; min-height: 300px; }
            `}} />

            {/* Sidebar Nav */}
            <nav className="lab-nav-sidebar">
                <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', lineHeight: 1.25, margin: 0 }}>
                        Stacked Probabilities<br />
                        <span style={{ color: '#10b981', fontSize: '14px' }}>Swing Setup</span>
                    </h1>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li><button onClick={() => setActiveSection('overview')} className={`lab-tab ${activeSection === 'overview' ? 'active' : ''}`} style={{ width: '100%', textAlign: 'left', padding: '12px 24px', borderLeft: '4px solid transparent', borderBottom: 'none' }}>1. Core Philosophy</button></li>
                        <li><button onClick={() => setActiveSection('setup')} className={`lab-tab ${activeSection === 'setup' ? 'active' : ''}`} style={{ width: '100%', textAlign: 'left', padding: '12px 24px', borderLeft: '4px solid transparent', borderBottom: 'none' }}>2. Anatomy of the Setup</button></li>
                        <li><button onClick={() => setActiveSection('execution')} className={`lab-tab ${activeSection === 'execution' ? 'active' : ''}`} style={{ width: '100%', textAlign: 'left', padding: '12px 24px', borderLeft: '4px solid transparent', borderBottom: 'none' }}>3. Strategy & Execution</button></li>
                        <li><button onClick={() => setActiveSection('management')} className={`lab-tab ${activeSection === 'management' ? 'active' : ''}`} style={{ width: '100%', textAlign: 'left', padding: '12px 24px', borderLeft: '4px solid transparent', borderBottom: 'none' }}>4. Trade Management</button></li>
                    </ul>
                </div>
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
                    System Playbook Overview
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f8fafc', position: 'relative' }}>
                
                {activeSection === 'overview' && (
                    <div className="fade-in lab-container" style={{ maxWidth: '1024px' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>De Basis</h2>
                            <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Kansen stapelen voor meer rust en een duidelijk proces.</p>
                        </div>
                        
                        <p style={{ marginBottom: '24px', color: '#334155', lineHeight: 1.625, fontSize: '18px' }}>
                            Dit systeem draait om het vinden van momenten waarop de kansen overweldigend in ons voordeel zijn. Door de markttrend te combineren met sterke aandelen, specifieke technische structuren (squeezes) en een optiestrategie die een buffer biedt, creëren we een scenario waarin de 'weg van de minste weerstand' winst oplevert.
                        </p>

                        <div className="lab-stat-grid" style={{ gap: '24px', marginBottom: '40px' }}>
                            <div className="lab-card" style={{ borderTop: '4px solid #2563eb' }}>
                                <div style={{ fontSize: '30px', marginBottom: '12px' }}>&#9889;</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '8px', color: '#1e293b' }}>The Goal: Stack the Odds</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>&#10003; Trade with the overall market trend.</li>
                                    <li>&#10003; Focus on Big Money flowing into leading stocks.</li>
                                    <li>&#10003; Enter during a "squeeze" (growing probability of a big move).</li>
                                    <li>&#10003; Require only that the structure holds, not a massive rally.</li>
                                </ul>
                            </div>
                            <div className="lab-card" style={{ borderTop: '4px solid #2563eb' }}>
                                <div style={{ fontSize: '30px', marginBottom: '12px' }}>&#129496;</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '8px', color: '#1e293b' }}>Psychological Edge</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>&#10003; <strong>Peace of Mind:</strong> Knowing probabilities are stacked prevents hesitation.</li>
                                    <li>&#10003; <strong>Less Stress:</strong> Put credit spreads insulate P&L from day-to-day noise and chop.</li>
                                    <li>&#10003; <strong>Healthier Relationship:</strong> Accepting that the <i>next</i> trade might fail, but 100 trades will yield favorable results.</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#e2e8f0', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
                            <p style={{ color: '#1e293b', fontWeight: 500, fontStyle: 'italic', margin: 0 }}>"Probabilities on probabilities. Over the course of 100+ trades... this mindset is what allows me to take trade after trade with no hesitation."</p>
                        </div>
                    </div>
                )}

                {activeSection === 'setup' && (
                    <div className="fade-in lab-container" style={{ maxWidth: '1152px' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Anatomy of the Setup</h2>
                            <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Visualizing the Bullish Structure & The Launching Pad.</p>
                        </div>
                        
                        <p style={{ marginBottom: '24px', color: '#334155', lineHeight: 1.625 }}>
                            A valid entry requires a strict technical structure. Use the controls below the chart to build the setup and understand how the indicators interact to signal a high-probability moment.
                        </p>

                        <div className="lab-card" style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Visual Setup Preview <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: '8px' }}>| TICKER: SPX</span></h3>
                                <div style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px' }}>STRUCTURE: BULLISH</div>
                            </div>
                            
                            <div className="chart-container">
                                <Chart type="line" data={chartData} options={chartOptions} />
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                                <button 
                                    onClick={() => setChartStates({...chartStates, price: !chartStates.price})}
                                    style={{ padding: '8px 16px', backgroundColor: chartStates.price ? '#1e293b' : '#e2e8f0', color: chartStates.price ? 'white' : '#334155', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                                >
                                    Price Action
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, ema21: !chartStates.ema21})}
                                    style={{ padding: '8px 16px', backgroundColor: chartStates.ema21 ? '#1e293b' : '#e2e8f0', color: chartStates.ema21 ? 'white' : '#334155', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                                >
                                    + 21 EMA (The Line in Sand)
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, emastack: !chartStates.emastack})}
                                    style={{ padding: '8px 16px', backgroundColor: chartStates.emastack ? '#1e293b' : '#e2e8f0', color: chartStates.emastack ? 'white' : '#334155', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                                >
                                    + Stacked EMAs (Backbone)
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, squeeze: !chartStates.squeeze})}
                                    style={{ padding: '8px 16px', backgroundColor: chartStates.squeeze ? '#1e293b' : '#e2e8f0', color: chartStates.squeeze ? 'white' : '#334155', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                                >
                                    + Squeeze Histogram
                                </button>
                            </div>
                            
                            <div className="lab-stat-grid" style={{ marginTop: '24px', gap: '16px' }}>
                                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '4px', fontSize: '14px' }}>
                                    <h4 style={{ fontWeight: 'bold', marginBottom: '8px', margin: 0 }}>1. The Launching Pad</h4>
                                    <p style={{ color: '#475569', marginBottom: '8px', marginTop: '8px' }}>Stock must be trading <b>at or just above the 21 EMA</b>. If extended (2+ ATR above), no entry.</p>
                                    <p style={{ color: '#475569', margin: 0 }}>The 21 EMA acts as support. Price action above it during a squeeze is just "noise".</p>
                                </div>
                                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '4px', fontSize: '14px' }}>
                                    <h4 style={{ fontWeight: 'bold', marginBottom: '8px', margin: 0 }}>2. Stacked EMAs & Squeeze</h4>
                                    <p style={{ color: '#475569', marginBottom: '8px', marginTop: '8px' }}><b>EMAs (8, 21, 34, 55, 89)</b> must be stacked positively (shortest on top). Indicates strong bullish backbone.</p>
                                    <p style={{ color: '#475569', margin: 0 }}><b>Squeeze Histogram</b> must be Yellow (exhaustion of selling) or Light Blue (release of bullish momentum).</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '24px', borderRadius: '8px' }}>
                            <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.05em', margin: 0 }}>Required Tools Checklist</h4>
                            <ul className="lab-stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '14px', listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
                                <li>• Market &gt; 21 EMA (Daily/Weekly)</li>
                                <li>• Stock &gt; 21 EMA (Daily/Weekly)</li>
                                <li>• Stacked EMA Label</li>
                                <li>• Bollinger Bands</li>
                                <li>• Keltner Channels (2 ATR)</li>
                                <li>• Squeeze Pro Indicator</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeSection === 'execution' && (
                    <div className="fade-in lab-container" style={{ maxWidth: '1024px' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Strategy & Execution</h2>
                            <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Deploying the Out-of-the-Money (OTM) Put Credit Spread.</p>
                        </div>

                        <p style={{ marginBottom: '24px', color: '#334155', lineHeight: 1.625 }}>
                            The core mechanism is selling an OTM Put Credit Spread. We place a bet that the established bullish structure won't completely fail. Our only requirement for profit is that the stock doesn't move significantly in the opposite direction.
                        </p>

                        <div className="lab-card" style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', color: '#1e293b', margin: 0 }}>The Trade Structure</h3>
                            <div className="lab-report-grid" style={{ display: 'flex' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ position: 'relative', width: '100%', height: '160px', borderLeft: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', paddingLeft: '16px', paddingBottom: '16px' }}>
                                        <div style={{ position: 'absolute', bottom: '128px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginRight: '8px', width: '80px', textAlign: 'right' }}>Stock Price</span>
                                            <div style={{ height: 0, borderTop: '2px dashed #94a3b8', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '-12px', left: '25%', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '96px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#059669', marginRight: '8px', width: '80px', textAlign: 'right' }}>21 EMA</span>
                                            <div style={{ height: 0, borderTop: '2px solid #10b981', width: '100%' }}></div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '48px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#d97706', marginRight: '8px', width: '80px', textAlign: 'right' }}>Sell Strike</span>
                                            <div style={{ height: 0, borderTop: '2px solid #f59e0b', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '4px', right: 0, backgroundColor: '#f8fafc', padding: '4px 8px', fontSize: '10px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#475569' }}>Credit Collected</div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '16px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#dc2626', marginRight: '8px', width: '80px', textAlign: 'right' }}>Buy Strike</span>
                                            <div style={{ height: 0, borderTop: '2px solid #ef4444', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '4px', right: 0, backgroundColor: '#f8fafc', padding: '4px 8px', fontSize: '10px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#475569' }}>Defines Max Risk</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#475569', paddingLeft: '32px' }}>
                                    <p style={{ margin: 0 }}><b>Goal:</b> Sell strikes as far UNDER the 21 EMA as possible.</p>
                                    <p style={{ margin: 0 }}><b>Requirement:</b> Must still achieve at least a <b>3:1 risk to reward ratio</b>.</p>
                                    <p style={{ margin: 0 }}><b>Mechanism:</b> Time decay (Theta) works in our favor. As long as price stays above the Sell Strike, the spread expires worthless, and we keep the premium.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lab-card">
                            <h3 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '16px', color: '#1e293b', margin: 0 }}>Squeeze Timeframes & Expirations (DTE)</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', margin: '8px 0 24px 0' }}>Select a timeframe where you found a squeeze to see the recommended Days To Expiration.</p>
                            
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                {(['daily', '3day', 'weekly'] as const).map(tf => (
                                    <button 
                                        key={tf}
                                        onClick={() => setSelectedDte(tf)}
                                        style={{ flex: 1, padding: '12px 16px', border: selectedDte === tf ? '2px solid #10b981' : '2px solid #e2e8f0', backgroundColor: selectedDte === tf ? '#ecfdf5' : 'white', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600, color: '#334155' }}
                                    >
                                        {tf === 'daily' ? 'Daily' : tf === '3day' ? '3-Day' : 'Weekly'} Squeeze
                                    </button>
                                ))}
                            </div>

                            <div style={{ backgroundColor: '#f1f5f9', padding: '32px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="fade-in">
                                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px', margin: 0 }}>{dteData[selectedDte].title}</h4>
                                    <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '4px' }}>{dteData[selectedDte].target}</div>
                                    <div style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{dteData[selectedDte].range}</div>
                                    <p style={{ color: '#475569', maxWidth: '448px', margin: '0 auto', fontSize: '14px' }}>{dteData[selectedDte].text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'management' && (
                    <div className="fade-in lab-container" style={{ maxWidth: '1024px' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Trade Management</h2>
                            <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Protecting capital, taking profits, and ignoring noise.</p>
                        </div>

                        <div className="lab-stat-grid" style={{ gap: '32px', marginBottom: '32px' }}>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div className="lab-card" style={{ borderLeft: '4px solid #10b981' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: 0 }}>
                                        <span style={{ color: '#10b981' }}>&#10004;</span> Profit Taking
                                    </h3>
                                    <p style={{ color: '#334155', marginBottom: '12px', marginTop: '12px' }}>As soon as filled on entry, set a GTC (Good-Til-Cancel) order to buy back the spread at <b>80% of max potential profit</b>.</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic', margin: 0 }}>"Don't be greedy. Once a spread reaches 70-80% max profit, holding for extra gains isn't worth risking all open profit PLUS original risk."</p>
                                </div>

                                <div className="lab-card" style={{ borderLeft: '4px solid #2563eb' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: 0 }}>
                                        <span style={{ color: '#2563eb' }}>&#128202;</span> Position Sizing
                                    </h3>
                                    <p style={{ color: '#334155', marginBottom: '12px', marginTop: '12px' }}>Risk <b>5% to 15%</b> of account on any given position.</p>
                                    <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Size depends on: Market conditions, setup quality, recent P&L, number of open positions.</p>
                                    <p style={{ fontSize: '14px', color: '#475569', marginTop: '8px', margin: '8px 0 0 0' }}>If current setups are struggling, hold off on new entries or cut "weak links" to free capital for better setups.</p>
                                </div>
                            </div>

                            <div className="lab-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: 0 }}>
                                    <span style={{ color: '#f59e0b' }}>&#9888;</span> Exits & "The Noise"
                                </h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ backgroundColor: '#fffbeb', padding: '16px', borderRadius: '4px', color: '#78350f', fontSize: '14px' }}>
                                        <span style={{ fontWeight: 'bold' }}>The Golden Rule:</span> Only exit if "something changes" about the structure.
                                    </div>
                                    
                                    <p style={{ color: '#334155', margin: 0 }}>The first step to losing bullish structure is a <b>close BELOW the 21 EMA</b> on the timeframe you are trading.</p>
                                    
                                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#475569' }}>
                                        <li>Any price action, selling, or chop taking place <i>above</i> the 21 EMA is meaningless "noise".</li>
                                        <li>Do not get shaken out by intraday movements.</li>
                                        <li>On down days, ask: <span style={{ fontWeight: 600, fontStyle: 'italic', color: '#1e293b' }}>"Has anything changed?"</span> If not (still above 21), hang on tight!</li>
                                    </ul>

                                    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                        <h4 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', margin: 0 }}>Adjustments for Extended Markets:</h4>
                                        <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>If the general market is 2+ ATR above its daily 21 EMA, be patient. If you must enter a great setup, <b>lower position size</b> or <b>add more time (DTE)</b> to sit through potential pullbacks.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </main>
        </div>
    );
});

