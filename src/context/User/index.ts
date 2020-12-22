import { createContext } from 'react';
import { UserContextType } from '../../ts/types/context_types';

export const UserContext = createContext<UserContextType>({ 
    user: null, 
    setUser: user => console.warn('No user provided')
});