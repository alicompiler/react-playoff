import type { Rounds } from "../Types";

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
