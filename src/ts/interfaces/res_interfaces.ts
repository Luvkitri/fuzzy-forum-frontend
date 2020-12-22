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