import { useRef } from "react";
import { Connectors } from "./Elements/Connectors";
import { useDragging } from "./Hooks/UseDragging";
import { useZoom } from "./Hooks/UseZoom";
import { WingsLayout } from "./Layout/WingLayout";
import { usePlayOffContext } from "./Provider/PlayOffContext";
import { PlayOffProvider } from "./Provider/PlayOffProvider";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "./Types";
import { TreeLayout } from "./Layout/TreeLayout";

interface Props {
    rounds: Rounds;
    layout: PlayOffLayout;
    renderMatch: RenderMatchFunc;
    // renderPaths: bool
    // startingZoom: number;
    // max, min zoom
    // renderStats : (stats: Stats) => React.ReactNode;
    // statsPosition: 'top' | 'bottom';
}
// prevent zooming out too much
// increase zooming in
// prevent zooming in/out effecting elements outside the viewport (e.g. header, footer, etc.)
// customized height

export const PlayOff = ({ rounds, layout, renderMatch }: Props) => (
    <PlayOffProvider rounds={rounds} renderMatch={renderMatch} layout={layout}>
        <Inner />
    </PlayOffProvider>
);


const Inner = () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const { isDragging, position, setPosition, handleMouseDown, handleMouseMove, handleMouseUp } = useDragging();
    const { zoom, handleWheel } = useZoom(position, setPosition, viewportRef);
    const { contentRef, layout, setSelectedMatchId, setSelectedTeamName } = usePlayOffContext();

    return (
        <div
            className="__playoff-root"
            role="application"
            aria-label="Brackets"
            ref={viewportRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => {
                setSelectedMatchId(null);
                setSelectedTeamName(null);
            }}
            style={{
                display: 'flex',
                cursor: isDragging ? 'grabbing' : 'grab',
                overflow: 'hidden',
            }}
        >
            <div
                className="__playoff-content"
                ref={contentRef}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    display: 'flex',
                    padding: '100px',
                    gap: '120px',
                    minWidth: 'max-content',
                    minHeight: 'max-content',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
            >
                <Connectors />

                {
                    layout === 'wings' ?
                        <WingsLayout />
                        :
                        <TreeLayout />
                }
            </div>
        </div>
    );
};
