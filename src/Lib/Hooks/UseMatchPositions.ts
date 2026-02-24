import { useEffect, useState } from "react";
import { calculateMatchPositions } from "../Utils/Match";
import type { MatchPosition } from "../Types";
import { usePlayOffContext } from "../Provider/PlayOffContext";

export type UseMatchPositionsResult = {
    matchPositions: Record<string, MatchPosition>;
}

export const useMatchPositions = (): UseMatchPositionsResult => {
    const { contentRef, matchRefs } = usePlayOffContext();
    const [matchPositions, setMatchPositions] = useState<Record<string, MatchPosition>>({});

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const newPositions = calculateMatchPositions(contentRef.current, matchRefs.current || {});
            setMatchPositions(newPositions);
        });

        if (contentRef.current) {
            observer.observe(contentRef.current);
            for (const el of Object.values(matchRefs.current || {})) {
                if (el) {
                    observer.observe(el);
                }
            }
        }

        setMatchPositions(calculateMatchPositions(contentRef.current, matchRefs.current || {}));

        return () => observer.disconnect();
    }, [contentRef, matchRefs]);

    return {
        matchPositions
    };
};
