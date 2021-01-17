import { LogedInUser, UserData } from '../../ts/interfaces/res_interfaces';
import { Entry } from '../../ts/interfaces/db_interfaces';
import { AppAlert } from '../../ts/interfaces/local_interfaces';

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
    alert: AppAlert,
    setAlert: (alert: AppAlert) => void,
}
}