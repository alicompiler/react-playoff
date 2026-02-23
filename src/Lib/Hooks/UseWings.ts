import { useCallback, useMemo, useState } from "react";
import type { Rounds } from "../Types";

type IsRightWing = (id: string) => boolean;
type IsLeftWing = (id: string) => boolean;

interface UseWingsDividerResult {
    isLeftWing: IsLeftWing;
    isRightWing: IsRightWing;
}

export const useWings = (rounds: Rounds): UseWingsDividerResult => {
    const [leftWing] = useState<Set<string>>(new Set<string>());
    const [rightWing] = useState<Set<string>>(new Set<string>());

    useMemo(() => {
        if (rounds.length === 0 || rounds.length === 1) {
            return;
        }

        leftWing.clear();
        rightWing.clear();

        const semiFinals = rounds.at(-2)!;
        const semiFinalLeftIds = semiFinals.at(0)?.id;
        const semiFinalRightIds = semiFinals.at(1)?.id;
        if (!semiFinalLeftIds) {
            throw new Error("Semi final left ids not found");
        }
        if (!semiFinalRightIds) {
            throw new Error("Semi final right ids not found");
        }

        leftWing.add(semiFinalLeftIds);
        rightWing.add(semiFinalRightIds);

        const roundsWithoutFinalAndSemiFinal = [...rounds]
            .slice(0, -2)
            .reverse();

        for (const round of roundsWithoutFinalAndSemiFinal) {
            for (const match of round) {
                if (leftWing.has(match.nextMatchId)) {
                    leftWing.add(match.id);
                }
                if (rightWing.has(match.nextMatchId)) {
                    rightWing.add(match.id);
                }
            }
        }
    }, [rounds, leftWing, rightWing]);

    const isLeftWing: IsLeftWing = useCallback(
        (id: string) => leftWing.has(id),
        [leftWing],
    );

    const isRightWing: IsRightWing = useCallback(
        (id: string) => rightWing.has(id),
        [rightWing],
    );

    return {
        isLeftWing,
        isRightWing,
    };
};
