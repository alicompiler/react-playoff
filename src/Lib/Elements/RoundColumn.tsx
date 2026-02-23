import { usePlayOffContext } from "../Provider/PlayOffContext";
import type { Match, Rounds } from "../Types";
import { MatchContainer } from "./MatchContainer";

interface Props {
    round: Rounds[number];
}

export const RoundColumn = ({ round }: Props) => {
    const {
        setMatchRef,
        renderMatch,
        setSelectedTeamName,
        selectedTeamName,
    } = usePlayOffContext();

    return (
        <div
            className="__playoff-round-column"
            role="group"
            aria-label={`Round ${round[0]?.metadata?.roundTitle || 'Match'}`}
            style={{
                minWidth: '240px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                gap: '40px',
            }}>
            {
                round.map((match: Match) => <MatchContainer
                    key={match.id}
                    match={match}
                    renderMatch={renderMatch}
                    selectedTeamName={selectedTeamName}
                    setSelectedTeamName={setSelectedTeamName}
                    setMatchRef={setMatchRef}
                />)
            }
        </div>
    );
};
