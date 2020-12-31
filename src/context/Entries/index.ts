import { createContext } from 'react';
import { EntriesContextType, EntryContextType } from '../../ts/types/context_types';

export const EntriesContext = createContext<EntriesContextType>({ 
    entriesRefreshKey: 0, 
    setEntriesRefreshKey: refreshKey => console.warn('No refreshKey provided'),
    entries: [],
    setEntries: entries => console.warn('No entries provided'),
    selectedRange: '',
    setSelectedRange: selectedRange => console.warn('Range not provided'),
});

export const EntryContext = createContext<EntryContextType>({
    entryRefreshKey: 0,
    setEntryRefreshKey: refreshKey => console.warn('No refreshKey provided'),
});