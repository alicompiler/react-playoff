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
        }} onClick={(e) => {
            e.stopPropagation();
            handleClick(null);
        }}>
            <div style={{ background: '#FFF', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }} onClick={(e) => {
                e.stopPropagation();
                handleClick(match.home.name);
            }}>
                <img src={homeFlag} alt={`${match.home.name} flag`}
                    style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 21, border: '1px solid #000' }} />
                <p style={{ flex: 1 }}>{match.home.name}: {homeScore}</p>
            </div>
            <div style={{ height: 2, backgroundColor: 'black' }} />
            <div style={{ background: '#FFF', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(match.away.name);
                }}>
                <img src={awayFlag} alt={`${match.away.name} flag`} style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 21, border: '1px solid #000' }} />
                <p style={{ flex: 1 }}>{match.away.name}: {awayScore}</p>
            </div>
        </div >
    );
};
