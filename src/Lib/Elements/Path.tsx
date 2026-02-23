import { usePlayOffContext } from "../Provider/PlayOffContext";
import type { Match, MatchPosition } from "../Types";

interface Props {
    matchPosition: MatchPosition;
    nextMatchPosition: MatchPosition;
    match: Match;
}

export const Path = ({ matchPosition, nextMatchPosition, match }: Props) => {
    const { selectedTeamName, selectedMatchId, highlightedMatchIds, rounds } = usePlayOffContext();

    const startY = matchPosition.y + matchPosition.height / 2;
    const endY = nextMatchPosition.y + nextMatchPosition.height / 2;
    const startX = matchPosition.x;
    const endX = nextMatchPosition.x + nextMatchPosition.width;
    const midX = startX + (endX - startX) / 2;

    const drawPath = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

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

    return <path
        className={`__playoff-path ${isHighlighted ? '__playoff-path--highlighted' : ''}`}
        d={drawPath}
        stroke={isHighlighted ? '#10b981' : '#334155'}
        strokeWidth={isHighlighted ? '5' : '2'}
        fill="none"
        style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
    />;
};