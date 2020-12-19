import { User } from './db_interfaces';

export interface Register {
    auth: boolean;
    user: User;
    token: string;
    expiresIn: string;
}
