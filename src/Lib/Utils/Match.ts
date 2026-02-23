import type { MatchPosition, Rounds } from "../Types";

export const getMatchIdsToHighlight = (
    selectedMatchId: string | null,
    selectedTeamName: string | null,
    rounds: Rounds,
) => {
    const ids = new Set<string>();
    if (selectedMatchId) {
        ids.add(selectedMatchId);
        const findAncestors = (targetId: string) => {
            for (const match of rounds.flat()) {
                if (match.nextMatchId === targetId) {
                    ids.add(match.id);
                    findAncestors(match.id);
                }
            }
        };
        findAncestors(selectedMatchId);
    } else if (selectedTeamName) {
        for (const match of rounds.flat()) {
            if (
                match.home?.name === selectedTeamName ||
                match.away?.name === selectedTeamName
            ) {
                ids.add(match.id);
            }
        }
    }

    return ids;
};

export const calculateMatchPositions = (contentDiv: HTMLDivElement | null, matchRefs: Record<string, HTMLElement | null>) => {
    if (!contentDiv) {
        return {};
    }
    
    const newPositions: Record<string, MatchPosition> = {};
    
    for (const [id, el] of Object.entries(matchRefs)) {
        if (el) {
            let x = 0;
            let y = 0;
            let current: HTMLElement | null = el;
            while (current && current !== contentDiv) {
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

    return newPositions;
};
