import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// interfaces
import { WholeEntry } from '../../ts/interfaces/db_interfaces';
import { AppAlert } from '../../ts/interfaces/local_interfaces';

// components
import Header from '../../components/Header';
import EntryContent from '../../components/EntryContent';

// context
import { EntryContext } from '../../context/Entries';

// @material-ui components
import { CssBaseline } from '@material-ui/core';

const EntryPage: React.FC = () => {
    const { entryId } = useParams<{ entryId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [entry, setEntry] = useState<WholeEntry>(Object);
    const [entryRefreshKey, setEntryRefreshKey] = useState<number>(0);
    const [alert, setAlert] = useState<AppAlert>({ active: false, type: 'error', msg: '' });

    const memoizedEntry = useMemo(() => ({
        entryRefreshKey,
        setEntryRefreshKey,
        alert,
        setAlert
    }), [entryRefreshKey, setEntryRefreshKey, alert, setAlert])

    useEffect(() => {
        const fetchEntry = async () => {
            const entryRequest = axios.get(`${process.env.REACT_APP_API_URL}/entries/${entryId}`);

            try {
                const [entry] = await axios.all([entryRequest]);

                if (entry.data.success !== true) {
                    console.log(entry.data.error);
                }

                setEntry(entry.data.entry);
                setEntryRefreshKey(0);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }

        }

        fetchEntry();
    }, [entryRefreshKey, setEntryRefreshKey, setEntry]);


    return (
        <div>
            <EntryContext.Provider value={memoizedEntry}>
                <CssBaseline />
                <Header sideMenu={false} />
                <EntryContent isLoading={isLoading} entry={entry} />
            </EntryContext.Provider>
        </div>
    )
}

export default EntryPage;
