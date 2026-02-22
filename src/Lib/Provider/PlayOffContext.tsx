import { createContext, useContext } from "react";
import type { PlayOffLayout, RenderMatchFunc, Rounds } from "./Types";

export interface PlayOffContextType {
    layout: PlayOffLayout;
    rounds: Rounds;

    contentRef: React.RefObject<HTMLDivElement | null>;

    renderMatch: RenderMatchFunc

    matchRefs: React.RefObject<Record<string, HTMLElement | null>>;
    setMatchRef: (id: string, el: HTMLElement | null) => void;
    highlightedMatchIds: Set<string>;

    selectedMatchId: string | null;
    setSelectedMatchId: (id: string | null) => void;
    selectedTeamName: string | null;
    setSelectedTeamName: (name: string | null) => void;
}

export const PlayOffContext = createContext<PlayOffContextType | null>(null);

export const usePlayOffContext = () => {
    const context = useContext(PlayOffContext);
    if (!context) {
        throw new Error('usePlayOffContext must be used within a PlayOffProvider');
    }
    return context;
};
