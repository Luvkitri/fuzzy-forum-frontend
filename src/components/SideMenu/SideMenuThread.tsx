import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { authAxios } from '../../utils/auth';

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
    key: number
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

const Thread: React.FC<Props> = ({ key, name, subThreads }) => {
    const classes = useStyles();

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const { entries, setEntries } = useContext<EntriesContextType>(EntriesContext);

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const handleThreadClick = useCallback(async (threadId: number) => {
        if (isSending) {
            return;
        }

        console.log(threadId);

        setIsSending(true);

        const res = await authAxios.get(`${process.env.REACT_APP_API_URL}/entries/${threadId}`)
        const responseObj = res.data;

        if (!responseObj.success) {
            console.log(responseObj.error);
        }

        setEntries(responseObj.entries);

        if (isMounted.current) {
            setIsSending(false);
        }

    }, [isSending])

    const handleSubThreadClick = useCallback(async (subThreadId) => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        // send the actual request
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
            setIsSending(false)
    }, [isSending])

    return (
        <div>
            <ListItem key={key} disabled={isSending} button onClick={async () => { await handleThreadClick(key); }}>
                <ListItemText primary={name} />
            </ListItem>


            <List component="div" disablePadding>
                {subThreads.map((subThread) => (
                    <ListItem key={subThread.id} disabled={isSending} button className={classes.nested} onClick={handleSubThreadClick}>
                        <ListItemText primary={subThread.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Thread;
