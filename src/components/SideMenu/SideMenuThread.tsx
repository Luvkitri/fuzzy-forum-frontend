import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { getAuthAxios } from '../../utils/auth';

// interfaces
import { SubThread } from '../../ts/interfaces/db_interfaces'

// types
import { EntriesContextType } from '../../ts/types/context_types';

// context
import { EntriesContext } from '../../context/Entries';

// @material-ui componentes
import {
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

// @material-ui styles
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
    id: number
    name: string
    subThreads: SubThread[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

const SideMenuThread: React.FC<Props> = ({ id, name, subThreads }) => {
    const classes = useStyles();

    const [isSending, setIsSending] = useState<boolean>(false);
    const isMounted = useRef(true);

    const { setEntries, setSelectedRange } = useContext<EntriesContextType>(EntriesContext);

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const handleThreadClick = useCallback(async (threadId: number, threadName: string) => {
        if (isSending) {
            return;
        }

        setIsSending(true);

        const authAxios = getAuthAxios();
        const res = await authAxios.get(`${process.env.REACT_APP_API_URL}/entries/thread/${threadId}`)
        const responseObj = res.data;

        if (!responseObj.success) {
            console.log(responseObj.error);
        }

        setEntries(responseObj.entries);
        setSelectedRange(threadName);

        if (isMounted.current) {
            setIsSending(false);
        }

    }, [isSending, setEntries, setSelectedRange])

    const handleSubThreadClick = useCallback(async (subThreadId: number, subThreadName: string) => {
        if (isSending) {
            return;
        }

        setIsSending(true);

        const authAxios = getAuthAxios();
        const res = await authAxios.get(`${process.env.REACT_APP_API_URL}/entries/subthread/${subThreadId}`)
        const responseObj = res.data;

        if (!responseObj.success) {
            console.log(responseObj.error);
        }

        setEntries(responseObj.entries);
        setSelectedRange(subThreadName);

        if (isMounted.current) {
            setIsSending(false);
        }
    }, [isSending, setEntries, setSelectedRange])

    return (
        <div>
            <ListItem key={id} disabled={isSending} button onClick={async () => { await handleThreadClick(id, name); }}>
                <ListItemText primary={name} />
            </ListItem>


            <List component="div" disablePadding>
                {subThreads.map((subThread) => (
                    <ListItem key={subThread.id} disabled={isSending} button className={classes.nested} onClick={async () => { await handleSubThreadClick(subThread.id, subThread.name) }}>
                        <ListItemText primary={subThread.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default SideMenuThread;
