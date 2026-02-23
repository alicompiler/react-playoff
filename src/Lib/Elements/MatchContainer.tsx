import type { Match, RenderMatchFunc } from "../Types";

interface Props {
    match: Match;
    renderMatch: RenderMatchFunc;
    selectedTeamName: string | null;
    selectedMatchId: string | null;
    setSelectedMatchId: (id: string | null) => void;
    setSelectedTeamName: (name: string | null) => void;
    setMatchRef: (id: string, el: HTMLElement | null) => void;
};

export const MatchContainer = ({
    match,
    renderMatch,
    selectedTeamName,
    selectedMatchId,
    setSelectedMatchId,
    setSelectedTeamName,
    setMatchRef
}: Props) => {

    const renderOptions = {
        selectedTeam: selectedTeamName,
        isMatchSelected: selectedMatchId === match.id,
        setSelectedMatchId,
        setSelectedTeamName,
    };

    return <div
        key={match.id}
        className="__playoff-match-container"
        style={{ position: 'relative' }}
        ref={(el: HTMLElement | null) => {
            setMatchRef(match.id, el);
        }}
        onClick={(e) => {
            e.stopPropagation();
            setSelectedMatchId(match.id);
            setSelectedTeamName(null);
        }}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedMatchId(match.id);
                setSelectedTeamName(null);
            }
        }}
        tabIndex={0}
        role="button"
        aria-pressed={selectedMatchId === match.id}
        aria-label={`Match between ${match.home.name} and ${match.away.name}`}
    >
        {renderMatch(match, renderOptions)}
    </div>;
};
