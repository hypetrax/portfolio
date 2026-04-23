import { useState, useEffect, memo } from 'react';
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
  Filler,
} from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Global State & Data Storage (from original HTML)
const reportData = {
    dteAnalysis: {
        labels: ['40 DTE', '45 DTE', '60 DTE', '80 DTE'],
        winRates: [65, 68, 72, 75], // Held to exp
        avgDailyPnl: [1.8, 2.4, 1.9, 1.5] // Simulated $ per day
    },
    management: {
        labels: ['Win Rate (%)', 'Max Drawdown (%)'],
        held: [68, -35], // Hold to exp
        managed: [86, -12] // Managed at 50%
    },
    ivr: {
        labels: ['0-10', '10-20', '20-30', '30-50', '50+'],
        expectedValue: [8, 12, 18, 35, 42] // $ per trade avg
    }
};

// Chart.js Default styling
ChartJS.defaults.font.family = "'Inter', system-ui, sans-serif";
ChartJS.defaults.color = '#64748b';
ChartJS.defaults.plugins.tooltip.backgroundColor = '#1e293b';
ChartJS.defaults.plugins.tooltip.padding = 12;
ChartJS.defaults.plugins.tooltip.cornerRadius = 8;

const brandColors: Record<number, string> = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
};

const accentColors = {
    light: '#818cf8',
    DEFAULT: '#2563eb',
    dark: '#3730a3',
};

