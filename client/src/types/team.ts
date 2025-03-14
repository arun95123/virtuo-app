export type Team = {
    id: number;
    name: string;
    city: string;
    abbr: string;
    stadium: string;
}

export type ApiResponse<T> = {
    isSuccess: true,
    data: T
} | {
    isSuccess: false
}

export type TeamForm = {
    name: string,
    city: string,
    abbr: string,
    stadium: string
}