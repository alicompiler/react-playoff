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
    renderPaths?: boolean;
}

export const PlayOff = ({ rounds, layout, renderMatch, renderPaths = true }: Props) => (
    <PlayOffProvider rounds={rounds} renderMatch={renderMatch} layout={layout} renderPaths={renderPaths}>
        <Inner />
    </PlayOffProvider>
);

const Inner = () => {
    const { 
        viewportRef, 
        contentRef, 
        layout, 
        setSelectedMatchId, 
        setSelectedTeamName,
        position,
        zoom,
        renderPaths
    } = usePlayOffContext();

    const { handleWheel } = useZoom();
    const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragging();

    return (
        <div
            className={`__playoff-root __playoff-layout-${layout} ${isDragging ? '__playoff-dragging' : ''}`}
            ref={viewportRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setSelectedMatchId(null);
                    setSelectedTeamName(null);
                }
            }}
            onClick={() => {
                setSelectedMatchId(null);
                setSelectedTeamName(null);
            }}
            role="region"
            aria-label="Tournament Bracket"
            style={{
                display: 'flex',
                cursor: isDragging ? 'grabbing' : 'grab',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
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
                {renderPaths && <Connectors />}

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
