import { PlayOff } from "../Lib/PlayOff";
import type { PlayOffLayout, Rounds } from "../Lib/Types";
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
            score: [{ home: '3', away: '0' }],
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
            score: [{ home: '1 (Penalties)', away: '1' }],
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
            score: [{ home: '0 (Penalties)', away: '0' }],
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
            score: [{ home: '1', away: '0' }],
        },
    ],
    [
        {
            id: '5',
            home: {
                name: 'Germany',
            },
            away: {
                name: 'Italy',
            },
            nextMatchId: '7',
            score: [{ home: '0', away: '2' }],
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
            score: [{ home: '0', away: '1' }],
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
            score: [{ home: '1 (Penalties)', away: '1' }],
            // TODO: use a symbol instead of string
            nextMatchId: '__final__',
        },
    ],
];

export const Example = ({ layout }: { layout: PlayOffLayout }) => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <h2 style={{ textAlign: 'center' }}>Wings Layout Example</h2>
            <div style={{ width: '100%', height: '90%' }}>
                <PlayOff
                    rounds={rounds}
                    layout={layout}
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