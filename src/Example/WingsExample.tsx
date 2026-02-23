import { PlayOff } from "../Lib/PlayOff";
import type { Match, PlayOffLayout, Rounds } from "../Lib/Types";
import { MatchComponent } from "./MatchComponent";

const createMatch = (home: string, away: string, score: string, nextMatchId: string, metadata?: Record<string, unknown>, id?: string): Match => ({
    id: id ?? `${home}-${away}`,
    home: { name: home },
    away: { name: away },
    score: [{ home: score.split('-')[0].trim(), away: score.split('-')[1].trim() }],
    nextMatchId,
    metadata,
});

const flags: Record<string, string> = {
    Italy: 'https://flagcdn.com/w320/it.png',
    Ukraine: 'https://flagcdn.com/w320/ua.png',
    Germany: 'https://flagcdn.com/w320/de.png',
    Argentina: 'https://flagcdn.com/w320/ar.png',
    Portugal: 'https://flagcdn.com/w320/pt.png',
    England: 'https://flagcdn.com/w320/gb-eng.png',
    France: 'https://flagcdn.com/w320/fr.png',
    Brazil: 'https://flagcdn.com/w320/br.png',
    Spain: 'https://flagcdn.com/w320/es.png',
    Sweden: 'https://flagcdn.com/w320/se.png',
    Mexico: 'https://flagcdn.com/w320/mx.png',
    Australia: 'https://flagcdn.com/w320/au.png',
    Switzerland: 'https://flagcdn.com/w320/ch.png',
    Ecuador: 'https://flagcdn.com/w320/ec.png',
    Netherlands: 'https://flagcdn.com/w320/nl.png',
    Ghana: 'https://flagcdn.com/w320/gh.png',
};
const createMeta = (home: string, away: string): Record<string, unknown> => ({
    homeFlag: flags[home],
    awayFlag: flags[away],
});

const rounds: Rounds = [
    [
        createMatch('Germany', 'Sweden', '4 - 2', '2', createMeta('Germany', 'Sweden')),
        createMatch('Argentina', 'Mexico', '2 - 1', '2', createMeta('Argentina', 'Mexico')),
        createMatch('Italy', 'Australia', '1 - 0', '1', createMeta('Italy', 'Australia')),
        createMatch('Switzerland', 'Ukraine', '0 - 1', '1', createMeta('Switzerland', 'Ukraine')),
        createMatch('England', 'Ecuador', '1 - 0', '3', createMeta('England', 'Ecuador')),
        createMatch('Portugal', 'Netherlands', '2 - 1', '3', createMeta('Portugal', 'Netherlands')),
        createMatch('Spain', 'France', '1 - 3', '4', createMeta('Spain', 'France')),
        createMatch('Brazil', 'Ghana', '3 - 0', '4', createMeta('Brazil', 'Ghana')),
    ],
    [
        createMatch('Germany', 'Argentina', '1 (Penalties) - 1', '5', createMeta('Germany', 'Argentina'), '2'),
        createMatch('Italy', 'Ukraine', '3 - 0', '5', createMeta('Italy', 'Ukraine'), '1'),
        createMatch('Portugal', 'England', '0 (Penalties) - 0', '6', createMeta('Portugal', 'England'), '3'),
        createMatch('France', 'Brazil', '1 - 0', '6', createMeta('France', 'Brazil'), '4'),
    ],
    [
        createMatch('Italy', 'Germany', '2 - 0', '7', createMeta('Italy', 'Germany'), '5'),
        createMatch('Portugal', 'France', '0 - 1', '7', createMeta('Portugal', 'France'), '6'),
    ],
    [
        createMatch('Italy', 'France', '1 (Penalties) - 1', '__final__', createMeta('Italy', 'France'), '7'),
    ]
];

export const Example = ({ layout }: { layout: PlayOffLayout }) => {
    return (
        <div style={{
            backgroundColor: '#2B2B2B',
            width: '100%',
        }}>
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
    );
};
