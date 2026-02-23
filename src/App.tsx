import { useState } from "react";
import { Example } from "./Example/WingsExample";
import type { PlayOffLayout } from "./Lib/Types";
import "./styles.css";

function App() {
    const [layout, setLayout] = useState<PlayOffLayout>('wings');

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                background: '#A1A1A1',
                padding: 16,
                color: '#fff',
            }}>
                <h1>React PlayOff</h1>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        <input type="radio" name="layout" value="wings" checked={layout === 'wings'} onChange={() => setLayout('wings')} />
                        Wings Layout
                    </label>
                    <label style={{ marginLeft: 16 }}>
                        <input type="radio" name="layout" value="tree" checked={layout === 'tree'} onChange={() => setLayout('tree')} />
                        Tree Layout
                    </label>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1
            }}>
                <div style={{
                    backgroundColor: '#eee',
                    minWidth: 240,
                    width: 240,
                    padding: 16,
                }}>
                    <h3>Selected Layout: {layout}</h3>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Example layout={layout} />
                </div>
            </div>
        </div>
    );
}

export default App;
