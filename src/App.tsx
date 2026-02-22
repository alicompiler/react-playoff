import { useState } from "react";
import { Example } from "./Example/WingsExample";
import type { PlayOffLayout } from "./Lib/Types";

function App() {
    const [layout, setLayout] = useState<PlayOffLayout>('wings');

    return (
        <>
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

            <Example layout={layout} />
        </>
    );
}

export default App;
