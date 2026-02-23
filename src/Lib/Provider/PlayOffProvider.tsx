import { useCallback, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { PlayOffContext } from "./PlayOffContext";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "../Types";
import { getMatchIdsToHighlight } from "../Utils/Match";

interface Props extends PropsWithChildren {
    rounds: Rounds;
    layout: PlayOffLayout;
    renderMatch: RenderMatchFunc;
    renderPaths?: boolean;
}

export const PlayOffProvider = ({ children, rounds, layout, renderMatch, renderPaths = true }: Props) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const matchRefs = useRef<Record<string, HTMLElement | null>>({});
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    console.log('Selected Match ID:', selectedMatchId);
    console.log('Selected Team Name:', selectedTeamName);

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

            viewportRef,
            contentRef,

            renderMatch,

            matchRefs,
            setMatchRef,
            highlightedMatchIds,

            selectedMatchId,
            setSelectedMatchId,
            selectedTeamName,
            setSelectedTeamName,

            position,
            setPosition,
            zoom,
            setZoom,
            renderPaths,
        }),
        [
            layout,
            rounds,
            viewportRef,
            contentRef,
            renderMatch,
            matchRefs,
            setMatchRef,
            highlightedMatchIds,
            selectedMatchId,
            setSelectedMatchId,
            selectedTeamName,
            setSelectedTeamName,
            position,
            setPosition,
            zoom,
            setZoom,
            renderPaths,
        ],
    );
    return <PlayOffContext.Provider value={value}>{children}</PlayOffContext.Provider>;
};
