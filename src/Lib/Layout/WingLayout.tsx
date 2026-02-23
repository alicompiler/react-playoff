import { RoundColumn } from '../Elements/RoundColumn';
import { useWings } from '../Hooks/UseWings';
import { usePlayOffContext } from '../Provider/PlayOffContext';
import type { Match } from '../Types';

export const WingsLayout = () => {
    const { rounds } = usePlayOffContext();
    const { isRightWing, isLeftWing } = useWings(rounds);

    return <>
        {
            rounds
                .slice(0, -1)
                .map((round: Match[], index: number) => (
                    <RoundColumn
                        key={`left-${index}`}
                        round={round.filter((m: Match) => isLeftWing(m.id))} />
                ))
        }

        <RoundColumn round={rounds.at(-1) ?? []} />

        {
            rounds
                .slice(0, -1)
                .toReversed()
                .map((round: Match[], index: number) => (
                    <RoundColumn
                        key={`right-${index}`}
                        round={round.filter((m: Match) => isRightWing(m.id))} />
                ))
        }
    </>;
};
