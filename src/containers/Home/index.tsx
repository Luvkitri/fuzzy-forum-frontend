import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

// interfaces
import { Entry, Thread } from '../../ts/interfaces/db_interfaces';

// context
import { EntriesContext } from '../../context/Entries'

// components
import Header from '../../components/Header';
import List from '../../components/Preview/List';
import AddEntryCard from '../../components/AddEntry/AddEntryCard';

// @material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

const HomePage: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [entriesRefreshKey, setEntriesRefreshKey] = useState<number>(0);
    const [selectedRange, setSelectedRange] = useState<string>('');

    const memoizedEntries = useMemo(() => ({
        entriesRefreshKey, 
        setEntriesRefreshKey,
        entries,
        setEntries,
        selectedRange,
        setSelectedRange
    }), [entriesRefreshKey, setEntriesRefreshKey, entries, setEntries, selectedRange, setSelectedRange]);

    useEffect(() => {
        const fetchItems = async () => {
            const entriesRequest = axios.get(`${process.env.REACT_APP_API_URL}/entries`);
            const threadsRequest = axios.get(`${process.env.REACT_APP_API_URL}/threads`);

            try {
                const [entries, threads] = await axios.all([entriesRequest, threadsRequest]);

                setEntries(entries.data);
                setThreads(threads.data);
                setIsLoading(false);
                setSelectedRange('');
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchItems();
    }, [entriesRefreshKey, setEntriesRefreshKey, setEntries]);

    return (
        <div>
            <EntriesContext.Provider value={memoizedEntries}>
                <CssBaseline />
                <Header sideMenu={true} />
                <AddEntryCard numberOfEntries={entries.length} threads={threads} />
                <List isLoading={isLoading} entries={entries} />
            </EntriesContext.Provider>
        </div>
    );
}

export default HomePage;
