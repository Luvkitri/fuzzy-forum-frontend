import { createContext } from 'react';
import { UserContextType, UserDataContextType } from '../../ts/types/context_types';

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: user => console.warn('No user provided')
});

export const UserDataContext = createContext<UserDataContextType>({
    userData: null,
    setUserData: userData => console.warn('No user data provided')
})