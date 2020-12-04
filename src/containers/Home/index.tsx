import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Entry, Thread } from '../../ts/interfaces/db_interfaces';

import List from '../../components/Preview/List'

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
        <List isLoading={isLoading} entries={entries} />
    );
}

export default HomePage;
