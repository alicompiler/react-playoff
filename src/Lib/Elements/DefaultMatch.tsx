import type { Match, RenderMatchFunc } from "../Types";

interface Props {
    match: Match;
    selectedTeam: string | null;
    setSelectedTeamName: (name: string | null) => void;
}

export const DefaultMatch = ({ match, selectedTeam, setSelectedTeamName }: Props) => {
    const handleClick = (teamName: string | null) => {
        if (selectedTeam === teamName) {
            setSelectedTeamName(null);
        } else {
            setSelectedTeamName(teamName);
        }
    };

    const homeScores = match.score?.map((score) => score.home).join(' - ') ?? '-';
    const awayScores = match.score?.map((score) => score.away).join(' - ') ?? '-';

    return (
        <div
            className="__playoff-default-match"
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '6px',
                backgroundColor: '#ffffff',
                gap: '2px',
                borderRadius: '8px',
                minWidth: '180px',
            }}>
            <button
                className={`__playoff-default-match-home ${selectedTeam === match.home.name ? '__playoff-team-selected' : ''}`}
                style={{
                    background: 'transparent',
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0 12px',
                    transition: 'all 0.2s',
                    color: '#1e293b',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(match.home.name);
                }}
                aria-label={`Select ${match.home.name}`}
            >
                <span style={{ fontSize: '14px', fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {match.home.name}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', minWidth: '24px', textAlign: 'right' }}>
                    {homeScores}
                </span>
            </button>
            <div style={{ height: 1, backgroundColor: '#cbd5e1', margin: '2px 8px' }} />
            <button
                className={`__playoff-default-match-away ${selectedTeam === match.away.name ? '__playoff-team-selected' : ''}`}
                style={{
                    background: 'transparent',
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0 12px',
                    transition: 'all 0.2s',
                    color: '#1e293b',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(match.away.name);
                }}
                aria-label={`Select ${match.away.name}`}
            >
                <span style={{ fontSize: '14px', fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {match.away.name}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', minWidth: '24px', textAlign: 'right' }}>
                    {awayScores}
                </span>
            </button>
        </div >
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const renderDefaultMatch: RenderMatchFunc = (match, options) => {
    const {
        selectedTeam,
        setSelectedTeamName
    } = options;
    return (
        <DefaultMatch
            match={match}
            selectedTeam={selectedTeam}
            setSelectedTeamName={setSelectedTeamName}
        />
    );
};
