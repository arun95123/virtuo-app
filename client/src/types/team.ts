export type Team = {
    id: number;
    name: string;
    city: string;
    abbr: string;
    stadium: string;
}

export type TeamsResponse = {
    isSuccess: true,
    data: {
        teams: Team[]
    }
} | {
    isSuccess: false
}