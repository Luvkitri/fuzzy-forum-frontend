import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Entry, Thread } from '../../ts/interfaces/db_interfaces';

// components
import Header from '../../components/Header';
import List from '../../components/Preview/List'

// @material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

const HomePage: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            const entriesRequest = axios.get('http://localhost:5000/entries');

            try {
                const [entries] = await axios.all([entriesRequest]);

                setEntries(entries.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchItems();
    }, []);

    return (
        <div>
            <CssBaseline />
            <Header sideMenu={true} />
            <List isLoading={isLoading} entries={entries} />
        </div>
    );
}

export default HomePage;
