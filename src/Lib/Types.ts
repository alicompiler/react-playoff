export interface Match {
    id: string;
    home: Participant;
    away: Participant;
    nextMatchId: string;
    score?: {
        home: string;
        away: string;
    }[];
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
        isMatchSelected: boolean;
        setSelectedMatchId: (id: string | null) => void;
        setSelectedTeamName: (name: string | null) => void;
    },
) => React.ReactNode;
