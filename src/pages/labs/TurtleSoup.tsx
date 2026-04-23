import { useState, useEffect, memo } from 'react';
import Plotly from 'plotly.js-dist-min';

const simData: any = {
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
                idx: 6, 
                title: "1. Forming the Liquidity Pool", 
                desc: "Price drops and establishes a clear swing low around 98.50. Retail traders place their stop-loss orders (Sell Side Liquidity) below this level.",
                chk: 1,
                shapes: [{type: 'line', x0: '10:00', x1: '10:30', y0: 98.5, y1: 98.5, line: {color: 'red', width: 2, dash: 'dash'}}],
                annotations: [{x: '10:00', y: 98.0, text: 'Sell Side Liquidity (SSL)', showarrow: false, font: {color: 'red'}}]
            },
            { 
                idx: 8, 
                title: "2. The Sweep (Judas Swing)", 
                desc: "At 10:30, volatility hits. Price aggressively drops to 95.0, sweeping the SSL. Retail breakout sellers are triggered short, and early buyers are stopped out. Smart money absorbs this liquidity to build long positions.",
                chk: 2,
                shapes: [{type: 'line', x0: '10:00', x1: '11:45', y0: 98.5, y1: 98.5, line: {color: 'red', width: 2, dash: 'dash'}}],
                annotations: [{x: '10:30', y: 94.0, text: 'Sweep / Raid', showarrow: true, arrowhead: 2, arrowcolor: 'red'}]
            },
            { 
                idx: 10, 
                title: "3. Market Structure Shift (MSS)", 
                desc: "Immediately after the sweep, price violently reverses upward. By breaking the previous lower high at 104.0, we have a confirmed Market Structure Shift (MSS), validating the Turtle Soup.",
                chk: 3,
                shapes: [
                    {type: 'line', x0: '10:00', x1: '11:45', y0: 98.5, y1: 98.5, line: {color: 'gray', width: 1, dash: 'dot'}},
                    {type: 'line', x0: '10:30', x1: '11:45', y0: 104.0, y1: 104.0, line: {color: 'green', width: 2}}
                ],
                annotations: [{x: '10:45', y: 104.5, text: 'MSS / ChoCh', showarrow: true, arrowhead: 2, arrowcolor: 'green'}]
            },
            { 
                idx: 11, 
                title: "4. The FVG Entry", 
                desc: "The energetic displacement leaves a Fair Value Gap (FVG) between 100.0 and 103.5. The pullback at 11:15 taps directly into this imbalance, offering the precision entry point.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 100.0, y1: 103.5, fillcolor: 'rgba(16, 185, 129, 0.2)', line: {width: 0}},
                    {type: 'line', x0: '10:30', x1: '11:45', y0: 104.0, y1: 104.0, line: {color: 'green', width: 2}}
                ],
                annotations: [{x: '11:00', y: 101.5, text: 'Fair Value Gap (Entry)', showarrow: false, font: {color: 'green'}}]
            },
            { 
                idx: 12, 
                title: "5. Expansion to Target", 
                desc: "Once the institutional orders are mitigated within the FVG, price expands rapidly towards opposing Buy Side Liquidity pools (old highs). The setup is complete.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 100.0, y1: 103.5, fillcolor: 'rgba(16, 185, 129, 0.2)', line: {width: 0}}
                ],
                annotations: []
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
                idx: 6, 
                title: "1. Forming the Liquidity Pool", 
                desc: "Price rallies and establishes a clear swing high at 106.0. Retail traders place buy-stop orders (Buy Side Liquidity) above this resistance.",
                chk: 1,
                shapes: [{type: 'line', x0: '09:30', x1: '10:30', y0: 106.0, y1: 106.0, line: {color: 'blue', width: 2, dash: 'dash'}}],
                annotations: [{x: '09:30', y: 106.5, text: 'Buy Side Liquidity (BSL)', showarrow: false, font: {color: 'blue'}}]
            },
            { 
                idx: 8, 
                title: "2. The Sweep (Judas Swing)", 
                desc: "Price surges to 110.0, sweeping the BSL. Breakout buyers jump in, and short sellers are stopped out. Smart money uses these buy orders to execute massive short positions.",
                chk: 2,
                shapes: [{type: 'line', x0: '09:30', x1: '11:45', y0: 106.0, y1: 106.0, line: {color: 'blue', width: 2, dash: 'dash'}}],
                annotations: [{x: '10:30', y: 111.0, text: 'Sweep / Raid', showarrow: true, arrowhead: 2, arrowcolor: 'red'}]
            },
            { 
                idx: 10, 
                title: "3. Market Structure Shift (MSS)", 
                desc: "Following the sweep, price violently collapses. Breaking the recent higher low around 101.5 confirms a bearish Market Structure Shift (MSS).",
                chk: 3,
                shapes: [
                    {type: 'line', x0: '09:30', x1: '11:45', y0: 106.0, y1: 106.0, line: {color: 'gray', width: 1, dash: 'dot'}},
                    {type: 'line', x0: '10:30', x1: '11:45', y0: 101.5, y1: 101.5, line: {color: 'red', width: 2}}
                ],
                annotations: [{x: '10:45', y: 100.5, text: 'MSS / ChoCh', showarrow: true, arrowhead: 2, arrowcolor: 'red'}]
            },
            { 
                idx: 11, 
                title: "4. The Bearish FVG Entry", 
                desc: "The drop creates a massive Bearish FVG between 102.0 and 109.0. Price retraces upwards at 11:15, filling the gap. This is the institutional entry point to go short.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 102.0, y1: 109.0, fillcolor: 'rgba(239, 68, 68, 0.2)', line: {width: 0}},
                    {type: 'line', x0: '10:30', x1: '11:45', y0: 101.5, y1: 101.5, line: {color: 'red', width: 2}}
                ],
                annotations: [{x: '11:00', y: 105.5, text: 'Fair Value Gap (Entry)', showarrow: false, font: {color: 'red'}}]
            },
            { 
                idx: 12, 
                title: "5. Downward Expansion", 
                desc: "After mitigating orders in the premium FVG array, price rapidly dumps towards lower liquidity pools.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 102.0, y1: 109.0, fillcolor: 'rgba(239, 68, 68, 0.2)', line: {width: 0}}
                ],
                annotations: []
            }
        ]
    }
};

