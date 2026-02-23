import { useEffect, useState } from 'react';
import { usePlayOffContext } from '../Provider/PlayOffContext';
import type { Match, MatchPosition } from '../Types';
import { Path } from './Path';

export const Connectors = () => {
    const [matchPositions, setMatchPositions] = useState<Record<string, MatchPosition>>({});
    const { contentRef, matchRefs, rounds } = usePlayOffContext();

    // Update match positions for SVG connectors using logical coordinates
    useEffect(() => {
        const updatePositions = () => {
            if (!contentRef.current) {
                return;
            }

            const newPositions: Record<string, MatchPosition> = {};

            for (const [id, el] of Object.entries(matchRefs.current)) {
                if (el) {
                    // Calculate logical coordinates by traversing offsetParent chain
                    let x = 0;
                    let y = 0;
                    let current: HTMLElement | null = el;
                    while (current && current !== contentRef.current) {
                        x += current.offsetLeft;
                        y += current.offsetTop;
                        current =
                            current.offsetParent instanceof HTMLElement
                                ? current.offsetParent
                                : null;
                    }

                    newPositions[id] = {
                        id,
                        x,
                        y,
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                    };
                }
            }
            setMatchPositions(newPositions);
        };

        // Use ResizeObserver for more reliable layout tracking
        const observer = new ResizeObserver(updatePositions);
        if (contentRef.current) {
            observer.observe(contentRef.current);
            // Also observe individual matches if they might resize independent of container
            for (const el of Object.values(matchRefs.current)) {
                if (el) {
                    observer.observe(el);
                }
            }
        }

        updatePositions();
        return () => observer.disconnect();
    }, [rounds, contentRef, matchRefs]); // Removed zoom dependency since logical coords are zoom-independent

    const hasPosition = (m: Match) => matchPositions[m.id] && matchPositions[m.nextMatchId];

    return (
        <svg
            className="__playoff-connectors"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                overflow: 'visible',
            }}
        >
            {
                rounds.flat().map((m) =>
                    hasPosition(m) && <Path
                        key={`path-${m.id}`}
                        matchPosition={matchPositions[m.id]}
                        nextMatchPosition={matchPositions[m.nextMatchId]}
                        match={m}
                    />
                )
            }
        </svg>
    );
};
