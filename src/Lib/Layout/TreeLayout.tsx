import { RoundColumn } from "../Elements/RoundColumn";
import { usePlayOffContext } from "../Provider/PlayOffContext";
import type { Match } from "../Types";

export const TreeLayout = () => {
    const { rounds } = usePlayOffContext();

    return <>
        {
            rounds.map((round: Match[], index: number) => (
                <RoundColumn
                    key={index}
                    round={round} />
            ))
        }
    </>;
};
