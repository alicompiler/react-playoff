import type { Match } from "../Lib/Types";

interface Props {
    match: Match;
    isMatchSelected: boolean;
    selectedTeam: string | null;
    setSelectedMatchId: (id: string | null) => void;
    setSelectedTeamName: (name: string | null) => void;
}

export const MatchComponent = ({ match, isMatchSelected, selectedTeam, setSelectedMatchId, setSelectedTeamName }: Props) => {
    const handleClick = (teamName: string | null) => {
        console.log({
            teamName,
            isMatchSelected,
            selectedTeam,
        });
        if (isMatchSelected && selectedTeam === teamName) {
            setSelectedMatchId(null);
            setSelectedTeamName(null);
        } else {
            setSelectedMatchId(match.id);
            setSelectedTeamName(teamName);
        }
    };

    return (
        <div style={{ padding: 8, border: '1px solid black', backgroundColor: isMatchSelected ? 'lightblue' : 'white' }}>
            <button onClick={(e) => {
                e.stopPropagation();
                handleClick(match.home.name);
            }}>{match.home.name} {match.score && match.score.length > 0 ? `(${match.score[0].home})` : ''}</button>
            <button onClick={(e) => {
                e.stopPropagation();
                handleClick(match.away.name);
            }}>{match.away.name} {match.score && match.score.length > 0 ? `(${match.score[0].away})` : ''}</button>
        </div>
    );
};