export const TurtleSoup = memo(() => {
    const [currentType, setCurrentType] = useState<'bullish' | 'bearish'>('bullish');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

    const toggleDetail = (id: string) => {
        setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const dataDef = simData[currentType];
        const stepDef = dataDef.steps[currentStepIndex];
        const visibleCandles = dataDef.candles.slice(0, stepDef.idx);
        
        const trace = {
            x: visibleCandles.map((c: any) => c.x),
            open: visibleCandles.map((c: any) => c.o),
            high: visibleCandles.map((c: any) => c.h),
            low: visibleCandles.map((c: any) => c.l),
            close: visibleCandles.map((c: any) => c.c),
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            increasing: {line: {color: '#10B981'}},
            decreasing: {line: {color: '#EF4444'}}
        };

        const layout: any = {
            margin: { l: 40, r: 20, t: 20, b: 30 },
            xaxis: { 
                rangeslider: { visible: false },
                type: 'category',
                showgrid: true,
                gridcolor: '#F5F5F4'
            },
            yaxis: { 
                autorange: true, 
                fixedrange: false,
                showgrid: true,
                gridcolor: '#F5F5F4'
            },
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            shapes: stepDef.shapes || [],
            annotations: stepDef.annotations || [],
            dragmode: 'pan'
        };

        const config = { responsive: true, displayModeBar: false };

        Plotly.react('plotly-chart', [trace] as any, layout, config);
    }, [currentType, currentStepIndex]);

    const dataDef = simData[currentType];
    const stepDef = dataDef.steps[currentStepIndex];

    const checklistItem = (num: number, text: string) => {
        const isActive = stepDef.chk >= num;
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: isActive ? '#1e293b' : '#94a3b8' }}>
                <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', border: isActive ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isActive ? '#0ea5e9' : 'transparent',
                    color: isActive ? 'white' : 'transparent', fontSize: '12px', fontWeight: 'bold'
                }}>
                    ✓
                </div>
                <span style={{ fontWeight: isActive ? 500 : 400 }}>{text}</span>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: '#FAFAF9', color: '#1C1917', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .chart-container { position: relative; width: 100%; max-width: 100%; margin-left: auto; margin-right: auto; height: 450px; max-height: 500px; background: #ffffff; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; }
                @media (min-width: 1024px) { .chart-container { height: 550px; } }
                .active-tab { border-bottom: 2px solid #2563eb; color: #2563eb; font-weight: 600; }
                .inactive-tab { color: #64748b; }
            `}} />

            <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.025em', color: '#1e293b' }}>Turtle Soup</span>
                    </div>
                    <div style={{ display: 'flex', gap: '32px' }} className="hidden md:flex">
                        <button onClick={() => scrollToSection('overview')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontWeight: 500 }}>Overview</button>
                        <button onClick={() => scrollToSection('anatomy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontWeight: 500 }}>Anatomy</button>
                        <button onClick={() => scrollToSection('simulator')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontWeight: 500 }}>Simulator</button>
                        <button onClick={() => scrollToSection('confluences')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontWeight: 500 }}>Confluences</button>
                    </div>
                </div>
            </nav>

            <header id="overview" style={{ paddingTop: '80px', paddingBottom: '64px', paddingLeft: '16px', paddingRight: '16px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: '24px' }}>
                    The ICT <span style={{ color: '#0ea5e9' }}>Turtle Soup</span> Setup
                </h1>
                <p style={{ marginTop: '16px', maxWidth: '768px', margin: '0 auto', fontSize: '20px', color: '#475569', lineHeight: 1.625 }}>
                    A modernization of classic false-breakout strategies. The Inner Circle Trader (ICT) Turtle Soup targets areas of resting liquidity. It relies on the premise that markets are engineered to sweep stops before initiating true directional moves.
                </p>
            </header>

            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 48px 16px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', padding: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>What is the "Soup"?</h2>
                    <p style={{ color: '#475569', marginBottom: '24px', lineHeight: 1.625 }}>
                        Originally popularized by Linda Raschke and Larry Connors in "Street Smarts," the Turtle Soup exploited the failure of the famous "Turtle Traders" trend-following breakout system. When retail traders buy a breakout of a 20-day high, smart money sells into them, reversing the price. ICT adapts this by focusing on <strong>Liquidity Pools</strong> (old highs/lows) across all timeframes, waiting for the algorithmic "Judas Swing" (the fake move) to trap retail traders before aligning with the true institutional order flow.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="grid-cols-1 md:grid-cols-2">
                        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                Bullish Turtle Soup
                            </h3>
                            <p style={{ fontSize: '14px', color: '#475569' }}>Price drops below an established Old Low (sweeping Sell Side Liquidity), traps early breakout sellers, and aggressively reverses upward, breaking market structure to the upside.</p>
                        </div>
                        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                Bearish Turtle Soup
                            </h3>
                            <p style={{ fontSize: '14px', color: '#475569' }}>Price rallies above an established Old High (sweeping Buy Side Liquidity), traps early breakout buyers, and aggressively reverses downward, breaking market structure to the downside.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="anatomy" style={{ backgroundColor: '#f1f5f9', padding: '64px 0' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ marginBottom: '48px', textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px auto' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Anatomy of the Setup</h2>
                        <p style={{ color: '#475569', fontSize: '18px' }}>Understanding the core components is critical. A valid ICT Turtle Soup requires a specific sequence of events to unfold. Explore the foundational concepts below.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="grid-cols-1 md:grid-cols-3">
                        {[
                            { id: 'liquidity', num: 1, title: 'Liquidity Pools', desc: 'Areas where resting stop-loss orders accumulate.', color: '#e0f2fe', textColor: '#0284c7', detail: 'Buy Side Liquidity (BSL): Buy stops resting above old highs. Hunted for smart money to sell into.\n\nSell Side Liquidity (SSL): Sell stops resting below old lows. Hunted for smart money to buy into.' },
                            { id: 'sweep', num: 2, title: 'The Sweep (Raid)', desc: 'Price intentionally breaches the liquidity pool to trigger stops.', color: '#ffe4e6', textColor: '#e11d48', detail: 'This is the "Judas Swing." It looks like a breakout to retail traders, inducing them to enter in the wrong direction, while simultaneously fulfilling the orders of larger institutions preparing for a reversal.' },
                            { id: 'mss', num: 3, title: 'MSS & FVG', desc: 'Confirmation of the reversal and the entry mechanism.', color: '#dcfce7', textColor: '#059669', detail: 'Market Structure Shift (MSS): After the sweep, price aggressively reverses and breaks a recent opposing swing point.\n\nFair Value Gap (FVG): The aggressive reversal leaves an imbalance (a 3-candle pattern with a gap). This FVG is the optimal entry zone upon a pullback.' }
                        ].map(item => (
                            <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} onClick={() => toggleDetail(item.id)}>
                                <div style={{ height: '48px', width: '48px', backgroundColor: item.color, color: item.textColor, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{item.num}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{item.title}</h3>
                                <p style={{ color: '#475569', fontSize: '14px', marginBottom: '16px' }}>{item.desc}</p>
                                <div style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Tap to expand <span>+</span></div>
                                {openDetails[item.id] && (
                                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '14px', color: '#475569', whiteSpace: 'pre-line' }}>
                                        {item.detail}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="simulator" style={{ padding: '64px 0', maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Interactive Setup Simulator</h2>
                    <p style={{ color: '#475569', fontSize: '18px', maxWidth: '768px', margin: '0 auto' }}>Watch how the Turtle Soup setup forms bar-by-bar. This section provides an interactive walkthrough of price action, identifying the exact moments of manipulation and entry.</p>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                        <button onClick={() => { setCurrentType('bullish'); setCurrentStepIndex(0); }} style={{ flex: 1, padding: '16px 0', textAlign: 'center', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }} className={currentType === 'bullish' ? 'active-tab' : 'inactive-tab'}>Bullish Setup Simulator</button>
                        <button onClick={() => { setCurrentType('bearish'); setCurrentStepIndex(0); }} style={{ flex: 1, padding: '16px 0', textAlign: 'center', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }} className={currentType === 'bearish' ? 'active-tab' : 'inactive-tab'}>Bearish Setup Simulator</button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-cols-1 lg:grid-cols-3">
                        <div style={{ padding: '32px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#94a3b8', textTransform: 'uppercase' }}>Phase Progression</span>
                                    <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '9999px' }}>Step {currentStepIndex + 1} / 5</span>
                                </div>
                                
                                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>{stepDef.title}</h3>
                                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, marginBottom: '24px' }}>{stepDef.desc}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                                    {checklistItem(1, 'Identify Old High/Low')}
                                    {checklistItem(2, 'Wait for Sweep (Judas Swing)')}
                                    {checklistItem(3, 'Look for Market Structure Shift')}
                                    {checklistItem(4, 'Enter on FVG Pullback')}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                                <button onClick={() => setCurrentStepIndex(0)} style={{ padding: '8px 16px', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '8px', backgroundColor: 'white', fontWeight: 500, cursor: 'pointer' }}>Reset</button>
                                <button 
                                    onClick={() => setCurrentStepIndex(prev => Math.min(prev + 1, dataDef.steps.length - 1))} 
                                    disabled={currentStepIndex >= dataDef.steps.length - 1}
                                    style={{
                                        flex: 1, backgroundColor: '#0ea5e9', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 500, cursor: currentStepIndex >= dataDef.steps.length - 1 ? 'not-allowed' : 'pointer', opacity: currentStepIndex >= dataDef.steps.length - 1 ? 0.5 : 1,
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                                    }}
                                >
                                    {currentStepIndex >= dataDef.steps.length - 1 ? 'Simulation Complete' : <>Advance Price Action <span>→</span></>}
                                </button>
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 2', padding: '16px' }} className="col-span-1 lg:col-span-2">
                            <div id="plotly-chart" className="chart-container"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="confluences" style={{ padding: '64px 0', backgroundColor: '#0f172a', color: '#f1f5f9' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>High-Probability Confluences</h2>
                        <p style={{ color: '#94a3b8', maxWidth: '672px', margin: '0 auto' }}>A Turtle Soup pattern alone is not enough. The highest probability setups occur when the sweep aligns with time and higher timeframe narratives.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="grid-cols-1 md:grid-cols-2">
                        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
                            <div style={{ color: '#38bdf8', fontSize: '30px', marginBottom: '16px' }}>🕒</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Killzones (Time of Day)</h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.625, marginBottom: '16px' }}>
                                Algorithmic runs on liquidity are time-dependent. The probability of a successful Turtle Soup increases drastically if the sweep occurs during specific volatility windows:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#0ea5e9' }}>▸</span> <strong>London Open:</strong> 2:00 AM - 5:00 AM NY Time</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#0ea5e9' }}>▸</span> <strong>NY AM Session:</strong> 8:30 AM - 11:00 AM NY Time</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#0ea5e9' }}>▸</span> <strong>NY PM Session:</strong> 1:30 PM - 4:00 PM NY Time</li>
                            </ul>
                        </div>

                        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
                            <div style={{ color: '#34d399', fontSize: '30px', marginBottom: '16px' }}>📈</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>HTF PD Arrays</h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.625, marginBottom: '16px' }}>
                                The setup must make sense in the context of the Higher Time Frame (HTF). A sweep of a 15-minute low is a high-probability buy IF it occurs inside a Daily timeframe bullish array.
                            </p>
                            <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '16px', border: '1px solid #334155', fontSize: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ color: '#94a3b8' }}>Discount Array (Buy context):</span>
                                    <span style={{ color: '#34d399', fontWeight: 500 }}>HTF Orderblock / Bullish FVG</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '8px' }}>
                                    <span style={{ color: '#94a3b8' }}>Premium Array (Sell context):</span>
                                    <span style={{ color: '#fb7185', fontWeight: 500 }}>HTF Bearish Breaker / Bearish FVG</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ backgroundColor: '#020617', color: '#64748b', padding: '32px 0', textAlign: 'center', fontSize: '14px', borderTop: '1px solid #1e293b' }}>
                <p>Information Architecture & Interactive Design Demo. Uses Plotly.js for Canvas rendering. No SVG.</p>
            </footer>
        </div>
    );
});
