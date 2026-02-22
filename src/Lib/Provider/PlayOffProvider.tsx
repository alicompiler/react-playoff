import { useCallback, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { PlayOffContext } from "./PlayOffContext";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "../Types";
import { getMatchIdsToHighlight } from "../Utils/Match";

interface Props extends PropsWithChildren {
    rounds: Rounds;
    layout: PlayOffLayout;
    renderMatch: RenderMatchFunc
}

export const PlayOffProvider = ({ children, rounds, layout, renderMatch }: Props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const matchRefs = useRef<Record<string, HTMLElement | null>>({});
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);

    const setMatchRef = useCallback((id: string, el: HTMLElement | null) => {
        matchRefs.current[id] = el;
    }, []);

    const highlightedMatchIds = useMemo(
        () => getMatchIdsToHighlight(selectedMatchId, selectedTeamName, rounds),
        [selectedMatchId, selectedTeamName, rounds]
    );

    const value = useMemo(
        () => ({
            layout,
            rounds,

            contentRef,

            renderMatch,

            matchRefs,
            setMatchRef,
            highlightedMatchIds,

            selectedMatchId,
            setSelectedMatchId,
            selectedTeamName,
            setSelectedTeamName,
        }),
        [
            layout,
            rounds,
            contentRef,
            renderMatch,
            matchRefs,
            setMatchRef,
            highlightedMatchIds,
            selectedMatchId,
            setSelectedMatchId,
            selectedTeamName,
            setSelectedTeamName,
        ],
    );
    return <PlayOffContext.Provider value={value}>{children}</PlayOffContext.Provider>;
};
