import { usePlayOffContext } from "../Provider/PlayOffContext";
import type { Match, MatchPosition } from "../Types";

interface Props {
    matchPosition: MatchPosition;
    nextMatchPosition: MatchPosition;
    match: Match;
}

export const Path = ({ matchPosition, nextMatchPosition, match }: Props) => {
    const { selectedTeamName, rounds } = usePlayOffContext();

    const startY = matchPosition.y + matchPosition.height / 2;
    const endY = nextMatchPosition.y + nextMatchPosition.height / 2;
    const startX = matchPosition.x;
    const endX = nextMatchPosition.x + nextMatchPosition.width;
    const midX = startX + (endX - startX) / 2;

    const distX = midX - startX;
    const distY = endY - startY;
    const r = Math.min(Math.abs(distX), Math.abs(distY) / 2, 12);

    let drawPath = "";
    if (distY === 0 || r === 0) {
        drawPath = `M ${startX} ${startY} L ${endX} ${endY}`;
    } else {
        const signX = Math.sign(distX);
        const signY = Math.sign(distY);

        drawPath = `M ${startX} ${startY} ` +
            `L ${midX - signX * r} ${startY} ` +
            `Q ${midX} ${startY}, ${midX} ${startY + signY * r} ` +
            `L ${midX} ${endY - signY * r} ` +
            `Q ${midX} ${endY}, ${midX + signX * r} ${endY} ` +
            `L ${endX} ${endY}`;
    }

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
    }

    return <path
        className={`__playoff-path ${isHighlighted ? '__playoff-path--highlighted' : ''}`}
        d={drawPath}
        stroke={isHighlighted ? '#10b981' : '#cbd5e1'}
        strokeWidth={isHighlighted ? '3' : '2'}
        fill="none"
        strokeLinecap="round"
        style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
    />;

};
