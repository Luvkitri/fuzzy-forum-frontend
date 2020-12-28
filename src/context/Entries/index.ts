import { createContext } from 'react';
import { EntriesContextType } from '../../ts/types/context_types';

export const EntriesContext = createContext<EntriesContextType>({ 
    entriesRefreshKey: 0, 
    setEntriesRefreshKey: refreshKey => console.warn('No refreshKey provided'),
    entries: [],
    setEntries: entries => console.warn('No entries provided'),
});