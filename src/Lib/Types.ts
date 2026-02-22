export interface Match {
    id: string;
    home: Participant;
    away: Participant;
    nextMatchId: string;
}

export interface Participant {
    name: string;
}

export type Rounds = Match[][];
