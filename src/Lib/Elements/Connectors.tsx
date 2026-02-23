import { useEffect, useState } from 'react';
import { usePlayOffContext } from '../Provider/PlayOffContext';

interface MatchPosition {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export const Connectors = () => {
    const [matchPositions, setMatchPositions] = useState<Record<string, MatchPosition>>({});
    const { contentRef, matchRefs, rounds, highlightedMatchIds, selectedMatchId, selectedTeamName } = usePlayOffContext();

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

    const paths: React.ReactNode[] = [];
    for (const round of rounds) {
        for (const match of round) {
            if (
                match.nextMatchId &&
                matchPositions[match.id] &&
                matchPositions[match.nextMatchId]
            ) {
                const start = matchPositions[match.id];
                const end = matchPositions[match.nextMatchId];

                let startXValue: number = 0;
                let endXValue: number = 0;
                const startY = start.y + start.height / 2;
                const endY = end.y + end.height / 2;

                startXValue = start.x;
                endXValue = end.x + end.width;

                const startX = startXValue;
                const endX = endXValue;

                const midX = startX + (endX - startX) / 2;
                const drawPath = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

                // Highlight if the match's target is in the ancestor path of the selected match
                // OR if the match itself is the source of a path leading to the selected match
                let isHighlighted = false;
                if (selectedTeamName) {
                    const inCurrent =
                        match.home?.name === selectedTeamName ||
                        match.away?.name === selectedTeamName;
                    const nextMatch = rounds.flat().find((m) => m.id === match.nextMatchId);
                    const inNext =
                        nextMatch?.home?.name === selectedTeamName ||
                        nextMatch?.away?.name === selectedTeamName;
                    isHighlighted = inCurrent && inNext;
                } else if (selectedMatchId) {
                    isHighlighted =
                        highlightedMatchIds.has(match.id) &&
                        highlightedMatchIds.has(match.nextMatchId);
                }

                paths.push(
                    <path
                        key={`path-${match.id}`}
                        d={drawPath}
                        stroke={isHighlighted ? '#10b981' : '#334155'}
                        strokeWidth={isHighlighted ? '3' : '2'}
                        fill="none"
                        style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                    />,
                );
            }
        }
    }

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
            {paths}
        </svg>
    );
};
