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
                desc: "The drop creates a technically precise Bearish FVG between 102.0 and 103.0. Price retraces upwards at 11:15, filling the gap. This is the institutional entry point to go short.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 102.0, y1: 103.0, fillcolor: 'rgba(239, 68, 68, 0.2)', line: {width: 0}},
                    {type: 'line', x0: '10:30', x1: '11:45', y0: 101.5, y1: 101.5, line: {color: 'red', width: 2}}
                ],
                annotations: [{x: '11:00', y: 102.5, text: 'Fair Value Gap (Entry)', showarrow: false, font: {color: 'red'}}]
            },
            { 
                idx: 12, 
                title: "5. Downward Expansion", 
                desc: "After mitigating orders in the premium FVG array, price rapidly dumps towards lower liquidity pools.",
                chk: 4,
                shapes: [
                    {type: 'rect', x0: '10:30', x1: '11:45', y0: 102.0, y1: 103.0, fillcolor: 'rgba(239, 68, 68, 0.2)', line: {width: 0}}
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
                gridcolor: 'rgba(255, 255, 255, 0.1)',
                tickfont: { color: '#94a3b8' }
            },
            yaxis: { 
                autorange: true, 
                fixedrange: false,
                showgrid: true,
                gridcolor: 'rgba(255, 255, 255, 0.1)',
                tickfont: { color: '#94a3b8' }
            },
            plot_bgcolor: '#0f172a',
            paper_bgcolor: '#0f172a',
            shapes: stepDef.shapes || [],
            annotations: (stepDef.annotations || []).map((ann: any) => ({
                ...ann,
                font: { ...ann.font, color: ann.font?.color || '#cbd5e1' }
            })),
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>
                <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', border: isActive ? '2px solid var(--accent)' : '2px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'white' : 'transparent', fontSize: '12px', fontWeight: 'bold'
                }}>
                    ✓
                </div>
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{text}</span>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .chart-container { position: relative; width: 100%; max-width: 100%; margin-left: auto; margin-right: auto; height: 450px; max-height: 500px; background: var(--surface); border-radius: 0.5rem; border: 1px solid var(--border); overflow: hidden; }
                @media (min-width: 1024px) { .chart-container { height: 550px; } }
                .active-tab { border-bottom: 2px solid var(--accent); color: var(--accent) !important; font-weight: 600; }
                .inactive-tab { color: var(--text-muted) !important; }
            `}} />

            <nav style={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.025em', color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>Turtle Soup</span>
                    </div>
                    <div style={{ display: 'flex', gap: '32px' }} className="hidden md:flex">
                        <button onClick={() => scrollToSection('overview')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 500, fontSize: '14px' }}>Overview</button>
                        <button onClick={() => scrollToSection('anatomy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 500, fontSize: '14px' }}>Anatomy</button>
                        <button onClick={() => scrollToSection('simulator')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 500, fontSize: '14px' }}>Simulator</button>
                        <button onClick={() => scrollToSection('confluences')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 500, fontSize: '14px' }}>Confluences</button>
                    </div>
                </div>
            </nav>

            <header id="overview" style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em', marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>
                    The ICT <span style={{ color: 'var(--accent)' }}>Turtle Soup</span> Setup
                </h1>
                <p style={{ marginTop: '16px', maxWidth: '768px', margin: '0 auto', fontSize: '20px', color: 'var(--text-muted)', lineHeight: 1.625 }}>
                    A modernization of classic false-breakout strategies. The Inner Circle Trader (ICT) Turtle Soup targets areas of resting liquidity.
                </p>
            </header>

            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 80px 16px' }}>
                <div style={{ backgroundColor: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>What is the "Soup"?</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.625, fontSize: '17px' }}>
                        Originally popularized by Linda Raschke and Larry Connors in "Street Smarts," the Turtle Soup exploited the failure of the famous "Turtle Traders" trend-following breakout system. ICT adapts this by focusing on <strong>Liquidity Pools</strong> across all timeframes.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="grid-cols-1 md:grid-cols-2">
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                Bullish Turtle Soup
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>Price drops below an established Old Low (sweeping SSL), traps breakout sellers, and aggressively reverses upward, breaking market structure.</p>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                Bearish Turtle Soup
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>Price rallies above an established Old High (sweeping BSL), traps breakout buyers, and aggressively reverses downward, breaking market structure.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="anatomy" style={{ backgroundColor: 'var(--surface)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ marginBottom: '56px', textAlign: 'center', maxWidth: '768px', margin: '0 auto 56px auto' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Anatomy of the Setup</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Understanding the core components is critical. A valid ICT Turtle Soup requires a specific sequence of events.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="grid-cols-1 md:grid-cols-3">
                        {[
                            { id: 'liquidity', num: 1, title: 'Liquidity Pools', desc: 'Areas where resting stop-loss orders accumulate.', color: 'rgba(14, 165, 233, 0.1)', textColor: 'var(--accent)', detail: 'BSL: Buy stops resting above old highs.\n\nSSL: Sell stops resting below old lows.' },
                            { id: 'sweep', num: 2, title: 'The Sweep (Raid)', desc: 'Price intentionally breaches the liquidity pool.', color: 'rgba(244, 63, 94, 0.1)', textColor: '#f43f5e', detail: 'This is the "Judas Swing." It inducing retail traders to enter in the wrong direction, while fulfilling institutional orders.' },
                            { id: 'mss', num: 3, title: 'MSS & FVG', desc: 'Confirmation and the entry mechanism.', color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981', detail: 'MSS: Aggressive reversal breaking a recent swing point.\n\nFVG: Imbalance left by aggressive reversal, optimal entry zone.' }
                        ].map(item => (
                            <div key={item.id} style={{ backgroundColor: 'var(--bg-color)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => toggleDetail(item.id)}>
                                <div style={{ height: '48px', width: '48px', backgroundColor: item.color, color: item.textColor, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>0{item.num}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '12px' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.5 }}>{item.desc}</p>
                                <div style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Mechanism <span>+</span></div>
                                {openDetails[item.id] && (
                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '14px', color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                        {item.detail}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="simulator" style={{ padding: '80px 0', maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Interactive Setup Simulator</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '768px', margin: '0 auto' }}>Watch how the Turtle Soup setup forms bar-by-bar.</p>
                </div>

                <div style={{ backgroundColor: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                        <button onClick={() => { setCurrentType('bullish'); setCurrentStepIndex(0); }} style={{ flex: 1, padding: '20px 0', textAlign: 'center', fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }} className={currentType === 'bullish' ? 'active-tab' : 'inactive-tab'}>Bullish Protocol</button>
                        <button onClick={() => { setCurrentType('bearish'); setCurrentStepIndex(0); }} style={{ flex: 1, padding: '20px 0', textAlign: 'center', fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }} className={currentType === 'bearish' ? 'active-tab' : 'inactive-tab'}>Bearish Protocol</button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-cols-1 lg:grid-cols-3">
                        <div style={{ padding: '40px', backgroundColor: 'rgba(255,255,255,0.01)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Execution Phase</span>
                                    <span style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--accent-glow)' }}>{currentStepIndex + 1} / 5</span>
                                </div>
                                
                                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>{stepDef.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>{stepDef.desc}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                                    {checklistItem(1, 'Identify Liquidity Pool')}
                                    {checklistItem(2, 'Volatility Sweep (Judas)')}
                                    {checklistItem(3, 'Market Structure Shift')}
                                    {checklistItem(4, 'Institutional Entry (FVG)')}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                                <button onClick={() => setCurrentStepIndex(0)} style={{ padding: '12px 20px', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '6px', backgroundColor: 'transparent', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>RESET</button>
                                <button 
                                    onClick={() => setCurrentStepIndex(prev => Math.min(prev + 1, dataDef.steps.length - 1))} 
                                    disabled={currentStepIndex >= dataDef.steps.length - 1}
                                    style={{
                                        flex: 1, backgroundColor: 'var(--accent)', color: 'white', padding: '12px 20px', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: currentStepIndex >= dataDef.steps.length - 1 ? 'not-allowed' : 'pointer', opacity: currentStepIndex >= dataDef.steps.length - 1 ? 0.5 : 1,
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '13px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    {currentStepIndex >= dataDef.steps.length - 1 ? 'COMPLETE' : <>ADVANCE PROJECTION <span>→</span></>}
                                </button>
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 2', padding: '24px' }} className="col-span-1 lg:col-span-2">
                            <div id="plotly-chart" className="chart-container"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="confluences" style={{ padding: '80px 0', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>High-Probability Confluences</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '672px', margin: '0 auto', fontSize: '18px' }}>A pattern alone is not enough. The highest probability setups align with time and narrative.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }} className="grid-cols-1 md:grid-cols-2">
                        <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ color: 'var(--accent)', fontSize: '32px', marginBottom: '20px' }}>🕒</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '16px' }}>Killzones (Time Factor)</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                                Algorithmic runs on liquidity are time-dependent. Success increases if the sweep occurs during specific volatility windows:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--accent)' }}>▸</span> <span><strong>London Open:</strong> 2:00 AM - 5:00 AM NY</span></li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--accent)' }}>▸</span> <span><strong>NY AM Session:</strong> 8:30 AM - 11:00 AM NY</span></li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--accent)' }}>▸</span> <span><strong>NY PM Session:</strong> 1:30 PM - 4:00 PM NY</span></li>
                            </ul>
                        </div>

                        <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ color: 'var(--success)', fontSize: '32px', marginBottom: '20px' }}>📈</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '16px' }}>HTF Narratives</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                                The setup must align with the Higher Time Frame. A sweep of a 15m low is high-probability IF it occurs inside a Daily bullish array.
                            </p>
                            <div style={{ backgroundColor: 'var(--surface)', borderRadius: '8px', padding: '20px', border: '1px solid var(--border)', fontSize: '13px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Discount (Buy):</span>
                                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>HTF Bullish FVG</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Premium (Sell):</span>
                                    <span style={{ color: '#ef4444', fontWeight: 600 }}>HTF Bearish FVG</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center', fontSize: '12px', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <p>Quant Architecture & Interactive Design Lab. Powered by Plotly.js.</p>
            </footer>
        </div>
    );
});

