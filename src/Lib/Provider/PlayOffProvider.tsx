import { useCallback, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { PlayOffContext } from "./PlayOffContext";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "../Types";

interface Props extends PropsWithChildren {
    rounds: Rounds;
    layout: PlayOffLayout;
    renderMatch: RenderMatchFunc;
    renderPaths?: boolean;
    initialZoom?: number;
}

export const PlayOffProvider = ({ children, rounds, layout, renderMatch, renderPaths = true, initialZoom }: Props) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const matchRefs = useRef<Record<string, HTMLElement | null>>({});
    const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(initialZoom ?? 1);

    const setMatchRef = useCallback((id: string, el: HTMLElement | null) => {
        matchRefs.current[id] = el;
    }, []);

    const value = useMemo(
        () => ({
            layout,
            rounds,

            viewportRef,
            contentRef,

            renderMatch,

            matchRefs,
            setMatchRef,

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
