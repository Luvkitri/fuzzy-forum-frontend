import { LogedInUser } from '../../ts/interfaces/res_interfaces';

export type UserContextType = {
    user: LogedInUser | null,
    setUser: (user: LogedInUser | null) => void
}