import React, { useContext } from 'react'

// interfaces
import { Thread } from '../../ts/interfaces/db_interfaces';

// context
import { EntriesContext } from '../../context/Entries';
import { EntriesContextType } from '../../ts/types/context_types';

// components
import SideMenuThread from './SideMenuThread';

// @material-ui components
import {
    List,
    Divider,
    Typography,
    ListItem,
    ListItemText
} from '@material-ui/core'

// @material-ui styles
import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles'

type Props = {
    threads: Thread[]
}

const useStyles = makeStyles(() =>
    createStyles({
        toolbar: {
            padding: '10px 15px 0px',
            minHeight: '64px'
        },
        title: {
            flexGrow: 1,
        },
    })
)

const SideMenuList: React.FC<Props> = ({ threads }) => {
    const classes = useStyles();

    // Context
    const { entriesRefreshKey, setEntriesRefreshKey } = useContext<EntriesContextType>(EntriesContext);

    return (
        <div>
            <div className={classes.toolbar}>
                <Typography className={classes.title}>Fuzzy Forum</Typography>
                <Typography>v 0.0.1</Typography>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={() => setEntriesRefreshKey(entriesRefreshKey + 1)}>
                    <ListItemText primary="All" />
                </ListItem>
                {threads.map((thread) => (
                    <SideMenuThread key={thread.id} id={thread.id} name={thread.name} subThreads={thread.SubThreads} />
                ))}
            </List>
        </div>
    );
}

export default SideMenuList;