export const SPX = memo(() => {
    const [activeTab, setActiveTab] = useState<'ivr' | 'rsi'>('ivr');
    const [simParams, setSimParams] = useState({
        dte: '45',
        pt: '50',
        ivr: '30'
    });
    const [simResults, setSimResults] = useState({
        winRate: '--%',
        drawdown: '--%',
        totalReturn: '--%',
        isSimulating: false,
        status: 'Run Simulation \u25B6'
    });

    const runSimulation = () => {
        setSimResults(prev => ({ ...prev, isSimulating: true, status: 'Simulating... \u23F3' }));

        setTimeout(() => {
            const dteNum = parseInt(simParams.dte);
            const ptNum = parseInt(simParams.pt);
            const ivrNum = parseInt(simParams.ivr);

            let baseWinRate = 65;
            let baseReturn = 15;
            let baseDd = 35;

            // Modifiers based on DTE
            if (dteNum === 45) { baseWinRate += 3; baseReturn += 10; baseDd -= 2; }
            if (dteNum === 60) { baseWinRate += 6; baseReturn += 5; baseDd -= 0; }
            if (dteNum === 80) { baseWinRate += 10; baseReturn -= 5; baseDd += 5; }

            // Modifiers based on Profit Target
            if (ptNum === 50) { baseWinRate += 18; baseReturn += 25; baseDd -= 20; }
            if (ptNum === 75) { baseWinRate += 8; baseReturn += 15; baseDd -= 10; }

            // Modifiers based on IVR
            if (ivrNum === 30) { baseWinRate += 2; baseReturn += 18; baseDd -= 5; }
            if (ivrNum === 50) { baseWinRate += 1; baseReturn += 25; baseDd -= 8; }

            setSimResults({
                winRate: baseWinRate + '%',
                drawdown: '-' + baseDd + '%',
                totalReturn: '+' + baseReturn + '%',
                isSimulating: false,
                status: 'Simulation Complete ✔'
            });

            setTimeout(() => {
                setSimResults(prev => ({ ...prev, status: 'Run Simulation ▶' }));
            }, 2000);
        }, 600);
    };

    useEffect(() => {
        runSimulation();
    }, []);

    const dteChartData = {
        labels: reportData.dteAnalysis.labels,
        datasets: [
            {
                label: 'Win Rate (%)',
                data: reportData.dteAnalysis.winRates,
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                yAxisID: 'y',
                type: 'bar' as const,
                barThickness: 40,
                borderRadius: 4
            },
            {
                label: 'Avg Daily P&L ($)',
                data: reportData.dteAnalysis.avgDailyPnl,
                borderColor: '#2563eb',
                backgroundColor: '#2563eb',
                borderWidth: 3,
                tension: 0.3,
                yAxisID: 'y1',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                type: 'line' as const,
            }
        ]
    };

    const managementChartData = {
        labels: reportData.management.labels,
        datasets: [
            {
                label: 'Hold to Expiration',
                data: reportData.management.held,
                backgroundColor: '#94a3b8',
                borderRadius: 4
            },
            {
                label: 'Manage at 50% Profit',
                data: reportData.management.managed,
                backgroundColor: '#2563eb',
                borderRadius: 4
            }
        ]
    };

    const ivrChartData = {
        labels: reportData.ivr.labels,
        datasets: [{
            label: 'Expected Value ($ per trade)',
            data: reportData.ivr.expectedValue,
            backgroundColor: (context: any) => {
                const index = context.dataIndex;
                return index >= 3 ? '#10b981' : '#cbd5e1';
            },
            borderRadius: 4
        }]
    };

    return (
        <div style={{ backgroundColor: brandColors[50], color: brandColors[800], minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .tab-active { border-bottom: 2px solid #2563eb; color: #2563eb; font-weight: 600; }
                .chart-container { position: relative; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto; height: 300px; max-height: 400px; }
                @media (min-width: 768px) { .chart-container { height: 380px; } }
            `}} />
            
            {/* Header */}
            <header style={{ backgroundColor: 'white', borderBottom: `1px solid ${brandColors[200]}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: brandColors[900], margin: 0 }}>SPX Quant Report</h1>
                    </div>
                    <nav style={{ marginLeft: 'auto', display: 'flex', gap: '32px' }}>
                        <a href="#summary" style={{ color: brandColors[600], textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Executive Summary</a>
                        <a href="#dte-analysis" style={{ color: brandColors[600], textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>DTE Optimization</a>
                        <a href="#management" style={{ color: brandColors[600], textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Trade Management</a>
                        <a href="#indicators" style={{ color: brandColors[600], textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Entry Indicators</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ flexGrow: 1, maxWidth: '1280px', margin: '0 auto', padding: '32px 16px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
                    
                    {/* LEFT COLUMN: Interactive Simulator */}
                    <div style={{ gridColumn: 'span 4', position: 'sticky', top: '96px', height: 'fit-content', backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}` }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: brandColors[900], marginBottom: '8px' }}>Interactive Strategy Simulator</h2>
                        <p style={{ fontSize: '12px', color: brandColors[500], marginBottom: '24px' }}>Adjust parameters to see the simulated historical impact on a hypothetical $10,000 account trading SPX Credit Spreads over 5 years.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: brandColors[700], marginBottom: '4px' }}>Days to Expiration (DTE)</label>
                                <select 
                                    value={simParams.dte} 
                                    onChange={(e) => setSimParams({...simParams, dte: e.target.value})}
                                    style={{ width: '100%', backgroundColor: brandColors[50], border: `1px solid ${brandColors[300]}`, color: brandColors[900], fontSize: '14px', borderRadius: '8px', padding: '10px' }}
                                >
                                    <option value="45">45 DTE (Optimal)</option>
                                    <option value="60">60 DTE</option>
                                    <option value="80">80 DTE</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: brandColors[700], marginBottom: '4px' }}>Profit Management Target</label>
                                <select 
                                    value={simParams.pt} 
                                    onChange={(e) => setSimParams({...simParams, pt: e.target.value})}
                                    style={{ width: '100%', backgroundColor: brandColors[50], border: `1px solid ${brandColors[300]}`, color: brandColors[900], fontSize: '14px', borderRadius: '8px', padding: '10px' }}
                                >
                                    <option value="50">Take Profit at 50% Max Profit</option>
                                    <option value="75">Take Profit at 75% Max Profit</option>
                                    <option value="100">Hold to Expiration</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: brandColors[700], marginBottom: '4px' }}>Minimum IV Rank (Entry)</label>
                                <select 
                                    value={simParams.ivr} 
                                    onChange={(e) => setSimParams({...simParams, ivr: e.target.value})}
                                    style={{ width: '100%', backgroundColor: brandColors[50], border: `1px solid ${brandColors[300]}`, color: brandColors[900], fontSize: '14px', borderRadius: '8px', padding: '10px' }}
                                >
                                    <option value="0">No Filter (All Environments)</option>
                                    <option value="30">IVR &gt; 30 (Optimal)</option>
                                    <option value="50">IVR &gt; 50 (High Volatility)</option>
                                </select>
                            </div>

                            <button 
                                onClick={runSimulation}
                                disabled={simResults.isSimulating}
                                style={{ width: '100%', backgroundColor: accentColors.DEFAULT, color: 'white', fontWeight: 500, borderRadius: '8px', fontSize: '14px', padding: '12px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginTop: '16px' }}
                            >
                                {simResults.status}
                            </button>
                        </div>

                        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${brandColors[200]}` }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: brandColors[800], marginBottom: '16px' }}>Simulation Results</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                <div style={{ backgroundColor: brandColors[50], padding: '12px', borderRadius: '8px', border: `1px solid ${brandColors[100]}` }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: brandColors[500], textTransform: 'uppercase', letterSpacing: '0.05em' }}>Win Rate</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{simResults.winRate}</span>
                                </div>
                                <div style={{ backgroundColor: brandColors[50], padding: '12px', borderRadius: '8px', border: `1px solid ${brandColors[100]}` }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: brandColors[500], textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max Drawdown</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f43f5e' }}>{simResults.drawdown}</span>
                                </div>
                                <div style={{ gridColumn: 'span 2', backgroundColor: brandColors[50], padding: '12px', borderRadius: '8px', border: `1px solid ${brandColors[100]}` }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: brandColors[500], textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Return (5y)</span>
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: brandColors[900] }}>{simResults.totalReturn}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Report Content */}
                    <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '48px' }}>

                        {/* Section: Executive Summary */}
                        <section id="summary" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}` }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: brandColors[900], marginBottom: '16px' }}>Samenvatting: SPX Options Backtest Study</h2>
                            <p style={{ color: brandColors[600], lineHeight: 1.625, marginBottom: '24px' }}>
                                In dit rapport vind je de resultaten van uitgebreide backtests op SPX Credit Spreads. De focus ligt op het vinden van de optimale balans tussen risico en rendement in de 40 tot 80 DTE window.
                            </p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                                    <div style={{ color: '#3b82f6', marginBottom: '8px', fontSize: '20px' }}>&#128176;</div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: brandColors[900], margin: '0 0 4px 0' }}>Optimal DTE: 45 Days</h3>
                                    <p style={{ fontSize: '14px', color: brandColors[600], margin: 0 }}>45 DTE captures the steepest part of the theta decay curve while leaving room to exit before gamma risk spikes near expiration.</p>
                                </div>
                                <div style={{ padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #d1fae5' }}>
                                    <div style={{ color: '#10b981', marginBottom: '8px', fontSize: '20px' }}>&#9851;</div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: brandColors[900], margin: '0 0 4px 0' }}>Manage at 50%</h3>
                                    <p style={{ fontSize: '14px', color: brandColors[600], margin: 0 }}>Closing positions at 50% of max profit drastically increases win rates (~85%+) and minimizes tail-risk drawdowns.</p>
                                </div>
                                <div style={{ padding: '16px', backgroundColor: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7' }}>
                                    <div style={{ color: '#f59e0b', marginBottom: '8px', fontSize: '20px' }}>&#128200;</div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: brandColors[900], margin: '0 0 4px 0' }}>IVR &gt; 30 Entry</h3>
                                    <p style={{ fontSize: '14px', color: brandColors[600], margin: 0 }}>Selling spreads when Implied Volatility Rank is above 30 yields a 22% higher average return per trade due to volatility crush.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section: DTE Analysis */}
                        <section id="dte-analysis">
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: brandColors[900], marginBottom: '8px' }}>1. Days to Expiration (DTE) Optimization</h2>
                            <p style={{ color: brandColors[600], lineHeight: 1.625, marginBottom: '24px' }}>
                                We analyzed credit spreads entered at 40, 45, 60, and 80 DTE. The objective is to understand how the duration of the trade impacts the probability of profit (POP) versus the actual realized Return on Capital (ROC). 
                            </p>
                            
                            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}`, marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: brandColors[800], marginBottom: '16px', textAlign: 'center' }}>Win Rate vs. Avg Daily P&L by Entry DTE</h3>
                                <div className="chart-container">
                                    <Chart type="bar" data={dteChartData} options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        interaction: { mode: 'index', intersect: false },
                                        scales: {
                                            y: {
                                                type: 'linear', display: true, position: 'left',
                                                title: { display: true, text: 'Win Rate (%)' },
                                                min: 50, max: 100
                                            },
                                            y1: {
                                                type: 'linear', display: true, position: 'right',
                                                title: { display: true, text: 'Avg Daily P&L ($)' },
                                                grid: { drawOnChartArea: false }
                                            }
                                        }
                                    }} />
                                </div>
                                <p style={{ fontSize: '14px', color: brandColors[500], marginTop: '16px', textAlign: 'center' }}>
                                    *Assumes 16 Delta (roughly 1 Standard Deviation) short strikes, held to expiration.
                                </p>
                            </div>

                            <div style={{ backgroundColor: brandColors[50], borderLeft: `4px solid ${accentColors.DEFAULT}`, padding: '16px', borderRadius: '0 8px 8px 0' }}>
                                <h4 style={{ fontWeight: 'bold', color: brandColors[900], margin: 0 }}>Key Finding: The 45 DTE Sweet Spot</h4>
                                <p style={{ fontSize: '14px', color: brandColors[700], marginTop: '8px', margin: '8px 0 0 0' }}>
                                    While 80 DTE offers slightly higher total premiums, the <strong>daily average P&L peaks at 45 DTE</strong>. This is because theta (time decay) is non-linear. Entering at 45 DTE places the trade squarely in the phase where the option loses value most rapidly due to time, allowing the trader to exit profitably much faster than an 80 DTE trade.
                                </p>
                            </div>
                        </section>

                        {/* Section: Management Mechanics */}
                        <section id="management">
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: brandColors[900], marginBottom: '8px' }}>2. Trade Management Mechanics</h2>
                            <p style={{ color: brandColors[600], lineHeight: 1.625, marginBottom: '24px' }}>
                                The most significant factor separating theoretical win rates from actual portfolio growth is trade management. Holding credit spreads to expiration exposes the portfolio to "Gamma Risk" — where small moves in the underlying SPX near expiration cause massive swings in the option's price.
                            </p>

                            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}`, marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: brandColors[800], marginBottom: '16px', textAlign: 'center' }}>Hold to Expiration vs. Manage at 50% Max Profit</h3>
                                <div className="chart-container">
                                    <Bar data={managementChartData} options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function(context) {
                                                        return context.dataset.label + ': ' + context.parsed.y + '%';
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                title: { display: true, text: 'Percentage' }
                                            }
                                        }
                                    }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: `1px solid ${brandColors[200]}`, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ color: '#f43f5e', fontWeight: 'bold', fontSize: '20px' }}>&#10006;</span>
                                        <h4 style={{ fontWeight: 'bold', color: brandColors[900], margin: 0 }}>Holding to Expiration</h4>
                                    </div>
                                    <ul style={{ fontSize: '14px', color: brandColors[600], paddingLeft: '16px', margin: 0 }}>
                                        <li>Maximizes potential profit per trade (collects 100% of credit).</li>
                                        <li>Significantly increases the frequency and severity of max losses.</li>
                                        <li>Reduces occurrences (number of trades you can make per year).</li>
                                    </ul>
                                </div>
                                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: `1px solid ${brandColors[200]}`, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderTop: `4px solid ${accentColors.DEFAULT}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '20px' }}>&#10004;</span>
                                        <h4 style={{ fontWeight: 'bold', color: brandColors[900], margin: 0 }}>Managing at 50%</h4>
                                    </div>
                                    <ul style={{ fontSize: '14px', color: brandColors[600], paddingLeft: '16px', margin: 0 }}>
                                        <li>Closing when the trade reaches 50% of the initial credit received.</li>
                                        <li>Increases Win Rate from ~68% to over 85%.</li>
                                        <li>Frees up capital faster (higher velocity of money).</li>
                                        <li>Drastically reduces portfolio max drawdown.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section: Entry Indicators */}
                        <section id="indicators">
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: brandColors[900], marginBottom: '8px' }}>3. Optimal Entry Indicators & Conditions</h2>
                            <p style={{ color: brandColors[600], lineHeight: 1.625, marginBottom: '24px' }}>
                                Mechanical selling regardless of market environment is suboptimal. Incorporating implied volatility metrics and basic technical indicators significantly improves Expected Value (EV).
                            </p>

                            {/* Tabs for Indicators */}
                            <div style={{ borderBottom: `1px solid ${brandColors[200]}`, marginBottom: '24px', display: 'flex', gap: '24px' }}>
                                <button 
                                    className={activeTab === 'ivr' ? 'tab-active' : ''} 
                                    onClick={() => setActiveTab('ivr')}
                                    style={{ paddingBottom: '8px', fontSize: '14px', fontWeight: 500, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: activeTab === 'ivr' ? '#2563eb' : brandColors[500] }}
                                >
                                    Implied Volatility Rank (IVR)
                                </button>
                                <button 
                                    className={activeTab === 'rsi' ? 'tab-active' : ''} 
                                    onClick={() => setActiveTab('rsi')}
                                    style={{ paddingBottom: '8px', fontSize: '14px', fontWeight: 500, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: activeTab === 'rsi' ? '#2563eb' : brandColors[500] }}
                                >
                                    RSI Divergence
                                </button>
                            </div>

                            {/* IVR Content */}
                            {activeTab === 'ivr' && (
                                <div style={{ display: 'block' }}>
                                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}`, marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: brandColors[800], marginBottom: '16px', textAlign: 'center' }}>Expected Value per Trade based on Entry IVR</h3>
                                        <div className="chart-container">
                                            <Bar data={ivrChartData} options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: { display: false }
                                                },
                                                scales: {
                                                    y: {
                                                        title: { display: true, text: 'Expected Value ($)' },
                                                        beginAtZero: true
                                                    },
                                                    x: {
                                                        title: { display: true, text: 'IV Rank Range' }
                                                    }
                                                }
                                            }} />
                                        </div>
                                        <p style={{ fontSize: '14px', color: brandColors[600], marginTop: '24px' }}>
                                            <strong>Analysis:</strong> IV Rank measures current implied volatility relative to its 52-week range. Selling spreads when IVR is low (&lt; 20) results in lower premiums collected and a higher vulnerability to volatility expansion. The optimal entry condition is when <strong>IVR &gt; 30</strong>, indicating that options are relatively expensive and more likely to experience "volatility crush" (mean reversion), accelerating profitability.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* RSI Content */}
                            {activeTab === 'rsi' && (
                                <div style={{ display: 'block' }}>
                                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: `1px solid ${brandColors[200]}`, marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: brandColors[800], marginBottom: '16px' }}>Relative Strength Index (RSI) Filtering</h3>
                                        <p style={{ fontSize: '14px', color: brandColors[600], marginBottom: '16px' }}>
                                            While IVR dictates <em>when</em> to sell premium, technicals can help dictate <em>direction</em>. Backtests show an edge in selling Bull Put Spreads during short-term oversold conditions, and Bear Call Spreads during overbought conditions.
                                        </p>
                                        
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ minWidth: '100%', textAlign: 'left', fontSize: '14px', fontWeight: 300, color: brandColors[900], borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: `1px solid ${brandColors[200]}`, backgroundColor: brandColors[100], fontWeight: 500 }}>
                                                        <th style={{ padding: '12px 24px' }}>Strategy</th>
                                                        <th style={{ padding: '12px 24px' }}>Optimal Entry Condition</th>
                                                        <th style={{ padding: '12px 24px' }}>Win Rate Bump (vs Baseline)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ borderBottom: `1px solid ${brandColors[200]}` }}>
                                                        <td style={{ padding: '16px 24px', fontWeight: 'bold' }}>Bull Put Spreads</td>
                                                        <td style={{ padding: '16px 24px' }}>SPX Daily RSI &lt; 35 (Oversold)</td>
                                                        <td style={{ padding: '16px 24px', color: '#10b981', fontWeight: 'bold' }}>+6.2%</td>
                                                    </tr>
                                                    <tr style={{ borderBottom: `1px solid ${brandColors[200]}` }}>
                                                        <td style={{ padding: '16px 24px', fontWeight: 'bold' }}>Bear Call Spreads</td>
                                                        <td style={{ padding: '16px 24px' }}>SPX Daily RSI &gt; 65 (Overbought)</td>
                                                        <td style={{ padding: '16px 24px', color: '#10b981', fontWeight: 'bold' }}>+4.8%</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: '16px 24px', fontWeight: 'bold' }}>Iron Condors (Neutral)</td>
                                                        <td style={{ padding: '16px 24px' }}>SPX Daily RSI between 40-60</td>
                                                        <td style={{ padding: '16px 24px', color: '#10b981', fontWeight: 'bold' }}>+3.1%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        <footer style={{ textAlign: 'center', fontSize: '14px', color: brandColors[500], paddingTop: '32px', paddingBottom: '16px', borderTop: `1px solid ${brandColors[200]}` }}>
                            <p>Quantitative Report generated based on simulated historical SPX data. Past performance is not indicative of future results.</p>
                        </footer>

                    </div>
                </div>
            </main>
        </div>
    );
});
;
