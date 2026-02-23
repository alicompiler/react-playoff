import type { Match, RenderMatchFunc } from "../Types";

interface Props {
    match: Match;
    isMatchSelected: boolean;
    selectedTeam: string | null;
    setSelectedMatchId: (id: string | null) => void;
    setSelectedTeamName: (name: string | null) => void;
}

export const DefaultMatch = ({ match, isMatchSelected, selectedTeam, setSelectedMatchId, setSelectedTeamName }: Props) => {
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

    const homeScores = match.score?.map((score) => score.home).join(' - ') ?? '-';
    const awayScores = match.score?.map((score) => score.away).join(' - ') ?? '-';

    return (
        <div
            className={`__playoff-default-match ${isMatchSelected ? '__playoff-match-selected' : ''}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
                backgroundColor: isMatchSelected ? '#EEE' : '#FFF',
                gap: 4,
                borderRadius: 4,
            }}>
            <button 
                className={`__playoff-default-match-home ${selectedTeam === match.home.name ? '__playoff-team-selected' : ''}`}
                style={{ 
                    background: '#FFF', 
                    height: 42, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 8, 
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0 8px'
                }} 
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(match.home.name);
                }}
                aria-label={`Select ${match.home.name}`}
            >
                <p style={{ flex: 1, margin: 0 }}>{match.home.name}: {homeScores}</p>
            </button>
            <div style={{ height: 2, backgroundColor: 'black' }} />
            <button 
                className={`__playoff-default-match-away ${selectedTeam === match.away.name ? '__playoff-team-selected' : ''}`}
                style={{ 
                    background: '#FFF', 
                    height: 42, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 8, 
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0 8px'
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(match.away.name);
                }}
                aria-label={`Select ${match.away.name}`}
            >
                <p style={{ flex: 1, margin: 0 }}>{match.away.name}: {awayScores}</p>
            </button>
        </div >
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const renderDefaultMatch: RenderMatchFunc = (match, options) => {
    return (
        <DefaultMatch
            match={match}
            isMatchSelected={options.isMatchSelected}
            selectedTeam={options.selectedTeam}
            setSelectedMatchId={options.setSelectedMatchId}
            setSelectedTeamName={options.setSelectedTeamName}
        />
    );
};
