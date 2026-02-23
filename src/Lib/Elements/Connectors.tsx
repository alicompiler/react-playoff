import type { Match } from '../Types';
import { Path } from './Path';
import { useMatchPositions } from '../Hooks/UseMatchPositions';
import { usePlayOffContext } from '../Provider/PlayOffContext';

export const Connectors = () => {
    const { rounds } = usePlayOffContext();
    const { matchPositions } = useMatchPositions();

    const hasPosition = (m: Match) => matchPositions[m.id] && matchPositions[m.nextMatchId];

    return (
        <svg
            className="__playoff-connectors"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                overflow: 'visible',
            }}
        >
            {
                rounds.flat().map((m) =>
                    hasPosition(m) && <Path
                        key={`path-${m.id}`}
                        matchPosition={matchPositions[m.id]}
                        nextMatchPosition={matchPositions[m.nextMatchId]}
                        match={m}
                    />
                )
            }
        </svg>
    );
};
