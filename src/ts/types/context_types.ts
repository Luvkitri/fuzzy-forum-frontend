import { LogedInUser } from '../../ts/interfaces/res_interfaces';
import { Entry } from '../../ts/interfaces/db_interfaces';

export type UserContextType = {
    user: LogedInUser | null,
    setUser: (user: LogedInUser | null) => void,
}

export type EntriesContextType = {
    entriesRefreshKey: number,
    setEntriesRefreshKey: (refreshKey: number) => void,
    entries: Entry[],
    setEntries: (entries: Entry[]) => void,
    selectedRange: string,
    setSelectedRange: (selectedRange: string) => void,
}

export type EntryContextType = {
    entryRefreshKey: number,
    setEntryRefreshKey: (refreshKey: number) => void,
}