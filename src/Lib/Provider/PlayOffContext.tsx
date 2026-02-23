import { createContext, useContext } from "react";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "./../Types";

export interface PlayOffContextType {
    layout: PlayOffLayout;
    rounds: Rounds;

    viewportRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;

    renderMatch: RenderMatchFunc

    matchRefs: React.RefObject<Record<string, HTMLElement | null>>;
    setMatchRef: (id: string, el: HTMLElement | null) => void;

    selectedTeamName: string | null;
    setSelectedTeamName: (name: string | null) => void;

    position: { x: number; y: number };
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    renderPaths: boolean;
}

export const PlayOffContext = createContext<PlayOffContextType | null>(null);

export const usePlayOffContext = () => {
    const context = useContext(PlayOffContext);
    if (!context) {
        throw new Error('usePlayOffContext must be used within a PlayOffProvider');
    }
    return context;
};
