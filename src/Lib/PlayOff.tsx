import { useRef } from "react";
import { PlayOffProvider } from "./Provider/PlayOffProvider";
import type { Match, PlayOffLayout, RenderMatchFunc, Rounds } from "./Types";
import { useDragging } from "./Hooks/UseDragging";
import { useZoom } from "./Hooks/UseZoom";
import { usePlayOffContext } from "./Provider/PlayOffContext";
import { useWings } from "./Hooks/UseWings";
import { Connectors } from "./Elements/Connectors";
import { RoundColumn } from "./Elements/RoundColumn";

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

export const PlayOff = ({ rounds, layout, renderMatch }: Props) => (
    <PlayOffProvider rounds={rounds} renderMatch={renderMatch} layout={layout}>
        <Inner />
    </PlayOffProvider>
);


const Inner = () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const { isDragging, position, setPosition, handleMouseDown, handleMouseMove, handleMouseUp } = useDragging();
    const { zoom, handleWheel } = useZoom(position, setPosition, viewportRef);
    const { contentRef, rounds, setSelectedMatchId, setSelectedTeamName } = usePlayOffContext();
    const { isRightWing, isLeftWing } = useWings(rounds);

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
                // TODO: why
                userSelect: 'none',
            }}
        >
            <div
                className="__playoff-content"
                ref={contentRef}
                style={{
                    position: 'absolute',
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
                    rounds
                        .slice(0, -1)
                        .map((round: Match[], index: number) => (
                            <RoundColumn key={`left-${index}`} round={round.filter((m: Match) => isLeftWing(m.id))} />
                        ))
                }

                <RoundColumn round={rounds.at(-1) ?? []} />

                {
                    rounds
                        .slice(0, -1)
                        .toReversed()
                        .map((round: Match[], index: number) => (
                            <RoundColumn
                                key={`right-${index}`}
                                round={round.filter((m: Match) => isRightWing(m.id))} />
                        ))
                }
            </div>
        </div>
    );
};
