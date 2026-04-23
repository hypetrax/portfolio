import { useState, useMemo, memo } from 'react';
import { SEO } from '../../components/SEO';
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
            return 'rgba(59, 130, 246, 0.7)'; 
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
                    borderColor: '#f8fafc',
                    borderWidth: 2,
                    tension: 0.2,
                    pointRadius: 2,
                    hidden: !chartStates.price
                },
                {
                    label: '21 EMA',
                    data: ema21,
                    borderColor: '#10b981',
                    borderWidth: 2,
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
                    borderWidth: 1.5,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    label: '55 EMA',
                    data: ema55,
                    borderColor: '#059669',
                    borderWidth: 1.5,
                    tension: 0.4,
                    pointRadius: 0,
                    hidden: !chartStates.emastack
                },
                {
                    label: '89 EMA',
                    data: ema89,
                    borderColor: '#064e3b',
                    borderWidth: 1.5,
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
            legend: { 
                position: 'top' as const, 
                labels: { 
                    boxWidth: 12, 
                    usePointStyle: true,
                    color: '#cbd5e1'
                } 
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: { display: true, text: 'Price ($)', color: '#cbd5e1' },
                beginAtZero: false,
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#cbd5e1' }
            },
            y1: {
                type: 'linear' as const,
                display: false,
                min: -5,
                max: 15
            },
            x: { 
                grid: { display: false },
                ticks: { color: '#cbd5e1' }
            }
        }
    };

    const navItemStyle = (id: string) => ({
        width: '100%',
        textAlign: 'left' as const,
        padding: '12px 24px',
        color: activeSection === id ? 'var(--text-main)' : '#cbd5e1',
        backgroundColor: activeSection === id ? 'var(--surface-hover)' : 'transparent',
        borderLeft: activeSection === id ? '4px solid var(--accent)' : '4px solid transparent',
        fontWeight: activeSection === id ? 600 : 400,
        transition: 'all 0.2s',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        cursor: 'pointer',
        fontSize: '15px'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }} className="flex-col md:flex-row">
            <SEO 
                title="Stacked Probabilities Swing Playbook — Systematic Trading" 
                description="Een systematisch trading framework gebaseerd op de TTM Squeeze, EMA stacks en optie credit spreads. Focus op probabilistische groei."
                canonical="/labs/squeeze"
            />
            <style dangerouslySetInnerHTML={{ __html: `
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .chart-container { position: relative; width: 100%; max-width: 900px; margin-left: auto; margin-right: auto; height: 45vh; max-height: 500px; min-height: 300px; }
            `}} />

            {/* Sidebar Nav */}
            <nav style={{ width: '256px', backgroundColor: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 10 }} className="w-full md:w-64">
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                    <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: 1.25, margin: 0, fontFamily: 'var(--font-serif)' }}>
                        Stacked <span style={{ color: 'var(--accent)' }}>Probabilities</span><br />
                        <span style={{ color: 'var(--accent)', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Swing Playbook</span>
                    </h1>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li><button onClick={() => setActiveSection('overview')} style={navItemStyle('overview')}>1. Core Philosophy</button></li>
                        <li><button onClick={() => setActiveSection('setup')} style={navItemStyle('setup')}>2. Anatomy of the Setup</button></li>
                        <li><button onClick={() => setActiveSection('execution')} style={navItemStyle('execution')}>3. Strategy & Execution</button></li>
                        <li><button onClick={() => setActiveSection('management')} style={navItemStyle('management')}>4. Trade Management</button></li>
                    </ul>
                </div>
                <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border)', fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                    System V.2.1-Noir
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
                
                {activeSection === 'overview' && (
                    <div className="fade-in" style={{ padding: '48px', maxWidth: '1024px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>Core <span style={{ color: 'var(--accent)' }}>Philosophy</span></h2>
                            <p style={{ color: '#cbd5e1', fontSize: '18px', margin: 0 }}>Stacking probabilities for consistent growth and peace of mind.</p>
                        </div>
                        
                        <p style={{ marginBottom: '24px', color: '#cbd5e1', lineHeight: 1.625, fontSize: '17px' }}>
                            This system is designed around finding high-probability moments in time where the odds are overwhelmingly in our favor. By combining market trend, market-leading stocks, specific technical structures (squeezes & EMAs), and an options strategy that only requires the stock <i>not</i> to crash, we construct a scenario where the "path of least resistance" generates profit.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }} className="grid-cols-1 md:grid-cols-2">
                            <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderTop: '4px solid var(--accent)' }}>
                                <div style={{ fontSize: '30px', marginBottom: '12px' }}>&#9889;</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-main)' }}>The Goal: Stack the Odds</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> Trade with the overall market trend.</li>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> Focus on Big Money flowing into leading stocks.</li>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> Enter during a "squeeze" (growing probability).</li>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> Require only that the structure holds.</li>
                                </ul>
                            </div>
                            <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderTop: '4px solid var(--accent)' }}>
                                <div style={{ fontSize: '30px', marginBottom: '12px' }}>&#129496;</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-main)' }}>Psychological Edge</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> <strong>Peace of Mind:</strong> Odds stacked prevents hesitation.</li>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> <strong>Less Stress:</strong> Spreads insulate P&L from noise.</li>
                                    <li><span style={{ color: 'var(--accent)' }}>&#10003;</span> <strong>Relationship:</strong> Accepting individual trade outcomes.</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)', borderStyle: 'dashed' }}>
                            <p style={{ color: 'var(--text-main)', fontWeight: 500, fontStyle: 'italic', margin: 0 }}>"Probabilities on probabilities. Over the course of 100+ trades... this mindset is what allows me to take trade after trade with no hesitation."</p>
                        </div>
                    </div>
                )}

                {activeSection === 'setup' && (
                    <div className="fade-in" style={{ padding: '48px', maxWidth: '1152px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>Anatomy of the <span style={{ color: 'var(--accent)' }}>Setup</span></h2>
                            <p style={{ color: '#cbd5e1', fontSize: '18px', margin: 0 }}>Visualizing the Bullish Structure & The Launching Pad.</p>
                        </div>
                        
                        <p style={{ marginBottom: '24px', color: '#cbd5e1', lineHeight: 1.625 }}>
                            A valid entry requires a strict technical structure. Use the controls below the chart to build the setup and understand how the indicators interact to signal a high-probability moment.
                        </p>

                        <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--accent)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>Visual Setup Preview | TICKER: SPX</h3>
                                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>STRUCTURE: BULLISH</div>
                            </div>
                            
                            <div className="chart-container">
                                <Chart type="line" data={chartData} options={chartOptions} />
                            </div>

                            <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                                <button 
                                    onClick={() => setChartStates({...chartStates, price: !chartStates.price})}
                                    style={{ padding: '10px 20px', backgroundColor: chartStates.price ? 'var(--accent)' : 'var(--bg-color)', color: chartStates.price ? 'white' : '#cbd5e1', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }}
                                >
                                    Price Action
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, ema21: !chartStates.ema21})}
                                    style={{ padding: '10px 20px', backgroundColor: chartStates.ema21 ? 'var(--accent)' : 'var(--bg-color)', color: chartStates.ema21 ? 'white' : '#cbd5e1', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }}
                                >
                                    + 21 EMA
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, emastack: !chartStates.emastack})}
                                    style={{ padding: '10px 20px', backgroundColor: chartStates.emastack ? 'var(--accent)' : 'var(--bg-color)', color: chartStates.emastack ? 'white' : '#cbd5e1', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }}
                                >
                                    + Stacked EMAs
                                </button>
                                <button 
                                    onClick={() => setChartStates({...chartStates, squeeze: !chartStates.squeeze})}
                                    style={{ padding: '10px 20px', backgroundColor: chartStates.squeeze ? 'var(--accent)' : 'var(--bg-color)', color: chartStates.squeeze ? 'white' : '#cbd5e1', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }}
                                >
                                    + Squeeze
                                </button>
                            </div>
                            
                            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="grid-cols-1 md:grid-cols-2">
                                <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-main)', fontSize: '16px' }}>1. The Launching Pad</h4>
                                    <p style={{ color: '#cbd5e1', marginBottom: '10px', lineHeight: 1.5 }}>Stock must be trading <b>at or just above the 21 EMA</b>. If extended (2+ ATR above), no entry.</p>
                                    <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>The 21 EMA acts as support. Price action above it during a squeeze is just "noise".</p>
                                </div>
                                <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-main)', fontSize: '16px' }}>2. Stacked EMAs & Squeeze</h4>
                                    <p style={{ color: '#cbd5e1', marginBottom: '10px', lineHeight: 1.5 }}><b>EMAs (8, 21-89)</b> must be stacked positively (shortest on top). Indicates strong bullish backbone.</p>
                                    <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}><b>Squeeze Histogram</b> must be Yellow (exhaustion) or Light Blue (release of bullish momentum).</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <h4 style={{ fontWeight: 'bold', color: 'var(--accent)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', margin: 0 }}>Required Tools Checklist</h4>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '13px', listStyle: 'none', padding: 0, margin: '8px 0 0 0', color: '#cbd5e1' }} className="grid-cols-2 md:grid-cols-3">
                                <li>• Market &gt; 21 EMA</li>
                                <li>• Stock &gt; 21 EMA</li>
                                <li>• Stacked EMA Label</li>
                                <li>• Bollinger Bands</li>
                                <li>• Keltner Channels</li>
                                <li>• Squeeze Pro Indicator</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeSection === 'execution' && (
                    <div className="fade-in" style={{ padding: '48px', maxWidth: '1024px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>Strategy & <span style={{ color: 'var(--accent)' }}>Execution</span></h2>
                            <p style={{ color: '#cbd5e1', fontSize: '18px', margin: 0 }}>Deploying the Out-of-the-Money (OTM) Put Credit Spread.</p>
                        </div>

                        <p style={{ marginBottom: '24px', color: '#cbd5e1', lineHeight: 1.625, fontSize: '17px' }}>
                            The core mechanism is selling an OTM Put Credit Spread. We place a bet that the established bullish structure won't completely fail. Our only requirement for profit is that the stock doesn't move significantly in the opposite direction.
                        </p>

                        <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', color: 'var(--text-main)', margin: 0 }}>The Trade Structure</h3>
                            <div style={{ display: 'flex', gap: '48px' }} className="flex-col md:flex-row">
                                <div style={{ flex: 1 }}>
                                    <div style={{ position: 'relative', width: '100%', height: '180px', borderLeft: '2px solid var(--border)', borderBottom: '2px solid var(--border)', paddingLeft: '16px', paddingBottom: '16px' }}>
                                        <div style={{ position: 'absolute', bottom: '144px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#cbd5e1', marginRight: '12px', width: '80px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>PRICE</span>
                                            <div style={{ height: 0, borderTop: '2px dashed #cbd5e1', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '-6px', left: '25%', width: '12px', height: '12px', backgroundColor: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 10px var(--success)' }}></div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '108px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--success)', marginRight: '12px', width: '80px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>21 EMA</span>
                                            <div style={{ height: 0, borderTop: '2px solid var(--success)', width: '100%' }}></div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '54px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#f59e0b', marginRight: '12px', width: '80px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>SHORT</span>
                                            <div style={{ height: 0, borderTop: '2px solid #f59e0b', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '6px', right: 0, backgroundColor: 'var(--bg-color)', padding: '4px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--border)', color: '#cbd5e1', fontWeight: 600 }}>CREDIT COLLECTED</div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '18px', left: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ef4444', marginRight: '12px', width: '80px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>LONG</span>
                                            <div style={{ height: 0, borderTop: '2px solid #ef4444', width: '100%', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '6px', right: 0, backgroundColor: 'var(--bg-color)', padding: '4px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--border)', color: '#cbd5e1', fontWeight: 600 }}>MAX RISK</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', color: '#cbd5e1', justifyContent: 'center' }}>
                                    <p style={{ margin: 0 }}><b>Goal:</b> Sell strikes as far UNDER the 21 EMA as possible.</p>
                                    <p style={{ margin: 0 }}><b>Requirement:</b> Must achieve &gt; <b>3:1 risk/reward</b>.</p>
                                    <p style={{ margin: 0 }}><b>Mechanism:</b> Time decay (Theta) is the engine. As long as price holds above Short strike, we profit.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-main)', margin: 0 }}>Squeeze Timeframes & DTE</h3>
                            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px' }}>Select a timeframe to see the recommended Days To Expiration.</p>
                            
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                                {(['daily', '3day', 'weekly'] as const).map(tf => (
                                    <button 
                                        key={tf}
                                        onClick={() => setSelectedDte(tf)}
                                        style={{ flex: 1, padding: '14px 16px', border: '1px solid var(--border)', backgroundColor: selectedDte === tf ? 'var(--accent)' : 'var(--bg-color)', color: selectedDte === tf ? 'white' : '#cbd5e1', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600, fontSize: '14px' }}
                                    >
                                        {tf.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="fade-in">
                                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', margin: 0, fontFamily: 'var(--font-serif)' }}>{dteData[selectedDte].title}</h4>
                                    <div style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '8px', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>{dteData[selectedDte].target}</div>
                                    <div style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>{dteData[selectedDte].range}</div>
                                    <p style={{ color: '#cbd5e1', maxWidth: '500px', margin: '0 auto', fontSize: '14px', lineHeight: 1.5 }}>{dteData[selectedDte].text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'management' && (
                    <div className="fade-in" style={{ padding: '48px', maxWidth: '1024px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>Trade <span style={{ color: 'var(--accent)' }}>Management</span></h2>
                            <p style={{ color: '#cbd5e1', fontSize: '18px', margin: 0 }}>Protecting capital, taking profits, and ignoring noise.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '32px' }} className="grid-cols-1 md:grid-cols-2">
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid var(--success)' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', margin: 0 }}>
                                        <span style={{ color: 'var(--success)' }}>&#10004;</span> Profit Taking
                                    </h3>
                                    <p style={{ color: '#cbd5e1', marginBottom: '12px', marginTop: '12px', fontSize: '15px', lineHeight: 1.5 }}>Set a GTC order to buy back the spread at <b>80% of max potential profit</b>.</p>
                                    <p style={{ fontSize: '13px', color: '#cbd5e1', fontStyle: 'italic', margin: 0, opacity: 0.8 }}>"Don't be greedy. Once a spread reaches 80%, holding for extra gains isn't worth the risk."</p>
                                </div>

                                <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', margin: 0 }}>
                                        <span style={{ color: 'var(--accent)' }}>&#128202;</span> Position Sizing
                                    </h3>
                                    <p style={{ color: '#cbd5e1', marginBottom: '12px', marginTop: '12px', fontSize: '15px', lineHeight: 1.5 }}>Risk <b>5% to 15%</b> of account on any given position.</p>
                                    <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>Size depends on: Market conditions, setup quality, and number of open positions.</p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: '4px solid #f59e0b' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', margin: 0 }}>
                                    <span style={{ color: '#f59e0b' }}>&#9888;</span> Exits & "The Noise"
                                </h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '4px', color: '#f59e0b', fontSize: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                        <span style={{ fontWeight: 'bold' }}>Golden Rule:</span> Only exit if "something changes" about the technical structure.
                                    </div>
                                    
                                    <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px', lineHeight: 1.5 }}>Structure fails on a <b>close BELOW the 21 EMA</b> on your trading timeframe.</p>
                                    
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
                                        <li style={{ display: 'flex', gap: '8px' }}><span>•</span> Any chop <i>above</i> the 21 EMA is meaningless noise.</li>
                                        <li style={{ display: 'flex', gap: '8px' }}><span>•</span> Do not get shaken out by intraday movements.</li>
                                        <li style={{ display: 'flex', gap: '8px' }}><span>•</span> On down days, ask: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>"Has anything changed?"</span></li>
                                    </ul>

                                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                        <h4 style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '8px', margin: 0, fontSize: '15px' }}>Extended Markets:</h4>
                                        <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>If market is 2+ ATR above 21 EMA, lower position size or add more time (DTE).</p>
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
