import { useState } from "react";
import { Example } from "./Example/WingsExample";
import type { PlayOffLayout } from "./Lib";
import "./styles.css";

function App() {
    const [layout, setLayout] = useState<PlayOffLayout>('wings');
    const [renderPaths, setRenderPaths] = useState(true);
    const [defaultMatch, setDefaultMatch] = useState(true);
    const [initialZoom, setInitialZoom] = useState(0.50);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            color: 'var(--playoff-text-primary)',
            overflow: 'hidden'
        }}>
            <header style={{
                padding: '20px 40px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--playoff-accent)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>P</div>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>React PlayOff</h1>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--playoff-text-secondary)', fontWeight: 500 }}>
                    Building better brackets
                </div>
            </header>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Glassmorphism Sidebar */}
                <aside style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(20px)',
                    minWidth: 280,
                    width: 280,
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
                    zIndex: 5
                }}>
                    <section>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--playoff-text-secondary)', letterSpacing: '0.05em', marginBottom: '16px' }}>Layout Mode</h3>
                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '10px', gap: '4px' }}>
                            <button
                                onClick={() => setLayout('wings')}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: layout === 'wings' ? '#fff' : 'transparent',
                                    boxShadow: layout === 'wings' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    color: layout === 'wings' ? 'var(--playoff-accent)' : 'var(--playoff-text-secondary)',
                                    transition: 'all 0.2s'
                                }}>Wings</button>
                            <button
                                onClick={() => setLayout('tree')}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: layout === 'tree' ? '#fff' : 'transparent',
                                    boxShadow: layout === 'tree' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    color: layout === 'tree' ? 'var(--playoff-accent)' : 'var(--playoff-text-secondary)',
                                    transition: 'all 0.2s'
                                }}>Tree</button>
                        </div>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--playoff-text-secondary)', letterSpacing: '0.05em', marginBottom: '16px' }}>Settings</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                                <div style={{
                                    width: '36px',
                                    height: '20px',
                                    background: renderPaths ? 'var(--playoff-accent)' : '#cbd5e1',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    transition: 'background 0.3s'
                                }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: renderPaths ? '18px' : '2px',
                                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }} />
                                    <input type="checkbox" style={{ display: 'none' }} checked={renderPaths} onChange={(e) => setRenderPaths(e.target.checked)} />
                                </div>
                                Render Paths
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                                <div style={{
                                    width: '36px',
                                    height: '20px',
                                    background: defaultMatch ? 'var(--playoff-accent)' : '#cbd5e1',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    transition: 'background 0.3s'
                                }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        background: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: defaultMatch ? '18px' : '2px',
                                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }} />
                                    <input type="checkbox" style={{ display: 'none' }} checked={defaultMatch} onChange={(e) => setDefaultMatch(e.target.checked)} />
                                </div>
                                Premium Theme
                            </label>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 500 }}>
                                    Initial Zoom: {initialZoom.toFixed(2)}x
                                </label>
                                <input
                                    type="range"
                                    min="0.25"
                                    max="3"
                                    step="0.25"
                                    value={initialZoom}
                                    onChange={(e) => setInitialZoom(parseFloat(e.target.value))}
                                    style={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        accentColor: 'var(--playoff-accent)'
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    <footer style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--playoff-text-secondary)', lineHeight: 1.5 }}>
                        <strong>Tip:</strong> Use your mouse wheel to zoom and drag to pan around the bracket.
                    </footer>
                </aside>

                <main style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(#cbd5e1 0.5px, transparent 0.5px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.5,
                        zIndex: 0
                    }} />
                    <div style={{ zIndex: 1, width: '100%', height: '100%', overflow: 'scroll' }}>
                        <div style={{
                            height: '500px',
                            backgroundColor: '#a5d8a1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h1>Big Green Box</h1>
                        </div>
                        <div style={{
                            height: '600px',
                            overflow: 'hidden',
                        }}>
                            <Example layout={layout} renderPaths={renderPaths} defaultMatch={defaultMatch} initialZoom={initialZoom} />
                        </div>
                        <div style={{
                            height: '500px',
                            backgroundColor: '#87ceeb',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h1>Big Blue Box</h1>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
