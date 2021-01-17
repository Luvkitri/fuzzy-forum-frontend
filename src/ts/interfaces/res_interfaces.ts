import { Entry } from "./db_interfaces";

export interface Register {
    auth: boolean;
    user: LogedInUser;
    token: string;
    expiresIn: string;
}

export interface LogedInUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    login: string;
    updated_at: string;
    created_at: string;
}

export interface UserData {
    id: number;
    Entries: {
        id: number;
        title: string;
        score: number;
        answers: number;
        active: boolean;
    }[];
    Answers: {
        id: number;
        score: number;
        entry_id: number;
    }[];
}
