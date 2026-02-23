export interface Match {
    id: string;
    home: Participant;
    away: Participant;
    nextMatchId: string;
    score?: {
        home: string;
        away: string;
    }[];
    metadata?: Record<string, unknown>;
}

export interface Participant {
    name: string;
}

export type Rounds = Match[][];

export type PlayOffLayout = "tree" | "wings";

export type RenderMatchFunc = (
    match: Match,
    options: {
        selectedTeam: string | null;
        setSelectedTeamName: (name: string | null) => void;
    },
) => React.ReactNode;

export interface MatchPosition {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
