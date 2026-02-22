import { PlayOff } from "../Lib/PlayOff";
import type { Rounds } from "../Lib/Types";
import { MatchComponent } from "./MatchComponent";

const rounds: Rounds = [
    [
        {
            id: '1',
            home: {
                name: 'Italy',
            },
            away: {
                name: 'Ukraine',
            },
            nextMatchId: '5',
        },
        {
            id: '2',
            home: {
                name: 'Germany',
            },
            away: {
                name: 'Argentina',
            },
            nextMatchId: '5',
        },
        {
            id: '3',
            home: {
                name: 'Portugal',
            },
            away: {
                name: 'England',
            },
            nextMatchId: '6',
        },
        {
            id: '4',
            home: {
                name: 'France',
            },
            away: {
                name: 'Brazil',
            },
            nextMatchId: '6',
        },
    ],
    [
        {
            id: '5',
            home: {
                name: 'Italy',
            },
            away: {
                name: 'Germany',
            },
            nextMatchId: '7',
        },
        {
            id: '6',
            home: {
                name: 'Portugal',
            },
            away: {
                name: 'France',
            },
            nextMatchId: '7',
        },
    ],
    [
        {
            id: '7',
            home: {
                name: 'Italy',
            },
            away: {
                name: 'France',
            },
            // TODO: use a symbol instead of string
            nextMatchId: '__final__',
        },
    ],
];

export const WingsExample = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <h2 style={{ textAlign: 'center' }}>Wings Layout Example</h2>
            <div style={{ width: '100%', height: '90%' }}>
                <PlayOff
                    rounds={rounds}
                    layout="wings"
                    renderMatch={(match, { selectedTeam, isMatchSelected, setSelectedMatchId, setSelectedTeamName }) => (
                        <MatchComponent
                            match={match}
                            isMatchSelected={isMatchSelected}
                            selectedTeam={selectedTeam}
                            setSelectedMatchId={setSelectedMatchId}
                            setSelectedTeamName={setSelectedTeamName}
                        />
                    )}
                />
            </div>
        </div>
    );
};