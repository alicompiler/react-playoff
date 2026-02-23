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
        if (isMatchSelected && selectedTeam === teamName) {
            setSelectedMatchId(null);
            setSelectedTeamName(null);
        } else {
            setSelectedMatchId(match.id);
            setSelectedTeamName(teamName);
        }
    };

    const defaultFlag = 'https://www.countryflags.com/wp-content/uploads/palestina-flag-jpg-xl.jpg';
    const homeFlag = match.metadata?.homeFlag as string ?? defaultFlag;
    const awayFlag = match.metadata?.awayFlag as string ?? defaultFlag;
    const homeScore = match.score && match.score.length > 0 ? match.score[0].home : '-';
    const awayScore = match.score && match.score.length > 0 ? match.score[0].away : '-';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            backgroundColor: isMatchSelected ? '#FFD700' : '#FFF',
            gap: 4,
            borderRadius: 4,
        }}>
            <button
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
                <img src={homeFlag} alt={`${match.home.name} flag`}
                    style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 21, border: '1px solid #000' }} />
                <p style={{ flex: 1, margin: 0 }}>{match.home.name}: {homeScore}</p>
            </button>
            <div style={{ height: 2, backgroundColor: 'black' }} />
            <button
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
                <img src={awayFlag} alt={`${match.away.name} flag`} style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 21, border: '1px solid #000' }} />
                <p style={{ flex: 1, margin: 0 }}>{match.away.name}: {awayScore}</p>
            </button>
        </div >
    );
};
